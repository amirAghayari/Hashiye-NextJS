import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getArticleById } from "@/actions/articles";
import { getCurrentUser } from "@/lib/server/getCurrentUser";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ArticleInteractiveView from "@/components/article/ArticleInteractiveView";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [articleResult, user] = await Promise.all([
    getArticleById(id),
    getCurrentUser(),
  ]);

  if (!articleResult.success || !articleResult.article) {
    if (articleResult.error === "Article not found") {
      notFound();
    }

    // TODO  : این رو میتونی فایل ارور کنی
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <div className="text-red-600 mb-4">
              <div className="text-4xl mb-2">⚠️</div>
              <h3 className="text-lg font-semibold">خطا در بارگذاری مقاله</h3>
            </div>
            <p className="text-gray-600 mb-4">
              {articleResult.error || "خطایی رخ داده است"}
            </p>
            <Link href="/dashboard">
              <Button>بازگشت به داشبورد</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const article = articleResult.article;

  const isOwner = user && String(user.id) === String(article.author._id);
  const isProfessor = user && user.role === "professor";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
            <Link href="/dashboard" className="hover:text-blue-600">
              ← بازگشت
            </Link>
            <span>/</span>
            <Link href="/dashboard" className="hover:text-blue-600">
              داشبورد
            </Link>
            <span>/</span>
            <span>مقاله</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">جزئیات مقاله</h1>
        </div>

        <ArticleInteractiveView
          initialArticle={article}
          isOwner={isOwner}
          isProfessor={isProfessor}
        />
      </div>
    </div>
  );
}
