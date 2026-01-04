import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getMyGroups, getPendingInvitations } from "@/app/actions/groups";
import { getGlobalLeaderboard } from "@/app/actions/scores";
import { prisma } from "@/lib/prisma";
import { DashboardClient } from "./DashboardClient";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const [groupsResult, invitationsResult, leaderboardResult, currentUser] =
    await Promise.all([
      getMyGroups(),
      getPendingInvitations(),
      getGlobalLeaderboard(),
      prisma.user.findUnique({
        where: { id: session.user.id },
        select: { showInGlobal: true },
      }),
    ]);

  const groups = "groups" in groupsResult ? groupsResult.groups : undefined;
  const invitations =
    "invitations" in invitationsResult
      ? invitationsResult.invitations
      : undefined;
  const globalLeaderboard =
    "leaderboard" in leaderboardResult
      ? leaderboardResult.leaderboard
      : undefined;

  return (
    <DashboardClient
      user={session.user}
      groups={groups || []}
      invitations={invitations || []}
      globalLeaderboard={globalLeaderboard || []}
      showInGlobal={currentUser?.showInGlobal || false}
    />
  );
}
