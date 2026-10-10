import { formatDate } from "@/lib/formatDate";
import type { Article } from "@/types/article";

/** Author, institution and date: the quiet facts under every title.
 *  `dir="auto"` keeps English names and universities left-aligned. */
export function ArticleByline({ article }: { article: Article }) {
  return (
    <div className="leading-snug">
      <p dir="auto" className="type-meta font-medium">
        {article.author.fullName}
      </p>
      <p dir="auto" className="type-label">
        {article.author.university}، {article.author.field}
      </p>
      <p className="type-label">{formatDate(article.createdAt)}</p>
    </div>
  );
}
