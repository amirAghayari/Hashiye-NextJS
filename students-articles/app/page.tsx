// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// const Home = async () => {
//   const cookieStore = await cookies();
//   const user = cookieStore.get("user"); // یا مثلاً "token"

//   if (user) {
//     redirect("/dashboard");
//   } else {
//     redirect("/auth/login");
//   }

//   return null;
// };

// export default Home;

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  FileText,
  Award,
  Users,
  TrendingUp,
  CheckCircle,
  BookOpen,
} from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Home = async () => {
  const cookieStore = await cookies();
  const user = cookieStore.get("user"); // یا مثلاً "token"

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              مقاله یار
            </h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a
              href="#features"
              className="text-foreground hover:text-primary transition-colors"
            >
              ویژگی‌ها
            </a>
            <a
              href="#how-it-works"
              className="text-foreground hover:text-primary transition-colors"
            >
              نحوه کار
            </a>
            <a
              href="#contact"
              className="text-foreground hover:text-primary transition-colors"
            >
              تماس با ما
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              سامانه مدیریت و ارزیابی
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                مقالات دانشجویی
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              پلتفرمی آسان برای ارسال مقالات دانشجویی و ارزیابی حرفه‌ای توسط
              اساتید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                ورود دانشجو
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-2 hover:bg-card"
              >
                ورود استاد
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              ویژگی‌های برجسته
            </h3>
            <p className="text-muted-foreground text-lg">
              امکانات پیشرفته برای تجربه‌ای بهتر
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 animate-fade-in">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>ارسال آسان مقاله</CardTitle>
                <CardDescription>
                  دانشجویان می‌توانند مقالات خود را به راحتی آپلود و مدیریت کنند
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 animate-fade-in [animation-delay:100ms]">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-secondary-foreground" />
                </div>
                <CardTitle>ارزیابی حرفه‌ای</CardTitle>
                <CardDescription>
                  اساتید با معیارهای مشخص و دقیق مقالات را ارزیابی می‌کنند
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 animate-fade-in [animation-delay:200ms]">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>تعامل مستقیم</CardTitle>
                <CardDescription>
                  ارتباط آسان بین دانشجو و استاد برای بازخورد بهتر
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 animate-fade-in [animation-delay:300ms]">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-secondary-foreground" />
                </div>
                <CardTitle>گزارش پیشرفت</CardTitle>
                <CardDescription>
                  مشاهده نمودارها و آمار پیشرفت تحصیلی در یک نگاه
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 animate-fade-in [animation-delay:400ms]">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>مدیریت هوشمند</CardTitle>
                <CardDescription>
                  سازماندهی خودکار مقالات و تخصیص آنها به اساتید
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 animate-fade-in [animation-delay:500ms]">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-secondary-foreground" />
                </div>
                <CardTitle>آرشیو کامل</CardTitle>
                <CardDescription>
                  نگهداری امن و دسترسی آسان به تمام مقالات گذشته
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">نحوه کار</h3>
            <p className="text-muted-foreground text-lg">
              سه گام ساده تا شروع کار
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                ۱
              </div>
              <h4 className="text-xl font-bold mb-2">ثبت‌نام کنید</h4>
              <p className="text-muted-foreground">
                به عنوان دانشجو یا استاد در سامانه ثبت‌نام نمایید
              </p>
            </div>

            <div className="text-center animate-fade-in [animation-delay:100ms]">
              <div className="w-16 h-16 rounded-full bg-gradient-secondary text-secondary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                ۲
              </div>
              <h4 className="text-xl font-bold mb-2">مقاله آپلود کنید</h4>
              <p className="text-muted-foreground">
                دانشجویان مقالات خود را در سامانه بارگذاری می‌کنند
              </p>
            </div>

            <div className="text-center animate-fade-in [animation-delay:200ms]">
              <div className="w-16 h-16 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                ۳
              </div>
              <h4 className="text-xl font-bold mb-2">نتیجه دریافت کنید</h4>
              <p className="text-muted-foreground">
                اساتید ارزیابی می‌کنند و دانشجو نمره دریافت می‌کند
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            آماده شروع هستید؟
          </h3>
          <p className="text-lg mb-8 opacity-90">
            همین الان به جمع کاربران ما بپیوندید
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8">
            شروع کنید
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <h4 className="font-bold text-lg">مقاله یار</h4>
              </div>
              <p className="text-muted-foreground">
                سامانه پیشرفته مدیریت و ارزیابی مقالات دانشجویی
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">لینک‌های مفید</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    درباره ما
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    تماس با ما
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    راهنما
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">پشتیبانی</h4>
              <ul className="space-y-2">
                <li className="text-muted-foreground">
                  ایمیل: support@maghaleyar.com
                </li>
                <li className="text-muted-foreground">تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-muted-foreground">
            <p>© ۱۴۰۳ مقاله یار. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
