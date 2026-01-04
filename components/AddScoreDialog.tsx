"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addBulkScores } from "@/app/actions/scores"
import { getDateKey } from "@/lib/utils"

interface Member {
  id: string
  user: {
    id: string
    name: string | null
  }
}

interface PlayerScore {
  userId: string
  userName: string
  points: number
  time: string
  backtracks: string
}

export function AddScoreDialog({
  open,
  onOpenChange,
  groupId,
  members,
  currentUserId,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  groupId: string
  members: Member[]
  currentUserId: string
}) {
  const [game, setGame] = useState<"ZIP" | "QUEENS">("ZIP")
  const [date, setDate] = useState(getDateKey(new Date()))
  const [playerScores, setPlayerScores] = useState<PlayerScore[]>(
    members.map((m) => ({
      userId: m.user.id,
      userName: m.user.name || "Unknown",
      points: 0,
      time: "",
      backtracks: "",
    }))
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const updatePlayerScore = (userId: string, field: keyof PlayerScore, value: any) => {
    setPlayerScores((prev) =>
      prev.map((ps) =>
        ps.userId === userId ? { ...ps, [field]: value } : ps
      )
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await addBulkScores({
      groupId,
      game,
      date,
      players: playerScores.map((ps) => ({
        userId: ps.userId,
        points: ps.points,
        time: ps.time || undefined,
        backtracks: ps.backtracks ? parseInt(ps.backtracks) : undefined,
      })),
    })

    if ("error" in result) {
      setError(result.error || "An error occurred")
      setLoading(false)
    } else {
      // Reset form
      setPlayerScores(
        members.map((m) => ({
          userId: m.user.id,
          userName: m.user.name || "Unknown",
          points: 0,
          time: "",
          backtracks: "",
        }))
      )
      onOpenChange(false)
      router.refresh()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Game Scores</DialogTitle>
            <DialogDescription>
              Enter scores for all players in this game session
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Game</Label>
                <Select value={game} onValueChange={(v) => setGame(v as "ZIP" | "QUEENS")}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ZIP">Zip</SelectItem>
                    <SelectItem value="QUEENS">Queens</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-semibold">Player Scores</h3>
              {playerScores.map((ps) => (
                <div key={ps.userId} className="grid grid-cols-4 gap-2 items-end">
                  <div>
                    <Label className="text-sm">{ps.userName}</Label>
                  </div>
                  <div>
                    <Label htmlFor={`points-${ps.userId}`} className="text-xs">
                      Points
                    </Label>
                    <Select
                      value={ps.points.toString()}
                      onValueChange={(v) => updatePlayerScore(ps.userId, "points", parseInt(v))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 (Loss)</SelectItem>
                        <SelectItem value="1">1 (Win)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`time-${ps.userId}`} className="text-xs">
                      Time
                    </Label>
                    <Input
                      id={`time-${ps.userId}`}
                      placeholder="e.g., 2:34"
                      value={ps.time}
                      onChange={(e) => updatePlayerScore(ps.userId, "time", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`backtracks-${ps.userId}`} className="text-xs">
                      Backtracks
                    </Label>
                    <Input
                      id={`backtracks-${ps.userId}`}
                      type="number"
                      placeholder="0"
                      value={ps.backtracks}
                      onChange={(e) =>
                        updatePlayerScore(ps.userId, "backtracks", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Scores"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

