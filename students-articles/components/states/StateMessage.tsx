import { cn } from "@/lib/utils";

type StateMessageProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  tone?: "neutral" | "error";
  className?: string;
};

/** Empty, error and not-found states share one voice: a rule, a plain title, one next step. */
export function StateMessage({
  title,
  description,
  children,
  tone = "neutral",
  className,
}: StateMessageProps) {
  return (
    <div
      role={tone === "error" ? "alert" : undefined}
      className={cn("max-w-2xl border-t-2 border-foreground py-12", className)}
    >
      <h2 className={cn("type-headline", tone === "error" && "text-destructive")}>
        {title}
      </h2>
      {description ? (
        <p className="type-deck mt-4 text-muted-foreground">{description}</p>
      ) : null}
      {children ? <div className="mt-8 flex flex-wrap items-center gap-4">{children}</div> : null}
    </div>
  );
}
