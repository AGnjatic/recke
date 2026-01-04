"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { addBulkScores } from "@/app/actions/scores"
import { getDateKey } from "@/lib/utils"
import { Minus, Plus, Save } from "lucide-react"

interface Member {
  id: string
  user: {
    id: string
    name: string | null
  }
}

interface PlayerScores {
  [userId: string]: {
    zip: number
    queens: number
  }
}

export function InlineScoreTracker({
  groupId,
  members,
}: {
  groupId: string
  members: Member[]
}) {
  const router = useRouter()
  const [date, setDate] = useState(getDateKey(new Date()))
  const [scores, setScores] = useState<PlayerScores>(() => {
    const initial: PlayerScores = {}
    members.forEach((m) => {
      initial[m.user.id] = { zip: 0, queens: 0 }
    })
    return initial
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const incrementScore = (userId: string, game: "zip" | "queens") => {
    setScores((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [game]: prev[userId][game] + 1,
      },
    }))
  }

  const decrementScore = (userId: string, game: "zip" | "queens") => {
    setScores((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [game]: Math.max(0, prev[userId][game] - 1),
      },
    }))
  }

  const getTotalScore = (userId: string) => {
    return scores[userId].zip + scores[userId].queens
  }

  const getTopPlayer = () => {
    let topUserId = members[0]?.user.id
    let topScore = 0

    members.forEach((m) => {
      const total = getTotalScore(m.user.id)
      if (total > topScore) {
        topScore = total
        topUserId = m.user.id
      }
    })

    return { userId: topUserId, score: topScore }
  }

  const handleSave = async () => {
    setSaving(true)
    setError("")
    setSuccess(false)

    try {
      // Save ZIP scores
      const zipResult = await addBulkScores({
        groupId,
        game: "ZIP",
        date,
        players: members.map((m) => ({
          userId: m.user.id,
          points: scores[m.user.id].zip,
        })),
      })

      if ("error" in zipResult) {
        setError(zipResult.error || "An error occurred")
        setSaving(false)
        return
      }

      // Save QUEENS scores
      const queensResult = await addBulkScores({
        groupId,
        game: "QUEENS",
        date,
        players: members.map((m) => ({
          userId: m.user.id,
          points: scores[m.user.id].queens,
        })),
      })

      if ("error" in queensResult) {
        setError(queensResult.error || "An error occurred")
        setSaving(false)
        return
      }

      setSuccess(true)
      router.refresh()

      // Reset scores after 1 second
      setTimeout(() => {
        setSuccess(false)
        // Reset to zero
        const resetScores: PlayerScores = {}
        members.forEach((m) => {
          resetScores[m.user.id] = { zip: 0, queens: 0 }
        })
        setScores(resetScores)
      }, 1000)
    } catch (err) {
      setError("Failed to save scores")
      setSaving(false)
    }
  }

  const topPlayer = getTopPlayer()
  const topPlayerName = members.find((m) => m.user.id === topPlayer.userId)?.user.name

  const hasAnyScores = members.some(
    (m) => scores[m.user.id].zip > 0 || scores[m.user.id].queens > 0
  )

  return (
    <div className="space-y-4">
      {/* Winner Banner */}
      {hasAnyScores && topPlayer.score > 0 && (
        <div className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white text-center py-4 rounded-lg font-semibold text-lg">
          🎉 {topPlayerName} is winning overall! 🎉
        </div>
      )}

      {/* Date Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Date</CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </CardContent>
      </Card>

      {/* Score Tracking Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {members.map((member) => (
          <Card key={member.user.id} className={topPlayer.userId === member.user.id && topPlayer.score > 0 ? "border-2 border-purple-400" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {topPlayer.userId === member.user.id && topPlayer.score > 0 && (
                    <span className="text-2xl">👑</span>
                  )}
                  <div>
                    <CardTitle>{member.user.name || "Unknown"}</CardTitle>
                    <p className="text-2xl font-bold text-purple-600 mt-1">
                      {getTotalScore(member.user.id)}
                    </p>
                    <p className="text-xs text-gray-500">Total Score</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* ZIP Score */}
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="font-semibold">ZIP</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => decrementScore(member.user.id, "zip")}
                      disabled={scores[member.user.id].zip === 0}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-2xl font-bold w-12 text-center">
                      {scores[member.user.id].zip}
                    </span>
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() => incrementScore(member.user.id, "zip")}
                      className="h-10 w-10 bg-purple-600 hover:bg-purple-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* QUEENS Score */}
              <div className="bg-pink-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                    <span className="font-semibold">QUEENS</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => decrementScore(member.user.id, "queens")}
                      disabled={scores[member.user.id].queens === 0}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-2xl font-bold w-12 text-center">
                      {scores[member.user.id].queens}
                    </span>
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() => incrementScore(member.user.id, "queens")}
                      className="h-10 w-10 bg-purple-600 hover:bg-purple-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Save Button */}
      {hasAnyScores && (
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-6">
            <Button
              onClick={handleSave}
              disabled={saving || success}
              className="w-full h-12 text-lg bg-purple-600 hover:bg-purple-700"
            >
              {success ? (
                <>✓ Saved!</>
              ) : saving ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Save Scores for {new Date(date).toLocaleDateString()}
                </>
              )}
            </Button>
            {error && <p className="text-sm text-red-600 mt-2 text-center">{error}</p>}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

