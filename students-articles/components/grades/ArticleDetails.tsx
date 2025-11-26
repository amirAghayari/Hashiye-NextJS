"use client";
import { useGrades } from "@/store/gradeStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { GradeForm } from "./GradeForm";

export function ArticleDetails() {
  const { selectedArticle } = useGrades();
  if (!selectedArticle)
    return (
      <Card>
        <CardContent className="text-center py-12">
          یک مقاله را انتخاب کنید
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{selectedArticle.title}</CardTitle>
        <CardDescription>{selectedArticle.author.fullName}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 whitespace-pre-wrap mb-4">
          {selectedArticle.content}
        </p>

        <GradeForm articleId={selectedArticle._id} />
      </CardContent>
    </Card>
  );
}
