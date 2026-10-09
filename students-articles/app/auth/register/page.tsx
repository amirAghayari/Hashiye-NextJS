import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = { title: "ثبت‌نام" };

export default function RegisterPage() {
  return (
    <AuthShell
      title="ثبت‌نام"
      deck="با نقش دانشجو یا استاد حساب بسازید."
      footer={
        <>
          قبلاً ثبت‌نام کرده‌اید؟{" "}
          <Link href="/auth/login" className="font-bold underline underline-offset-8">
            ورود
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
