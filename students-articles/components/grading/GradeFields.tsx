import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type GradeFieldsProps = {
  pending: boolean;
  onCancel?: () => void;
  idPrefix?: string;
  autoFocus?: boolean;
};

/** Score and comment fields shared by every grading form. Must sit inside a <form>. */
export function GradeFields({
  pending,
  onCancel,
  idPrefix = "grade",
  autoFocus = false,
}: GradeFieldsProps) {
  return (
    <div className="grid gap-6">
      <Field label="نمره (از ۰ تا ۲۰)" htmlFor={`${idPrefix}-score`}>
        <Input
          id={`${idPrefix}-score`}
          name="score"
          type="number"
          min="0"
          max="20"
          step="0.5"
          inputMode="decimal"
          required
          autoFocus={autoFocus}
        />
      </Field>
      <Field label="توضیح برای دانشجو" htmlFor={`${idPrefix}-comment`} hint="اختیاری، حداکثر ۵۰۰ نویسه">
        <Textarea
          id={`${idPrefix}-comment`}
          name="comment"
          rows={5}
          maxLength={500}
          dir="auto"
          className="min-h-36"
        />
      </Field>
      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="mark" disabled={pending}>
          {pending ? "در حال ثبت…" : "ثبت نمره"}
        </Button>
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel} disabled={pending}>
            انصراف
          </Button>
        ) : null}
      </div>
    </div>
  );
}
