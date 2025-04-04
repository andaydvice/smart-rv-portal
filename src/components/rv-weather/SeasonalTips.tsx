
import React from "react";
import { Sun, Cloud, CloudSnow, Leaf } from "lucide-react";

const SeasonalTips = () => {
  return (
    <section className="py-16 bg-deeper-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-4">
          Seasonal Weather Tips
        </h2>
        <div className="w-24 h-1 bg-ocean-blue mx-auto mb-12"></div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-dark-background p-5 rounded-lg shadow">
            <div className="flex flex-col items-center mb-4">
              <div className="p-3 bg-yellow-400/20 rounded-full">
                <Sun className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-lg font-bold text-white mt-3">Summer</h3>
            </div>
            <ul className="space-y-2 text-light-blue text-left text-sm">
              <li>• Park in shade when possible</li>
              <li>• Use reflective window covers</li>
              <li>• Maintain proper tire pressure</li>
              <li>• Check air conditioning before trips</li>
            </ul>
          </div>
          
          <div className="bg-dark-background p-5 rounded-lg shadow">
            <div className="flex flex-col items-center mb-4">
              <div className="p-3 bg-orange-500/20 rounded-full">
                <Leaf className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-bold text-white mt-3">Fall</h3>
            </div>
            <ul className="space-y-2 text-light-blue text-left text-sm">
              <li>• Prepare for early frost</li>
              <li>• Watch for falling leaves on roads</li>
              <li>• Check heater function</li>
              <li>• Monitor weather forecasts closely</li>
            </ul>
          </div>
          
          <div className="bg-dark-background p-5 rounded-lg shadow">
            <div className="flex flex-col items-center mb-4">
              <div className="p-3 bg-blue-400/20 rounded-full">
                <CloudSnow className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mt-3">Winter</h3>
            </div>
            <ul className="space-y-2 text-light-blue text-left text-sm">
              <li>• Insulate water lines</li>
              <li>• Use RV antifreeze</li>
              <li>• Install thermal curtains</li>
              <li>• Keep propane tanks filled</li>
            </ul>
          </div>
          
          <div className="bg-dark-background p-5 rounded-lg shadow">
            <div className="flex flex-col items-center mb-4">
              <div className="p-3 bg-green-400/20 rounded-full">
                <Cloud className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white mt-3">Spring</h3>
            </div>
            <ul className="space-y-2 text-light-blue text-left text-sm">
              <li>• Be aware of flash flooding</li>
              <li>• Watch for severe thunderstorms</li>
              <li>• Check roof seals after winter</li>
              <li>• Monitor tornado warnings</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalTips;
