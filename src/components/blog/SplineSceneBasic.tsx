"use client";

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-[#080F20] relative overflow-hidden mt-8">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex h-full flex-col md:flex-row">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-start">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Smart RV Experience
          </h2>
          <p className="mt-4 text-neutral-300 max-w-lg text-left">
            Discover how modern technology transforms your RV adventures. Experience the perfect blend of comfort and innovation on the road.
          </p>
          
          <div className="mt-6 space-y-4 text-white font-bold max-w-lg">
            <p>
              Explore the future of mobile living with insights that bridge the gap between technology and the great outdoors.
            </p>
            <p>
              Our comprehensive guides showcase innovative features, from smart connectivity, energy efficient designs through advanced navigation systems to modern home comforts that are transforming the RV lifestyle.
            </p>
            <p>
              Whether you're planning your next adventure or upgrading your current setup, you'll find practical tips, inspiring stories, and the latest trends that empower you to make every journey extraordinary.
            </p>
            <p>
              Dive in to discover how modern technology can elevate your experience on the road, offering both reliability and luxury at every turn.
            </p>
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 relative min-h-[300px]">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  );
}