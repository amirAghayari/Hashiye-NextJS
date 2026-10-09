"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { faNum } from "@/lib/format";
import { cn } from "@/lib/utils";

type FilterPanelProps = {
  query: string;
  onQueryChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  /** Category -> number of loaded articles. Only categories with articles are listed. */
  counts: Record<string, number>;
  total: number;
  /** True when the list spans several pages (search only covers the current one). */
  paged: boolean;
};

const ALL = "all";

/** Search and category filter. Lives in the margin on desktop, above the list on mobile. */
export function FilterPanel({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  counts,
  total,
  paged,
}: FilterPanelProps) {
  const items = [
    { value: ALL, label: "همه", count: total },
    ...Object.entries(counts).map(([value, count]) => ({
      value,
      label: value,
      count,
    })),
  ];

  return (
    <div className="grid gap-8 lg:sticky lg:top-24">
      <div role="search">
        <Label htmlFor="article-search">جست‌وجو</Label>
        <Input
          id="article-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="عنوان، نویسنده یا برچسب"
          autoComplete="off"
        />
        {paged ? (
          <p className="type-label mt-2">
            جست‌وجو تنها در نوشته‌های صفحهٔ جاری انجام می‌شود.
          </p>
        ) : null}
      </div>

      <div>
        <h2 className="type-label">دسته‌بندی‌ها</h2>
        <ul className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0">
          {items.map((item) => {
            const active = category === item.value;
            return (
              <li key={item.value} className="shrink-0 lg:shrink">
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => onCategoryChange(item.value)}
                  className={cn(
                    "flex min-h-11 w-full items-center justify-between gap-3 border border-input px-3 type-meta transition-colors lg:border-0 lg:border-b lg:px-0",
                    active
                      ? "bg-foreground text-background lg:border-foreground lg:bg-transparent lg:font-bold lg:text-foreground"
                      : "hover:bg-muted",
                  )}
                >
                  <span>{item.label}</span>
                  <span className="type-label text-inherit opacity-70">
                    {faNum(item.count)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
