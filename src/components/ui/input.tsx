import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "flex h-9 w-full min-w-0 rounded-md border border-input bg-white/20 px-3 py-1 text-base shadow-xs",
        "transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",

        // Focus styles (modifié)
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/10 focus-visible:ring-offset-1",

        // Dark mode
        "dark:bg-input/30 dark:focus-visible:ring-white/20",

        // Invalid state
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20"
      )}
    />
  )
}

export { Input }
