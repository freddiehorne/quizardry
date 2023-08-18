import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import WordCloud from "../wordCloud";

export default function HotTopicsCard() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="test-2xl font-bold">Hot Topics</CardTitle>
        <CardDescription>
          Click on a topic to start a quiz on it
        </CardDescription>
      </CardHeader>

      <CardContent>
        <WordCloud />
      </CardContent>
    </Card>
  );
}
