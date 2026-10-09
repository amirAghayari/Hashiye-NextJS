import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getArticleById } from "@/actions/articles";
import { getCurrentUser } from "@/lib/server/getCurrentUser";
import ArticleInteractiveView from "@/components/article/ArticleInteractiveView";
import { Button } from "@/components/ui/button";
import { StateMessage } from "@/components/states/StateMessage";

export const metadata: Metadata = { title: "مقاله" };

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [articleResult, user] = await Promise.all([getArticleById(id), getCurrentUser()]);

  // Student work is private: logged-out visitors go to the login page.
  if (!user) {
    redirect("/auth/login");
  }

  if (!articleResult.success || !articleResult.article) {
    if (articleResult.error === "مقاله یافت نشد") {
      notFound();
    }

    return (
      <div className="page py-16">
        <StateMessage tone="error" title="مقاله باز نشد." description={articleResult.error}>
          <Button asChild>
            <Link href="/dashboard">بازگشت به مقاله‌ها</Link>
          </Button>
        </StateMessage>
      </div>
    );
  }

  const article = articleResult.article;
  const isOwner = String(user.id) === String(article.author._id);
  const isProfessor = user.role === "professor";

  return (
    <ArticleInteractiveView
      initialArticle={article}
      isOwner={isOwner}
      isProfessor={isProfessor}
    />
  );
}
