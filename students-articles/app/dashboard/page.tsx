import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardContent from "./DashboardContent";
import { getCurrentUser } from "@/lib/server/getCurrentUser";

async function CurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    return null;
  }

  try {
    return await getCurrentUser();
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}

export default async function DashboardPage() {
  // Server-side authentication check
  const user = await CurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <DashboardContent user={user} />;
}
