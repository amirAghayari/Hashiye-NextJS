"use client";

import { useState, useEffect } from "react";
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
  getArticleById,
  updateArticle,
  deleteArticle,
} from "@/actions/articles";
import { gradeArticle } from "@/actions/grades";
import { Article } from "@/types/article";


// TODO : دیتارو داری با یوز افکت میگیری احمق اشتباهه اینطوری

// TODO : پارامز و سرچ پارامز پرامیسن تو نکست 15

// TODO :کامپونننت هات کاملا

// TODO : به جای استیت های زیاد از سرور اکشن و یوز اکشن استیت استفاده کن

// TODO : صفحات رو سرور ساید کن

// TODO :از هپی اونلی برای کوکی ها استفاده کن

// TODO : از ریدایرکت نکست استفاده کن

// TODO : با پرامیس آل دیتای یوزر و مقاله اینارو بگیریم تا پرفورمنس بهتر باشه

// TODO : فرم هارو با اکشن اوکی کن چون بدون جی اس هم کار کنند
export default function ArticleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    category: "",
    tags: [] as string[],
  });
  const [gradeForm, setGradeForm] = useState({
    score: 0,
    comment: "",
  });
  const [isGrading, setIsGrading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/auth/login");
      return;
    }

    fetchArticle();
  }, [router, params.id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const result = await getArticleById(params.id);

      if (result.success) {
        setArticle(result.article);
        setEditForm({
          title: result.article.title,
          content: result.article.content,
          category: result.article.category,
          tags: result.article.tags,
        });
      } else {
        setError(result.error || "خطا در دریافت مقاله");
      }
    } catch (err) {
      setError("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (formData: FormData) => {
    try {
      formData.set("tags", JSON.stringify(editForm.tags));
      const result = await updateArticle(params.id, formData);

      if (result.success) {
        setArticle(result.article);
        setIsEditing(false);
      } else {
        setError(result.error || "خطا در ویرایش مقاله");
      }
    } catch (err) {
      setError("خطا در ارتباط با سرور");
    }
  };

  const handleDelete = async () => {
    if (confirm("آیا از حذف این مقاله مطمئن هستید؟")) {
      try {
        const result = await deleteArticle(params.id);

        if (result.success) {
          router.push("/dashboard");
        } else {
          setError(result.error || "خطا در حذف مقاله");
        }
      } catch (err) {
        setError("خطا در ارتباط با سرور");
      }
    }
  };

  const handleGrade = async (formData: FormData) => {
    try {
      formData.set("articleId", params.id);
      const result = await gradeArticle(formData);

      if (result.success) {
        setArticle(result.article);
        setIsGrading(false);
        setGradeForm({ score: 0, comment: "" });
      } else {
        setError(result.error || "خطا در نمره‌دهی");
      }
    } catch (err) {
      setError("خطا در ارتباط با سرور");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fa-IR");
  };

  const getScoreColor = (score: number) => {
    if (score >= 17) return "text-green-600";
    if (score >= 14) return "text-blue-600";
    if (score >= 10) return "text-yellow-600";
    return "text-red-600";
  };

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const isOwner = user && article && user.id === article.author._id;
  const isProfessor = user && user.role === "professor";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">در حال بارگذاری...</div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-red-600">مقاله یافت نشد</div>
        </div>
      </div>
    );
  }

  // TODO : کامپوننت بندی کن
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                    className="text-2xl font-bold w-full border rounded px-3 py-2"
                  />
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
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                    >
                      ویرایش
                    </Button>
                    <Button onClick={handleDelete} variant="destructive">
                      حذف
                    </Button>
                  </>
                )}

                {isOwner && isEditing && (
                  <>
                    <Button onClick={() => handleUpdate(new FormData())}>
                      ذخیره
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                    >
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
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="کامپیوتر">کامپیوتر</option>
                    <option value="مهندسی">مهندسی</option>
                    <option value="علوم پایه">علوم پایه</option>
                    <option value=" پزشکی">پزشکی</option>
                    <option value="علوم انسانی">علوم انسانی</option>
                    <option value="هنر">هنر</option>
                    <option value="سایر">سایر</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    محتوا
                  </label>
                  <textarea
                    value={editForm.content}
                    onChange={(e) =>
                      setEditForm({ ...editForm, content: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2 h-64"
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

            {article.tags.length > 0 && (
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

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">
                نمرات و نظرات اساتید
              </h3>

              <div className="mb-6 text-center">
                <div
                  className={`text-4xl font-bold ${getScoreColor(
                    article.averageScore
                  )}`}
                >
                  {article.averageScore.toFixed(1)}
                </div>
                <div className="text-gray-500">
                  میانگین نمرات از {article.grades.length} استاد
                </div>
              </div>

              {article.grades.length > 0 ? (
                <div className="space-y-4">
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
                                <div className="font-medium text-sm">
                                  توضیحات:
                                </div>
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
              ) : (
                <div className="text-center text-gray-500 py-8">
                  هنوز نمره‌ای به این مقاله داده نشده است
                </div>
              )}
            </div>

            {isProfessor && isGrading && (
              <Card>
                <CardHeader>
                  <CardTitle>نمره‌دهی به مقاله</CardTitle>
                </CardHeader>
                <CardContent>
                  <form action={handleGrade} className="space-y-4">
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
                        value={gradeForm.score}
                        onChange={(e) =>
                          setGradeForm({
                            ...gradeForm,
                            score: parseFloat(e.target.value),
                          })
                        }
                        className="w-full border rounded px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        توضیحات (اختیاری)
                      </label>
                      <textarea
                        name="comment"
                        value={gradeForm.comment}
                        onChange={(e) =>
                          setGradeForm({
                            ...gradeForm,
                            comment: e.target.value,
                          })
                        }
                        className="w-full border rounded px-3 py-2 h-24"
                        placeholder="توضیحات خود را اینجا بنویسید..."
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit">ثبت نمره</Button>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
