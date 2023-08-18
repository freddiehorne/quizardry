import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function RecentActivitiesCard() {
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recent Activities</CardTitle>
        <CardDescription>You have played a total of 8 games</CardDescription>
      </CardHeader>

      <CardContent className="max-h-[580px] overflow-scroll">
        HISTORIES
      </CardContent>
    </Card>
  );
}
