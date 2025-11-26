"use client";
import { GradesProvider } from "@/store/gradeStore";
import { ArticleDetails } from "./ArticleDetails";
import { ArticlesList } from "./ArticlesList";

interface GradesClientWrapperProps {
  initialArticles: any[];
}

export function GradesClientWrapper({
  initialArticles,
}: GradesClientWrapperProps) {
  return (
    <GradesProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-4">نمره‌دهی مقالات</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ArticlesList initialArticles={initialArticles} />
            <ArticleDetails />
          </div>
        </div>
      </div>
    </GradesProvider>
  );
}
