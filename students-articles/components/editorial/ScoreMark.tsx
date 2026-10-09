import { faNum, formatScore } from "@/lib/format";
import { getScoreLabel } from "@/lib/getScoreLabel";
import { cn } from "@/lib/utils";
import { PenStroke } from "@/components/editorial/PenStroke";

const SIZES = {
  sm: "text-3xl",
  md: "text-5xl",
  lg: "text-7xl",
  xl: "text-numeral",
} as const;

type ScoreMarkProps = {
  /** null when nobody has graded yet. */
  score: number | null;
  size?: keyof typeof SIZES;
  /** Show the word for the score (عالی, خوب...). */
  showLabel?: boolean;
  /** Draw the red underline beneath the numeral. */
  underline?: "load" | "view" | false;
  className?: string;
};

/**
 * A grade as a red mark on the page. Importance comes from numeral size and
 * the vermilion annotation, not from traffic-light colors.
 */
export function ScoreMark({
  score,
  size = "md",
  showLabel = false,
  underline = false,
  className,
}: ScoreMarkProps) {
  const graded = score !== null;

  return (
    <div className={cn("inline-flex flex-col", className)}>
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span
          className={cn(
            "font-serif font-bold leading-[1.1]",
            SIZES[size],
            graded ? "text-mark" : "text-faint"
          )}
          aria-label={score !== null ? `نمره ${formatScore(score)} از ${faNum(20)}` : "بدون نمره"}
        >
          {score !== null ? formatScore(score) : "—"}
        </span>
        {graded && size !== "sm" ? (
          <span className="type-label">از {faNum(20)}</span>
        ) : null}
      </div>
      {underline && graded ? <PenStroke mode={underline} className="mt-1" /> : null}
      {showLabel ? (
        <span className="type-meta mt-2">
          {score !== null ? getScoreLabel(score) : "در انتظار نمره"}
        </span>
      ) : null}
    </div>
  );
}
