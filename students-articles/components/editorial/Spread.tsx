import { cn } from "@/lib/utils";

type SpreadProps = {
  main: React.ReactNode;
  margin: React.ReactNode;
  marginWidth?: "md" | "lg";
  /** Put the margin above the main column on small screens (e.g. filters). */
  marginFirstOnMobile?: boolean;
  className?: string;
  mainClassName?: string;
  marginClassName?: string;
};

/**
 * The product's core layout: a main column and a margin, divided by a
 * vermilion rule like the margin line on ruled paper. The margin holds
 * annotations and tools. Below `lg` it stacks under (or over) the main column.
 */
export function Spread({
  main,
  margin,
  marginWidth = "md",
  marginFirstOnMobile = false,
  className,
  mainClassName,
  marginClassName,
}: SpreadProps) {
  return (
    <div
      className={cn(
        "grid",
        marginWidth === "lg"
          ? "lg:grid-cols-[minmax(0,1fr)_var(--margin-lg)]"
          : "lg:grid-cols-[minmax(0,1fr)_var(--margin-md)]",
        className
      )}
    >
      <div className={cn("min-w-0 lg:pe-10 xl:pe-14", mainClassName)}>{main}</div>
      <aside
        className={cn(
          "min-w-0 lg:border-s lg:border-mark/70 lg:ps-8 xl:ps-10",
          marginFirstOnMobile
            ? "max-lg:order-first"
            : "max-lg:mt-12 max-lg:border-t-2 max-lg:border-mark max-lg:pt-8",
          marginClassName
        )}
      >
        {margin}
      </aside>
    </div>
  );
}
