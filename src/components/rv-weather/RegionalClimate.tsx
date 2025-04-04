
import React from "react";

const RegionalClimate = () => {
  return (
    <section className="py-16 bg-deeper-background">
      <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-4">
        Regional Climate Highlights
      </h2>
      <div className="w-24 h-1 bg-ocean-blue mx-auto mb-10"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-background rounded-lg overflow-hidden shadow">
          <div className="bg-yellow-600 text-white px-3 py-1 text-sm font-semibold">
            Hot & Dry
          </div>
          <div className="p-6">
            <h3 className="font-bold text-white text-xl mb-3">Southwest</h3>
            <p className="text-light-blue">
              Hot, dry summers with monsoon season (July-Sept). Mild winters in lower elevations, 
              snow at higher altitudes. Prepare for extreme temperature swings between day and night.
            </p>
          </div>
        </div>
        
        <div className="bg-dark-background rounded-lg overflow-hidden shadow">
          <div className="bg-ocean-blue text-white px-3 py-1 text-sm font-semibold">
            Wet & Mild
          </div>
          <div className="p-6">
            <h3 className="font-bold text-white text-xl mb-3">Pacific Northwest</h3>
            <p className="text-light-blue">
              Mild, wet winters and dry summers. Significant precipitation along the coast, less inland.
              Prepare for extended periods of rain and high humidity during winter months.
            </p>
          </div>
        </div>
        
        <div className="bg-dark-background rounded-lg overflow-hidden shadow">
          <div className="bg-green-600 text-white px-3 py-1 text-sm font-semibold">
            Four Seasons
          </div>
          <div className="p-6">
            <h3 className="font-bold text-white text-xl mb-3">Northeast</h3>
            <p className="text-light-blue">
              Four distinct seasons with cold, snowy winters and warm, humid summers. Fall foliage is spectacular.
              Winter travel requires careful planning and cold-weather preparation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionalClimate;
