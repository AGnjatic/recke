"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Trophy } from "lucide-react"

interface Group {
  id: string
  name: string
  members: {
    user: {
      id: string
      name: string | null
      email: string | null
      image: string | null
    }
  }[]
  _count: {
    members: number
    scores: number
  }
}

export function GroupCard({ group }: { group: Group }) {
  return (
    <Link href={`/group/${group.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle>{group.name}</CardTitle>
          <CardDescription>
            {group._count.members} {group._count.members === 1 ? "member" : "members"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              <span>{group._count.scores} scores</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

