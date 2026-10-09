import Link from "next/link";

type AuthShellProps = {
  title: string;
  deck: string;
  children: React.ReactNode;
  /** Link to the other auth page. */
  footer: React.ReactNode;
};

/** Frame for sign-in and sign-up: an ink panel with the product idea, and the form beside it. */
export function AuthShell({ title, deck, children, footer }: AuthShellProps) {
  return (
    <div className="grid min-h-[80dvh] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <aside className="flex flex-col justify-between gap-12 bg-foreground p-6 text-background md:p-10 lg:gap-16 lg:p-14">
        <Link href="/" className="flex w-fit items-center gap-2" aria-label="حاشیه، صفحهٔ اصلی">
          <span className="text-xl font-extrabold">حاشیه</span>
          <span aria-hidden className="size-2 rounded-full bg-mark" />
        </Link>
        <div className="border-s-2 border-mark ps-6">
          <p className="font-serif text-title font-bold lg:text-headline">
            هر مقاله،
            <br />
            یک حاشیه.
          </p>
          <p className="type-meta mt-6 max-w-sm opacity-80">
            دانشجو می‌نویسد؛ استاد نمره می‌دهد و در حاشیه توضیح می‌نویسد.
          </p>
        </div>
      </aside>

      <section className="flex items-center px-6 py-12 md:px-10 lg:px-16">
        <div className="w-full max-w-md">
          <h1 className="type-title">{title}</h1>
          <p className="type-meta mt-3 text-muted-foreground">{deck}</p>
          <div className="mt-10">{children}</div>
          <p className="type-meta mt-8">{footer}</p>
        </div>
      </section>
    </div>
  );
}
