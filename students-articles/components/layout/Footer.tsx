import Link from "next/link";

const NAV = [
  { href: "/", label: "صفحهٔ اصلی" },
  { href: "/dashboard", label: "مقالات" },
  { href: "/auth/login", label: "ورود" },
  { href: "/auth/register", label: "ثبت‌نام" },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t-2 border-foreground">
      <div className="page grid gap-12 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
        <div>
          <p className="flex items-center gap-2">
            <span className="text-xl font-extrabold">حاشیه</span>
            <span aria-hidden className="size-2 rounded-full bg-mark" />
          </p>
          <p className="type-meta mt-4 max-w-sm text-muted-foreground">
            نشریهٔ مقالات دانشجویی: دانشجو نوشته می‌نویسد، استاد نمره می‌دهد و
            در حاشیه توضیح می‌نویسد.
          </p>
        </div>

        <nav aria-label="پیمایش">
          <h2 className="type-label">پیمایش</h2>
          <ul className="mt-4 grid gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block py-1 type-meta underline-offset-8 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="type-label">تماس</h2>
          <ul className="mt-4 grid gap-1 type-meta">
            <li>
              ایمیل:{" "}
              <a
                href="mailto:amiraghayari2119@gmail.com"
                dir="ltr"
                className="underline-offset-8 hover:underline"
              >
                amiraghayari2119@gmail.com
              </a>
            </li>
            <li>
              تماس:
              <a
                href="call:+989331052119"
                dir="ltr"
                className="underline-offset-8 hover:underline"
              >
                09331052119
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <p className="page py-6 type-label" dir="auto">
          © {new Date().getFullYear()} حاشیه. کلیهٔ حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}
