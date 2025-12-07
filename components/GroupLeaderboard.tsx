"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, Award } from "lucide-react"

interface Score {
  id: string
  userId: string
  game: "ZIP" | "QUEENS"
  points: number
}

interface Member {
  id: string
  user: {
    id: string
    name: string | null
    image: string | null
  }
}

interface Group {
  members: Member[]
  scores: Score[]
}

interface PlayerStats {
  userId: string
  userName: string
  zipScore: number
  queensScore: number
  totalScore: number
}

export function GroupLeaderboard({ group }: { group: Group }) {
  const leaderboard = useMemo(() => {
    const stats: PlayerStats[] = group.members.map((member) => {
      const userScores = group.scores.filter((s) => s.userId === member.user.id)
      const zipScore = userScores
        .filter((s) => s.game === "ZIP")
        .reduce((sum, s) => sum + s.points, 0)
      const queensScore = userScores
        .filter((s) => s.game === "QUEENS")
        .reduce((sum, s) => sum + s.points, 0)

      return {
        userId: member.user.id,
        userName: member.user.name || "Unknown",
        zipScore,
        queensScore,
        totalScore: zipScore + queensScore,
      }
    })

    return stats.sort((a, b) => b.totalScore - a.totalScore)
  }, [group])

  const getMedalIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-500" />
    if (index === 1) return <Medal className="h-5 w-5 text-gray-400" />
    if (index === 2) return <Award className="h-5 w-5 text-amber-600" />
    return null
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Overall Leaderboard</CardTitle>
          <CardDescription>Total points across all games</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((player, index) => (
              <div
                key={player.userId}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  index === 0
                    ? "bg-yellow-50 border border-yellow-200"
                    : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 text-center font-bold text-gray-500">
                    {index < 3 ? getMedalIcon(index) : `#${index + 1}`}
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-lg">
                    {player.userName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{player.userName}</p>
                    <p className="text-sm text-gray-500">
                      Zip: {player.zipScore} | Queens: {player.queensScore}
                    </p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {player.totalScore}
                </div>
              </div>
            ))}
            {leaderboard.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No scores yet. Start playing and add scores!
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Zip Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[...leaderboard]
                .sort((a, b) => b.zipScore - a.zipScore)
                .slice(0, 5)
                .map((player, index) => (
                  <div key={player.userId} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 w-6">#{index + 1}</span>
                      <span className="text-sm font-medium">{player.userName}</span>
                    </div>
                    <span className="font-semibold text-blue-600">{player.zipScore}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Queens Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[...leaderboard]
                .sort((a, b) => b.queensScore - a.queensScore)
                .slice(0, 5)
                .map((player, index) => (
                  <div key={player.userId} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 w-6">#{index + 1}</span>
                      <span className="text-sm font-medium">{player.userName}</span>
                    </div>
                    <span className="font-semibold text-blue-600">{player.queensScore}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

