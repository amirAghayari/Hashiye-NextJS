import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

function NativeSelect({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-12 w-full appearance-none rounded-none border-0 border-b border-input bg-transparent pe-8 ps-0 text-body focus-visible:border-foreground focus-visible:shadow-[0_1px_0_0_var(--ink)] focus-visible:outline-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute end-0 top-1/2 size-4 -translate-y-1/2"
      />
    </div>
  )
}

export { NativeSelect }
