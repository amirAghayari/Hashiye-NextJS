"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { logout } from "@/actions/auth";
import { clearStoredUser, useStoredUser } from "@/hooks/useStoredUser";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

function Brand() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="حاشیه، صفحهٔ اصلی"
    >
      <span className="text-xl font-extrabold">حاشیه</span>
      <span aria-hidden className="size-2 rounded-full bg-mark" />
    </Link>
  );
}

export default function Navbar() {
  const user = useStoredUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Auth pages bring their own frame.
  if (pathname.startsWith("/auth")) return null;

  const links = user
    ? [
        { href: "/articles", label: "نوشته‌ها" },
        { href: "/articles/my", label: "نوشته‌های من" },
        user.role === "student"
          ? { href: "/articles/create", label: "نوشتن نوشته" }
          : { href: "/grades", label: "نمره‌دهی" },
      ]
    : [];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    clearStoredUser();
    router.push("/auth/login");
    setIsLoggingOut(false);
  };

  const logoutButton = (
    <Button
      onClick={handleLogout}
      variant="outline"
      size="sm"
      disabled={isLoggingOut}
    >
      {isLoggingOut ? <Spinner /> : "خروج"}
    </Button>
  );

  return (
    <header className="border-b border-foreground">
      <div className="page flex h-16 items-center gap-6">
        <Brand />

        <nav
          aria-label="اصلی"
          className="hidden flex-1 items-center gap-8 ms-6 md:flex"
        >
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "border-b-2 border-transparent py-1 type-meta transition-colors hover:border-foreground/40",
                  active && "border-foreground font-bold",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ms-auto hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <div className="me-2 text-end leading-tight">
                <div className="type-meta font-medium">{user.fullName}</div>
                <div className="type-label">{user.university}</div>
              </div>
              <ThemeToggle />
              {logoutButton}
            </>
          ) : (
            <>
              <ThemeToggle />
              <Button asChild variant="ghost" size="sm">
                <Link href="/auth/login">ورود</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/auth/register">ثبت‌نام</Link>
              </Button>
            </>
          )}
        </div>

        <div className="ms-auto md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="باز کردن منو">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="h-dvh gap-0 overflow-y-auto">
              <div className="flex h-16 items-center border-b border-foreground px-4">
                <Brand />
              </div>
              <SheetTitle className="sr-only">منو</SheetTitle>
              <SheetDescription className="sr-only">
                پیمایش در سایت
              </SheetDescription>

              <nav aria-label="منوی موبایل" className="flex-1 px-4">
                {(links.length
                  ? links
                  : [
                      { href: "/auth/login", label: "ورود" },
                      { href: "/auth/register", label: "ثبت‌نام" },
                    ]
                ).map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="type-title block border-b py-6"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="flex items-center justify-between gap-4 border-t p-4">
                {user ? (
                  <div className="leading-tight">
                    <div className="type-meta font-medium">{user.fullName}</div>
                    <div className="type-label">{user.university}</div>
                  </div>
                ) : (
                  <span className="type-label">میهمان</span>
                )}
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  {user ? logoutButton : null}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
