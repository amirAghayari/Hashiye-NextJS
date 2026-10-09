"use client";

import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/editorial/Notice";
import { Spread } from "@/components/editorial/Spread";
import { GradeFields } from "@/components/grading/GradeFields";
import { ArticleBody } from "@/components/article/ArticleBody";
import { ArticleEditor } from "@/components/article/ArticleEditor";
import { ArticleEvaluation } from "@/components/article/ArticleEvaluation";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { DeleteArticle } from "@/components/article/DeleteArticle";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import {
  updateArticleAction,
  deleteArticleAction,
  gradeArticleAction,
} from "@/actions/article-wrapper";
import type { ArticleViewProps } from "@/types/article";

export default function ArticleInteractiveView({
  initialArticle,
  isOwner,
  isProfessor,
}: ArticleViewProps) {
  const initialState = { message: "", success: false };

  const [article, setArticle] = useState(initialArticle);
  const [isEditing, setIsEditing] = useState(false);
  const [isGrading, setIsGrading] = useState(false);
  const bodyRef = useRef<HTMLElement>(null);

  const [deleteState, deleteAction, isDeleting] = useActionState(
    deleteArticleAction,
    initialState
  );

  // The wrapper actions only know the id from the form, so it is appended here.
  const [updateState, updateAction, isUpdating] = useActionState(
    async (prevState: any, formData: FormData) => {
      formData.append("id", article._id);
      const result = await updateArticleAction(prevState, formData);
      if (result.success && result.article) {
        setArticle(result.article);
        setIsEditing(false);
      }
      return result;
    },
    initialState
  );

  const [gradeState, gradeAction, isSubmittingGrade] = useActionState(
    async (prevState: any, formData: FormData) => {
      formData.append("articleId", article._id);
      const result = await gradeArticleAction(prevState, formData);
      if (result.success && result.article) {
        setArticle(result.article);
        setIsGrading(false);
      }
      return result;
    },
    initialState
  );

  const message = updateState?.message || deleteState?.message || gradeState?.message;
  const messageIsSuccess = Boolean(updateState?.success || gradeState?.success);

  // Check if professor has already graded this article
  const hasGraded = article.grades.some(
    (grade) => String(grade.professor._id) === String(initialArticle.author?._id)
  );

  const gradingAction = isProfessor && !hasGraded ? (
    isGrading ? (
      <form action={gradeAction} className="mt-10 border-t pt-8">
        <h3 className="type-subhead mb-6">نمرهٔ شما</h3>
        <GradeFields
          pending={isSubmittingGrade}
          onCancel={() => setIsGrading(false)}
          idPrefix="article-grade"
          autoFocus
        />
      </form>
    ) : (
      <Button variant="mark" className="mt-10" onClick={() => setIsGrading(true)}>
        نمره‌دهی به این مقاله
      </Button>
    )
  ) : null;

  return (
    <>
      <div className="page flex flex-wrap items-center justify-between gap-4 pt-6">
        <Link
          href="/dashboard"
          className="inline-flex min-h-11 items-center gap-2 type-meta underline-offset-8 hover:underline"
        >
          <ArrowRight className="size-4" aria-hidden />
          بازگشت به مقاله‌ها
        </Link>
        {isOwner && !isEditing ? (
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              ویرایش
            </Button>
            <DeleteArticle id={article._id} action={deleteAction} pending={isDeleting} />
          </div>
        ) : null}
      </div>

      {message ? (
        <div className="page sticky top-4 z-40 pt-4">
          <Notice tone={messageIsSuccess ? "success" : "error"}>{message}</Notice>
        </div>
      ) : null}

      {isEditing ? (
        <ArticleEditor
          article={article}
          action={updateAction}
          pending={isUpdating}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <ReadingProgress targetRef={bodyRef} />
          <ArticleHeader article={article} />
          <div className="page">
            <Spread
              marginWidth="lg"
              mainClassName="py-12 md:py-16"
              marginClassName="py-12 md:py-16"
              main={
                <article ref={bodyRef}>
                  <ArticleBody content={article.content} tags={article.tags} />
                </article>
              }
              margin={<ArticleEvaluation article={article} action={gradingAction} />}
            />
          </div>
        </>
      )}
    </>
  );
}
