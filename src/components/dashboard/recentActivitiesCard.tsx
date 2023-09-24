import { getAuthSession } from "@/lib/nextAuth";
import HistoryComponent from "../historyComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export default async function RecentActivitiesCard() {
  const session = await getAuthSession();

  const gamesCount = prisma.game.count({
    where: {
      userId: session?.user.id,
    },
  });

  if (!session?.user) {
    return redirect("/");
  }
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recent Activities</CardTitle>
        <CardDescription>
          You have played a total of {gamesCount}{" "}
          {(await gamesCount) === 1 ? "game" : "games"}
        </CardDescription>
      </CardHeader>

      <CardContent className="max-h-[580px] overflow-scroll">
        <HistoryComponent limit={10} userId={session.user.id} />
      </CardContent>
    </Card>
  );
}
