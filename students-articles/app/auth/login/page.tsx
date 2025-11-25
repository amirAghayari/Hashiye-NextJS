import LoginForm from "@/components/auth/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
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
          <LoginForm />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              حساب کاربری ندارید؟
              <Link
                href="/auth/register"
                className="text-blue-600 hover:text-blue-500"
              >
                ثبت نام کنید
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
