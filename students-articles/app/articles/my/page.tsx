"use client";

import Link from "next/link";
import {
  startTransition,
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getMyArticles } from "@/actions/articles";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Spread } from "@/components/editorial/Spread";
import { StateMessage } from "@/components/states/StateMessage";
import { ArticleLead } from "@/components/dashboard/ArticleLead";
import type { Article } from "@/types/article";
import { ArticleRow } from "@/components/dashboard/ArticleRow";
import { EmptyIndex } from "@/components/dashboard/EmptyIndex";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { IndexSkeleton } from "@/components/dashboard/IndexSkeleton";
import { faNum } from "@/lib/format";
import { normalizeFa } from "@/lib/normalizeFa";
import { cn } from "@/lib/utils";

type MyArticlesState = {
  success: boolean;
  error?: string;
  articles?: Article[];
};

const initialState: MyArticlesState = {
  success: false,
  error: undefined,
  articles: [],
};

export default function MyArticlesPage() {
  const [state, formAction, isLoading] = useActionState<
    MyArticlesState,
    FormData
  >(getMyArticles, initialState);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const requested = useRef(false);
  useEffect(() => {
    if (requested.current) return;
    requested.current = true;
    const formData = new FormData();
    startTransition(() => formAction(formData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const articles = useMemo(() => state.articles ?? [], [state.articles]);
  const hasLoaded = state.success || Boolean(state.error);

  const counts = useMemo(() => {
    const result: Record<string, number> = {};
    for (const article of articles) {
      result[article.category] = (result[article.category] ?? 0) + 1;
    }
    return result;
  }, [articles]);

  const isFiltering = query.trim() !== "" || category !== "all";

  const visible = useMemo(() => {
    const needle = normalizeFa(query);
    return articles.filter((article) => {
      if (category !== "all" && article.category !== category) return false;
      if (!needle) return true;
      const haystack = normalizeFa(
        [
          article.title,
          article.content,
          article.author.fullName,
          article.tags.join(" "),
        ].join(" "),
      );
      return haystack.includes(needle);
    });
  }, [articles, query, category]);

  const resetFilters = () => {
    setQuery("");
    setCategory("all");
  };

  let content: React.ReactNode;
  if (!hasLoaded) {
    content = <IndexSkeleton />;
  } else if (state.error && !isLoading) {
    content = (
      <StateMessage
        tone="error"
        title="بارگذاری نوشته‌های شما ناموفق بود."
        description={state.error}
      >
        <Button
          onClick={() => {
            const fd = new FormData();
            startTransition(() => formAction(fd));
          }}
        >
          تلاش دوباره
        </Button>
      </StateMessage>
    );
  } else if (articles.length === 0) {
    content = <EmptyIndex kind="empty" role="student" />;
  } else if (visible.length === 0) {
    content = <EmptyIndex kind="filtered" onReset={resetFilters} />;
  } else {
    const [lead, ...rest] = visible;
    content = (
      <>
        <p className="type-label mb-6" aria-live="polite">
          {isFiltering
            ? `${faNum(visible.length)} نوشته از ${faNum(articles.length)} نوشتهٔ شما`
            : `${faNum(articles.length)} نوشته`}
        </p>
        <ol
          aria-busy={isLoading}
          className={cn(
            "transition-opacity duration-200",
            isLoading && "opacity-50",
          )}
        >
          <ArticleLead key={lead._id} article={lead} />
          {rest.map((article, i) => (
            <ArticleRow
              key={article._id}
              article={article}
              number={i + 2}
              index={i}
            />
          ))}
        </ol>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="نوشته‌های من"
        deck="نوشته‌هایی که شما نوشته‌ید، به همراه نمره‌ها و بازخوردهای استادان در حاشیه آن‌ها."
        actions={
          <Button asChild size="lg">
            <Link href="/articles/create">نوشتن نوشته جدید</Link>
          </Button>
        }
      />
      <div className="page">
        <Spread
          marginFirstOnMobile
          mainClassName="py-10 md:py-16"
          marginClassName={
            hasLoaded && articles.length > 0 ? "py-8 lg:py-16" : "lg:py-16"
          }
          main={content}
          margin={
            hasLoaded && articles.length > 0 ? (
              <FilterPanel
                query={query}
                onQueryChange={setQuery}
                category={category}
                onCategoryChange={setCategory}
                counts={counts}
                total={articles.length}
                paged={false}
              />
            ) : null
          }
        />
      </div>
    </>
  );
}
