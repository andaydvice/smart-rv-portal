
"use client";

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[800px] bg-[#080F20] relative overflow-hidden mt-8">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex h-full flex-col md:flex-row">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-start overflow-y-auto">
          <div className="w-full mb-8 rounded-lg overflow-hidden">
            <img 
              src="/lovable-uploads/3175b015-a5c7-4df7-b8ca-b8a130b05519.png"
              alt="People enjoying their RV experience with outdoor dining setup"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-left">
            Smart RV Experience
          </h2>
          <p className="mt-4 text-white text-left">
            Discover how modern technology transforms your RV adventures. Experience the perfect blend of comfort and innovation on the road.
          </p>
          
          <div className="mt-6 space-y-4 text-white">
            <p className="text-left">
              Explore the future of mobile living with insights that bridge the gap between technology and the great outdoors.
            </p>
            <p className="text-left">
              Our comprehensive guides showcase innovative features, from smart connectivity, energy efficient designs through advanced navigation systems to modern home comforts that are transforming the RV lifestyle.
            </p>
            <p className="text-left">
              Whether you're planning your next adventure or upgrading your current setup, you'll find practical tips, inspiring stories, and the latest trends that empower you to make every journey extraordinary.
            </p>
            <p className="text-left">
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
