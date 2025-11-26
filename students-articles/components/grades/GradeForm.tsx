"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { gradeArticle } from "./../../actions/grades";

interface GradeState {
  success: boolean;
  error?: string;
  message?: string;
}

export function GradeForm({ articleId }: { articleId: string }) {
  const initialState: GradeState = {
    success: false,
    error: undefined,
    message: undefined,
  };

  const [state, action, pending] = useActionState<GradeState, FormData>(
    gradeArticle,
    initialState
  );

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="articleId" value={articleId} />

      <label>نمره (۰ تا ۲۰) :</label>
      <Input
        name="score"
        type="number"
        placeholder="نمره :"
        min="0"
        max="20"
        step="0.5"
        required
        disabled={pending}
      />
      <label>توضیحات :</label>
      <Textarea
        name="comment"
        rows={4}
        disabled={pending}
        placeholder="توضیحات اختیاری"
      />

      <Button type="submit" disabled={pending}>
        {pending ? "در حال ارسال..." : "ثبت نمره"}
      </Button>

      {state.success && <p className="text-green-600">{state.message}</p>}
      {state.error && <p className="text-red-600">{state.error}</p>}
    </form>
  );
}
