import { getArticlesForGrading } from "@/actions/grades";
import { GradesClientWrapper } from "@/components/grades/GradesClientWrapper";

export default async function GradesPage() {
  const result = await getArticlesForGrading();

  return <GradesClientWrapper initialArticles={result.articles || []} />;
}
