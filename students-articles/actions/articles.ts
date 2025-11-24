"use server";

import connectDB from "@/lib/server/mongoose";
import Article from "@/models/Article";
import { ArticleSchema } from "@/lib/validations/articleValidation";
import { getCurrentUser } from "@/lib/server/getCurrentUser";


export async function createArticle(formData: FormData) {
  try {
    const user = await getCurrentUser();

    if (user.role !== "student") {
      throw new Error("فقط دانشجویان می‌توانند مقاله ایجاد کنند");
    }

    const rawData = {
      title: formData.get("title"),
      content: formData.get("content"),
      category: formData.get("category"),
      tags: formData.get("tags")
        ? JSON.parse(formData.get("tags") as string)
        : [],
    };

    const validatedData = ArticleSchema.create.parse(rawData);

    await connectDB();

    const article = new Article({
      ...validatedData,
      author: user._id.toString(),
    });

    await article.save();

    return { success: true, articleId: article._id.toString() };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getArticles(page: number = 1, limit: number = 10) {
  try {
    await connectDB();

    const skip = (page - 1) * limit;

    const articles = await Article.find()
      .populate("author", "fullName university field")
      .populate("grades.professor", "fullName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Article.countDocuments();

    return {
      success: true,
      articles: JSON.parse(JSON.stringify(articles)),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getArticleById(id: string) {
  try {
    await connectDB();

    const article = await Article.findById(id)
      .populate("author", "fullName university field")
      .populate("grades.professor", "fullName");

    if (!article) {
      throw new Error("مقاله یافت نشد");
    }

    return { success: true, article: JSON.parse(JSON.stringify(article)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateArticle(id: string, formData: FormData) {
  try {
    const user = await getCurrentUser();

    await connectDB();

    const article = await Article.findById(id);
    if (!article) {
      throw new Error("مقاله یافت نشد");
    }

    if (article.author.toString() !== user._id.toString()) {
      throw new Error("شما فقط می‌توانید مقالات خود را ویرایش کنید");
    }

    const rawData = {
      title: formData.get("title"),
      content: formData.get("content"),
      category: formData.get("category"),
      tags: formData.get("tags")
        ? JSON.parse(formData.get("tags") as string)
        : [],
    };

    const validatedData = ArticleSchema.update.parse(rawData);

    Object.assign(article, validatedData);
    await article.save();

    return { success: true, article: JSON.parse(JSON.stringify(article)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteArticle(id: string) {
  try {
    const user = await getCurrentUser();

    await connectDB();

    const article = await Article.findById(id);
    if (!article) {
      throw new Error("مقاله یافت نشد");
    }

    if (article.author.toString() !== user._id.toString()) {
      throw new Error("شما فقط می‌توانید مقالات خود را حذف کنید");
    }

    await Article.findByIdAndDelete(id);

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getMyArticles() {
  try {
    const user = await getCurrentUser();

    await connectDB();

    const articles = await Article.find({ author: user._id })
      .populate("grades.professor", "fullName")
      .sort({ createdAt: -1 });

    return { success: true, articles: JSON.parse(JSON.stringify(articles)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
