import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function AccuracyCard({ accuracy }: { accuracy: number }) {
  accuracy = Math.round(accuracy * 100) / 100;

  return (
    <Card className="md:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-7">
        <CardTitle className="text-2-xl font-bold">Average Accuracy</CardTitle>
        <Target />
      </CardHeader>
      <CardContent className="text-sm font-medium">
        {accuracy.toString()}%
      </CardContent>
    </Card>
  );
}
