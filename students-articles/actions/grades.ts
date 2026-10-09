"use server";

import connectDB from "@/lib/server/mongoose";
import { GradeSchema } from "@/lib/validations/gradeValidation";
import Article from "@/models/Article";
import { requireUser } from "@/lib/server/getCurrentUser";

export type State = {
  success: boolean;
  error?: string;
  message?: string;
};

export async function gradeArticle(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const user = await requireUser();
    if (user.role !== "professor") {
      return { success: false, error: "فقط اساتید می‌توانند نمره دهند" };
    }

    const articleId = formData.get("articleId") as string;
    const score = Number(formData.get("score"));
    const comment = (formData.get("comment") as string) || undefined;

    const validatedData = GradeSchema.create.parse({
      articleId,
      score,
      comment,
    });

    await connectDB();

    const article = await Article.findById(validatedData.articleId);
    if (!article) return { success: false, error: "مقاله یافت نشد" };

    const existingIndex = article.grades.findIndex(
      (g: any) => g.professor.toString() === user._id.toString()
    );

    const newGrade = {
      professor: user._id,
      score: validatedData.score,
      comment: validatedData.comment,
      gradedAt: new Date(),
    };

    if (existingIndex > -1) {
      article.grades[existingIndex] = newGrade;
    } else {
      article.grades.push(newGrade);
    }

    await article.save();

    return {
      success: true,
      message: existingIndex > -1 ? "نمره به‌روزرسانی شد" : "نمره ثبت شد",
    };
  } catch (err: any) {
    return { success: false, error: err.message || "خطای سرور" };
  }
}

export async function getArticlesForGrading() {
  try {
    const user = await requireUser();

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
    const user = await requireUser();

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
