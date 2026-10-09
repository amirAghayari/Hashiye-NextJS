type ArticleBodyProps = { content: string; tags: string[] };

/**
 * The reading column: about 60 characters wide, generous line-height.
 * A short opening paragraph is set as a standfirst in the serif.
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
        <p className={hasStandfirst ? "type-deck whitespace-pre-line" : "type-body whitespace-pre-line"}>
          {first}
        </p>
      ) : null}
      {rest.map((paragraph, i) => (
        <p key={i} className="type-body mt-6 whitespace-pre-line">
          {paragraph}
        </p>
      ))}
      {tags.length > 0 ? (
        <footer className="mt-12 border-t pt-6">
          <h2 className="type-label">برچسب‌ها</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag} className="tag type-meta">
                {tag}
              </li>
            ))}
          </ul>
        </footer>
      ) : null}
    </div>
  );
}
