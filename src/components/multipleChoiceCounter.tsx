import { CheckCircle2, XCircle } from "lucide-react";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

export default function MultipleChoiceCounter({
  correctAnswers,
  wrongAnswers,
}: {
  correctAnswers: number;
  wrongAnswers: number;
}) {
  return (
    <Card className="flex items-center justify-center p-3">
      <CheckCircle2 color="green" size={35} />
      <span className="mx-3 text-3xl text-green-700">{correctAnswers}</span>
      <Separator orientation="vertical" />
      <span className="mx-3 text-3xl text-red-500">{wrongAnswers}</span>
      <XCircle color="red" size={35} />
    </Card>
  );
}
