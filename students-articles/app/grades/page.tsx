import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getArticlesForGrading } from "@/actions/grades";
import { GradesClientWrapper } from "@/components/grades/GradesClientWrapper";
import { getCurrentUser } from "@/lib/server/getCurrentUser";

export const metadata: Metadata = { title: "نمره‌دهی" };

export default async function GradesPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login");
  }

  const result = await getArticlesForGrading();

  return (
    <GradesClientWrapper
      initialArticles={result.articles || []}
      error={result.success ? undefined : result.error}
    />
  );
}
