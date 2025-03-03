
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  // Determine if the checkbox is checked
  const isChecked = props["data-state"] === "checked" || props["aria-checked"] === true;
  
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      style={{
        visibility: 'visible',
        opacity: 1,
        display: 'inline-flex',
        width: '16px',
        height: '16px',
        minWidth: '16px',
        minHeight: '16px',
        border: '1px solid #60A5FA',
        borderRadius: '4px',
        backgroundColor: isChecked ? "#60A5FA" : "transparent",
        position: 'relative',
        ...props.style
      }}
      {...props}
      data-print-checked={isChecked ? "true" : "false"}
      data-print-visible="true"
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
        style={{ 
          visibility: 'visible',
          opacity: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 10
        }}
        data-print-indicator="true"
      >
        <Check className="h-4 w-4 checkbox-indicator" style={{ display: 'block', visibility: 'visible' }} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
