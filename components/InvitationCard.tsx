"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { acceptInvitation, declineInvitation } from "@/app/actions/groups"
import { Check, X } from "lucide-react"

interface Invitation {
  id: string
  group: {
    id: string
    name: string
  }
  sender: {
    name: string | null
  }
}

export function InvitationCard({ invitation }: { invitation: Invitation }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleAccept = async () => {
    setLoading(true)
    await acceptInvitation(invitation.id)
    router.refresh()
  }

  const handleDecline = async () => {
    setLoading(true)
    await declineInvitation(invitation.id)
    router.refresh()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{invitation.group.name}</CardTitle>
        <CardDescription>
          Invited by {invitation.sender.name || "a colleague"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={handleAccept}
            disabled={loading}
            className="flex-1"
          >
            <Check className="h-4 w-4 mr-1" />
            Accept
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDecline}
            disabled={loading}
            className="flex-1"
          >
            <X className="h-4 w-4 mr-1" />
            Decline
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

