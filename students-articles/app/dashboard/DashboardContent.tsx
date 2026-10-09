"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useMemo, useRef, useState } from "react";
import { getArticles } from "@/actions/articles";
import type { ArticlesState } from "@/types/article";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Spread } from "@/components/editorial/Spread";
import { StateMessage } from "@/components/states/StateMessage";
import { ArticleLead } from "@/components/dashboard/ArticleLead";
import { ArticleRow } from "@/components/dashboard/ArticleRow";
import { EmptyIndex } from "@/components/dashboard/EmptyIndex";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { IndexSkeleton } from "@/components/dashboard/IndexSkeleton";
import { Pagination } from "@/components/dashboard/Pagination";
import { faNum } from "@/lib/format";
import { normalizeFa } from "@/lib/normalizeFa";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 10;
const ALL = "all";

const initialState: ArticlesState = {
  success: false,
  error: undefined,
  articles: [],
  pagination: { page: 1, limit: PAGE_SIZE, total: 0, pages: 0 },
};

interface DashboardContentProps {
  user: { role: string; fullName: string };
}

export default function DashboardContent({ user }: DashboardContentProps) {
  const isStudent = user.role === "student";

  const [state, formAction, isLoading] = useActionState<ArticlesState, FormData>(
    getArticles,
    initialState
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);

  const loadPage = (page: number) => {
    const formData = new FormData();
    formData.append("page", String(page));
    formData.append("limit", String(PAGE_SIZE));
    startTransition(() => formAction(formData));
  };

  // First load, once. (Retrying a failed load is the person's choice, not an effect's.)
  const requested = useRef(false);
  useEffect(() => {
    if (requested.current) return;
    requested.current = true;
    loadPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const articles = useMemo(() => state.articles ?? [], [state.articles]);
  const pagination = state.pagination;
  const page = pagination?.page ?? 1;
  const pages = pagination?.pages ?? 0;
  const hasLoaded = state.success || Boolean(state.error);

  const counts = useMemo(() => {
    const result: Record<string, number> = {};
    for (const article of articles) {
      result[article.category] = (result[article.category] ?? 0) + 1;
    }
    return result;
  }, [articles]);

  const isFiltering = query.trim() !== "" || category !== ALL;

  const visible = useMemo(() => {
    const needle = normalizeFa(query);
    return articles.filter((article) => {
      if (category !== ALL && article.category !== category) return false;
      if (!needle) return true;
      const haystack = normalizeFa(
        [article.title, article.content, article.author.fullName, article.tags.join(" ")].join(" ")
      );
      return haystack.includes(needle);
    });
  }, [articles, query, category]);

  const resetFilters = () => {
    setQuery("");
    setCategory(ALL);
  };

  const changePage = (next: number) => {
    window.scrollTo({ top: 0 });
    loadPage(next);
  };

  const [lead, ...rest] = visible;
  const offset = isFiltering ? 0 : (page - 1) * PAGE_SIZE;

  let content: React.ReactNode;
  if (!hasLoaded) {
    content = <IndexSkeleton />;
  } else if (state.error && !isLoading) {
    content = (
      <StateMessage tone="error" title="بارگذاری مقاله‌ها ناموفق بود." description={state.error}>
        <Button onClick={() => loadPage(page)}>تلاش دوباره</Button>
      </StateMessage>
    );
  } else if (articles.length === 0) {
    content = <EmptyIndex kind="empty" role={user.role} />;
  } else if (visible.length === 0) {
    content = <EmptyIndex kind="filtered" onReset={resetFilters} />;
  } else {
    content = (
      <>
        <p className="type-label mb-6" aria-live="polite">
          {isFiltering
            ? `${faNum(visible.length)} مقاله از ${faNum(articles.length)} مقالهٔ این صفحه`
            : `${faNum(pagination?.total ?? articles.length)} مقاله`}
        </p>
        <ol
          aria-busy={isLoading}
          className={cn("transition-opacity duration-200", isLoading && "opacity-50")}
        >
          <ArticleLead key={lead._id} article={lead} />
          {rest.map((article, i) => (
            <ArticleRow key={article._id} article={article} number={offset + i + 2} index={i} />
          ))}
        </ol>
        <Pagination page={page} pages={pages} disabled={isLoading} onChange={changePage} />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={isStudent ? "مقاله‌های من" : "مقاله‌های دانشجویان"}
        deck={
          isStudent
            ? "مقاله‌های شما، به همراه نمره‌ها و بازخوردهای استادان در حاشیه آن‌ها."
            : "برای مطالعه و نمره‌دادن، یکی از مقاله‌ها را انتخاب کنید."
        }
        actions={
          isStudent ? (
            <Button asChild size="lg">
              <Link href="/articles/create">نوشتن مقاله</Link>
            </Button>
          ) : (
            <Button asChild variant="outline" size="lg">
              <Link href="/grades">نمره‌دهی</Link>
            </Button>
          )
        }
      />
      <div className="page">
        <Spread
          marginFirstOnMobile
          mainClassName="py-10 md:py-16"
          marginClassName={hasLoaded && articles.length > 0 ? "py-8 lg:py-16" : "lg:py-16"}
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
                paged={pages > 1}
              />
            ) : null
          }
        />
      </div>
    </>
  );
}
