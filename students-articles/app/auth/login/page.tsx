'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { login } from '@/actions/auth';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError('');

    const result = await login(formData);
    
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'خطا در ورود به سیستم');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">ورود به سیستم</CardTitle>
          <CardDescription>
            برای ورود به حساب کاربری خود ایمیل و رمز عبور را وارد کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                required
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="رمز عبور خود را وارد کنید"
                required
                className="text-right"
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'در حال ورود...' : 'ورود'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              حساب کاربری ندارید؟{' '}
              <Link href="/auth/register" className="text-blue-600 hover:text-blue-500">
                ثبت نام کنید
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
