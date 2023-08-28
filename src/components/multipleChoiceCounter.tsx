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
    <Card className="flex items-center justify-center p-2.5">
      <CheckCircle2 color="green" size={30} />
      <span className="mx-2 text-2xl text-green-700">{correctAnswers}</span>
      <Separator orientation="vertical" />
      <span className="mx-2 text-2xl text-red-600">{wrongAnswers}</span>
      <XCircle color="red" size={30} />
    </Card>
  );
}
