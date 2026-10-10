"use client";

import { ScoreMark } from "@/components/editorial/ScoreMark";
import { excerpt, faNum } from "@/lib/format";
import { isLtr } from "@/lib/language";
import { cn } from "@/lib/utils";
import { useGrades } from "@/store/gradeStore";
import type { Article } from "@/types/article";

export function ArticlesList({ articles }: { articles: Article[] }) {
  const { selectedArticle, setSelectedArticle } = useGrades();

  return (
    <ol className="border-t">
      {articles.map((article, i) => {
        const selected = selectedArticle?._id === article._id;
        const titleIsLtr = isLtr(article.title);
        const excerptIsLtr = isLtr(article.content);
        return (
          <li key={article._id}>
            <button
              type="button"
              aria-pressed={selected}
              onClick={() => setSelectedArticle(article)}
              className={cn(
                "grid w-full grid-cols-[2rem_minmax(0,1fr)_auto] items-start gap-x-4 border-b border-s-2 border-s-transparent py-5 ps-3 text-start transition-colors hover:bg-muted/60",
                selected && "border-s-foreground bg-muted",
              )}
            >
              <span aria-hidden className="font-serif text-2xl font-bold text-faint">
                {faNum(i + 1)}
              </span>
              <span className="min-w-0">
                <span
                  dir={titleIsLtr ? "ltr" : undefined}
                  className={cn(
                    "type-subhead block",
                    titleIsLtr && "text-left",
                  )}
                >
                  {article.title}
                </span>
                <span dir="auto" className="type-label mt-1 block">
                  {article.author.fullName}
                </span>
                <span
                  dir={excerptIsLtr ? "ltr" : undefined}
                  className={cn(
                    "type-meta mt-2 line-clamp-2 block text-muted-foreground",
                    excerptIsLtr && "text-left",
                  )}
                >
                  {excerpt(article.content, 120)}
                </span>
              </span>
              <ScoreMark
                score={article.grades.length > 0 ? article.averageScore : null}
                size="sm"
              />
            </button>
          </li>
        );
      })}
    </ol>
  );
}
