
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
                    <h3 className="text-xl font-bold text-white mb-3 text-left">
                      Pre Trip Planning
                    </h3>
                    <table className="w-full text-left">
                      <tbody>
                        <tr>
                          <td className="py-1.5 pl-1 pr-3 text-light-blue" style={{width: "30px", verticalAlign: "top"}}>
                            <span className="text-ocean-blue mr-2">•</span>
                          </td>
                          <td className="py-1.5 text-light-blue">
                            Research seasonal weather patterns for your destinations
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1.5 pl-1 pr-3 text-light-blue" style={{width: "30px", verticalAlign: "top"}}>
                            <span className="text-ocean-blue mr-2">•</span>
                          </td>
                          <td className="py-1.5 text-light-blue">
                            Check historical weather data for your travel dates
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1.5 pl-1 pr-3 text-light-blue" style={{width: "30px", verticalAlign: "top"}}>
                            <span className="text-ocean-blue mr-2">•</span>
                          </td>
                          <td className="py-1.5 text-light-blue">
                            Create flexible itineraries that accommodate weather changes
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1.5 pl-1 pr-3 text-light-blue" style={{width: "30px", verticalAlign: "top"}}>
                            <span className="text-ocean-blue mr-2">•</span>
                          </td>
                          <td className="py-1.5 text-light-blue">
                            Identify potential shelter locations along your route
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-[#151A22]">
                  <TableCell className="py-4 px-6 align-top" colSpan={2}>
                    <h3 className="text-xl font-bold text-white mb-3 text-left">
                      En Route Adjustments
                    </h3>
                    <table className="w-full text-left">
                      <tbody>
                        <tr>
                          <td className="py-1.5 pl-1 pr-3 text-light-blue" style={{width: "30px", verticalAlign: "top"}}>
                            <span className="text-ocean-blue mr-2">•</span>
                          </td>
                          <td className="py-1.5 text-light-blue">
                            Monitor weather forecasts daily during your trip
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1.5 pl-1 pr-3 text-light-blue" style={{width: "30px", verticalAlign: "top"}}>
                            <span className="text-ocean-blue mr-2">•</span>
                          </td>
                          <td className="py-1.5 text-light-blue">
                            Use weather radar apps to track storms in real time
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1.5 pl-1 pr-3 text-light-blue" style={{width: "30px", verticalAlign: "top"}}>
                            <span className="text-ocean-blue mr-2">•</span>
                          </td>
                          <td className="py-1.5 text-light-blue">
                            Plan driving schedules around optimal weather windows
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1.5 pl-1 pr-3 text-light-blue" style={{width: "30px", verticalAlign: "top"}}>
                            <span className="text-ocean-blue mr-2">•</span>
                          </td>
                          <td className="py-1.5 text-light-blue">
                            Maintain communication with campgrounds about weather conditions
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
