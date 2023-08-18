"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";

export default function HistoryCard() {
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer hover:scale-[0.99] hover:opacity-75"
      onClick={() => router.push("/history")}
    >
      <CardHeader className="flex items-center pb-2">
        <CardTitle className="text-2xl font-bold">History</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          View your previous quiz results here
        </p>
      </CardContent>
    </Card>
  );
}
