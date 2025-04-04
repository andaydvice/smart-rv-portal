
import React from "react";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";

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
      }} className="mb-8 mt-8">
          <AspectRatio ratio={16 / 9} className="mb-8 overflow-hidden rounded-lg shadow-xl">
            <img src="/lovable-uploads/2f6b7370-f9de-4fed-91d7-a4d0822299c7.png" alt="Person planning RV trip with maps and weather data on computer" className="w-full h-full object-cover" />
          </AspectRatio>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-4">
            Planning Your Trip Around Weather
          </h2>
          
          <p className="text-light-blue text-center mb-10">
            Smart route planning begins with understanding the weather patterns that will impact your journey
          </p>
          
          <div className="overflow-hidden rounded-lg bg-connectivity-darkBg shadow-md">
            <Table className="border-collapse w-full">
              <TableHeader className="bg-[#131a2a]">
                <TableRow>
                  <TableHead colSpan={2} className="text-xl font-bold text-white py-5 px-6 text-left border-b border-[#1a202c]">
                    Weather Planning Essentials
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-b border-[#1a202c] bg-[#151A22]">
                  <TableCell className="py-4 px-6 align-top" colSpan={2}>
                    <h3 className="text-xl font-bold text-ocean-blue mb-3">
                      Pre-Trip Planning
                    </h3>
                    <ul className="space-y-2 text-light-blue">
                      <li className="flex items-start">
                        <span className="text-ocean-blue mr-2 mt-1">•</span>
                        <span>Research seasonal weather patterns for your destinations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-ocean-blue mr-2 mt-1">•</span>
                        <span>Check historical weather data for your travel dates</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-ocean-blue mr-2 mt-1">•</span>
                        <span>Create flexible itineraries that accommodate weather changes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-ocean-blue mr-2 mt-1">•</span>
                        <span>Identify potential shelter locations along your route</span>
                      </li>
                    </ul>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-[#151A22]">
                  <TableCell className="py-4 px-6 align-top" colSpan={2}>
                    <h3 className="text-xl font-bold text-ocean-blue mb-3">
                      En-Route Adjustments
                    </h3>
                    <ul className="space-y-2 text-light-blue">
                      <li className="flex items-start">
                        <span className="text-ocean-blue mr-2 mt-1">•</span>
                        <span>Monitor weather forecasts daily during your trip</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-ocean-blue mr-2 mt-1">•</span>
                        <span>Use weather radar apps to track storms in real-time</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-ocean-blue mr-2 mt-1">•</span>
                        <span>Plan driving schedules around optimal weather windows</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-ocean-blue mr-2 mt-1">•</span>
                        <span>Maintain communication with campgrounds about weather conditions</span>
                      </li>
                    </ul>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </section>;
};

export default PlanningSection;
