import axios from "axios";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextAuth";
import { newQuizSchema } from "@/schemas";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

type MultipleChoiceQuestion = {
  question: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
};

type OpenEndedQuestion = {
  question: string;
  answer: string;
};

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json(
        {
          error: "You must be logged in to create a game",
        },
        {
          status: 401,
        },
      );
    }

    const body = await req.json();
    const { amount, topic, type } = newQuizSchema.parse(body);

    const game = await prisma.game.create({
      data: {
        gameType: type,
        timeStarted: new Date(),
        userId: session.user.id,
        topic,
      },
    });

    await prisma.topicCount.upsert({
      where: {
        topic,
      },
      create: {
        topic,
        count: 1,
      },
      update: {
        count: {
          increment: 1,
        },
      },
    });

    const { data } = await axios.post(
      `${process.env.API_URL as string}/api/questions`,
      {
        amount,
        topic,
        type,
      },
    );

    if (type === "multipleChoice") {
      const multipleData = data.questions.map(
        (question: MultipleChoiceQuestion) => {
          const options = [
            question.answer,
            question.option1,
            question.option2,
            question.option3,
          ];
          let shuffledOptions = options.sort(() => Math.random() - 0.5);
          return {
            question: question.question,
            answer: question.answer,
            options: JSON.stringify(shuffledOptions),
            gameId: game.id,
            questionType: "multipleChoice",
          };
        },
      );
      await prisma.question.createMany({
        data: multipleData,
      });
    } else if (type === "openEnded") {
      const openEndedData = data.questions.map(
        (question: OpenEndedQuestion) => {
          return {
            question: question.question,
            answer: question.answer,
            gameId: game.id,
            questionType: "openEnded",
          };
        },
      );
      await prisma.question.createMany({
        data: openEndedData,
      });
    }

    return NextResponse.json({ gameId: game.id }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(
      {
        error,
      },
      {
        status: 500,
      },
    );
  }
}
