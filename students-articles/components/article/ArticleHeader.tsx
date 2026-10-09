import { formatDate } from "@/lib/formatDate";
import { faNum, readingMinutes } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Article } from "@/types/article";

/** Short titles get the biggest type; long ones step down so they never crowd the page. */
function titleClass(title: string) {
  if (title.length <= 28) return "type-display";
  if (title.length <= 80) return "type-headline";
  return "type-title";
}

export function ArticleHeader({ article }: { article: Article }) {
  const facts = [
    { label: "نویسنده", value: article.author.fullName },
    { label: "دانشگاه", value: article.author.university },
    { label: "رشته", value: article.author.field },
    { label: "تاریخ انتشار", value: formatDate(article.createdAt) },
    { label: "زمان مطالعه", value: `${faNum(readingMinutes(article.content))} دقیقه` },
  ];

  return (
    <header className="page pt-10 md:pt-16">
      <span className="tag">{article.category}</span>
      <h1 className={cn(titleClass(article.title), "mt-6 max-w-5xl")}>{article.title}</h1>
      <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-foreground py-6 md:grid-cols-3 lg:grid-cols-5">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="type-label">{fact.label}</dt>
            <dd className="type-meta font-medium">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
