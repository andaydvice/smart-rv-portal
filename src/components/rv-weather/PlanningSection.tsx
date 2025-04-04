import React from "react";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
const PlanningSection = () => {
  return <section id="trip-planning" className="py-12 md:py-16 bg-dark-background">
      <div className="container max-w-5xl mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} viewport={{
        once: true
      }} className="Add padding to the spacing utilities to include mb-8, mt-8, ml-8, mr-8, and p-8 with the padding utility classes.">
          <AspectRatio ratio={16 / 9} className="mb-8 overflow-hidden rounded-lg shadow-xl">
            <img src="/lovable-uploads/2f6b7370-f9de-4fed-91d7-a4d0822299c7.png" alt="Person planning RV trip with maps and weather data on computer" className="w-full h-full object-cover" />
          </AspectRatio>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-4">
            Planning Your Trip Around Weather
          </h2>
          
          <p className="text-light-blue text-center mb-10">
            Smart route planning begins with understanding the weather patterns that will impact your journey
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-connectivity-darkBg p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white mb-4 font-montserrat">
                Pre-Trip Planning
              </h3>
              <ul className="text-light-blue space-y-3">
                <li className="flex items-start">
                  <span className="text-ocean-blue mr-2">•</span>
                  <span>Research seasonal weather patterns for your destinations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ocean-blue mr-2">•</span>
                  <span>Check historical weather data for your travel dates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ocean-blue mr-2">•</span>
                  <span>Create flexible itineraries that accommodate weather changes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ocean-blue mr-2">•</span>
                  <span>Identify potential shelter locations along your route</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-connectivity-darkBg p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white mb-4 font-montserrat">
                En-Route Adjustments
              </h3>
              <ul className="text-light-blue space-y-3">
                <li className="flex items-start">
                  <span className="text-ocean-blue mr-2">•</span>
                  <span>Monitor weather forecasts daily during your trip</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ocean-blue mr-2">•</span>
                  <span>Use weather radar apps to track storms in real-time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ocean-blue mr-2">•</span>
                  <span>Plan driving schedules around optimal weather windows</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ocean-blue mr-2">•</span>
                  <span>Maintain communication with campgrounds about weather conditions</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default PlanningSection;