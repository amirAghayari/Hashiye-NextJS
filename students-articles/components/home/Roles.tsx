import { Spread } from "@/components/editorial/Spread";
import { MarginNote } from "@/components/editorial/MarginNote";
import { cn } from "@/lib/utils";

const ROLES = [
  {
    title: "دانشجو",
    verb: "مقاله می‌نویسد و نمره می‌گیرد.",
    items: [
      "مقاله را با عنوان، دسته‌بندی و برچسب ثبت می‌کند.",
      "مقاله‌های خود را ویرایش یا حذف می‌کند.",
      "نمره و بازخورد استادان را در کنار مقاله مطالعه می‌کند.",
    ],
  },
  {
    title: "استاد",
    verb: "مقاله می‌خواند، نمره می‌دهد و بازخورد می‌نویسد.",
    items: [
      "مقاله‌های همهٔ دانشجویان را می‌بیند و بررسی می‌کند.",
      "نمره‌ای از ۰ تا ۲۰ و توضیحی برای دانشجو ثبت می‌کند.",
      "برای هر مقاله یک نمره دارد و می‌تواند آن را به‌روز کند.",
    ],
  },
];

export function Roles() {
  return (
    <section aria-labelledby="roles-title" className="border-t border-foreground">
      <div className="page">
        <Spread
          mainClassName="py-16 md:py-24"
          marginClassName="py-16 md:py-24"
          main={
            <>
              <h2 id="roles-title" className="type-title">
                چه کسی چه می‌کند
              </h2>
              <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-0">
                {ROLES.map((role, i) => (
                  <div
                    key={role.title}
                    className={cn(i === 0 ? "md:pe-10" : "md:border-s md:ps-10")}
                  >
                    <h3 className="type-headline">{role.title}</h3>
                    <p className="type-deck text-muted-foreground">{role.verb}</p>
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
              میانگین نمره‌های هر مقاله به‌صورت خودکار محاسبه شده و در کنار مقاله نمایش داده می‌شود.
            </MarginNote>
          }
        />
      </div>
    </section>
  );
}
