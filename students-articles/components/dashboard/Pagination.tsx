import { Button } from "@/components/ui/button";
import { faNum } from "@/lib/format";

type PaginationProps = {
  page: number;
  pages: number;
  disabled?: boolean;
  onChange: (page: number) => void;
};

export function Pagination({ page, pages, disabled, onChange }: PaginationProps) {
  if (pages <= 1) return null;

  return (
    <nav
      aria-label="صفحه‌بندی"
      className="mt-10 flex items-center justify-between gap-4 border-t border-foreground pt-6"
    >
      <Button
        variant="outline"
        size="sm"
        disabled={disabled || page <= 1}
        onClick={() => onChange(page - 1)}
      >
        صفحهٔ قبل
      </Button>
      <span className="type-meta" aria-current="page">
        صفحهٔ {faNum(page)} از {faNum(pages)}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={disabled || page >= pages}
        onClick={() => onChange(page + 1)}
      >
        صفحهٔ بعد
      </Button>
    </nav>
  );
}
