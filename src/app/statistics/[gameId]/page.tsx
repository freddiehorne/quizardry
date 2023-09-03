import TimeTakenCard from "@/components/statistics/timeTakenCard";
import QuestionsList from "@/components/statistics/questionsList";
import AccuracyCard from "@/components/statistics/accuracyCard";
import ResultsCard from "@/components/statistics/resultsCard";
import Link from "next/link";
import { LucideLayoutDashboard } from "lucide-react";
import { getAuthSession } from "@/lib/nextAuth";
import { buttonVariants } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

type Props = {
  params: { gameId: string };
};

export default async function StatisticsPage({ params: { gameId } }: Props) {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
  });
  if (!game) {
    return redirect("/");
  }

  return (
    <>
      <div className="mx-auto max-w-7xl p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Statistics</h2>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard" className={buttonVariants()}>
              <LucideLayoutDashboard className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-7">
          <ResultsCard accuracy={35} />
          <AccuracyCard accuracy={35} />
          <TimeTakenCard timeStarted={new Date()} timeEnded={new Date()} />
        </div>
        <QuestionsList />
      </div>
    </>
  );
}
