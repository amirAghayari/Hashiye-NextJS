'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getArticlesForGrading, gradeArticle } from '@/actions/grades';
import Navbar from '@/components/Navbar';

interface Article {
  _id: string;
  title: string;
  content: string;
  category: string;
  author: {
    _id: string;
    fullName: string;
    university: string;
    field: string;
  };
  grades: Array<{
    professor: {
      _id: string;
      fullName: string;
    };
    score: number;
    comment?: string;
    gradedAt: string;
  }>;
  averageScore: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function GradesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [gradeForm, setGradeForm] = useState({
    score: 0,
    comment: ''
  });
  const [isGrading, setIsGrading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }

    const user = JSON.parse(userData);
    if (user.role !== 'professor') {
      router.push('/dashboard');
      return;
    }

    fetchArticles();
  }, [router]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const result = await getArticlesForGrading();
      
      if (result.success) {
        setArticles(result.articles);
      } else {
        setError(result.error || 'خطا در دریافت مقالات');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  const handleGrade = async (formData: FormData) => {
    if (!selectedArticle) return;
    
    try {
      setIsGrading(true);
      formData.set('articleId', selectedArticle._id);
      const result = await gradeArticle(formData);
      
      if (result.success) {
        setArticles(articles.map(article => 
          article._id === selectedArticle._id ? result.article : article
        ));
        setSelectedArticle(null);
        setGradeForm({ score: 0, comment: '' });
      } else {
        setError(result.error || 'خطا در نمره‌دهی');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsGrading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR');
  };

  const getScoreColor = (score: number) => {
    if (score >= 17) return 'text-green-600';
    if (score >= 14) return 'text-blue-600';
    if (score >= 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const hasGraded = (article: Article) => {
    const userData = localStorage.getItem('user');
    if (!userData) return false;
    const user = JSON.parse(userData);
    return article.grades.some(grade => grade.professor._id === user.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">در حال بارگذاری...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">نمره‌دهی به مقالات</h1>
          <p className="text-gray-600">
            مقالات دانشجویان را مشاهده کرده و به آن‌ها نمره دهید
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">لیست مقالات</h2>
            {articles.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <div className="text-gray-500">مقاله‌ای برای نمره‌دهی یافت نشد</div>
                </CardContent>
              </Card>
            ) : (
              articles.map((article) => (
                <Card 
                  key={article._id} 
                  className={`cursor-pointer transition-all ${
                    selectedArticle?._id === article._id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
                  } ${hasGraded(article) ? 'bg-green-50' : ''}`}
                  onClick={() => setSelectedArticle(article)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {article.category}
                        </span>
                        {hasGraded(article) && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            نمره داده شده
                          </span>
                        )}
                      </div>
                    </div>
                    <CardDescription>
                      <div className="flex items-center justify-between text-sm">
                        <span>نویسنده: {article.author.fullName}</span>
                        <span>{formatDate(article.createdAt)}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {article.author.university} - {article.author.field}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                      {article.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className={`text-xl font-bold ${getScoreColor(article.averageScore)}`}>
                          {article.averageScore.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">میانگین نمره</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-600">
                          {article.grades.length}
                        </div>
                        <div className="text-xs text-gray-500">تعداد نمرات</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">جزئیات و نمره‌دهی</h2>
            {selectedArticle ? (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedArticle.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-4 text-sm">
                      <span>نویسنده: {selectedArticle.author.fullName}</span>
                      <span>{formatDate(selectedArticle.createdAt)}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {selectedArticle.author.university} - {selectedArticle.author.field}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">محتوای مقاله</h3>
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed max-h-64 overflow-y-auto">
                      {selectedArticle.content}
                    </div>
                  </div>

                  {selectedArticle.tags.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">برچسب‌ها</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedArticle.tags.map((tag, index) => (
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
                    <h3 className="text-lg font-semibold mb-4">نمرات فعلی</h3>
                    <div className="mb-4 text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(selectedArticle.averageScore)}`}>
                        {selectedArticle.averageScore.toFixed(1)}
                      </div>
                      <div className="text-gray-500">میانگین نمرات از {selectedArticle.grades.length} استاد</div>
                    </div>

                    {selectedArticle.grades.length > 0 && (
                      <div className="space-y-3">
                        {selectedArticle.grades.map((grade, index) => (
                          <Card key={index}>
                            <CardContent className="pt-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium">{grade.professor.fullName}</div>
                                  <div className={`text-xl font-bold ${getScoreColor(grade.score)}`}>
                                    نمره: {grade.score}
                                  </div>
                                  {grade.comment && (
                                    <div className="mt-2 text-gray-700 text-sm">
                                      <div className="font-medium">توضیحات:</div>
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
                    )}
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>نمره‌دهی به مقاله</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form action={handleGrade} className="space-y-4">
                        <div>
                          <Label htmlFor="score">نمره (۰ تا ۲۰)</Label>
                          <Input
                            id="score"
                            name="score"
                            type="number"
                            min="0"
                            max="20"
                            step="0.5"
                            value={gradeForm.score}
                            onChange={(e) => setGradeForm({...gradeForm, score: parseFloat(e.target.value)})}
                            required
                            className="text-right"
                          />
                        </div>
                        <div>
                          <Label htmlFor="comment">توضیحات (اختیاری)</Label>
                          <Textarea
                            id="comment"
                            name="comment"
                            value={gradeForm.comment}
                            onChange={(e) => setGradeForm({...gradeForm, comment: e.target.value})}
                            placeholder="توضیحات خود را اینجا بنویسید..."
                            rows={4}
                            className="text-right"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isGrading}
                        >
                          {isGrading ? 'در حال ثبت...' : 'ثبت نمره'}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="text-gray-500">
                    یک مقاله از لیست را برای مشاهده جزئیات و نمره‌دهی انتخاب کنید
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
