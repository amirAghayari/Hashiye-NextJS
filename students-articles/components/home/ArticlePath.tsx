import { Spread } from "@/components/editorial/Spread";
import { MarginNote } from "@/components/editorial/MarginNote";
import { faNum } from "@/lib/format";

const STEPS = [
  { title: "ثبت‌نام", text: "با ایمیل، رمز عبور و انتخاب نقش (دانشجو یا استاد) وارد شوید." },
  { title: "نوشتن مقاله", text: "عنوان، دسته‌بندی، برچسب‌ها و متن کامل مقاله را ثبت کنید." },
  { title: "داوری", text: "استاد مقاله را مطالعه می‌کند، نمره می‌دهد و در حاشیه بازخورد می‌نویسد." },
  { title: "نتیجه", text: "نمره‌ها و میانگین آن‌ها در کنار مقاله قابل مشاهده هستند." },
];

/** The four steps laid out like a table of contents, with dotted leaders. */
export function ArticlePath() {
  return (
    <section aria-labelledby="path-title" className="border-t border-foreground">
      <div className="page">
        <Spread
          mainClassName="py-16 md:py-24"
          marginClassName="py-16 md:py-24"
          main={
            <>
              <h2 id="path-title" className="type-title">
                مسیر یک مقاله
              </h2>
              <ol className="mt-12 border-t">
                {STEPS.map((step, i) => (
                  <li key={step.title} className="border-b py-6 md:py-8">
                    <div className="flex items-end gap-4">
                      <span className="type-subhead">{step.title}</span>
                      <span
                        aria-hidden
                        className="mb-2 flex-1 border-b border-dotted border-foreground/40"
                      />
                      <span className="type-subhead text-faint">{faNum(i + 1)}</span>
                    </div>
                    <p className="type-meta mt-2 max-w-md text-muted-foreground">{step.text}</p>
                  </li>
                ))}
              </ol>
            </>
          }
          margin={
            <MarginNote n={2}>
              هر نمره بین ۰ تا ۲۰ است و هر استاد برای هر مقاله تنها یک نمره ثبت می‌کند.
            </MarginNote>
          }
        />
      </div>
    </section>
  );
}
