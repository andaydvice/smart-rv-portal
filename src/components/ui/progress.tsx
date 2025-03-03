
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
  // Ensure value is always a valid number between 0-100
  const safeValue = typeof value === 'number' && !isNaN(value) ? Math.max(0, Math.min(value, 100)) : 0;
  
  // Use inline styles for maximum override capability
  const rootStyles: React.CSSProperties = { 
    visibility: 'visible', 
    display: 'block', 
    position: 'relative',
    opacity: 1,
    width: '100%',
    height: '16px',
    borderRadius: '9999px',
    overflow: 'hidden',
    backgroundColor: 'rgba(31, 41, 55, 0.7)',
    ...props.style 
  };
  
  // Indicator styles with proper type annotations
  const indicatorStyles: React.CSSProperties = { 
    transform: `translateX(0%)`,
    visibility: 'visible',
    display: 'block',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: `${safeValue}%`,
    height: '100%',
    opacity: 1,
    backgroundColor: '#3B82F6'
  };
  
  // Debug the value being passed
  console.log(`Progress component rendering with value: ${value}, safeValue: ${safeValue}`);
  
  return (
    <div className="progress-wrapper" style={{ position: 'relative', width: '100%' }}>
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-visible rounded-full bg-secondary",
          className
        )}
        style={rootStyles}
        value={safeValue}
        max={100}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn("h-full w-full flex-1 bg-primary transition-none", indicatorClassName)}
          style={indicatorStyles}
        />
      </ProgressPrimitive.Root>
    </div>
  );
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
