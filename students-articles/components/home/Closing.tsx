import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spread } from "@/components/editorial/Spread";
import { MarginNote } from "@/components/editorial/MarginNote";

export function Closing() {
  return (
    <section aria-labelledby="closing-title" className="border-t border-foreground">
      <div className="page">
        <Spread
          mainClassName="py-16 md:py-24"
          marginClassName="py-16 md:py-24"
          main={
            <>
              <h2 id="closing-title" className="type-headline max-w-3xl">
                اولین مقاله‌تان را همین امروز آغاز کنید.
              </h2>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Button asChild size="lg">
                  <Link href="/auth/register">ثبت‌نام رایگان</Link>
                </Button>
                <Link
                  href="/auth/login"
                  className="inline-block py-3 type-meta underline underline-offset-8 decoration-1 hover:decoration-2"
                >
                  ورود به حساب
                </Link>
              </div>
            </>
          }
          margin={<MarginNote n={3}>ثبت‌نام تنها با ایمیل، رمز عبور و انتخاب نقش انجام می‌شود.</MarginNote>}
        />
      </div>
    </section>
  );
}
