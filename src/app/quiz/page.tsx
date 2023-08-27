import NewQuiz from "@/components/newQuiz";
import { getAuthSession } from "@/lib/nextAuth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Quiz | Quizardry",
};

export default async function QuizPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  return <NewQuiz />;
}
