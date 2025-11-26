"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  updateArticle,
  deleteArticle,
  getArticleById,
} from "@/actions/articles";
import { gradeArticle, State as GradeState } from "@/actions/grades";

export type ActionState = {
  message: string;
  success: boolean;
  article?: any;
  error?: string;
};

// Wrapper for Update
export async function updateArticleAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = formData.get("id") as string;

  if (!id || typeof id !== "string" || !/^[0-9a-fA-F]{24}$/.test(id)) {
    return { success: false, message: "شناسه مقاله نامعتبر است" };
  }

  const result = await updateArticle(id, formData);

  if (result.success) {
    revalidatePath(`/articles/${id}`);
    return {
      success: true,
      message: "مقاله با موفقیت ویرایش شد",
      article: result.article,
    };
  }

  return { success: false, message: result.error || "خطا در ویرایش مقاله" };
}

// Wrapper for Delete
export async function deleteArticleAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = formData.get("id") as string;

  if (!id || typeof id !== "string" || !/^[0-9a-fA-F]{24}$/.test(id)) {
    return { success: false, message: "شناسه مقاله نامعتبر است" };
  }

  const result = await deleteArticle(id);

  if (result.success) {
    // موفقیت آمیز
  } else {
    return { success: false, message: result.error || "خطا در حذف مقاله" };
  }

  redirect("/dashboard");
}

// Wrapper for Grading
export async function gradeArticleAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const articleId = formData.get("articleId") as string;

  if (
    !articleId ||
    typeof articleId !== "string" ||
    !/^[0-9a-fA-F]{24}$/.test(articleId)
  ) {
    return { success: false, message: "شناسه مقاله نامعتبر است" };
  }

  // فراخوانی متد جدید شما که (prevState, formData) می‌گیرد
  // ما prevState فعلی را پاس می‌دهیم (هرچند شاید استفاده نشود)
  const gradePrevState: GradeState = { success: false };
  const result = await gradeArticle(gradePrevState, formData);

  if (result.success) {
    // 1. پاکسازی کش نکست
    revalidatePath(`/articles/${articleId}`);

    // 2. دریافت مجدد مقاله برای آپدیت UI
    // چون متد gradeArticle شما آبجکت مقاله را برنمی‌گرداند، ما دستی آن را می‌گیریم
    // تا لیست نمرات در فرانت‌اند بلافاصله آپدیت شود
    const freshData = await getArticleById(articleId);

    return {
      success: true,
      message: result.message || "نمره با موفقیت ثبت شد",
      article: freshData.success ? freshData.article : undefined,
    };
  }

  return { success: false, message: result.error || "خطا در ثبت نمره" };
}
