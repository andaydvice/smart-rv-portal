
import * as React from "react"
import { cn } from "@/lib/utils"

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
}

export function TypographyH1({ className, as: Component = "h1", ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl break-words overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

export function TypographyH2({ className, as: Component = "h2", ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 break-words overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

export function TypographyH3({ className, as: Component = "h3", ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight break-words overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

export function TypographyH4({ className, as: Component = "h4", ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight break-words overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

export function TypographyP({ className, as: Component = "p", ...props }: TypographyProps) {
  return (
    <Component
      className={cn("leading-7 [&:not(:first-child)]:mt-6 break-words", className)}
      {...props}
    />
  )
}
