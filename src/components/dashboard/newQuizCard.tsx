"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";

export default function NewQuizCard() {
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer hover:scale-[0.99] hover:opacity-75"
      onClick={() => router.push("/quiz")}
    >
      <CardHeader className="flex items-center pb-2">
        <CardTitle className="text-2xl font-bold">New Quiz</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          Challenge yourself with a quiz
        </p>
      </CardContent>
    </Card>
  );
}
