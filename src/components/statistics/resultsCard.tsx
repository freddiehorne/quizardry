import { Award, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function ResultsCard({ accuracy }: { accuracy: number }) {
  return (
    <Card className="md:col-span-7">
      <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-7">
        <CardTitle className="text-2-xl font-bold">Results</CardTitle>
        <Award />
      </CardHeader>
      <CardContent className="flex h-3/5 flex-col items-center justify-center">
        {accuracy > 75 && (
          <>
            <Trophy className="mb-4" stroke="gold" size={50} />
            <div className="flex flex-col text-2xl font-semibold text-yellow-400">
              <span className="text-center">Impressive</span>
              <span className="text-center text-sm text-black opacity-50 dark:text-white">
                you scored more than 75%
              </span>
            </div>
          </>
        )}
        {accuracy > 50 && accuracy <= 75 && (
          <>
            <Trophy className="mb-4" stroke="silver" size={50} />
            <div className="flex flex-col text-2xl font-semibold text-yellow-400">
              <span className="text-center">Good Effort</span>
              <span className="text-center text-sm text-black opacity-50 dark:text-white">
                you scored over half marks
              </span>
            </div>
          </>
        )}
        {accuracy > 25 && accuracy <= 50 && (
          <>
            <Trophy className="mb-4" stroke="#CD7F32" size={50} />
            <div className="flex flex-col text-2xl font-semibold text-yellow-400">
              <span className="text-center">Better luck next time!</span>
              <span className="text-center text-sm text-black opacity-50 dark:text-white">
                you scored under 50%
              </span>
            </div>
          </>
        )}
        {accuracy <= 25 && (
          <>
            <Trophy className="mb-4" stroke="red" size={50} />
            <div className="flex flex-col text-2xl font-semibold text-yellow-400">
              <span className="text-center">Pretty poor...</span>
              <span className="text-center text-sm text-black opacity-50 dark:text-white">
                you scored under 25%
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
