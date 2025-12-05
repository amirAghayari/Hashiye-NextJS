"use client";

import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createArticle } from "@/actions/articles";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialState = {
  success: false,
  error: "",
};

export default function CreateArticlePage() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    createArticle,
    initialState
  );

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (!userData) {
        return;
      }
      try {
        const user = JSON.parse(userData);
        if (user.role !== "student") {
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [router]);

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
    }
  }, [state.success, router]);

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed) && tags.length < 10) {
      setTags((prev) => [...prev, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">
            ایجاد مقاله جدید
          </h1>
          <p className="text-gray-600">
            اطلاعات مقاله خود را در فرم زیر وارد کنید
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>فرم ایجاد مقاله</CardTitle>
            <CardDescription>
              تمام فیلدهای الزامی را با دقت پر کنید
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان مقاله *</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="عنوان مقاله خود را وارد کنید"
                  required
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Select name="category" required>
                  <SelectTrigger className="w-[180px]" id="category">
                    <SelectValue placeholder="دسته بندی" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="کامپیوتر">کامپیوتر</SelectItem>
                    <SelectItem value="مهندسی">مهندسی</SelectItem>
                    <SelectItem value="علوم پایه">علوم پایه</SelectItem>
                    <SelectItem value="پزشکی">پزشکی</SelectItem>
                    <SelectItem value="علوم انسانی">علوم انسانی</SelectItem>
                    <SelectItem value="هنر">هنر</SelectItem>
                    <SelectItem value="سایر">سایر</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">محتوای مقاله *</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="محتوای کامل مقاله خود را اینجا بنویسید..."
                  required
                  rows={10}
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">برچسب‌ها (حداکثر ۱۰ برچسب)</Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    type="text"
                    placeholder="برچسب را وارد کرده و Enter را بزنید"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="text-right"
                  />
                  <Button
                    type="button"
                    onClick={addTag}
                    disabled={!tagInput.trim() || tags.length >= 10}
                  >
                    افزودن
                  </Button>
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {state.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {state.error}
                </div>
              )}

              {/* تگ‌ها به صورت مخفی ارسال میشن */}
              <input type="hidden" name="tags" value={tags.join(", ")} />

              <div className="flex gap-4">
                <Button type="submit" disabled={isPending} className="flex-1">
                  {isPending ? "در حال ایجاد..." : "ایجاد مقاله"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard")}
                >
                  انصراف
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
