"use client";

import BlankAnswerInput from "./blankAnswerInput";
import axios from "axios";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useState, useMemo, useCallback, useEffect } from "react";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { Button, buttonVariants } from "./ui/button";
import { differenceInSeconds } from "date-fns";
import { checkAnswerSchema } from "@/schemas";
import { Game, Question } from "@prisma/client";
import { cn, formatTime } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { z } from "zod";
import {
  BarChart,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Timer,
} from "lucide-react";

type OpenEndedProps = {
  game: Game & { questions: Pick<Question, "id" | "question" | "answer">[] };
};

type CheckAnswerRequest = z.infer<typeof checkAnswerSchema>;

type CheckAnswerResponse = {
  percentageCorrect: number;
};

export default function OpenEnded({ game }: OpenEndedProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizHasEnded, setQuizHasEnded] = useState(false);
  const [blankAnswer, setBlankAnswer] = useState("");
  const [now, setNow] = useState(new Date());

  const { toast } = useToast();

  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex];
  }, [game.questions, questionIndex]);

  const {
    mutate: checkAnswer,
    isLoading: isChecking,
  }: UseMutationResult<CheckAnswerResponse, Error, CheckAnswerRequest> =
    useMutation({
      mutationFn: async (): Promise<CheckAnswerResponse> => {
        let filledAnswer = blankAnswer;
        document.querySelectorAll("#user-input").forEach((input) => {
          // @ts-expect-error
          filledAnswer = filledAnswer.replace("_______", input.value);
          // @ts-expect-error
          input.value = "";
        });
        const { data } = await axios.post("/api/checkAnswer", {
          questionId: currentQuestion.id,
          userAnswer: filledAnswer,
        });

        return data;
      },
    });

  const { mutate: setTimeEnded } = useMutation({
    mutationFn: async (timeEnded: Date) => {
      await axios.post("/api/game/end", {
        gameId: game.id,
        timeEnded,
      });
    },
  });

  const handleNext = useCallback(() => {
    if (isChecking) return;
    // @ts-expect-error
    checkAnswer(undefined, {
      onSuccess: ({ percentageCorrect }) => {
        toast({
          title: `Your answer is a ${percentageCorrect}% match!`,
        });
        if (questionIndex === game.questions.length - 1) {
          setQuizHasEnded(true);
          setTimeEnded(new Date());
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
    });
  }, [
    checkAnswer,
    game.questions.length,
    isChecking,
    questionIndex,
    setTimeEnded,
    toast,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!quizHasEnded) setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [quizHasEnded]);

  if (game.questions.length === 0) {
    return (
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-center gap-y-2">
        <p>
          There was an issue retrieving the questions. Please go back and try
          again
        </p>
        <Link
          href="/quiz"
          className={cn(buttonVariants({ size: "lg" }), "mt-2")}
        >
          <ChevronLeft className="mr-2" />
          Back
        </Link>
      </div>
    );
  }

  if (quizHasEnded) {
    return (
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-center">
        <div className="mt-2 whitespace-nowrap rounded-md bg-green-500 px-4 py-2 font-semibold text-white">
          You Completed in{" "}
          {formatTime(differenceInSeconds(now, game.timeStarted))}
        </div>
        <Link
          href={`/statistics/${game.id}`}
          className={cn(buttonVariants({ size: "lg" }), "mt-2")}
        >
          View Statistics
          <BarChart className="ml-2 h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="absolute left-1/2 top-1/2 w-[90vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 md:w-[80vw]">
      <div className=" flex justify-between">
        <div className="flex flex-col justify-between gap-y-2">
          <p>
            <span className="text-lg text-slate-400">Topic</span> &nbsp;
            <span className="rounded-lg bg-slate-800 px-2.5 pb-1.5 pt-1 text-white">
              {game.topic}
            </span>
          </p>
          <div className="flex py-1 text-lg text-slate-400">
            <Timer className="mr-2" />
            {formatTime(differenceInSeconds(now, game.timeStarted))}
          </div>
        </div>
      </div>

      <Card className="mt-4 w-full">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 divide-y divide-zinc-600/50 text-center">
            <div>{questionIndex + 1}</div>
            <div className="text-base text-slate-400">
              {game.questions.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestion?.question}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="mt-4 flex w-full flex-col items-center justify-center">
        <BlankAnswerInput
          answer={currentQuestion?.answer}
          setBlankAnswer={setBlankAnswer}
        />

        <Button
          variant="default"
          className="mt-8"
          size="lg"
          onClick={() => handleNext()}
          disabled={isChecking}
        >
          Next{" "}
          {isChecking ? (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            <ChevronRight className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
