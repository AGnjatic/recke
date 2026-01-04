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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
            >
              <Image 
                src="/logo.svg" 
                alt="RECKE Logo" 
                width={32} 
                height={32}
                className="sm:w-10 sm:h-10"
              />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-blue-600">RECKE</h1>
                <p className="text-xs text-gray-500 hidden sm:block">LinkedIn Puzzle Tracker</p>
              </div>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline truncate max-w-[120px] sm:max-w-none">
                {user.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-xs sm:text-sm"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {invitations.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Pending Invitations</h2>
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {invitations.map((invitation) => (
                <InvitationCard key={invitation.id} invitation={invitation} />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold">My Groups</h2>
          <Button onClick={() => setCreateGroupOpen(true)} size="sm" className="sm:size-default">
            <Plus className="h-4 w-4 mr-2" />
            <span className="text-sm sm:text-base">Create Group</span>
          </Button>
        </div>

        {groups.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">No Groups Yet</CardTitle>
              <CardDescription className="text-sm">
                Create your first group to start tracking scores with colleagues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setCreateGroupOpen(true)} size="sm" className="sm:size-default">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Group
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        )}
      </div>

      {/* Global Leaderboard Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0" />
            <h2 className="text-xl sm:text-2xl font-semibold">Global Leaderboard</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="global-visibility"
              checked={isOptedIn}
              onCheckedChange={handleVisibilityChange}
            />
            <Label
              htmlFor="global-visibility"
              className="cursor-pointer text-xs sm:text-sm leading-tight"
            >
              Include my scores
            </Label>
          </div>
        </div>

        {globalLeaderboard.length === 0 ? (
          <Card>
            <CardContent className="py-8 sm:py-12">
              <div className="text-center">
                <Globe className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm sm:text-base text-gray-500 mb-4">
                  No players have opted into the global leaderboard yet
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  Check the box above to be the first!
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3 sm:gap-4">
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
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                      {/* Rank */}
                      <div className="w-8 sm:w-12 text-center flex-shrink-0">
                        {index === 0 && (
                          <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 mx-auto" />
                        )}
                        {index === 1 && (
                          <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 mx-auto" />
                        )}
                        {index === 2 && (
                          <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 mx-auto" />
                        )}
                        {index > 2 && (
                          <span className="text-lg sm:text-2xl font-bold text-gray-400">
                            #{index + 1}
                          </span>
                        )}
                      </div>

                      {/* Avatar */}
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg sm:text-2xl flex-shrink-0">
                        {entry.user.name?.charAt(0) || "?"}
                      </div>

                      {/* Player Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                          <p className="text-base sm:text-xl font-semibold truncate">
                            {entry.user.name || "Anonymous"}
                          </p>
                          {user.id === entry.user.id && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-medium flex-shrink-0">
                              You
                            </span>
                          )}
                          {index === 0 && (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-medium flex-shrink-0">
                              🏆 Champ
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                            Zip: {entry.zipScore}
                          </span>
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0"></div>
                            Queens: {entry.queensScore}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Total Score */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl sm:text-4xl font-bold text-blue-600">
                        {entry.totalScore}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 hidden sm:block">Total Points</p>
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
