'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getArticles } from '@/actions/articles';
import Navbar from '@/components/Navbar';

interface Article {
  _id: string;
  title: string;
  content: string;
  category: string;
  author: {
    fullName: string;
    university: string;
    field: string;
  };
  grades: Array<{
    professor: {
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

export default function DashboardPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const router = useRouter();

  // Load user from localStorage
  useEffect(() => {
    const data = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

    if (!data) {
      router.push('/auth/login');
      return;
    }

    const parsedUser = JSON.parse(data);
    setUser(parsedUser);

    // fetch after user exists
    fetchArticles(1);
  }, [router]);

  // Fetch Articles
  const fetchArticles = async (page: number = 1) => {
    try {
      setLoading(true);
      const result = await getArticles(page, 10);

      if (result.success) {
        setArticles(result.articles);
        if (result.pagination) {
          setPagination(result.pagination);
        }
      } else {
        setError(result.error || 'خطا در دریافت مقالات');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchArticles(newPage);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('fa-IR');

  const getScoreColor = (score: number) => {
    if (score >= 17) return 'text-green-600';
    if (score >= 14) return 'text-blue-600';
    if (score >= 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Initial loading state
  if (loading && articles.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">در حال بارگذاری...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">داشبورد</h1>
          <p className="text-gray-600">
            {user?.role === 'student'
              ? 'خوش آمدید! در اینجا می‌توانید مقالات خود را مدیریت کنید.'
              : 'خوش آمدید! در اینجا می‌توانید مقالات دانشجویان را مشاهده و نمره‌دهی کنید.'}
          </p>
        </div>

        {/* Error Box */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card key={article._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {article.category}
                  </span>
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
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{article.content}</p>

                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(article.averageScore)}`}>
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

                <Button
                  onClick={() => router.push(`/articles/${article._id}`)}
                  className="w-full"
                  variant="outline"
                >
                  مشاهده جزئیات
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {articles.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">مقاله‌ای یافت نشد</div>
            {user?.role === 'student' && (
              <Button onClick={() => router.push('/articles/create')} className="mt-4">
                ایجاد اولین مقاله
              </Button>
            )}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center mt-8 space-x-2 space-x-reverse">
            <Button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              variant="outline"
            >
              قبلی
            </Button>
            <span className="px-4 py-2 text-sm">
              صفحه {pagination.page} از {pagination.pages}
            </span>
            <Button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              variant="outline"
            >
              بعدی
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
