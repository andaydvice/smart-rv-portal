
import React from "react";
import { Sun, Snowflake, CloudRain, Wind } from "lucide-react";

const SeasonalTips = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-4">
        Seasonal Weather Tips
      </h2>
      <div className="w-24 h-1 bg-ocean-blue mx-auto mb-10"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-dark-background p-6 rounded-lg shadow transition-transform hover:-translate-y-2 duration-300">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-ocean-blue/20 rounded-full">
              <Sun className="h-8 w-8 text-ocean-blue" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white text-center mb-4">Summer</h3>
          <p className="text-light-blue">
            Keep RV cool by parking in shade when possible. Use awnings and window covers to reduce solar gain. 
            Monitor tire pressure as heat increases it.
          </p>
        </div>
        
        <div className="bg-dark-background p-6 rounded-lg shadow transition-transform hover:-translate-y-2 duration-300">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-ocean-blue/20 rounded-full">
              <CloudRain className="h-8 w-8 text-ocean-blue" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white text-center mb-4">Spring</h3>
          <p className="text-light-blue">
            Watch for thunderstorms and flooding. Variable weather requires flexible planning and regular forecast checking.
            Be prepared for rapid temperature changes.
          </p>
        </div>
        
        <div className="bg-dark-background p-6 rounded-lg shadow transition-transform hover:-translate-y-2 duration-300">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-ocean-blue/20 rounded-full">
              <Wind className="h-8 w-8 text-ocean-blue" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white text-center mb-4">Fall</h3>
          <p className="text-light-blue">
            Check weather forecasts frequently as conditions can change rapidly. Prepare for unexpected cold snaps and 
            increasingly shorter daylight hours.
          </p>
        </div>
        
        <div className="bg-dark-background p-6 rounded-lg shadow transition-transform hover:-translate-y-2 duration-300">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-ocean-blue/20 rounded-full">
              <Snowflake className="h-8 w-8 text-ocean-blue" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white text-center mb-4">Winter</h3>
          <p className="text-light-blue">
            Insulate water pipes and tanks. Keep propane tanks at least 30% full to maintain pressure. 
            Prepare for electricity outages with backup power.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SeasonalTips;
