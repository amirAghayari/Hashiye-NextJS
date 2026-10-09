import { cn } from "@/lib/utils";

/** Inline message for form results. Errors are announced; successes are polite. */
export function Notice({
  tone = "success",
  children,
  className,
}: {
  tone?: "success" | "error";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "border-s-4 bg-muted px-4 py-3 type-meta",
        tone === "error" ? "border-destructive text-destructive" : "border-foreground",
        className
      )}
    >
      {children}
    </div>
  );
}
