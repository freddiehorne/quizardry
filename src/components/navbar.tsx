import { getAuthSession } from "@/lib/nextAuth";
import Link from "next/link";
import SignInButton from "./signInButton";
import UserAccountNav from "./userAccountNav";

export default async function Navbar() {
  const session = await getAuthSession();
  console.log(session);

  return (
    <div className="fixed inset-x-0 top-0 z-[10] h-fit border-b border-zinc-300 bg-white py-2 dark:bg-gray-950">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-2 px-8">
        <Link href="/" className="flex items-center gap-2">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] dark:border-white md:block">
            Quizardry
          </p>
        </Link>
        <div className="flex items-center">
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <SignInButton text="Sign In" />
          )}
        </div>
      </div>
    </div>
  );
}
