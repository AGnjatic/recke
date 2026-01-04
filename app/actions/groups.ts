"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const createGroupSchema = z.object({
  name: z.string().min(1).max(100),
})

const inviteUserSchema = z.object({
  groupId: z.string(),
  email: z.string().email(),
})

export async function createGroup(formData: FormData) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    const data = createGroupSchema.parse({
      name: formData.get("name"),
    })

    const group = await prisma.group.create({
      data: {
        name: data.name,
        createdById: session.user.id,
        members: {
          create: {
            userId: session.user.id,
            role: "admin",
          },
        },
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    })

    revalidatePath("/dashboard")
    return { success: true, group }
  } catch (error) {
    console.error("Error creating group:", error)
    return { error: "Failed to create group" }
  }
}

export async function inviteUserToGroup(formData: FormData) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    const data = inviteUserSchema.parse({
      groupId: formData.get("groupId"),
      email: formData.get("email"),
    })

    // Check if user is admin of the group
    const membership = await prisma.groupMember.findFirst({
      where: {
        groupId: data.groupId,
        userId: session.user.id,
        role: "admin",
      },
    })

    if (!membership) {
      return { error: "Only group admins can invite users" }
    }

    // Find user by email
    const invitedUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    // If user exists, check if already a member
    if (invitedUser) {
      const existingMember = await prisma.groupMember.findUnique({
        where: {
          groupId_userId: {
            groupId: data.groupId,
            userId: invitedUser.id,
          },
        },
      })

      if (existingMember) {
        return { error: "User is already a member of this group" }
      }
    }

    // Check for existing pending invitation (by email)
    const existingInvitation = await prisma.invitation.findFirst({
      where: {
        groupId: data.groupId,
        email: data.email,
        status: "pending",
      },
    })

    if (existingInvitation) {
      return { error: "Invitation already sent to this email" }
    }

    // Create invitation (with or without receiverId)
    const invitation = await prisma.invitation.create({
      data: {
        groupId: data.groupId,
        senderId: session.user.id,
        receiverId: invitedUser?.id || null,
        email: data.email,
      },
      include: {
        group: true,
        sender: true,
        receiver: true,
      },
    })

    revalidatePath("/dashboard")
    
    // Return different success messages based on whether user exists
    if (invitedUser) {
      return { 
        success: true, 
        invitation,
        message: "Invitation sent! They'll see it when they sign in." 
      }
    } else {
      return { 
        success: true, 
        invitation,
        message: "Invitation sent! They'll see it when they create an account with this email." 
      }
    }
  } catch (error) {
    console.error("Error inviting user:", error)
    return { error: "Failed to send invitation" }
  }
}

export async function acceptInvitation(invitationId: string) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
    })

    if (!invitation || invitation.receiverId !== session.user.id) {
      return { error: "Invalid invitation" }
    }

    if (invitation.status !== "pending") {
      return { error: "Invitation already processed" }
    }

    // Add user to group and update invitation
    await prisma.$transaction([
      prisma.groupMember.create({
        data: {
          groupId: invitation.groupId,
          userId: session.user.id,
          role: "member",
        },
      }),
      prisma.invitation.update({
        where: { id: invitationId },
        data: { status: "accepted" },
      }),
    ])

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error accepting invitation:", error)
    return { error: "Failed to accept invitation" }
  }
}

export async function declineInvitation(invitationId: string) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
    })

    if (!invitation || invitation.receiverId !== session.user.id) {
      return { error: "Invalid invitation" }
    }

    await prisma.invitation.update({
      where: { id: invitationId },
      data: { status: "declined" },
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error declining invitation:", error)
    return { error: "Failed to decline invitation" }
  }
}

export async function getMyGroups() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    const groups = await prisma.group.findMany({
      where: {
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            members: true,
            scores: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return { success: true, groups }
  } catch (error) {
    console.error("Error fetching groups:", error)
    return { error: "Failed to fetch groups" }
  }
}

export async function getPendingInvitations() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id || !session?.user?.email) {
    return { error: "Unauthorized" }
  }

  try {
    // First, link any pending invitations to this user's account
    await prisma.invitation.updateMany({
      where: {
        email: session.user.email,
        receiverId: null,
        status: "pending",
      },
      data: {
        receiverId: session.user.id,
      },
    })

    // Now fetch all pending invitations for this user
    const invitations = await prisma.invitation.findMany({
      where: {
        receiverId: session.user.id,
        status: "pending",
      },
      include: {
        group: true,
        sender: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return { success: true, invitations }
  } catch (error) {
    console.error("Error fetching invitations:", error)
    return { error: "Failed to fetch invitations" }
  }
}

export async function updateGlobalVisibility(showInGlobal: boolean) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { showInGlobal },
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error updating global visibility:", error)
    return { error: "Failed to update visibility" }
  }
}

