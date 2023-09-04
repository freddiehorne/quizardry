import { Hourglass } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatTime } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";

export default function TimeTakenCard({
  timeStarted,
  timeEnded,
}: {
  timeStarted: Date;
  timeEnded: Date;
}) {
  return (
    <Card className="md:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-7">
        <CardTitle className="text-2-xl font-bold">Time Taken</CardTitle>
        <Hourglass />
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium">
          {formatTime(differenceInSeconds(timeEnded, timeStarted))}
        </div>
      </CardContent>
    </Card>
  );
}
