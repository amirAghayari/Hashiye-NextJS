"use client";

import { useEffect, useRef } from "react";
import { ArticleBody } from "@/components/article/ArticleBody";
import { ScoreMark } from "@/components/editorial/ScoreMark";
import { GradeForm } from "@/components/grades/GradeForm";
import { useGrades } from "@/store/gradeStore";

export function ArticleDetails() {
  const { selectedArticle } = useGrades();
  const panel = useRef<HTMLDivElement>(null);
  const selectedId = selectedArticle?._id;

  // On small screens the reader sits below the list, so bring it into view.
  useEffect(() => {
    if (!selectedId || !window.matchMedia("(max-width: 1023px)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panel.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [selectedId]);

  if (!selectedArticle) {
    return (
      <p className="type-deck text-muted-foreground">
        مقاله‌ای را از فهرست انتخاب کنید تا اینجا مطالعه و نمره‌دهی کنید.
      </p>
    );
  }

  const graded = selectedArticle.grades.length > 0;
  // Check if the current professor has already graded this article
  // Note: In a real app, this would come from server-side session data
  const hasGraded = false; // This will be determined server-side

  return (
    <div ref={panel} className="scroll-mt-6 lg:sticky lg:top-6 lg:max-h-[calc(100dvh-3rem)] lg:overflow-y-auto lg:pe-2">
      <p className="type-label">
        {selectedArticle.author.fullName}، {selectedArticle.author.university}
      </p>
      <h2 className="type-title mt-3">{selectedArticle.title}</h2>
      <div className="mt-6">
        <ScoreMark
          score={graded ? selectedArticle.averageScore : null}
          size="md"
          showLabel
        />
      </div>
      <div className="mt-10">
        <ArticleBody content={selectedArticle.content} tags={selectedArticle.tags} />
      </div>
      <div className="mt-12 border-t-2 border-mark pt-8">
        <h3 className="type-subhead mb-6">نمرهٔ شما</h3>
        <GradeForm key={selectedArticle._id} articleId={selectedArticle._id} />
      </div>
    </div>
  );
}
