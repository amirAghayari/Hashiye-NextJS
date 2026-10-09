import { Spread } from "@/components/editorial/Spread";
import { MarginNote } from "@/components/editorial/MarginNote";
import { cn } from "@/lib/utils";

const ROLES = [
  {
    title: "دانشجو",
    verb: "نوشته منتشر می‌کند و بازخورد می‌گیرد.",
    items: [
      "نوشته‌اش را با عنوان، دسته‌بندی و برچسب‌های مرتبط منتشر می‌کند.",
      "نوشته‌های خود را ویرایش یا حذف می‌کند.",
      "نمره و بازخورد استادان را برای نوشته‌هایش مطالعه می‌کند.",
    ],
  },
  {
    title: "استاد",
    verb: "نوشته‌ها را بررسی می‌کند و بازخورد می‌دهد.",
    items: [
      "نوشته‌های منتشرشده دانشجویان را می‌خواند و بررسی می‌کند.",
      "از ۰ تا ۲۰ به نوشته نمره می‌دهد و بازخورد تخصصی ثبت می‌کند.",
      "نمره و بازخورد ثبت‌شده را در صورت نیاز به‌روزرسانی می‌کند.",
    ],
  },
];

export function Roles() {
  return (
    <section
      aria-labelledby="roles-title"
      className="border-t border-foreground"
    >
      <div className="page">
        <Spread
          mainClassName="py-16 md:py-24"
          marginClassName="py-16 md:py-24"
          main={
            <>
              <h2 id="roles-title" className="type-title">
                دو نقش، یک هدف: یادگیری بهتر{" "}
              </h2>
              <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-0">
                {ROLES.map((role, i) => (
                  <div
                    key={role.title}
                    className={cn(
                      i === 0 ? "md:pe-10" : "md:border-s md:ps-10",
                    )}
                  >
                    <h3 className="type-headline">{role.title}</h3>
                    <p className="type-deck text-muted-foreground">
                      {role.verb}
                    </p>
                    <ul className="type-body mt-6 grid list-disc gap-3 ps-5 text-muted-foreground">
                      {role.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          }
          margin={
            <MarginNote n={1}>
              میانگین نمره‌های هر نوشته به‌صورت خودکار محاسبه شده و در کنار
              نوشته نمایش داده می‌شود.
            </MarginNote>
          }
        />
      </div>
    </section>
  );
}
