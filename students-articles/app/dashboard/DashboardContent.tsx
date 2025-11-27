"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { getArticles } from "@/actions/articles";
import { Article, ArticlesState } from "@/types/article";
import ArticleCard from "@/components/dashboard/ArticleCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import ErrorState from "@/components/dashboard/ErrorState";
import EmptyState from "@/components/dashboard/EmptyState";

// TODO : fix types
interface DashboardContentProps {
  user: any;
}

export default function DashboardContent({ user }: DashboardContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const initialState: ArticlesState = {
    success: false,
    error: undefined,
    articles: [],
    pagination: { page: 1, limit: 10, total: 0, pages: 0 },
  };

  const [articlesState, articlesFormAction, isArticlesLoading] = useActionState<
    ArticlesState,
    FormData
  >(getArticles, initialState);

  const loadArticles = (page: number = 1) => {
    const formData = new FormData();
    formData.append("page", page.toString());
    formData.append("limit", "10");
    articlesFormAction(formData);
    setCurrentPage(page);
  };

  // Load initial articles
  useEffect(() => {
    loadArticles(1);
  }, []);

  // Show error state
  if (articlesState.error && !isArticlesLoading) {
    return (
      <ErrorState error={articlesState.error} onRetry={() => loadArticles(1)} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">داشبورد</h1>
          <p className="text-gray-600">
            {user?.role === "student"
              ? "خوش آمدید! در اینجا می‌توانید مقالات خود را مدیریت کنید."
              : "خوش آمدید! در اینجا می‌توانید مقالات دانشجویان را مشاهده و نمره‌دهی کنید."}
          </p>
        </div>

        {/* Error Box */}
        {articlesState.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {articlesState.error}
          </div>
        )}

        {/* Articles Grid */}
        {isArticlesLoading &&
        (!articlesState.articles || articlesState.articles.length === 0) ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesState.articles?.map((article: Article) => (
              <ArticleCard
                key={article._id}
                article={article}
                onViewDetails={(id) => router.push(`/articles/${id}`)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {articlesState.articles &&
          articlesState.articles.length === 0 &&
          !isArticlesLoading && (
            <EmptyState
              userRole={user?.role}
              onCreateArticle={() => router.push("/articles/create")}
            />
          )}

        {/* Pagination */}
        {articlesState.pagination && articlesState.pagination.pages > 1 && (
          <div className="flex justify-center mt-8 space-x-2 space-x-reverse">
            <Button
              onClick={() => loadArticles(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
            >
              قبلی
            </Button>
            <span className="px-4 py-2 text-sm">
              صفحه {currentPage} از {articlesState.pagination.pages}
            </span>
            <Button
              onClick={() => loadArticles(currentPage + 1)}
              disabled={currentPage === articlesState.pagination.pages}
              variant="outline"
            >
              بعدی
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
