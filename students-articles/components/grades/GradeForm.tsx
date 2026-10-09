"use client";

import { useActionState } from "react";
import { gradeArticle } from "@/actions/grades";
import { GradeFields } from "@/components/grading/GradeFields";
import { Notice } from "@/components/editorial/Notice";

interface GradeState {
  success: boolean;
  error?: string;
  message?: string;
}

const initialState: GradeState = { success: false, error: undefined, message: undefined };

export function GradeForm({ articleId }: { articleId: string }) {
  const [state, action, pending] = useActionState<GradeState, FormData>(
    gradeArticle,
    initialState
  );

  return (
    <form action={action} className="grid gap-6">
      <input type="hidden" name="articleId" value={articleId} />
      <GradeFields pending={pending} idPrefix="list-grade" />
      {state.success && state.message ? <Notice>{state.message}</Notice> : null}
      {state.error ? <Notice tone="error">{state.error}</Notice> : null}
    </form>
  );
}
