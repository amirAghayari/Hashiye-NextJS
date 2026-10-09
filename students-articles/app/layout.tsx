import type { Metadata } from "next";
import { Noto_Naskh_Arabic, Vazirmatn } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// UI and body text.
const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

// Editorial titles and score numerals. Falls back to Vazirmatn per glyph.
const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-naskh",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "حاشیه", template: "%s | حاشیه" },
  description:
    "نشریهٔ مقالات دانشجویی: دانشجو نوشته می‌نویسد، استاد نمره می‌دهد و در حاشیه توضیح می‌نویسد.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={`${vazirmatn.variable} ${naskh.variable}`}
    >
      <body>
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[70] focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
          >
            پرش به محتوا
          </a>
          <div className="flex min-h-dvh flex-col">
            <Navbar />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
