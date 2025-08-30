
'use client'

import React, { useEffect, useRef, useState, Suspense } from 'react'
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

// Lazy load the heavy Spline Scene only when needed
const SplineLazy = React.lazy(() =>
  import("@/components/ui/spline").then((m) => ({ default: m.SplineScene }))
)

export const SplineSceneBasic = () => {
  const [shouldLoad, setShouldLoad] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return // Respect user preference

    const idle = (cb: () => void) =>
      (window as any).requestIdleCallback ? (window as any).requestIdleCallback(cb, { timeout: 3000 }) : setTimeout(cb, 500)

    const observe = () => {
      if (!containerRef.current) return
      const io = new IntersectionObserver((entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          idle(() => setShouldLoad(true))
          io.disconnect()
        }
      }, { rootMargin: '200px' })
      io.observe(containerRef.current)
    }

    observe()
  }, [])

  return (
    <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="flex h-full" ref={containerRef}>
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Smart RV Blog
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg">
            Discover the latest insights, tips, and innovations for your Smart RV lifestyle
          </p>
        </div>

        {/* Right content */}
        <div className="flex-1 relative">
          {!shouldLoad ? (
            <div className="w-full h-full bg-white/5 flex items-center justify-center" aria-hidden="true">
              <div className="w-16 h-16 border-4 border-connectivity-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <Suspense fallback={
              <div className="w-full h-full bg-white/5 flex items-center justify-center" aria-hidden="true">
                <div className="w-16 h-16 border-4 border-connectivity-accent border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <SplineLazy 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </Suspense>
          )}
        </div>
      </div>
    </Card>
  )
}
