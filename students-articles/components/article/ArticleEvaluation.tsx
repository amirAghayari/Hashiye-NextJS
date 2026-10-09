import { ScoreMark } from "@/components/editorial/ScoreMark";
import { formatDate } from "@/lib/formatDate";
import { faNum } from "@/lib/format";
import type { Article } from "@/types/article";

type ArticleEvaluationProps = {
  article: Article;
  /** The grading button or form, for professors. */
  action?: React.ReactNode;
};

/**
 * The margin of the article: the average as a large red numeral, then each
 * professor's note. A grade belongs to the whole article, so these are not
 * anchored to passages.
 */
export function ArticleEvaluation({ article, action }: ArticleEvaluationProps) {
  const { grades, averageScore } = article;
  const graded = grades.length > 0;

  return (
    <section aria-labelledby="evaluation-title" className="lg:sticky lg:top-24">
      <h2 id="evaluation-title" className="type-label">
        حاشیهٔ استادان
      </h2>

      <div className="mt-6">
        <ScoreMark score={graded ? averageScore : null} size="xl" showLabel underline="view" />
      </div>
      <p className="type-meta mt-4 text-muted-foreground">
        {graded
          ? `میانگین ${faNum(grades.length)} بازخورد`
          : "هنوز استادی به این مقاله نمره نداده است."}
      </p>

      {graded ? (
        <ol className="mt-10 grid gap-8 border-t pt-8">
          {grades.map((grade, i) => (
            <li key={grade._id}>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-6 shrink-0 place-items-center rounded-full bg-mark text-label font-bold text-mark-foreground"
                >
                  {faNum(i + 1)}
                </span>
                <span className="type-meta font-medium">{grade.professor.fullName}</span>
              </div>
              <div className="mt-3">
                <ScoreMark score={grade.score} size="md" />
              </div>
              {grade.comment ? (
                <p className="type-body mt-3 whitespace-pre-line">{grade.comment}</p>
              ) : null}
              <p className="type-label mt-3">{formatDate(grade.gradedAt)}</p>
            </li>
          ))}
        </ol>
      ) : null}

      {action}
    </section>
  );
}
