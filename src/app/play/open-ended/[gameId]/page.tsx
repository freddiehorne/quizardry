import OpenEnded from "@/components/openEnded";
import { getAuthSession } from "@/lib/nextAuth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

type Props = {
  params: {
    gameId: string;
  };
};

export const metadata = {
  title: "Quizardry | Open Ended Game",
};

export default async function OpenEndedPage({ params: { gameId } }: Props) {
  const session = await getAuthSession();

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          answer: true,
        },
      },
    },
  });

  if (!game || game.gameType !== "openEnded") {
    return redirect("/");
  }

  if (!session?.user) {
    return redirect("/");
  }
  return <OpenEnded game={game} />;
}
