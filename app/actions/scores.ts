"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { GameType } from "@prisma/client"

const addScoreSchema = z.object({
  groupId: z.string(),
  userId: z.string(),
  game: z.enum(["ZIP", "QUEENS"]),
  points: z.number().min(0).max(1),
  time: z.string().optional(),
  backtracks: z.number().optional(),
  date: z.string(),
  notes: z.string().optional(),
})

export async function addScore(formData: FormData) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    const data = addScoreSchema.parse({
      groupId: formData.get("groupId"),
      userId: formData.get("userId"),
      game: formData.get("game"),
      points: Number(formData.get("points")),
      time: formData.get("time") || undefined,
      backtracks: formData.get("backtracks") ? Number(formData.get("backtracks")) : undefined,
      date: formData.get("date"),
      notes: formData.get("notes") || undefined,
    })

    // Verify user is a member of the group
    const membership = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId: data.groupId,
          userId: session.user.id,
        },
      },
    })

    if (!membership) {
      return { error: "You are not a member of this group" }
    }

    // Verify the target user is also a member
    const targetMembership = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId: data.groupId,
          userId: data.userId,
        },
      },
    })

    if (!targetMembership) {
      return { error: "Target user is not a member of this group" }
    }

    // Check for duplicate entry (same user, game, date, group)
    const existingScore = await prisma.score.findUnique({
      where: {
        groupId_userId_game_date: {
          groupId: data.groupId,
          userId: data.userId,
          game: data.game as GameType,
          date: new Date(data.date),
        },
      },
    })

    if (existingScore) {
      return { error: "Score for this game and date already exists" }
    }

    const score = await prisma.score.create({
      data: {
        groupId: data.groupId,
        userId: data.userId,
        game: data.game as GameType,
        points: data.points,
        time: data.time,
        backtracks: data.backtracks,
        date: new Date(data.date),
        enteredBy: session.user.id,
        notes: data.notes,
      },
      include: {
        user: true,
      },
    })

    revalidatePath(`/group/${data.groupId}`)
    return { success: true, score }
  } catch (error) {
    console.error("Error adding score:", error)
    if (error instanceof z.ZodError) {
      return { error: "Invalid input data" }
    }
    return { error: "Failed to add score" }
  }
}

export async function addBulkScores(scores: {
  groupId: string
  players: {
    userId: string
    points: number
    time?: string
    backtracks?: number
  }[]
  game: "ZIP" | "QUEENS"
  date: string
}) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    // Verify user is a member of the group
    const membership = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId: scores.groupId,
          userId: session.user.id,
        },
      },
    })

    if (!membership) {
      return { error: "You are not a member of this group" }
    }

    // Verify all players are members
    const membershipChecks = await Promise.all(
      scores.players.map(p =>
        prisma.groupMember.findUnique({
          where: {
            groupId_userId: {
              groupId: scores.groupId,
              userId: p.userId,
            },
          },
        })
      )
    )

    if (membershipChecks.some(m => !m)) {
      return { error: "One or more players are not members of this group" }
    }

    // Create all scores in a transaction
    const createdScores = await prisma.$transaction(
      scores.players.map(player =>
        prisma.score.upsert({
          where: {
            groupId_userId_game_date: {
              groupId: scores.groupId,
              userId: player.userId,
              game: scores.game as GameType,
              date: new Date(scores.date),
            },
          },
          update: {
            points: player.points,
            time: player.time,
            backtracks: player.backtracks,
            enteredBy: session.user.id,
          },
          create: {
            groupId: scores.groupId,
            userId: player.userId,
            game: scores.game as GameType,
            points: player.points,
            time: player.time,
            backtracks: player.backtracks,
            date: new Date(scores.date),
            enteredBy: session.user.id,
          },
        })
      )
    )

    revalidatePath(`/group/${scores.groupId}`)
    return { success: true, scores: createdScores }
  } catch (error) {
    console.error("Error adding bulk scores:", error)
    return { error: "Failed to add scores" }
  }
}

export async function getGroupScores(groupId: string, days: number = 30) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    // Verify user is a member of the group
    const membership = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId,
          userId: session.user.id,
        },
      },
    })

    if (!membership) {
      return { error: "You are not a member of this group" }
    }

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const scores = await prisma.score.findMany({
      where: {
        groupId,
        date: {
          gte: startDate,
        },
      },
      include: {
        user: true,
      },
      orderBy: {
        date: "desc",
      },
    })

    return { success: true, scores }
  } catch (error) {
    console.error("Error fetching scores:", error)
    return { error: "Failed to fetch scores" }
  }
}

export async function getGlobalLeaderboard() {
  try {
    // Get all users who opted in to global leaderboard
    const users = await prisma.user.findMany({
      where: {
        showInGlobal: true,
      },
      include: {
        scores: {
          select: {
            points: true,
            game: true,
          },
        },
      },
    })

    const leaderboard = users.map(user => {
      const zipScore = user.scores
        .filter(s => s.game === "ZIP")
        .reduce((sum, s) => sum + s.points, 0)
      
      const queensScore = user.scores
        .filter(s => s.game === "QUEENS")
        .reduce((sum, s) => sum + s.points, 0)

      return {
        user: {
          id: user.id,
          name: user.name,
          image: user.image,
        },
        zipScore,
        queensScore,
        totalScore: zipScore + queensScore,
      }
    }).sort((a, b) => b.totalScore - a.totalScore)

    return { success: true, leaderboard }
  } catch (error) {
    console.error("Error fetching global leaderboard:", error)
    return { error: "Failed to fetch global leaderboard" }
  }
}

