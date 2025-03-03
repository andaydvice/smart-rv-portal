
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
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground print-checkbox",
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
      aria-checked={isChecked}
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
      
      {/* Print-specific hard-coded checkmark character that will show in print mode */}
      {isChecked && (
        <span 
          aria-hidden="true" 
          className="print-only-checkmark"
          style={{
            display: 'none',
            position: 'absolute',
            top: '-4px',
            left: '2px',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          ✓
        </span>
      )}
      
      {/* Additional print fallback - this will be absolutely positioned and only show in print */}
      <span
        aria-hidden="true"
        className="print-only absolute inset-0 hidden"
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          textAlign: 'center',
          lineHeight: '1.2'
        }}
      >
        {isChecked ? '☑' : '☐'}
      </span>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
