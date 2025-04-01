
import * as React from "react"
import { cn } from "@/lib/utils"

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
}

export function TypographyH1({ className, as: Component = "h1", ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl text-[#333] break-words overflow-hidden",
        className
      )}
      aria-level="1"
      {...props}
    />
  )
}

export function TypographyH2({ className, as: Component = "h2", ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-[#333] break-words overflow-hidden",
        className
      )}
      aria-level="2"
      {...props}
    />
  )
}

export function TypographyH3({ className, as: Component = "h3", ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight text-[#333] break-words overflow-hidden",
        className
      )}
      aria-level="3"
      {...props}
    />
  )
}

export function TypographyH4({ className, as: Component = "h4", ...props }: TypographyProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight text-[#333] break-words overflow-hidden",
        className
      )}
      aria-level="4"
      {...props}
    />
  )
}

export function TypographyP({ className, as: Component = "p", ...props }: TypographyProps) {
  return (
    <Component
      className={cn("leading-7 text-base text-[#666] [&:not(:first-child)]:mt-6 break-words", className)}
      {...props}
    />
  )
}

export function TypographySmall({ className, as: Component = "small", ...props }: TypographyProps) {
  return (
    <Component
      className={cn("text-sm font-medium leading-none text-[#666]", className)}
      {...props}
    />
  )
}

export function TypographyLead({ className, as: Component = "p", ...props }: TypographyProps) {
  return (
    <Component
      className={cn("text-lg text-[#666]", className)}
      {...props}
    />
  )
}

export function TypographySubtle({ className, as: Component = "p", ...props }: TypographyProps) {
  return (
    <Component
      className={cn("text-sm text-[#666] opacity-80", className)}
      {...props}
    />
  )
}

export function TypographySuccess({ className, as: Component = "p", ...props }: TypographyProps) {
  return (
    <Component
      className={cn("text-base text-[#0f0]", className)}
      {...props}
    />
  )
}
