import type { Metadata } from "next";
import { redirect } from "next/navigation";
import DashboardContent from "./DashboardContent";
import { getCurrentUser } from "@/lib/server/getCurrentUser";

export const metadata: Metadata = { title: "مقالات" };

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Pass plain data only: the Mongoose document is not serialisable.
  return <DashboardContent user={{ role: user.role, fullName: user.fullName }} />;
}
