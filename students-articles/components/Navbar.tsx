'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { logout } from '@/actions/auth';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'student' | 'professor';
  university: string;
  field: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    localStorage.removeItem('user');
    setUser(null);
    router.push('/auth/login');
    setIsLoading(false);
  };

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-xl font-bold text-blue-600">
              سیستم مقالات دانشجویی
            </Link>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            {user ? (
              <>
                <div className="text-sm text-gray-700">
                  <div className="font-medium">{user.fullName}</div>
                  <div className="text-gray-500">
                    {user.role === 'student' ? 'دانشجو' : 'استاد'} - {user.university}
                  </div>
                </div>
                
                {user.role === 'student' && (
                  <Link href="/articles/create">
                    <Button variant="outline">ایجاد مقاله</Button>
                  </Link>
                )}
                
                {user.role === 'professor' && (
                  <Link href="/grades">
                    <Button variant="outline">نمره‌دهی به مقالات</Button>
                  </Link>
                )}
                
                <Link href="/dashboard">
                  <Button variant="ghost">داشبورد</Button>
                </Link>
                
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  disabled={isLoading}
                >
                  {isLoading ? 'در حال خروج...' : 'خروج'}
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
        </div>
      </div>
    </nav>
  );
}
