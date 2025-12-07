"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Globe, Trophy } from "lucide-react"
import { getGlobalLeaderboard } from "@/app/actions/scores"
import { updateGlobalVisibility } from "@/app/actions/groups"
import { prisma } from "@/lib/prisma"

interface LeaderboardEntry {
  user: {
    id: string
    name: string | null
    image: string | null
  }
  zipScore: number
  queensScore: number
  totalScore: number
}

export function GlobalLeaderboardDialog() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [showInGlobal, setShowInGlobal] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      loadLeaderboard()
    }
  }, [open])

  const loadLeaderboard = async () => {
    setLoading(true)
    const result = await getGlobalLeaderboard()
    if ("leaderboard" in result) {
      setLeaderboard(result.leaderboard)
    }
    setLoading(false)
  }

  const handleVisibilityChange = async (checked: boolean) => {
    setShowInGlobal(checked)
    await updateGlobalVisibility(checked)
    await loadLeaderboard()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Globe className="h-4 w-4 mr-2" />
          Global Leaderboard
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Global Leaderboard</DialogTitle>
          <DialogDescription>
            See how you rank against all players worldwide
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2 py-4 border-b">
          <Checkbox
            id="global-visibility"
            checked={showInGlobal}
            onCheckedChange={handleVisibilityChange}
          />
          <Label htmlFor="global-visibility" className="cursor-pointer">
            Include my scores in global leaderboard
          </Label>
        </div>

        <div className="space-y-3">
          {loading ? (
            <p className="text-center text-gray-500 py-8">Loading...</p>
          ) : leaderboard.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No players have opted into the global leaderboard yet
            </p>
          ) : (
            leaderboard.map((entry, index) => (
              <div
                key={entry.user.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  index === 0
                    ? "bg-yellow-50 border border-yellow-200"
                    : index === 1
                    ? "bg-gray-50 border border-gray-200"
                    : index === 2
                    ? "bg-amber-50 border border-amber-200"
                    : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 text-center font-bold text-gray-500">
                    {index === 0 && <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />}
                    {index === 1 && <Trophy className="h-5 w-5 text-gray-400 mx-auto" />}
                    {index === 2 && <Trophy className="h-5 w-5 text-amber-600 mx-auto" />}
                    {index > 2 && `#${index + 1}`}
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-lg">
                    {entry.user.name?.charAt(0) || "?"}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {entry.user.name || "Anonymous"}
                      {session?.user?.id === entry.user.id && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          You
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">
                      Zip: {entry.zipScore} | Queens: {entry.queensScore}
                    </p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {entry.totalScore}
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

