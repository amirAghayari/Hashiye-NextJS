import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

/** Label + control + optional hint, with one consistent rhythm. */
export function Field({
  label,
  htmlFor,
  hint,
  className,
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("grid gap-1", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint ? <p className="type-label">{hint}</p> : null}
    </div>
  )
}
