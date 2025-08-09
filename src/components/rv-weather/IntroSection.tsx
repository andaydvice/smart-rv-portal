
import React from "react";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { Cloud } from "lucide-react";

const IntroSection = () => {
  return (
    <section id="weather-matters" className="py-6 px-4 rounded-lg bg-gradient-to-b from-[#131a2a]/50 to-[#080F1F]/50 border border-[#1a202c]/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Cloud className="h-7 w-7 text-[#5B9BD5]" />
        <TypographyH2 className="border-none text-white text-left text-3xl font-playfair">Why Weather Matters for Smart RV Travel</TypographyH2>
      </div>
      
      <TypographyP className="text-[#E2E8FF] text-base sm:text-lg text-left mb-8">
        Weather directly affects your safety on the road, comfort at your campsite and the longevity of your vehicle. 
        Understanding how to track, plan for, and respond to weather is essential for every smart RV owner.
      </TypographyP>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-[#151A22] rounded-lg border border-[#1a202c]/40 transition-all hover:transform hover:-translate-y-1">
          <div className="text-4xl text-[#5B9BD5] mb-4 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4 text-center text-white">Safety First</h3>
          <p className="text-[#E2E8FF] text-left">
            Weather conditions directly impact road safety. High winds, heavy rain, and ice can make driving hazardous, 
            especially for high-profile vehicles like RVs.
          </p>
        </div>
        
        <div className="p-6 bg-[#151A22] rounded-lg border border-[#1a202c]/40 transition-all hover:transform hover:-translate-y-1">
          <div className="text-4xl text-[#5B9BD5] mb-4 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4 text-center text-white">Campsite Comfort</h3>
          <p className="text-[#E2E8FF] text-left">
            Temperature extremes, precipitation, and wind can drastically affect your comfort level while camping, 
            potentially turning a pleasant trip into a stressful experience.
          </p>
        </div>
        
        <div className="p-6 bg-[#151A22] rounded-lg border border-[#1a202c]/40 transition-all hover:transform hover:-translate-y-1">
          <div className="text-4xl text-[#5B9BD5] mb-4 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4 text-center text-white">Vehicle Longevity</h3>
          <p className="text-[#E2E8FF] text-left">
            Extreme weather can cause accelerated wear and tear on your RV. UV damage, freezing temperatures, 
            and humidity all affect different components of your vehicle.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <img 
          src="/lovable-uploads/c1732ddf-458c-4eeb-b6ad-7a817ae9ba17.png" 
          alt="Person planning a Smart RV trip while checking weather conditions" 
          className="rounded-lg shadow-lg w-full object-cover max-h-[400px]"
        />
      </div>
    </section>
  );
};

export default IntroSection;
