import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const shellVariants = cva("grid items-center gap-8 pb-8 pt-6 md:py-8")

interface ShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {}

function Shell({ className, ...props }: ShellProps) {
  return (
    <div className={cn(shellVariants(), className)} {...props} />
  )
}

export { Shell, shellVariants }