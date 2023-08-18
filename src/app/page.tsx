import SignInButton from "@/components/signInButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextAuth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();

  if (session?.user) {
    return redirect("/dashboard");
  }
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Welcome to Quizardry</CardTitle>
          <CardDescription>
            Quizardry is a platform for creating quizzes using AI! Get started
            by logging in!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInButton text="Sign In with Google"></SignInButton>
        </CardContent>
      </Card>
    </div>
  );
}
