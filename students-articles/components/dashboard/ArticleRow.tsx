import Link from "next/link";
import { ScoreMark } from "@/components/editorial/ScoreMark";
import { ArticleByline } from "@/components/dashboard/ArticleByline";
import { excerpt, faNum, readingMinutes } from "@/lib/format";
import { stagger } from "@/lib/utils";
import type { Article } from "@/types/article";

type ArticleRowProps = {
  article: Article;
  /** Position in the index, shown as the large numeral. */
  number: number;
  /** Position among the rows on screen, used for the entrance stagger. */
  index: number;
};

/** One entry in the article index: number, title, byline, score. */
export function ArticleRow({ article, number, index }: ArticleRowProps) {
  const graded = article.grades.length > 0;

  return (
    <li className="rise" style={stagger(Math.min(index + 1, 8))}>
      <Link
        href={`/articles/${article._id}`}
        className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-start gap-x-4 border-b py-6 transition-colors duration-200 hover:bg-muted/60 md:grid-cols-[4rem_minmax(0,1fr)_13rem_6rem] md:gap-x-6 md:py-8"
      >
        <span
          aria-hidden
          className="col-start-1 row-start-1 font-serif text-3xl font-bold text-faint transition-colors group-hover:text-foreground md:text-4xl"
        >
          {faNum(number)}
        </span>

        <div className="col-start-2 row-start-1 min-w-0 transition-transform duration-300 ease-out-quart group-hover:-translate-x-1">
          <div className="flex flex-wrap items-center gap-3 type-label">
            <span className="tag">{article.category}</span>
            <span>{faNum(readingMinutes(article.content))} دقیقه مطالعه</span>
          </div>
          <h3 className="type-subhead mt-3 underline decoration-transparent decoration-1 underline-offset-[0.25em] transition-colors duration-300 group-hover:decoration-foreground">
            {article.title}
          </h3>
          <p className="type-meta mt-2 line-clamp-2 text-muted-foreground">
            {excerpt(article.content, 150)}
          </p>
        </div>

        <div className="col-span-2 col-start-2 row-start-2 mt-4 md:col-span-1 md:col-start-3 md:row-start-1 md:mt-0">
          <ArticleByline article={article} />
        </div>

        <div className="col-start-3 row-start-1 justify-self-end md:col-start-4">
          <ScoreMark score={graded ? article.averageScore : null} size="md" />
        </div>
      </Link>
    </li>
  );
}
