import { Question } from "@prisma/client";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function QuestionsList({
  questions,
}: {
  questions: Question[];
}) {
  const gameType = questions[0].questionType;

  return (
    <Table className="mt-4">
      <TableCaption>End of list</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px]">No.</TableHead>
          <TableHead>Question & Correct Answer</TableHead>
          <TableHead>Your Answer</TableHead>
          {gameType === "openEnded" && (
            <TableHead className="w-[30px] text-right">Accuracy</TableHead>
          )}
        </TableRow>
      </TableHeader>

      <TableBody>
        {questions.map(
          (
            { id, question, answer, isCorrect, userAnswer, percentageCorrect },
            i,
          ) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>
                <span className="mb-4 block">{question}</span>
                <span className="font-semibold">{answer}</span>
              </TableCell>
              {gameType === "multipleChoice" && (
                <TableCell
                  className={cn({
                    "text-green-600": isCorrect,
                    "text-red-600": !isCorrect,
                  })}
                >
                  {userAnswer}
                </TableCell>
              )}
              {gameType === "openEnded" && (
                <>
                  <TableCell>{userAnswer}</TableCell>
                  <TableCell>{percentageCorrect}</TableCell>
                </>
              )}
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
}
