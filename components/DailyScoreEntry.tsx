"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { addDailyScores } from "@/app/actions/scores"
import { getDateKey } from "@/lib/utils"
import { Calendar, Save, Zap, Crown } from "lucide-react"

interface Member {
  id: string
  user: {
    id: string
    name: string | null
  }
}

export function DailyScoreEntry({
  groupId,
  members,
}: {
  groupId: string
  members: Member[]
}) {
  const router = useRouter()
  const [date, setDate] = useState(getDateKey(new Date()))
  const [zipWinners, setZipWinners] = useState<Set<string>>(new Set())
  const [queensWinners, setQueensWinners] = useState<Set<string>>(new Set())
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const toggleZipWinner = (userId: string) => {
    setZipWinners((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(userId)) {
        newSet.delete(userId)
      } else {
        newSet.add(userId)
      }
      return newSet
    })
  }

  const toggleQueensWinner = (userId: string) => {
    setQueensWinners((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(userId)) {
        newSet.delete(userId)
      } else {
        newSet.add(userId)
      }
      return newSet
    })
  }

  const handleSubmit = async () => {
    if (zipWinners.size === 0 && queensWinners.size === 0) {
      setError("Please select at least one winner")
      return
    }

    setSaving(true)
    setError("")
    setSuccess(false)

    // Build the scores array
    const scores = []

    // Add Zip scores
    for (const userId of Array.from(zipWinners)) {
      scores.push({
        userId,
        game: "ZIP" as const,
        points: 1,
        date,
      })
    }

    // Add Queens scores
    for (const userId of Array.from(queensWinners)) {
      scores.push({
        userId,
        game: "QUEENS" as const,
        points: 1,
        date,
      })
    }

    const result = await addDailyScores({
      groupId,
      scores,
    })

    if ("error" in result) {
      setError(result.error || "An error occurred")
      setSaving(false)
    } else {
      setSuccess(true)
      setZipWinners(new Set())
      setQueensWinners(new Set())
      setTimeout(() => {
        setSuccess(false)
        router.refresh()
      }, 2000)
      setSaving(false)
    }
  }

  const handleReset = () => {
    setZipWinners(new Set())
    setQueensWinners(new Set())
    setError("")
    setSuccess(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <CardTitle className="text-lg sm:text-xl">Daily Score Entry</CardTitle>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-auto text-sm"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-blue-800">
              ✨ <strong>Quick Entry:</strong> Select the winner(s) for each game. 
              Multiple winners for ties are allowed. Each winner gets 1 point.
            </p>
          </div>

          {/* Game Selection Grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Zip Winners */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-yellow-400">
                <Zap className="h-5 w-5 text-yellow-600" />
                <Label className="text-base sm:text-lg font-semibold text-gray-900">
                  Zip Winners
                </Label>
                {zipWinners.size > 0 && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                    {zipWinners.size}
                  </span>
                )}
              </div>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {members.map((member) => (
                  <div
                    key={`zip-${member.user.id}`}
                    className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                      zipWinners.has(member.user.id)
                        ? "bg-yellow-50 border border-yellow-200"
                        : "hover:bg-gray-50 border border-transparent"
                    }`}
                  >
                    <Checkbox
                      id={`zip-${member.user.id}`}
                      checked={zipWinners.has(member.user.id)}
                      onCheckedChange={() => toggleZipWinner(member.user.id)}
                    />
                    <label
                      htmlFor={`zip-${member.user.id}`}
                      className="flex-1 text-sm font-medium cursor-pointer"
                    >
                      {member.user.name || "Unknown"}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Queens Winners */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-pink-400">
                <Crown className="h-5 w-5 text-pink-600" />
                <Label className="text-base sm:text-lg font-semibold text-gray-900">
                  Queens Winners
                </Label>
                {queensWinners.size > 0 && (
                  <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-medium">
                    {queensWinners.size}
                  </span>
                )}
              </div>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {members.map((member) => (
                  <div
                    key={`queens-${member.user.id}`}
                    className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                      queensWinners.has(member.user.id)
                        ? "bg-pink-50 border border-pink-200"
                        : "hover:bg-gray-50 border border-transparent"
                    }`}
                  >
                    <Checkbox
                      id={`queens-${member.user.id}`}
                      checked={queensWinners.has(member.user.id)}
                      onCheckedChange={() => toggleQueensWinner(member.user.id)}
                    />
                    <label
                      htmlFor={`queens-${member.user.id}`}
                      className="flex-1 text-sm font-medium cursor-pointer"
                    >
                      {member.user.name || "Unknown"}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          {(zipWinners.size > 0 || queensWinners.size > 0) && (
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
              <p className="text-sm text-gray-700">
                <strong>Summary:</strong>{" "}
                {zipWinners.size > 0 && (
                  <span>
                    <strong className="text-yellow-700">{zipWinners.size}</strong> Zip winner
                    {zipWinners.size !== 1 ? "s" : ""}
                  </span>
                )}
                {zipWinners.size > 0 && queensWinners.size > 0 && <span> • </span>}
                {queensWinners.size > 0 && (
                  <span>
                    <strong className="text-pink-700">{queensWinners.size}</strong> Queens winner
                    {queensWinners.size !== 1 ? "s" : ""}
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              ✅ Scores saved successfully!
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            <Button
              onClick={handleSubmit}
              disabled={saving || (zipWinners.size === 0 && queensWinners.size === 0)}
              className="flex-1 sm:flex-initial"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save Scores"}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              disabled={saving}
              className="flex-1 sm:flex-initial"
            >
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

