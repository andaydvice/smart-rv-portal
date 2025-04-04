
import React from "react";
import { CheckSquare } from "lucide-react";

const PreparednessTips = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-4">
        Weather Preparedness
      </h2>
      <div className="w-24 h-1 bg-ocean-blue mx-auto mb-10"></div>
      
      <div className="bg-dark-background p-8 rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          <div className="p-2 bg-ocean-blue/20 rounded-full mr-3">
            <CheckSquare className="h-6 w-6 text-ocean-blue" />
          </div>
          <h3 className="text-xl font-bold text-white">Essential Preparation Checklist</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="h-5 w-5 rounded border border-ocean-blue flex-shrink-0 mt-0.5"></div>
              <span className="ml-3 text-light-blue">Download weather apps before traveling</span>
            </div>
            <div className="flex items-start">
              <div className="h-5 w-5 rounded border border-ocean-blue flex-shrink-0 mt-0.5"></div>
              <span className="ml-3 text-light-blue">Create emergency contact list</span>
            </div>
            <div className="flex items-start">
              <div className="h-5 w-5 rounded border border-ocean-blue flex-shrink-0 mt-0.5"></div>
              <span className="ml-3 text-light-blue">Pack emergency weather supplies</span>
            </div>
            <div className="flex items-start">
              <div className="h-5 w-5 rounded border border-ocean-blue flex-shrink-0 mt-0.5"></div>
              <span className="ml-3 text-light-blue">Know your RV's wind resistance limits</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="h-5 w-5 rounded border border-ocean-blue flex-shrink-0 mt-0.5"></div>
              <span className="ml-3 text-light-blue">Review evacuation routes for each stay</span>
            </div>
            <div className="flex items-start">
              <div className="h-5 w-5 rounded border border-ocean-blue flex-shrink-0 mt-0.5"></div>
              <span className="ml-3 text-light-blue">Keep emergency radio with backup batteries</span>
            </div>
            <div className="flex items-start">
              <div className="h-5 w-5 rounded border border-ocean-blue flex-shrink-0 mt-0.5"></div>
              <span className="ml-3 text-light-blue">Create a severe weather action plan</span>
            </div>
            <div className="flex items-start">
              <div className="h-5 w-5 rounded border border-ocean-blue flex-shrink-0 mt-0.5"></div>
              <span className="ml-3 text-light-blue">Keep important documents in waterproof container</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-deeper-background rounded-lg border border-ocean-blue/30">
          <h4 className="text-lg font-semibold text-white mb-4">Emergency Weather Kit for RVers</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-medium text-ocean-blue mb-2">Communication</h5>
              <ul className="space-y-1 text-light-blue">
                <li>• Weather radio with backup batteries</li>
                <li>• Portable phone charger/power bank</li>
                <li>• Whistle for signaling</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium text-ocean-blue mb-2">Safety Items</h5>
              <ul className="space-y-1 text-light-blue">
                <li>• First aid kit</li>
                <li>• Flashlights and extra batteries</li>
                <li>• Emergency blankets</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium text-ocean-blue mb-2">Essentials</h5>
              <ul className="space-y-1 text-light-blue">
                <li>• 3-day supply of water and food</li>
                <li>• Weather-appropriate clothing</li>
                <li>• Cash in small denominations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreparednessTips;
