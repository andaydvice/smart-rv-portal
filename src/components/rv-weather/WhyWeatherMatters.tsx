
import React from "react";
import { Shield, Home, Wrench } from "lucide-react";

const WhyWeatherMatters = () => {
  return (
    <section id="weather-matters" className="py-16 bg-deeper-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-4">
          Why Weather Matters for RV Travel
        </h2>
        <div className="w-24 h-1 bg-ocean-blue mx-auto mb-10"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-dark-background p-8 rounded-lg shadow transition-transform hover:-translate-y-2 duration-300">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-ocean-blue/20 rounded-full">
                <Shield className="h-6 w-6 text-ocean-blue" />
              </div>
              <h3 className="text-xl font-bold text-white ml-4">Safety First</h3>
            </div>
            <p className="text-light-blue text-left">
              Weather conditions directly impact road safety. High winds, heavy rain, and ice can make driving hazardous, 
              especially for high-profile vehicles like RVs.
            </p>
          </div>
          
          <div className="bg-dark-background p-8 rounded-lg shadow transition-transform hover:-translate-y-2 duration-300">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-ocean-blue/20 rounded-full">
                <Home className="h-6 w-6 text-ocean-blue" />
              </div>
              <h3 className="text-xl font-bold text-white ml-4">Campsite Comfort</h3>
            </div>
            <p className="text-light-blue text-left">
              Temperature extremes, precipitation, and wind can drastically affect your comfort level while camping, 
              potentially turning a pleasant trip into a stressful experience.
            </p>
          </div>
          
          <div className="bg-dark-background p-8 rounded-lg shadow transition-transform hover:-translate-y-2 duration-300">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-ocean-blue/20 rounded-full">
                <Wrench className="h-6 w-6 text-ocean-blue" />
              </div>
              <h3 className="text-xl font-bold text-white ml-4">Vehicle Longevity</h3>
            </div>
            <p className="text-light-blue text-left">
              Extreme weather can cause accelerated wear and tear on your RV. UV damage, freezing temperatures, 
              and humidity all affect different components of your vehicle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeatherMatters;
