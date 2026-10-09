export default function ArticleLoading() {
  return (
    <div
      role="status"
      aria-label="در حال بارگذاری نوشته"
      className="page pt-16"
    >
      <span className="sr-only">در حال بارگذاری نوشته…</span>
      <div aria-hidden>
        <div className="skeleton h-6 w-24" />
        <div className="skeleton mt-6 h-16 w-full max-w-3xl" />
        <div className="skeleton mt-3 h-16 w-2/3" />
        <div className="skeleton mt-10 h-20 w-full" />
        <div className="mt-12 max-w-[40rem] space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-5 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
