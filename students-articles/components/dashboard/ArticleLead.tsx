import Link from "next/link";
import { ScoreMark } from "@/components/editorial/ScoreMark";
import { ArticleByline } from "@/components/dashboard/ArticleByline";
import { excerpt, faNum, readingMinutes } from "@/lib/format";
import { stagger } from "@/lib/utils";
import type { Article } from "@/types/article";

/** The first article of the list, set large. Everything after it is an index row. */
export function ArticleLead({ article }: { article: Article }) {
  const graded = article.grades.length > 0;

  return (
    <li className="rise" style={stagger(0)}>
      <Link
        href={`/articles/${article._id}`}
        className="group block border-b border-foreground pb-10 md:pb-14"
      >
        <div className="flex flex-wrap items-center gap-3 type-label">
          <span className="tag">{article.category}</span>
          <span>{faNum(readingMinutes(article.content))} دقیقه مطالعه</span>
        </div>
        <h2 className="type-headline mt-6 line-clamp-3 underline decoration-transparent decoration-2 underline-offset-[0.2em] transition-colors duration-300 group-hover:decoration-foreground">
          {article.title}
        </h2>
        <p className="type-deck mt-6 line-clamp-3 max-w-[38rem] text-muted-foreground">
          {excerpt(article.content, 240)}
        </p>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <ArticleByline article={article} />
          <ScoreMark
            score={graded ? article.averageScore : null}
            size="lg"
            showLabel
            underline="load"
          />
        </div>
      </Link>
    </li>
  );
}
