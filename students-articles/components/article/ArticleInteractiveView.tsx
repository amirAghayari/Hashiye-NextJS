"use client";

// TODO : کامپوننت بندی کن

import { useState, useActionState } from "react"; // useActionState is React 19 hook
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  updateArticleAction,
  deleteArticleAction,
  gradeArticleAction,
} from "@/actions/article-wrapper";
import { Article } from "@/types/article";

// TODO
interface ArticleViewProps {
  initialArticle: Article;
  isOwner: boolean;
  isProfessor: boolean;
}

export default function ArticleInteractiveView({
  initialArticle,
  isOwner,
  isProfessor,
}: ArticleViewProps) {
  const initialState = {
    message: "",
    success: false,
  };

  const [article, setArticle] = useState(initialArticle);
  const [isEditing, setIsEditing] = useState(false);
  const [isGrading, setIsGrading] = useState(false);

  const [deleteState, deleteAction, isDeleting] = useActionState(
    deleteArticleAction,
    initialState
  );

  // TODO : فهم این قسمت
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

  // TODO :
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  const getScoreColor = (score: number) => {
    if (score >= 17) return "text-green-600";
    if (score >= 14) return "text-blue-600";
    if (score >= 10) return "text-yellow-600";
    return "text-red-600";
  };
  const getScoreLabel = (score: number) => {
    if (score >= 17) return "عالی";
    if (score >= 14) return "خوب";
    if (score >= 10) return "قابل قبول";
    return "ضعیف";
  };

  return (
    <>
      {(updateState?.message ||
        deleteState?.message ||
        gradeState?.message) && (
        <div
          className={`px-4 py-3 rounded mb-6 ${
            updateState?.success || gradeState?.success
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {updateState?.message || deleteState?.message || gradeState?.message}
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              {isEditing ? (
                <form
                  id="edit-form"
                  action={updateAction}
                  className="space-y-4"
                >
                  <input
                    name="title"
                    defaultValue={article.title}
                    className="text-2xl font-bold w-full border rounded px-3 py-2"
                    placeholder="عنوان مقاله"
                    required
                  />
                  <input
                    type="hidden"
                    name="tags"
                    value={article.tags.join(", ")}
                  />
                </form>
              ) : (
                <CardTitle className="text-2xl">{article.title}</CardTitle>
              )}

              <CardDescription className="mt-2">
                <div className="flex items-center gap-4 text-sm">
                  <span>نویسنده: {article.author.fullName}</span>
                  <span>{formatDate(article.createdAt)}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {article.category}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {article.author.university} - {article.author.field}
                </div>
              </CardDescription>
            </div>

            <div className="flex gap-2">
              {isOwner && !isEditing && (
                <>
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    ویرایش
                  </Button>
                  <form action={deleteAction}>
                    <input type="hidden" name="id" value={article._id} />
                    <Button
                      variant="destructive"
                      type="submit"
                      disabled={isDeleting}
                    >
                      {isDeleting ? "..." : "حذف"}
                    </Button>
                  </form>
                </>
              )}
              {isOwner && isEditing && (
                <>
                  <Button type="submit" form="edit-form" disabled={isUpdating}>
                    {isUpdating ? "در حال ذخیره..." : "ذخیره"}
                  </Button>
                  <Button onClick={() => setIsEditing(false)} variant="outline">
                    انصراف
                  </Button>
                </>
              )}
              {isProfessor && !isGrading && (
                <Button onClick={() => setIsGrading(true)}>نمره‌دهی</Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  دسته‌بندی
                </label>
                <select
                  name="category"
                  defaultValue={article.category}
                  form="edit-form"
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="کامپیوتر">کامپیوتر</option>
                  <option value="مهندسی">مهندسی</option>
                  <option value="علوم پایه">علوم پایه</option>
                  <option value="پزشکی">پزشکی</option>
                  <option value="علوم انسانی">علوم انسانی</option>
                  <option value="هنر">هنر</option>
                  <option value="سایر">سایر</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  برچسب‌ها (جدا شده با کاما)
                </label>
                <input
                  type="text"
                  name="tags"
                  defaultValue={article.tags.join(", ")}
                  form="edit-form"
                  className="w-full border rounded px-3 py-2"
                  placeholder="مثال: وب، برنامه‌نویسی، جاوااسکریپت"
                />
                <p className="text-xs text-gray-500 mt-1">
                  برچسب‌ها را با کاما از هم جدا کنید
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">محتوا</label>
                <textarea
                  name="content"
                  defaultValue={article.content}
                  form="edit-form"
                  className="w-full border rounded px-3 py-2 h-64"
                  required
                />
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-3">محتوای مقاله</h3>
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {article.content}
              </div>
            </div>
          )}

          {!isEditing && article.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">برچسب‌ها</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* --- Grades Section --- */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">نمرات و نظرات اساتید</h3>
            <div className="text-center mb-6">
              <div
                className={`text-5xl font-bold ${getScoreColor(
                  article.averageScore
                )}`}
              >
                {article.averageScore.toFixed(1)}
              </div>
              <div
                className={`text-lg font-medium mt-2 ${getScoreColor(
                  article.averageScore
                )}`}
              >
                {getScoreLabel(article.averageScore)}
              </div>
              <div className="text-gray-500 text-sm mt-1">
                میانگین از {article.grades.length} نمره
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {article.grades.map((grade) => (
                <Card key={grade._id}>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">
                          {grade.professor.fullName}
                        </div>
                        <div
                          className={`text-2xl font-bold ${getScoreColor(
                            grade.score
                          )}`}
                        >
                          نمره: {grade.score}
                        </div>
                        {grade.comment && (
                          <div className="mt-2 text-gray-700">
                            <span className="font-medium text-sm">
                              توضیحات:{" "}
                            </span>
                            {grade.comment}
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(grade.gradedAt)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {isProfessor && isGrading && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-lg">نمره‌دهی جدید</CardTitle>
                </CardHeader>
                <CardContent>
                  <form action={gradeAction} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        نمره (۰ تا ۲۰)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        name="score"
                        className="w-full border rounded px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        توضیحات
                      </label>
                      <textarea
                        name="comment"
                        className="w-full border rounded px-3 py-2 h-24"
                        placeholder="نظر خود را بنویسید..."
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={isSubmittingGrade}>
                        {isSubmittingGrade ? "در حال ثبت..." : "ثبت نمره"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsGrading(false)}
                      >
                        انصراف
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
