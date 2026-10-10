import { isLtr } from "@/lib/language";
import { cn } from "@/lib/utils";

type ArticleBodyProps = { content: string; tags: string[] };

/**
 * The reading column: about 60 characters wide, generous line-height.
 * A short opening paragraph is set as a standfirst in the serif.
 * English writing is set LTR, left-aligned, with a Latin line-height.
 */
export function ArticleBody({ content, tags }: ArticleBodyProps) {
  const paragraphs = content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  const [first, ...rest] = paragraphs;
  const hasStandfirst = Boolean(first) && first.length <= 360 && rest.length > 0;

  return (
    <div className="max-w-[40rem]">
      {first ? (
        <p
          dir={isLtr(first) ? "ltr" : undefined}
          className={cn(
            hasStandfirst ? "type-deck" : "type-body",
            "whitespace-pre-line",
            isLtr(first) && (hasStandfirst ? "text-left ltr-deck" : "text-left ltr-body"),
          )}
        >
          {first}
        </p>
      ) : null}
      {rest.map((paragraph, i) => (
        <p
          key={i}
          dir={isLtr(paragraph) ? "ltr" : undefined}
          className={cn(
            "type-body mt-6 whitespace-pre-line",
            isLtr(paragraph) && "text-left ltr-body",
          )}
        >
          {paragraph}
        </p>
      ))}
      {tags.length > 0 ? (
        <footer className="mt-12 border-t pt-6">
          <h2 className="type-label">برچسب‌ها</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag} className="tag type-meta" dir="auto">
                {tag}
              </li>
            ))}
          </ul>
        </footer>
      ) : null}
    </div>
  );
}
