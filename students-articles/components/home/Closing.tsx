import { AuthCtas } from "@/components/home/AuthCtas";
import { Spread } from "@/components/editorial/Spread";
import { MarginNote } from "@/components/editorial/MarginNote";

export function Closing() {
  return (
    <section
      aria-labelledby="closing-title"
      className="border-t border-foreground"
    >
      <div className="page">
        <Spread
          mainClassName="py-16 md:py-24"
          marginClassName="py-16 md:py-24"
          main={
            <>
              <h2 id="closing-title" className="type-headline max-w-3xl">
                وقتشه ایده‌هات رو با دیگران به اشتراک بذاری.{" "}
              </h2>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <AuthCtas registerLabel="ثبت‌نام رایگان" />
              </div>
            </>
          }
          margin={
            <MarginNote n={3}>
              ثبت‌نام تنها با ایمیل، رمز عبور و انتخاب نقش انجام می‌شود.
            </MarginNote>
          }
        />
      </div>
    </section>
  );
}
