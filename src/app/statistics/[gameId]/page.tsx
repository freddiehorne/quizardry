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
    include: {
      questions: true,
    },
  });
  if (!game) {
    return redirect("/quiz");
  }

  let accuracy: number = 0;

  if (game.gameType === "multipleChoice") {
    let totalCorrect = game.questions.reduce((acc, question) => {
      if (question.isCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);
    accuracy = (totalCorrect / game.questions.length) * 100;
  } else if (game.gameType === "openEnded") {
    let totalPercentage = game.questions.reduce((acc, question) => {
      return acc + (question.percentageCorrect ?? 0);
    }, 0);
    accuracy = totalPercentage / game.questions.length;
  }
  accuracy = Math.round(accuracy * 100) / 100;

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
          <ResultsCard accuracy={accuracy} />
          <AccuracyCard accuracy={accuracy} />
          <TimeTakenCard
            timeStarted={game.timeStarted}
            timeEnded={game.timeEnded!}
          />
        </div>
        <QuestionsList questions={game.questions} />
      </div>
    </>
  );
}
