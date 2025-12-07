"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface Score {
  id: string
  userId: string
  game: "ZIP" | "QUEENS"
  points: number
  date: Date
}

interface Member {
  id: string
  user: {
    id: string
    name: string | null
  }
}

const COLORS = [
  "#3b82f6", // blue
  "#ef4444", // red
  "#10b981", // green
  "#f59e0b", // amber
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#14b8a6", // teal
  "#f97316", // orange
]

export function TrendChart({
  scores,
  members,
}: {
  scores: Score[]
  members: Member[]
}) {
  const chartData = useMemo(() => {
    // Get last 30 days
    const days = 30
    const today = new Date()
    const startDate = new Date(today)
    startDate.setDate(startDate.getDate() - days)

    // Initialize cumulative scores for each user
    const userScores: Record<string, number> = {}
    members.forEach((m) => {
      userScores[m.user.id] = 0
    })

    // Generate date range
    const dateRange: Date[] = []
    for (let i = 0; i <= days; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      dateRange.push(date)
    }

    // Sort scores by date
    const sortedScores = [...scores].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    // Build cumulative data for each date
    const data = dateRange.map((date) => {
      const dateKey = date.toISOString().split("T")[0]
      
      // Add scores for this date
      sortedScores.forEach((score) => {
        const scoreDate = new Date(score.date).toISOString().split("T")[0]
        if (scoreDate === dateKey) {
          userScores[score.userId] += score.points
        }
      })

      const dataPoint: any = {
        date: dateKey,
        dateDisplay: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      }

      // Add each user's cumulative score
      members.forEach((m) => {
        dataPoint[m.user.id] = userScores[m.user.id]
      })

      return dataPoint
    })

    return data
  }, [scores, members])

  // Calculate lead differences
  const leadAnalysis = useMemo(() => {
    if (members.length !== 2 || chartData.length === 0) return null

    const lastData = chartData[chartData.length - 1]
    const firstData = chartData[0]
    
    const player1Id = members[0].user.id
    const player2Id = members[1].user.id
    
    const currentLead = lastData[player1Id] - lastData[player2Id]
    const previousLead = firstData[player1Id] - firstData[player2Id]
    
    const leader = currentLead > 0 ? members[0].user.name : members[1].user.name
    const leadAmount = Math.abs(currentLead)
    const trendDirection = Math.abs(currentLead) < Math.abs(previousLead) ? "narrowing" : "widening"

    return { leader, leadAmount, trendDirection }
  }, [members, chartData])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Score Trends (Last 30 Days)</CardTitle>
          <CardDescription>
            Cumulative score progression over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="dateDisplay"
                tick={{ fontSize: 12 }}
                interval={Math.floor(chartData.length / 10)}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              {members.map((member, index) => (
                <Line
                  key={member.user.id}
                  type="monotone"
                  dataKey={member.user.id}
                  name={member.user.name || "Unknown"}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {leadAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle>Lead Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-lg">
                <span className="font-semibold">{leadAnalysis.leader}</span> is currently
                leading by{" "}
                <span className="font-semibold text-blue-600">
                  {leadAnalysis.leadAmount} point{leadAnalysis.leadAmount !== 1 ? "s" : ""}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                The lead gap is{" "}
                <span
                  className={
                    leadAnalysis.trendDirection === "narrowing"
                      ? "text-orange-600 font-medium"
                      : "text-green-600 font-medium"
                  }
                >
                  {leadAnalysis.trendDirection}
                </span>{" "}
                over the last 30 days
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

