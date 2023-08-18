import HistoryCard from "@/components/dashboard/historyCard";
import HotTopicsCard from "@/components/dashboard/hotTopicsCard";
import NewQuizCard from "@/components/dashboard/newQuizCard";
import RecentActivitiesCard from "@/components/dashboard/recentActivitiesCard";
import { getAuthSession } from "@/lib/nextAuth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard | Quizardry",
};

export default async function Dashboard() {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }
  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <NewQuizCard />
        <HistoryCard />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <HotTopicsCard />
        <RecentActivitiesCard />
      </div>
    </main>
  );
}
