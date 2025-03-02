
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, style, ...props }, ref) => {
    // Create a default style that explicitly sets text color to white for better visibility
    // on dark backgrounds while allowing overrides through the style prop
    const defaultStyle = {
      color: 'white !important', // Set default color to white with !important
      caretColor: 'white', // Also set the caret color to white for visibility
      ...style
    };
    
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white",
          className
        )}
        ref={ref}
        style={defaultStyle}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
