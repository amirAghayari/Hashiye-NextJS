import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "ورود" };

export default function LoginPage() {
  return (
    <AuthShell
      title="ورود"
      deck="ایمیل و رمز عبور حساب خود را وارد کنید."
      footer={
        <>
          حساب کاربری ندارید؟{" "}
          <Link href="/auth/register" className="font-bold underline underline-offset-8">
            ثبت‌نام
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
