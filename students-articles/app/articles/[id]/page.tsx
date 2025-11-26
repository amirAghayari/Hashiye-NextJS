import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getArticleById } from "@/actions/articles";
import { getCurrentUser } from "@/lib/server/getCurrentUser";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ArticleInteractiveView from "@/components/ArticleInteractiveView";

// در Next.js 15، پارامترها پرامیس هستند
export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Await params (Next.js 15 requirement)
  const { id } = await params;

  // 2. Parallel Data Fetching for Performance
  // همزمان هم مقاله و هم یوزر را می‌گیریم تا واترفال نداشته باشیم
  const [articleResult, user] = await Promise.all([
    getArticleById(id),
    getCurrentUser(),
  ]);

  // هندل کردن ارورهای فچینگ بهتر
  if (!articleResult.success || !articleResult.article) {
    if (articleResult.error === "Article not found") {
      notFound(); // نمایش صفحه 404 استاندارد نکست
    }
    // نمایش ارور کلی بهتر
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

  // چک کردن دسترسی‌ها روی سرور
  // نکته: در یک اپ واقعی، آی‌دی‌ها را به استرینگ تبدیل و مقایسه کنید
  const isOwner = user && String(user.id) === String(article.author._id);
  const isProfessor = user && user.role === "professor";

  // 3. Pass data to Client Component
  // دیتای فچ شده را به کامپوننت کلاینت پاس می‌دهیم
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* هدینگ بهتر */}
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
