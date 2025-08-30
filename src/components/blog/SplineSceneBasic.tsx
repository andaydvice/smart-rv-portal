
'use client'

import { SplineScene } from "@/components/ui/spline";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
 
export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Smart RV Blog
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg">
            Discover the latest insights, tips, and innovations for your Smart RV lifestyle
          </p>
        </div>

        {/* Right content - Enhanced visual */}
        <div className="flex-1 relative">
          <div className="w-full h-full relative overflow-hidden rounded-lg bg-gradient-to-br from-connectivity-accent/20 via-blue-600/30 to-purple-600/20">
            {/* Animated background elements */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-connectivity-accent/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>
            
            {/* Main visual content */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="text-6xl mb-4 filter drop-shadow-lg">🚐</div>
                  <div className="absolute -inset-2 bg-connectivity-accent/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Smart RV Tech</h3>
                  <p className="text-connectivity-lightText max-w-xs">
                    Advanced connectivity and automation for modern RV living
                  </p>
                </div>
                
                {/* Tech indicators */}
                <div className="flex justify-center space-x-4 mt-6">
                  <div className="flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-white">Connected</span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                    <span className="text-xs text-white">Smart</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
