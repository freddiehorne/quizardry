"use client";

import MultipleChoiceCounter from "./multipleChoiceCounter";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ChevronRight, Loader2, Timer } from "lucide-react";
import { useMemo, useState } from "react";
import { Game, Question } from "@prisma/client";
import { Button } from "./ui/button";

type MultipleChoiceProps = {
  game: Game & { questions: Pick<Question, "id" | "question" | "options">[] };
};

export default function MultipleChoice({ game }: MultipleChoiceProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);

  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex];
  }, [game.questions, questionIndex]);

  const options = useMemo(() => {
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  return (
    <div className="absolute left-1/2 top-1/2 w-[90vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 md:w-[80vw]">
      <div className=" flex justify-between">
        <div className="flex flex-col justify-between gap-y-1">
          <p>
            <span className="text-lg text-slate-400">Topic</span> &nbsp;
            <span className="rounded-lg bg-slate-800 px-2.5 pb-1.5 pt-1 text-white">
              {game.topic}
            </span>
          </p>
          <div className="flex py-1 text-slate-400">
            <Timer className="mr-2" />
            00:00
          </div>
        </div>
        <MultipleChoiceCounter correctAnswers={4} wrongAnswers={2} />
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
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="mt-4 flex w-full flex-col items-center justify-center">
        {options.map((option, i) => {
          return (
            <Button
              key={option}
              variant={selectedOption === i ? "default" : "outline"}
              className="mb-4 w-full justify-start py-8"
              onClick={() => setSelectedOption(i)}
            >
              <div className="flex items-center justify-start">
                <div className="mr-5 rounded-md border p-2 px-3">{i + 1}</div>
                <div className="text-start">{option}</div>
              </div>
            </Button>
          );
        })}
        <Button variant="default" className="mt-2" size="lg">
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
