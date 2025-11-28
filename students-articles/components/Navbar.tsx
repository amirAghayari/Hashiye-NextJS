"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";
import { Spinner } from "./ui/spinner";
import { ThemeToggle } from "./theme-toggle";

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
        <div className="flex justify-between h-16">
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
                  <div className="text-gray-500">
                    {user.role === "student" ? "دانشجو" : "استاد"} -{" "}
                    {user.university}
                  </div>
                </div>

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

                <ThemeToggle />

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
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                <div className="px-3 py-2 text-sm text-gray-700">
                  <div className="font-medium">{user.fullName}</div>
                  <div className="text-gray-500">
                    {user.role === "student" ? "دانشجو" : "استاد"} -{" "}
                    {user.university}
                  </div>
                </div>

                <div className="border-t border-gray-200 my-2"></div>

                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  داشبورد
                </Link>

                {user.role === "student" ? (
                  <Link
                    href="/articles/create"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    ایجاد مقاله
                  </Link>
                ) : (
                  <Link
                    href="/grades"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    نمره‌دهی به مقالات
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="w-full text-right px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md flex items-center justify-end space-x-2 space-x-reverse "
                >
                  {isLoading ? (
                    <Spinner className="size-4" />
                  ) : (
                    <span>خروج از حساب کاربری</span>
                  )}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  ورود
                </Link>
                <Link
                  href="/auth/register"
                  className="block px-3 py-2 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-md text-center"
                >
                  ثبت نام
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
