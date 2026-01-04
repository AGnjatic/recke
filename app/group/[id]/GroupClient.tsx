"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InviteUserDialog } from "@/components/InviteUserDialog"
import { GroupLeaderboard } from "@/components/GroupLeaderboard"
import { TrendChart } from "@/components/TrendChart"
import { DailyScoreEntry } from "@/components/DailyScoreEntry"
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <Link href="/dashboard" className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
                <Image 
                  src="/logo.svg" 
                  alt="RECKE Logo" 
                  width={24} 
                  height={24}
                  className="sm:w-8 sm:h-8"
                />
                <span className="font-semibold text-blue-600 text-sm sm:text-base hidden sm:inline">RECKE</span>
              </Link>
              <div className="h-6 sm:h-8 w-px bg-gray-300 hidden sm:block"></div>
              <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                <Link href="/dashboard" className="flex-shrink-0">
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
                    <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Back</span>
                  </Button>
                </Link>
                <h1 className="text-base sm:text-xl font-bold text-gray-900 truncate">{group.name}</h1>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {isAdmin && (
                <Button variant="outline" size="sm" onClick={() => setInviteUserOpen(true)} className="text-xs sm:text-sm px-2 sm:px-3">
                  <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Invite</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Daily Score Entry */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Track Scores</h2>
          <DailyScoreEntry groupId={group.id} members={group.members} />
        </div>

        {/* Leaderboard */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Leaderboard</h2>
          <GroupLeaderboard group={group} />
        </div>

        {/* Trends */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Trends</h2>
          <TrendChart scores={group.scores} members={group.members} />
        </div>

        {/* History */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Score History</h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Recent Games</CardTitle>
              <CardDescription className="text-sm">Last 50 game results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {group.scores.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-6 sm:py-8">
                    No scores yet. Add your first score to get started!
                  </p>
                ) : (
                  group.scores.slice(0, 50).map((score) => (
                    <div
                      key={score.id}
                      className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg gap-3"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm sm:text-base flex-shrink-0">
                          {score.user.name?.charAt(0) || "?"}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm sm:text-base truncate">{score.user.name}</p>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {new Date(score.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold text-sm sm:text-base">
                          {score.game} - {score.points}pt{score.points !== 1 ? "s" : ""}
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

