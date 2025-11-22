'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createArticle } from '@/actions/articles';
import Navbar from '@/components/Navbar';

export default function CreateArticlePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const router = useRouter();

  // بررسی نقش کاربر و redirect
  useEffect(() => {
    const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (!userData) {
      router.push('/auth/login');
      return;
    }

    const user = JSON.parse(userData);
    if (user.role !== 'student') {
      router.push('/dashboard');
      return;
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    formData.set('tags', JSON.stringify(tags));

    try {
      const result = await createArticle(formData);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || 'خطا در ایجاد مقاله');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed) && tags.length < 10) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ایجاد مقاله جدید</h1>
          <p className="text-gray-600">اطلاعات مقاله خود را در فرم زیر وارد کنید</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>فرم ایجاد مقاله</CardTitle>
            <CardDescription>تمام فیلدهای الزامی را با دقت پر کنید</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* عنوان */}
              <div className="space-y-2">
                <Label htmlFor="title">عنوان مقاله *</Label>
                <Input id="title" name="title" type="text" placeholder="عنوان مقاله خود را وارد کنید" required className="text-right" />
              </div>

              {/* دسته‌بندی */}
              <div className="space-y-2">
                <Label htmlFor="category">دسته‌بندی *</Label>
                <select id="category" name="category" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  <option value="">انتخاب دسته‌بندی</option>
                  <option value="کامپیوتر">کامپیوتر</option>
                  <option value="مهندسی">مهندسی</option>
                  <option value="علوم پایه">علوم پایه</option>
                  <option value="پزشکی">پزشکی</option>
                  <option value="علوم انسانی">علوم انسانی</option>
                  <option value="هنر">هنر</option>
                  <option value="سایر">سایر</option>
                </select>
              </div>

              {/* محتوا */}
              <div className="space-y-2">
                <Label htmlFor="content">محتوای مقاله *</Label>
                <Textarea id="content" name="content" placeholder="محتوای کامل مقاله خود را اینجا بنویسید..." required rows={10} className="text-right" />
              </div>

              {/* برچسب‌ها */}
              <div className="space-y-2">
                <Label htmlFor="tags">برچسب‌ها (حداکثر ۱۰ برچسب)</Label>
                <div className="flex gap-2">
                  <Input id="tags" type="text" placeholder="برچسب را وارد کرده و Enter را بزنید" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={handleKeyPress} className="text-right" />
                  <Button type="button" onClick={addTag} disabled={!tagInput.trim() || tags.length >= 10}>افزودن</Button>
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="text-blue-600 hover:text-blue-800">×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading} className="flex-1">{isLoading ? 'در حال ایجاد...' : 'ایجاد مقاله'}</Button>
                <Button type="button" variant="outline" onClick={() => router.push('/dashboard')}>انصراف</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
