"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getScoreColor } from "@/lib/getScoreColor";
import { useGrades } from "@/store/gradeStore";
import { Article } from "@/types/article";

export function ArticlesList({
  initialArticles,
}: {
  initialArticles: Article[];
}) {
  const { selectedArticle, setSelectedArticle } = useGrades();
  const [articles, setArticles] = useState(initialArticles);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return;
  }, []);

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Card
          key={article._id}
          className={`cursor-pointer transition-all ${
            selectedArticle?._id === article._id
              ? "ring-2 ring-blue-500"
              : "hover:shadow-md"
          }`}
          onClick={() => setSelectedArticle(article)}
        >
          <CardHeader>
            <CardTitle>{article.title}</CardTitle>
            <CardDescription>{article.author.fullName}</CardDescription>
          </CardHeader>
          <CardContent>
            <span>{`${article.content.slice(0, 100)}...`}</span>

            <div
              className={`text-xl font-bold ${getScoreColor(
                article.averageScore
              )}`}
            >
              {article.averageScore.toFixed(1)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
