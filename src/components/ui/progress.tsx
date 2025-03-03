
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
  // Use state to track and animate the value
  const [computedValue, setComputedValue] = React.useState<number>(0);
  
  // Ensure value is a valid percentage between 0-100
  React.useEffect(() => {
    const safeValue = typeof value === 'number' && !isNaN(value) 
      ? Math.max(0, Math.min(value, 100)) 
      : 0;
      
    // Set the value with a slight delay to ensure smooth animation
    setComputedValue(safeValue);
  }, [value]);
  
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      value={computedValue}
      max={100}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName)}
        style={{ transform: `translateX(-${100 - computedValue}%)` }}
      />
    </ProgressPrimitive.Root>
  );
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
