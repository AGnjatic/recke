"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  const [activeTab, setActiveTab] = useState("total")

  const chartData = useMemo(() => {
    const days = 30
    const today = new Date()
    const startDate = new Date(today)
    startDate.setDate(startDate.getDate() - days)

    // Initialize cumulative scores for each user by game type
    const userTotalScores: Record<string, number> = {}
    const userZipScores: Record<string, number> = {}
    const userQueensScores: Record<string, number> = {}
    
    members.forEach((m) => {
      userTotalScores[m.user.id] = 0
      userZipScores[m.user.id] = 0
      userQueensScores[m.user.id] = 0
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
          userTotalScores[score.userId] += score.points
          if (score.game === "ZIP") {
            userZipScores[score.userId] += score.points
          } else if (score.game === "QUEENS") {
            userQueensScores[score.userId] += score.points
          }
        }
      })

      const totalData: any = {
        date: dateKey,
        dateDisplay: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      }

      const zipData: any = { ...totalData }
      const queensData: any = { ...totalData }

      // Add each user's cumulative scores
      members.forEach((m) => {
        totalData[m.user.id] = userTotalScores[m.user.id]
        zipData[m.user.id] = userZipScores[m.user.id]
        queensData[m.user.id] = userQueensScores[m.user.id]
      })

      return { total: totalData, zip: zipData, queens: queensData }
    })

    return {
      total: data.map(d => d.total),
      zip: data.map(d => d.zip),
      queens: data.map(d => d.queens),
    }
  }, [scores, members])

  // Custom tooltip for better mobile experience
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
          <p className="text-sm font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-semibold">{entry.value} pts</span>
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const renderChart = (data: any[], title: string, description: string) => {
    if (data.length === 0 || data.every(d => members.every(m => d[m.user.id] === 0))) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </CardHeader>
          <CardContent className="py-12">
            <p className="text-center text-gray-500 text-sm">
              No data available yet. Start tracking scores to see trends!
            </p>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <ResponsiveContainer width="100%" height={300} className="sm:h-[400px]">
            <LineChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="dateDisplay"
                tick={{ fontSize: 10, fill: '#666' }}
                tickMargin={8}
                interval="preserveStartEnd"
                minTickGap={30}
                className="text-xs sm:text-sm"
              />
              <YAxis 
                tick={{ fontSize: 10, fill: '#666' }}
                tickMargin={5}
                width={35}
                className="text-xs sm:text-sm"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                iconSize={12}
              />
              {members.map((member, index) => (
                <Line
                  key={member.user.id}
                  type="monotone"
                  dataKey={member.user.id}
                  name={member.user.name || "Unknown"}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={2.5}
                  dot={{ r: 2, strokeWidth: 2 }}
                  activeDot={{ r: 5 }}
                  animationDuration={500}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6">
          <TabsTrigger value="total" className="text-xs sm:text-sm">
            📊 Total
          </TabsTrigger>
          <TabsTrigger value="zip" className="text-xs sm:text-sm">
            ⚡ Zip
          </TabsTrigger>
          <TabsTrigger value="queens" className="text-xs sm:text-sm">
            👑 Queens
          </TabsTrigger>
        </TabsList>

        <TabsContent value="total" className="mt-0">
          {renderChart(
            chartData.total,
            "Total Score Trends",
            "Combined Zip and Queens scores over the last 30 days"
          )}
        </TabsContent>

        <TabsContent value="zip" className="mt-0">
          {renderChart(
            chartData.zip,
            "Zip Score Trends",
            "Zip game scores over the last 30 days"
          )}
        </TabsContent>

        <TabsContent value="queens" className="mt-0">
          {renderChart(
            chartData.queens,
            "Queens Score Trends",
            "Queens game scores over the last 30 days"
          )}
        </TabsContent>
      </Tabs>

      {/* Lead Analysis - Show for 2 players only */}
      {members.length === 2 && chartData.total.length > 0 && (
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              🎯 Lead Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LeadAnalysis
              chartData={chartData.total}
              members={members}
              activeGame={activeTab}
              allData={chartData}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Separate component for lead analysis
function LeadAnalysis({
  chartData,
  members,
  activeGame,
  allData,
}: {
  chartData: any[]
  members: Member[]
  activeGame: string
  allData: any
}) {
  const analysis = useMemo(() => {
    if (members.length !== 2 || chartData.length === 0) return null

    const dataToAnalyze = activeGame === "total" ? allData.total : 
                          activeGame === "zip" ? allData.zip : allData.queens

    const lastData = dataToAnalyze[dataToAnalyze.length - 1]
    const firstData = dataToAnalyze[0]
    
    const player1Id = members[0].user.id
    const player2Id = members[1].user.id
    
    const currentLead = lastData[player1Id] - lastData[player2Id]
    const previousLead = firstData[player1Id] - firstData[player2Id]
    
    const leader = currentLead > 0 ? members[0].user.name : members[1].user.name
    const leadAmount = Math.abs(currentLead)
    const trendDirection = Math.abs(currentLead) < Math.abs(previousLead) ? "narrowing" : "widening"
    const gameLabel = activeGame === "total" ? "overall" : activeGame

    return { leader, leadAmount, trendDirection, gameLabel }
  }, [members, chartData, activeGame, allData])

  if (!analysis) return null

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base sm:text-lg font-semibold text-gray-900">
            {analysis.leader}
          </span>
          <span className="text-sm sm:text-base text-gray-600">is leading by</span>
          <span className="text-lg sm:text-xl font-bold text-blue-600">
            {analysis.leadAmount}
          </span>
          <span className="text-sm sm:text-base text-gray-600">
            point{analysis.leadAmount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <span className="text-gray-600">The lead gap is</span>
        <span
          className={`font-semibold px-2 py-0.5 rounded ${
            analysis.trendDirection === "narrowing"
              ? "bg-orange-100 text-orange-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {analysis.trendDirection}
        </span>
        <span className="text-gray-600">
          in {analysis.gameLabel} scores
        </span>
      </div>
    </div>
  )
}

