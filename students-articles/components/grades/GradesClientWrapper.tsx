"use client";

import { PageHeader } from "@/components/editorial/PageHeader";
import { Spread } from "@/components/editorial/Spread";
import { StateMessage } from "@/components/states/StateMessage";
import { ArticleDetails } from "@/components/grades/ArticleDetails";
import { ArticlesList } from "@/components/grades/ArticlesList";
import { GradesProvider } from "@/store/gradeStore";
import type { Article } from "@/types/article";

interface GradesClientWrapperProps {
  initialArticles: Article[];
  error?: string;
}

export function GradesClientWrapper({
  initialArticles,
  error,
}: GradesClientWrapperProps) {
  return (
    <GradesProvider>
      <PageHeader
        title="نمره‌دهی"
        deck="نوشته‌ای را از فهرست انتخاب کنید، مطالعه نمایید و نمره‌دهی کنید."
      />
      <div className="page">
        {error ? (
          <div className="py-10 md:py-16">
            <StateMessage
              tone="error"
              title="نوشته‌ها بارگذاری نشدند."
              description={error}
            />
          </div>
        ) : initialArticles.length === 0 ? (
          <div className="py-10 md:py-16">
            <StateMessage
              title="نوشته‌ای برای نمره‌دهی موجود نیست."
              description="وقتی دانشجویان نوشته منتشر کنند، اینجا در فهرست ظاهر می‌شوند."
            />
          </div>
        ) : (
          <Spread
            className="lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
            mainClassName="py-10 md:py-16"
            marginClassName="py-10 lg:py-16"
            main={<ArticlesList articles={initialArticles} />}
            margin={<ArticleDetails />}
          />
        )}
      </div>
    </GradesProvider>
  );
}
