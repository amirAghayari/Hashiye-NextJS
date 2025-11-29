"use server";

import connectDB from "@/lib/server/mongoose";
import Article from "@/models/Article";
// فرض بر این است که این فایل‌ها وجود دارند
import { ArticleSchema } from "@/lib/validations/articleValidation";
import { getCurrentUser } from "@/lib/server/getCurrentUser";

// تعریف تایپ‌ها برای جلوگیری از ارورهای تایپ‌اسکریپت
type ActionState = {
  success: boolean;
  error?: string;
  message?: string;
  user?: any;
  articleId?: string;
  article?: any;
  pagination?: any;
  articles?: any[];
};

export async function createArticle(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
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
        ? (formData.get("tags") as string)
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
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

export async function getArticles(prevState: any, formData: FormData) {
  try {
    const page = parseInt(formData.get("page") as string) || 1;
    const limit = parseInt(formData.get("limit") as string) || 10;
    const user = await getCurrentUser();

    await connectDB();

    const skip = (page - 1) * limit;

    const isStudent = user.role === "student";

    const articles = await Article.find(isStudent ? { author: user._id } : {})
      .populate("author", "fullName university field")
      .populate("grades.professor", "fullName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Article.countDocuments();

    return {
      success: true,
      error: undefined,
      articles: JSON.parse(JSON.stringify(articles)),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      articles: undefined,
      pagination: undefined,
    };
  }
}

export async function getArticleById(id: string) {
  try {
    // Validate ObjectId format
    if (!id || typeof id !== "string" || !/^[0-9a-fA-F]{24}$/.test(id)) {
      throw new Error("مقاله یافت نشد");
    }

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
    // Validate ObjectId format
    if (!id || typeof id !== "string" || !/^[0-9a-fA-F]{24}$/.test(id)) {
      throw new Error("مقاله یافت نشد");
    }

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
        ? (formData.get("tags") as string)
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
        : [],
    };

    const validatedData = ArticleSchema.update.parse(rawData);

    Object.assign(article, validatedData);
    await article.save();

    // Population برای بازگرداندن دیتای کامل به کلاینت بعد از آپدیت
    await article.populate("author", "fullName university field");
    await article.populate("grades.professor", "fullName");

    return { success: true, article: JSON.parse(JSON.stringify(article)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteArticle(id: string) {
  try {
    // Validate ObjectId format
    if (!id || typeof id !== "string" || !/^[0-9a-fA-F]{24}$/.test(id)) {
      throw new Error("مقاله یافت نشد");
    }

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
