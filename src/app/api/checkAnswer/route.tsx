import stringComparison from "string-comparison";
import { checkAnswerSchema } from "@/schemas";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { questionId, userAnswer } = checkAnswerSchema.parse(body);

    const question = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });

    if (!question) {
      return NextResponse.json(
        {
          error: "Question not found",
        },
        {
          status: 404,
        },
      );
    }

    await prisma.question.update({
      where: {
        id: questionId,
      },
      data: {
        userAnswer,
      },
    });

    if (question.questionType === "multipleChoice") {
      const isCorrect =
        question.answer.toLowerCase().trim() ===
        userAnswer.toLowerCase().trim();
      await prisma.question.update({
        where: {
          id: questionId,
        },
        data: {
          isCorrect,
        },
      });

      return NextResponse.json(
        {
          isCorrect,
        },
        {
          status: 200,
        },
      );
    } else if (question.questionType === "openEnded") {
      let percentageCorrect = stringComparison.cosine.similarity(
        question.answer.toLowerCase().trim(),
        userAnswer.toLowerCase().trim(),
      );
      percentageCorrect = Math.round(percentageCorrect * 100);
      await prisma.question.update({
        where: {
          id: questionId,
        },
        data: {
          percentageCorrect,
        },
      });

      return NextResponse.json(
        {
          percentageCorrect,
        },
        {
          status: 200,
        },
      );
    }
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
  }
}
