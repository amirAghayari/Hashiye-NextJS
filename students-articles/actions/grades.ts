"use server";

import connectDB from "@/lib/server/mongoose";
import { GradeSchema } from "@/lib/validations/gradeValidation";
import Article from "@/models/Article";
import { getCurrentUser } from "@/lib/server/getCurrentUser";



export async function gradeArticle(formData: FormData) {
  try {
    const user = await getCurrentUser();

    if (user.role !== "professor") {
      throw new Error("فقط اساتید می‌توانند به مقالات نمره دهند");
    }

    const data = {
      articleId: formData.get("articleId"),
      score: Number(formData.get("score")),
      comment: formData.get("comment") || undefined,
    };

    const validatedData = GradeSchema.create.parse(data);

    await connectDB();

    const article = await Article.findById(validatedData.articleId);
    if (!article) {
      throw new Error("مقاله یافت نشد");
    }

    const existingGradeIndex = article.grades.findIndex(
      (grade) => grade.professor.toString() === user._id.toString()
    );

    const newGrade = {
      professor: user._id,
      score: validatedData.score,
      comment: validatedData.comment,
      gradedAt: new Date(),
    };

    if (existingGradeIndex !== -1) {
      article.grades[existingGradeIndex] = newGrade;
    } else {
      article.grades.push(newGrade);
    }

    await article.save();

    return { success: true, article: JSON.parse(JSON.stringify(article)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getArticlesForGrading() {
  try {
    const user = await getCurrentUser();

    if (user.role !== "professor") {
      throw new Error(
        "فقط اساتید می‌توانند مقالات را برای نمره‌دهی مشاهده کنند"
      );
    }

    await connectDB();

    const articles = await Article.find()
      .populate("author", "fullName university field")
      .sort({ createdAt: -1 });

    return { success: true, articles: JSON.parse(JSON.stringify(articles)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function removeGrade(articleId: string) {
  try {
    const user = await getCurrentUser();

    await connectDB();

    const article = await Article.findById(articleId);
    if (!article) {
      throw new Error("مقاله یافت نشد");
    }

    article.grades = article.grades.filter(
      (grade) => grade.professor.toString() !== user._id.toString()
    );

    await article.save();

    return { success: true, article: JSON.parse(JSON.stringify(article)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
