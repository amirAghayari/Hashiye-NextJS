import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spread } from "@/components/editorial/Spread";
import { ScoreMark } from "@/components/editorial/ScoreMark";
import { stagger } from "@/lib/utils";

export function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <div className="page">
        <Spread
          mainClassName="py-16 md:py-24"
          marginClassName="py-16 md:py-24"
          main={
            <>
              <h1 id="hero-title" className="type-display">
                <span className="rise block" style={stagger(0)}>
                  بستری برای انتشار نوشته‌ها و بازخورد علمی.
                </span>
              </h1>
              <p
                className="type-deck rise mt-10 max-w-[34rem] text-muted-foreground"
                style={stagger(3)}
              >
                حاشیه پلتفرمی برای به‌اشتراک‌گذاری نوشته‌های دانشجویی و دریافت
                بازخورد از استادهاست؛ با امکان ارزیابی و نمره‌دهی شفاف برای
                تقویت مهارت‌های نوشتاری و رشد علمی دانشجویان.
              </p>
              <div
                className="rise mt-10 flex flex-wrap items-center gap-6"
                style={stagger(4)}
              >
                <Button asChild size="lg">
                  <Link href="/auth/register">شروع به نوشتن</Link>
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
          margin={
            <figure className="rise" style={stagger(5)}>
              <figcaption className="type-label">
                نمونه: حاشیهٔ استاد بر یک نوشته
              </figcaption>
              <div className="mt-6">
                <ScoreMark score={18} size="xl" underline="load" />
              </div>
              <blockquote className="type-meta mt-6 border-t pt-4">
                ساختار استدلال روشن است. در بخش روش، منبع بیشتری بیاور.
              </blockquote>
            </figure>
          }
        />
      </div>
    </section>
  );
}
