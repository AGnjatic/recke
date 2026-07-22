"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
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

type RangePreset = "30d" | "ytd" | "all"

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

const RANGE_PRESETS: { id: RangePreset; label: string }[] = [
  { id: "30d", label: "30d" },
  { id: "ytd", label: "YTD" },
  { id: "all", label: "All time" },
]

function toScoreDateKey(date: Date): string {
  // Prisma @db.Date values are UTC midnight for the calendar day
  return new Date(date).toISOString().split("T")[0]
}

function toLocalDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function parseDateKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number)
  return new Date(y, m - 1, d)
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function daysBetween(start: Date, end: Date): number {
  const ms = startOfLocalDay(end).getTime() - startOfLocalDay(start).getTime()
  return Math.round(ms / (1000 * 60 * 60 * 24))
}

function rangeLabel(preset: RangePreset): string {
  switch (preset) {
    case "30d":
      return "last 30 days"
    case "ytd":
      return "year to date"
    case "all":
      return "all time"
  }
}

function resolveDateRange(
  scores: Score[],
  preset: RangePreset
): { startDate: Date; endDate: Date } | null {
  // Calendar-day string compare; scores are keyed as UTC YYYY-MM-DD from @db.Date
  const todayKey = toLocalDateKey(new Date())
  const pastKeys = scores
    .map((s) => toScoreDateKey(s.date))
    .filter((key) => key <= todayKey)

  if (pastKeys.length === 0) {
    return null
  }

  pastKeys.sort()
  const endDate = parseDateKey(pastKeys[pastKeys.length - 1])
  const earliest = parseDateKey(pastKeys[0])

  let startDate: Date
  if (preset === "30d") {
    // Inclusive 30-day window: endDate and the 29 days before it
    startDate = addDays(endDate, -29)
  } else if (preset === "ytd") {
    startDate = new Date(parseDateKey(todayKey).getFullYear(), 0, 1)
  } else {
    startDate = earliest
  }

  if (startDate > endDate) {
    return null
  }

  return { startDate, endDate }
}

export function TrendChart({
  scores,
  members,
}: {
  scores: Score[]
  members: Member[]
}) {
  const [activeTab, setActiveTab] = useState("total")
  const [rangePreset, setRangePreset] = useState<RangePreset>("30d")

  const chartData = useMemo(() => {
    const range = resolveDateRange(scores, rangePreset)
    if (!range) {
      return { total: [] as any[], zip: [] as any[], queens: [] as any[] }
    }

    const { startDate, endDate } = range
    const dayCount = daysBetween(startDate, endDate)

    const userTotalScores: Record<string, number> = {}
    const userZipScores: Record<string, number> = {}
    const userQueensScores: Record<string, number> = {}

    members.forEach((m) => {
      userTotalScores[m.user.id] = 0
      userZipScores[m.user.id] = 0
      userQueensScores[m.user.id] = 0
    })

    const dateRange: Date[] = []
    for (let i = 0; i <= dayCount; i++) {
      dateRange.push(addDays(startDate, i))
    }

    const sortedScores = [...scores].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    const data = dateRange.map((date) => {
      const dateKey = toLocalDateKey(date)

      sortedScores.forEach((score) => {
        const scoreDate = toScoreDateKey(score.date)
        if (scoreDate === dateKey) {
          userTotalScores[score.userId] += score.points
          if (score.game === "ZIP") {
            userZipScores[score.userId] += score.points
          } else if (score.game === "QUEENS") {
            userQueensScores[score.userId] += score.points
          }
        }
      })

      const totalData: Record<string, string | number> = {
        date: dateKey,
        dateDisplay: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      }

      const zipData: Record<string, string | number> = { ...totalData }
      const queensData: Record<string, string | number> = { ...totalData }

      members.forEach((m) => {
        totalData[m.user.id] = userTotalScores[m.user.id]
        zipData[m.user.id] = userZipScores[m.user.id]
        queensData[m.user.id] = userQueensScores[m.user.id]
      })

      return { total: totalData, zip: zipData, queens: queensData }
    })

    return {
      total: data.map((d) => d.total),
      zip: data.map((d) => d.zip),
      queens: data.map((d) => d.queens),
    }
  }, [scores, members, rangePreset])

  const getPeriodGains = (data: Record<string, string | number>[]) => {
    if (data.length === 0) return []

    // Cumulative series starts at 0 before the range, so end value is the period gain.
    const last = data[data.length - 1]

    return members
      .map((member, index) => {
        const id = member.user.id
        return {
          id,
          name: member.user.name || "Unknown",
          delta: Number(last[id] ?? 0),
          color: COLORS[index % COLORS.length],
        }
      })
      .sort((a, b) => b.delta - a.delta)
  }

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

  const rangeDescription = rangeLabel(rangePreset)

  const renderChart = (data: any[], title: string, description: string) => {
    if (data.length === 0 || data.every((d) => members.every((m) => d[m.user.id] === 0))) {
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

    const periodGains = getPeriodGains(data)

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6 space-y-4">
          <ResponsiveContainer width="100%" height={300} className="sm:h-[400px]">
            <LineChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="dateDisplay"
                tick={{ fontSize: 10, fill: "#666" }}
                tickMargin={8}
                interval="preserveStartEnd"
                minTickGap={30}
                className="text-xs sm:text-sm"
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#666" }}
                tickMargin={5}
                width={35}
                className="text-xs sm:text-sm"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
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

          {periodGains.length > 0 && (
            <div className="border-t pt-3">
              <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Period gains ({rangeDescription})
              </p>
              <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                {periodGains.map((gain) => (
                  <li
                    key={gain.id}
                    className="text-xs sm:text-sm flex items-center gap-1.5"
                  >
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: gain.color }}
                    />
                    <span className="text-gray-700">{gain.name}</span>
                    <span
                      className={cn(
                        "font-semibold",
                        gain.delta > 0
                          ? "text-emerald-600"
                          : gain.delta < 0
                            ? "text-red-600"
                            : "text-gray-500"
                      )}
                    >
                      {gain.delta > 0 ? "+" : ""}
                      {gain.delta}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-wrap gap-2">
        {RANGE_PRESETS.map((preset) => (
          <Button
            key={preset.id}
            type="button"
            size="sm"
            variant={rangePreset === preset.id ? "default" : "outline"}
            onClick={() => setRangePreset(preset.id)}
            className="text-xs sm:text-sm"
          >
            {preset.label}
          </Button>
        ))}
      </div>

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
            `Combined Zip and Queens scores · ${rangeDescription}`
          )}
        </TabsContent>

        <TabsContent value="zip" className="mt-0">
          {renderChart(
            chartData.zip,
            "Zip Score Trends",
            `Zip game scores · ${rangeDescription}`
          )}
        </TabsContent>

        <TabsContent value="queens" className="mt-0">
          {renderChart(
            chartData.queens,
            "Queens Score Trends",
            `Queens game scores · ${rangeDescription}`
          )}
        </TabsContent>
      </Tabs>

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

    const dataToAnalyze =
      activeGame === "total"
        ? allData.total
        : activeGame === "zip"
          ? allData.zip
          : allData.queens

    const lastData = dataToAnalyze[dataToAnalyze.length - 1]
    // Midpoint vs end — first point is near zero for both players after range reset
    const midData = dataToAnalyze[Math.floor((dataToAnalyze.length - 1) / 2)]

    const player1Id = members[0].user.id
    const player2Id = members[1].user.id

    const currentLead = lastData[player1Id] - lastData[player2Id]
    const previousLead = midData[player1Id] - midData[player2Id]

    const leader = currentLead > 0 ? members[0].user.name : members[1].user.name
    const leadAmount = Math.abs(currentLead)
    const trendDirection =
      Math.abs(currentLead) < Math.abs(previousLead) ? "narrowing" : "widening"
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
        <span className="text-gray-600">in {analysis.gameLabel} scores</span>
      </div>
    </div>
  )
}
