import NewQuiz from "@/components/newQuiz";
import { getAuthSession } from "@/lib/nextAuth";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    topic?: string;
  };
};

export const metadata = {
  title: "Quiz | Quizardry",
};

export default async function QuizPage({ searchParams }: Props) {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  return <NewQuiz topicParam={searchParams.topic ?? ""} />;
}
