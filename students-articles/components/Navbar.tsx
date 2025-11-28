"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";
import { Spinner } from "./ui/spinner";
import { ThemeToggle } from "./theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: "student" | "professor";
  university: string;
  field: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    localStorage.removeItem("user");
    setUser(null);
    router.push("/auth/login");
    setIsLoading(false);
  };

  // Mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`bg-background shadow-md border-b ${
        pathname.includes("auth") ? "hidden" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row-reverse justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="text-xl md:text-2xl font-bold text-primary"
            >
              myArticles
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            {user ? (
              <>
                <div className="text-sm text-gray-700 text-right">
                  <div className="font-medium">{user.fullName}</div>
                  <div className="text-gray-500">{user.university}</div>
                </div>

                <ThemeToggle />

                {user.role === "student" ? (
                  <Link href="/articles/create">
                    <Button variant="outline" className="whitespace-nowrap">
                      ایجاد مقاله
                    </Button>
                  </Link>
                ) : (
                  <Link href="/grades">
                    <Button variant="outline" className="whitespace-nowrap">
                      نمره‌دهی به مقالات
                    </Button>
                  </Link>
                )}

                <Link href="/dashboard">
                  <Button variant="outline">داشبورد</Button>
                </Link>

                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  disabled={isLoading}
                  className="text-white mr-4"
                >
                  {isLoading ? <Spinner className="size-4" /> : "خروج"}
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">ورود</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>ثبت نام</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Sheet>
              <SheetTrigger className="p-2 border border-border rounded-md">
                <Menu />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="mt-8">
                    {user ? (
                      <div className="px-3 py-2 flex flex-col gap-2 text-sm">
                        <span className="font-medium">{user.fullName}</span>
                        <span className="text-gray-500">{user.university}</span>
                      </div>
                    ) : (
                      "وارد حساب کاربری شوید"
                    )}
                  </SheetTitle>
                  <SheetDescription>
                    <div className="md:hidden bg-background  border-gray-200">
                      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {user ? (
                          <div className="flex flex-col gap-3">
                            <Link
                              href="/dashboard"
                              className="block px-3 py-2 text-base font-medium border border-border hover:bg-primary rounded-md"
                            >
                              داشبورد
                            </Link>

                            {user.role === "student" ? (
                              <Link
                                href="/articles/create"
                                className="block px-3 py-2 text-base font-medium border border-border hover:bg-primary rounded-md"
                              >
                                ایجاد مقاله
                              </Link>
                            ) : (
                              <Link
                                href="/grades"
                                className="block px-3 py-2 text-base font-medium border border-border  hover:bg-primary rounded-md"
                              >
                                نمره‌دهی به مقالات
                              </Link>
                            )}

                            <button
                              onClick={handleLogout}
                              disabled={isLoading}
                              className="w-full text-right px-3 border border-border py-2 text-base font-medium text-red-500 hover:bg-red-50 rounded-md flex items-center"
                            >
                              {isLoading ? (
                                <Spinner className="size-4" />
                              ) : (
                                <span>خروج از حساب کاربری</span>
                              )}
                            </button>
                          </div>
                        ) : (
                          <>
                            <Link
                              href="/auth/login"
                              className="block px-3 py-2 text-base font-medium bg-background hover:bg-primary rounded-md"
                            >
                              ورود
                            </Link>
                            <Link
                              href="/auth/register"
                              className="block px-3 py-2 text-base font-medium bg-background
                               hover:bg-primary rounded-md"
                            >
                              ثبت نام
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
