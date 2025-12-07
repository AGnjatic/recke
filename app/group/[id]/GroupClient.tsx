"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InviteUserDialog } from "@/components/InviteUserDialog"
import { GroupLeaderboard } from "@/components/GroupLeaderboard"
import { TrendChart } from "@/components/TrendChart"
import { InlineScoreTracker } from "@/components/InlineScoreTracker"
import { ArrowLeft, UserPlus } from "lucide-react"
import Image from "next/image"

interface User {
  id: string
  name: string | null
  email: string | null
  image: string | null
}

interface Score {
  id: string
  userId: string
  game: "ZIP" | "QUEENS"
  points: number
  time: string | null
  backtracks: number | null
  date: Date
  enteredBy: string
  user: {
    id: string
    name: string | null
    image: string | null
  }
}

interface Group {
  id: string
  name: string
  members: {
    id: string
    role: string
    user: User
  }[]
  scores: Score[]
}

export function GroupClient({
  group,
  currentUserId,
  isAdmin,
}: {
  group: Group
  currentUserId: string
  isAdmin: boolean
}) {
  const [inviteUserOpen, setInviteUserOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Image src="/logo.svg" alt="RECKE Logo" width={32} height={32} />
                <span className="font-semibold text-blue-600">RECKE</span>
              </Link>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <h1 className="text-xl font-bold text-gray-900">{group.name}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Button variant="outline" size="sm" onClick={() => setInviteUserOpen(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Inline Score Tracker */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Track Scores</h2>
          <InlineScoreTracker groupId={group.id} members={group.members} />
        </div>

        {/* Leaderboard */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
          <GroupLeaderboard group={group} />
        </div>

        {/* Trends */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Trends</h2>
          <TrendChart scores={group.scores} members={group.members} />
        </div>

        {/* History */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Score History</h2>
          <Card>
            <CardHeader>
              <CardTitle>Recent Games</CardTitle>
              <CardDescription>Last 50 game results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {group.scores.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-8">
                    No scores yet. Add your first score to get started!
                  </p>
                ) : (
                  group.scores.slice(0, 50).map((score) => (
                    <div
                      key={score.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                          {score.user.name?.charAt(0) || "?"}
                        </div>
                        <div>
                          <p className="font-medium">{score.user.name}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(score.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {score.game} - {score.points} point{score.points !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {isAdmin && (
        <InviteUserDialog
          open={inviteUserOpen}
          onOpenChange={setInviteUserOpen}
          groupId={group.id}
        />
      )}
    </div>
  )
}

