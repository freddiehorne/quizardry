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

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "You must be logged in",
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

    const { data } = await axios.post(`${process.env.API_URL}/api/questions`, {
      amount,
      topic,
      type,
    });

    if (type === "multipleChoice") {
      let multipleData = data.map((question: MultipleChoiceQuestion) => {
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
      });
      await prisma.question.createMany({
        data: multipleData,
      });
    } else if (type === "openEnded") {
      let openEndedData = data.map((question: OpenEndedQuestion) => {
        return {
          question: question.question,
          answer: question.answer,
          gameId: game.id,
          questionType: "openEnded",
        };
      });
      await prisma.question.createMany({
        data: openEndedData,
      });
    }

    return NextResponse.json({ gameId: game.id });
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
    return NextResponse.json({
      error: "Something went wrong",
    });
  }
}
