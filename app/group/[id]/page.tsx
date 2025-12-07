import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { GroupClient } from "./GroupClient"

export default async function GroupPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  // Verify user is a member of this group
  const membership = await prisma.groupMember.findUnique({
    where: {
      groupId_userId: {
        groupId: params.id,
        userId: session.user.id,
      },
    },
  })

  if (!membership) {
    redirect("/dashboard")
  }

  // Fetch group data
  const group = await prisma.group.findUnique({
    where: { id: params.id },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
      scores: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          date: "desc",
        },
      },
    },
  })

  if (!group) {
    redirect("/dashboard")
  }

  const isAdmin = membership.role === "admin"

  return (
    <GroupClient
      group={group}
      currentUserId={session.user.id}
      isAdmin={isAdmin}
    />
  )
}

