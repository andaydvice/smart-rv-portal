
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, style, ...props }, ref) => {
    // Apply even more aggressive white text styling
    const defaultStyle = {
      color: 'white !important', // Set default color to white with !important
      caretColor: 'white !important', // Also set the caret color to white for visibility
      backgroundColor: '#131a2a !important', // Force dark background
      borderColor: '#1a202c !important', // Ensure visible borders
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
