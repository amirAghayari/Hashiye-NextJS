# سیستم مقالات دانشجویی

یک وب‌سایت کامل برای مدیریت مقالات دانشجویی با Next.js 15، MongoDB، و Server Actions.

## ویژگی‌ها

- ✅ ثبت نام و ورود کاربران (دانشجو/استاد)
- ✅ ایجاد، ویرایش، و حذف مقالات توسط دانشجویان
- ✅ نمره‌دهی به مقالات توسط اساتید
- ✅ نمایش میانگین نمرات و نظرات اساتید
- ✅ دسته‌بندی و برچسب‌گذاری مقالات
- ✅ رابط کاربری فارسی با RTL پشتیبانی
- ✅ طراحی مدرن با shadcn/ui و Tailwind CSS
- ✅ اعتبارسنجی فرم‌ها با Zod و React Hook Form

## تکنولوژی‌های استفاده شده

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js Server Actions
- **Database**: MongoDB with Mongoose
- **Validation**: Zod, React Hook Form
- **UI**: shadcn/ui, Tailwind CSS, Lucide Icons
- **Authentication**: JWT cookies
- **Font**: Vazirmatn (فارسی)

## راه‌اندازی پروژه

### ۱. نصب وابستگی‌ها

```bash
npm install
```

### ۲. تنظیم متغیرهای محیطی

یک فایل `.env.local` در ریشه پروژه ایجاد کرده و متغیرهای زیر را اضافه کنید:

```env
# MongoDB Connection String
MONGODB_URI="mongodb://localhost:27017/student-articles"

# JWT Secret Key
JWT_SECRET="your-super-secret-jwt-key-here"
```

### ۳. راه‌اندازی دیتابیس

مطمئن شوید که MongoDB روی سیستم شما نصب و در حال اجرا است.

### ۴. اجرای پروژه

```bash
npm run dev
```

بعد از اجرای پروژه، به آدرس [http://localhost:3000](http://localhost:3000) بروید.

## ساختار پروژه

```
students-articles/
├── app/                    # صفحات Next.js
│   ├── auth/              # صفحات احراز هویت
│   ├── dashboard/          # داشبورد اصلی
│   ├── articles/          # مدیریت مقالات
│   └── grades/             # نمره‌دهی اساتید
├── actions/               # Server Actions
├── components/            # کامپوننت‌های React
│   └── ui/               # کامپوننت‌های shadcn/ui
├── lib/                   # کتابخانه‌های کمکی
├── models/                # مدل‌های Mongoose
└── public/               # فایل‌های استاتیک
```

## نقش‌های کاربری

### دانشجو (Student)
- ثبت نام و ورود به سیستم
- ایجاد مقاله جدید
- ویرایش و حذف مقالات خود
- مشاهده نمرات و نظرات اساتید

### استاد (Professor)
- ثبت نام و ورود به سیستم
- مشاهده تمام مقالات دانشجویان
- نمره‌دهی به مقالات (۰ تا ۲۰)
- افزودن توضیحات برای نمرات

## نمره‌دهی

- نمرات از ۰ تا ۲۰ قابل ثبت هستند
- میانگین نمرات به صورت خودکار محاسبه می‌شود
- هر استاد می‌تواند به هر مقاله فقط یک نمره بدهد
- استادان می‌توانند توضیحات خود را برای نمرات ثبت کنند

## دسته‌بندی مقالات

- کامپیوتر
- مهندسی
- علوم پایه
- پزشکی
- علوم انسانی
- هنر
- سایر

## Design system

The visual language is "Journal + Marginalia": paper and ink, with one vermilion that is reserved for grades, scores and annotations.

- **Tokens** live in `app/globals.css` (`:root` / `.dark`, mapped into Tailwind via `@theme`). Never hard-code colors; vermilion is `mark`.
- **Type roles** are the `.type-*` classes (display, headline, title, subhead, deck, body, meta, label, numeral). Serif (Noto Naskh Arabic) is for titles and score numerals, Vazirmatn for everything else. Both are loaded in `app/layout.tsx`; to try another serif, change the font there and the `--font-serif` token.
- **Layout**: `.page` is the one container. `components/editorial/Spread` is the main column plus the vermilion margin line, used by the home, index, create and article pages.
- **Scores** are drawn only with `ScoreMark` (numeral size and a red underline, no traffic-light colors).
- **Motion**: CSS for entrances (`.rise`, `.pen-intro`, `app/template.tsx`), GSAP only for the reading progress bar and the scroll-triggered pen stroke. Everything is gated on `prefers-reduced-motion`.
