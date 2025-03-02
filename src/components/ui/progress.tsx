
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, indicatorClassName, ...props }, ref) => {
  // Ensure value is always a valid number
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-visible rounded-full bg-secondary",
        className
      )}
      {...props}
      style={{ 
        visibility: 'visible', 
        display: 'block', 
        position: 'relative',
        opacity: 1,
        ...props.style 
      }}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full w-full flex-1 bg-primary transition-none", indicatorClassName)}
        style={{ 
          transform: `translateX(-${100 - (safeValue || 0)}%)`,
          visibility: 'visible',
          display: 'block',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: `${safeValue || 0}%`,
          opacity: 1
        }}
      />
    </ProgressPrimitive.Root>
  );
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
