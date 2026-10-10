"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useStoredUser } from "@/hooks/useStoredUser";

const LINK_CLASS =
  "inline-block py-3 type-meta underline underline-offset-8 decoration-1 hover:decoration-2";

/**
 * The home-page call to action, swapped by auth state:
 * guests see register + "ورود به حساب"; signed-in users see their role
 * action plus "خواندن نوشته‌ها".
 */
export function AuthCtas({
  registerLabel = "شروع به نوشتن",
}: {
  registerLabel?: string;
}) {
  const user = useStoredUser();

  if (user) {
    const primary =
      user.role === "student"
        ? { href: "/articles/create", label: "نوشتن نوشته" }
        : { href: "/grades", label: "نمره‌دهی" };

    return (
      <>
        <Button asChild size="lg">
          <Link href={primary.href}>{primary.label}</Link>
        </Button>
        <Link href="/articles" className={LINK_CLASS}>
          خواندن نوشته‌ها
        </Link>
      </>
    );
  }

  return (
    <>
      <Button asChild size="lg">
        <Link href="/auth/register">{registerLabel}</Link>
      </Button>
      <Link href="/auth/login" className={LINK_CLASS}>
        ورود به حساب
      </Link>
    </>
  );
}
