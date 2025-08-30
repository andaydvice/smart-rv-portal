
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

        {/* Right content - Professional animated RV visual */}
        <div className="flex-1 relative">
          <div className="w-full h-full relative overflow-hidden rounded-lg bg-gradient-to-br from-connectivity-darkBg via-gray-900 to-black">
            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#5B9BD5" strokeWidth="1" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Floating tech elements */}
            <div className="absolute inset-0">
              <div className="absolute top-16 left-16 w-3 h-3 bg-connectivity-accent rounded-full animate-pulse"></div>
              <div className="absolute top-32 right-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
              <div className="absolute bottom-24 left-20 w-4 h-4 bg-green-400 rounded-full animate-pulse delay-700"></div>
              <div className="absolute bottom-16 right-16 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
            </div>
            
            {/* Main RV silhouette */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* RV Body - main rectangle */}
                <div className="w-48 h-24 bg-gradient-to-r from-connectivity-accent/40 to-blue-500/40 rounded-lg border border-connectivity-accent/60 backdrop-blur-sm">
                  {/* RV Windows */}
                  <div className="flex justify-between items-center h-full px-4">
                    <div className="w-6 h-8 bg-blue-200/30 rounded border border-blue-300/50"></div>
                    <div className="w-8 h-10 bg-blue-200/30 rounded border border-blue-300/50"></div>
                    <div className="w-6 h-8 bg-blue-200/30 rounded border border-blue-300/50"></div>
                  </div>
                  
                  {/* Tech indicators on RV */}
                  <div className="absolute -top-2 left-8 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="absolute -top-2 right-8 w-2 h-2 bg-connectivity-accent rounded-full animate-pulse delay-500"></div>
                </div>
                
                {/* RV Wheels */}
                <div className="absolute -bottom-3 left-8">
                  <div className="w-6 h-6 bg-gray-600 rounded-full border-2 border-gray-400"></div>
                </div>
                <div className="absolute -bottom-3 right-8">
                  <div className="w-6 h-6 bg-gray-600 rounded-full border-2 border-gray-400"></div>
                </div>
                
                {/* Connectivity waves */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="w-8 h-8 border-2 border-connectivity-accent rounded-full animate-ping"></div>
                    <div className="absolute inset-2 w-4 h-4 border border-blue-400 rounded-full animate-ping delay-300"></div>
                    <div className="absolute inset-3 w-2 h-2 bg-connectivity-accent rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Side tech panels */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-2">
              <div className="w-16 h-2 bg-connectivity-accent/50 rounded animate-pulse"></div>
              <div className="w-12 h-2 bg-blue-400/50 rounded animate-pulse delay-200"></div>
              <div className="w-14 h-2 bg-green-400/50 rounded animate-pulse delay-400"></div>
            </div>
            
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-2">
              <div className="w-14 h-2 bg-purple-400/50 rounded animate-pulse delay-100"></div>
              <div className="w-16 h-2 bg-connectivity-accent/50 rounded animate-pulse delay-300"></div>
              <div className="w-10 h-2 bg-blue-400/50 rounded animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
