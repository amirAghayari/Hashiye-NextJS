import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  deck?: string;
  actions?: React.ReactNode;
  className?: string;
};

/** Title block for inner pages: a heavy rule, a big serif title, a short deck. */
export function PageHeader({ title, deck, actions, className }: PageHeaderProps) {
  return (
    <header className={cn("border-b border-foreground", className)}>
      <div className="page flex flex-wrap items-end justify-between gap-8 py-12 md:py-16">
        <div className="max-w-3xl">
          <h1 className="type-headline">{title}</h1>
          {deck ? <p className="type-deck mt-4 text-muted-foreground">{deck}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
      </div>
    </header>
  );
}
