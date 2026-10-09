/** Loading placeholder shaped like the real index: one lead, then rows. */
export function IndexSkeleton() {
  return (
    <div role="status" aria-label="در حال بارگذاری نوشته‌ها">
      <span className="sr-only">در حال بارگذاری نوشته‌ها…</span>
      <div aria-hidden className="border-b border-foreground pb-10 md:pb-14">
        <div className="skeleton h-5 w-40" />
        <div className="skeleton mt-6 h-14 w-full max-w-xl" />
        <div className="skeleton mt-3 h-14 w-2/3" />
        <div className="skeleton mt-8 h-5 w-full max-w-lg" />
        <div className="skeleton mt-3 h-5 w-3/4 max-w-md" />
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          aria-hidden
          key={i}
          className="grid grid-cols-[2.5rem_minmax(0,1fr)_3rem] gap-x-4 border-b py-6 md:grid-cols-[4rem_minmax(0,1fr)_13rem_6rem] md:gap-x-6 md:py-8"
        >
          <div className="skeleton h-9 w-8" />
          <div>
            <div className="skeleton h-4 w-24" />
            <div className="skeleton mt-3 h-7 w-3/4" />
            <div className="skeleton mt-3 h-4 w-full" />
          </div>
          <div className="skeleton hidden h-14 md:block" />
          <div className="skeleton h-10 w-10 justify-self-end" />
        </div>
      ))}
    </div>
  );
}
