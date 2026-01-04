"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { inviteUserToGroup } from "@/app/actions/groups"

export function InviteUserDialog({
  open,
  onOpenChange,
  groupId,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  groupId: string
}) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccessMessage("")

    const formData = new FormData()
    formData.append("groupId", groupId)
    formData.append("email", email)

    const result = await inviteUserToGroup(formData)

    if ("error" in result) {
      setError(result.error)
      setLoading(false)
    } else {
      setSuccessMessage(result.message || "Invitation sent!")
      setEmail("")
      setTimeout(() => {
        setSuccessMessage("")
        onOpenChange(false)
        router.refresh()
      }, 2500)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Invite User</DialogTitle>
            <DialogDescription>
              Enter the email address of the person you want to invite. 
              They'll see the invitation when they sign in (or create an account with this email).
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@example.com"
              required
              className="mt-2"
            />
            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
            {successMessage && (
              <p className="text-sm text-green-600 mt-2">{successMessage}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !!successMessage}>
              {loading ? "Sending..." : successMessage ? "Sent!" : "Send Invitation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

