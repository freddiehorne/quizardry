import { prisma } from "@/lib/db";
import { Clock, CopyCheck, Edit2 } from "lucide-react";
import Link from "next/link";

export default async function HistoryComponent({
  limit,
  userId,
}: {
  limit: number;
  userId: string;
}) {
  const games = prisma.game.findMany({
    where: {
      userId,
    },
    take: limit,
    orderBy: {
      timeStarted: "desc",
    },
  });
  return (
    <div className="space-y-8">
      {(await games).map(({ id, gameType, topic, timeEnded }) => (
        <div className="flex items-center justify-between" key={id}>
          <div className="flex items-center">
            {gameType === "multipleChoice" && <CopyCheck className="mr-3" />}
            {gameType === "openEnded" && <Edit2 className="mr-3" />}
            <div className="ml-4 space-y-1">
              <Link
                href={`/statistics/${id}`}
                className="font-medium leading-none underline"
              >
                {topic}
              </Link>
              <p className="flex w-fit items-center rounded-lg bg-slate-800 px-2 py-1 text-xs text-white">
                <Clock className="mr-1 h-4 w-4" />
                {new Date(timeEnded ?? 0).toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground">
                {gameType === "multipleChoice" && "Multiple Choice"}
                {gameType === "openEnded" && "Open Ended"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
