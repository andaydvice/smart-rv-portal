
import React from "react";
import { Shield, Home, Wrench } from "lucide-react";

const WhyWeatherMatters = () => {
  return (
    <section id="weather-matters" className="py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-4">
        Why Weather Matters for RV Travel
      </h2>
      <div className="w-24 h-1 bg-ocean-blue mx-auto mb-10"></div>
      
      <p className="text-lg text-light-blue text-center max-w-3xl mx-auto mb-12">
        Weather directly affects your safety on the road, comfort at your campsite, and the longevity of your vehicle. 
        Understanding how to track, plan for, and respond to weather is essential for every RV owner.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-background p-8 rounded-lg shadow transition-transform hover:-translate-y-2 duration-300 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-ocean-blue/20 rounded-full">
              <Shield className="h-10 w-10 text-ocean-blue" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Safety First</h3>
          <p className="text-light-blue">
            Weather conditions directly impact road safety. High winds, heavy rain, and ice can make driving hazardous, 
            especially for high-profile vehicles like RVs.
          </p>
        </div>
        
        <div className="bg-dark-background p-8 rounded-lg shadow transition-transform hover:-translate-y-2 duration-300 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-ocean-blue/20 rounded-full">
              <Home className="h-10 w-10 text-ocean-blue" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Campsite Comfort</h3>
          <p className="text-light-blue">
            Temperature extremes, precipitation, and wind can drastically affect your comfort level while camping, 
            potentially turning a pleasant trip into a stressful experience.
          </p>
        </div>
        
        <div className="bg-dark-background p-8 rounded-lg shadow transition-transform hover:-translate-y-2 duration-300 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-ocean-blue/20 rounded-full">
              <Wrench className="h-10 w-10 text-ocean-blue" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Vehicle Longevity</h3>
          <p className="text-light-blue">
            Extreme weather can cause accelerated wear and tear on your RV. UV damage, freezing temperatures, 
            and humidity all affect different components of your vehicle.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyWeatherMatters;
