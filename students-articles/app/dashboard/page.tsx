import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardContent from "./DashboardContent";
import { getCurrentUser } from "@/lib/server/getCurrentUser";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <DashboardContent user={user} />;
}
