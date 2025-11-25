'use client';

import { useActionState, useEffect } from 'react'; // React 19 Hook
import { useFormStatus } from 'react-dom'; // React 19 Hook for Status
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { register } from '@/actions/auth';

const initialState = {
  success: false,
  error: '',
  message: '',
};

// TODO :  پندینگ رو خود اکشن استیت داره 
function SubmitButton() {
  const { pending } = useFormStatus();
 
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'در حال ثبت نام...' : 'ثبت نام'}
    </Button>
  );
}

export default function RegisterForm() {
  const [state, formAction] = useActionState(register, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success && state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
      router.push('/dashboard');
    }
  }, [state.success, state.user, router]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">ثبت نام</CardTitle>
        <CardDescription>
          برای ایجاد حساب کاربری جدید اطلاعات خود را وارد کنید
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">نام و نام خانوادگی</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="نام و نام خانوادگی خود را وارد کنید"
              required
              className="text-right"
            />
          </div>
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
          <div className="space-y-2">
            <Label htmlFor="role">نقش</Label>
            <select
              id="role"
              name="role"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="student">دانشجو</option>
              <option value="professor">استاد</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="university">دانشگاه</Label>
            <Input
              id="university"
              name="university"
              type="text"
              placeholder="نام دانشگاه خود را وارد کنید"
              required
              className="text-right"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="field">رشته تحصیلی</Label>
            <Input
              id="field"
              name="field"
              type="text"
              placeholder="رشته تحصیلی خود را وارد کنید"
              required
              className="text-right"
            />
          </div>

          {!state.success && state.message && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
              {state.message}
            </div>
          )}

          <SubmitButton />
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            قبلاً ثبت نام کرده‌اید؟{' '}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
              ورود به سیستم
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}