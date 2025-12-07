"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CreateGroupDialog } from "@/components/CreateGroupDialog";
import { InvitationCard } from "@/components/InvitationCard";
import { GroupCard } from "@/components/GroupCard";
import { updateGlobalVisibility } from "@/app/actions/groups";
import { LogOut, Plus, Trophy, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface Group {
  id: string;
  name: string;
  members: {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
    };
  }[];
  _count: {
    members: number;
    scores: number;
  };
}

interface Invitation {
  id: string;
  group: {
    id: string;
    name: string;
  };
  sender: {
    name: string | null;
  };
}

interface LeaderboardEntry {
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  zipScore: number;
  queensScore: number;
  totalScore: number;
}

export function DashboardClient({
  user,
  groups,
  invitations,
  globalLeaderboard,
  showInGlobal,
}: {
  user: User;
  groups: Group[];
  invitations: Invitation[];
  globalLeaderboard: LeaderboardEntry[];
  showInGlobal: boolean;
}) {
  const router = useRouter();
  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const [isOptedIn, setIsOptedIn] = useState(showInGlobal);

  const handleVisibilityChange = async (checked: boolean) => {
    setIsOptedIn(checked);
    await updateGlobalVisibility(checked);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Image src="/logo.svg" alt="RECKE Logo" width={40} height={40} />
              <div>
                <h1 className="text-2xl font-bold text-blue-600">RECKE</h1>
                <p className="text-xs text-gray-500">LinkedIn Puzzle Tracker</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.name}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {invitations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Pending Invitations</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {invitations.map((invitation) => (
                <InvitationCard key={invitation.id} invitation={invitation} />
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">My Groups</h2>
          <Button onClick={() => setCreateGroupOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </Button>
        </div>

        {groups.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Groups Yet</CardTitle>
              <CardDescription>
                Create your first group to start tracking scores with colleagues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setCreateGroupOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Group
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        )}
      </div>

      {/* Global Leaderboard Section */}
      <div className="container mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Globe className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-semibold">Global Leaderboard</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="global-visibility"
              checked={isOptedIn}
              onCheckedChange={handleVisibilityChange}
            />
            <Label
              htmlFor="global-visibility"
              className="cursor-pointer text-sm"
            >
              Include my scores in global leaderboard
            </Label>
          </div>
        </div>

        {globalLeaderboard.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  No players have opted into the global leaderboard yet
                </p>
                <p className="text-sm text-gray-400">
                  Check the box above to be the first!
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {globalLeaderboard.map((entry, index) => (
              <Card
                key={entry.user.id}
                className={`${
                  index === 0
                    ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 border-2"
                    : index === 1
                    ? "bg-gray-50 border-gray-200"
                    : index === 2
                    ? "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200"
                    : ""
                } ${user.id === entry.user.id ? "ring-2 ring-blue-500" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div className="w-12 text-center">
                        {index === 0 && (
                          <Trophy className="h-8 w-8 text-yellow-500 mx-auto" />
                        )}
                        {index === 1 && (
                          <Trophy className="h-8 w-8 text-gray-400 mx-auto" />
                        )}
                        {index === 2 && (
                          <Trophy className="h-8 w-8 text-amber-600 mx-auto" />
                        )}
                        {index > 2 && (
                          <span className="text-2xl font-bold text-gray-400">
                            #{index + 1}
                          </span>
                        )}
                      </div>

                      {/* Avatar */}
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-2xl">
                        {entry.user.name?.charAt(0) || "?"}
                      </div>

                      {/* Player Info */}
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xl font-semibold">
                            {entry.user.name || "Anonymous"}
                          </p>
                          {user.id === entry.user.id && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
                              You
                            </span>
                          )}
                          {index === 0 && (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-medium">
                              🏆 Champion
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            Zip: {entry.zipScore}
                          </span>
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                            Queens: {entry.queensScore}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Total Score */}
                    <div className="text-right">
                      <p className="text-4xl font-bold text-blue-600">
                        {entry.totalScore}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Total Points</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <CreateGroupDialog
        open={createGroupOpen}
        onOpenChange={setCreateGroupOpen}
      />
    </div>
  );
}
