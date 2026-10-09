import { faNum } from "@/lib/format";

/** A numbered annotation for the margin: a vermilion dot, then the note. */
export function MarginNote({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <p className="flex gap-3 type-meta">
      <span
        aria-hidden
        className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-mark text-label font-bold text-mark-foreground"
      >
        {faNum(n)}
      </span>
      <span>{children}</span>
    </p>
  );
}
