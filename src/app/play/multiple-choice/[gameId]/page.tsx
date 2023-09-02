import MultipleChoice from "@/components/multipleChoice";
import { getAuthSession } from "@/lib/nextAuth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

type Props = {
  params: {
    gameId: string;
  };
};

export const metadata = {
  title: "Quizardry | Multiple Choice Game",
};

export default async function MultipleChoicePage({
  params: { gameId },
}: Props) {
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
          options: true,
        },
      },
    },
  });

  if (!game || game.gameType !== "multipleChoice") {
    return redirect("/");
  }

  if (!session?.user) {
    return redirect("/");
  }
  return <MultipleChoice game={game} />;
}
