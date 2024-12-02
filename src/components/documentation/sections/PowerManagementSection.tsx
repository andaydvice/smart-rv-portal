import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Zap } from "lucide-react";

const PowerManagementSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Zap className="w-8 h-8 text-[#60A5FA]" />
        <h2 className="text-[#60A5FA] text-3xl font-bold">Power Management</h2>
      </div>
      
      <div className="rounded-2xl border-2 border-gray-800 bg-[#0F172A] shadow-lg overflow-hidden">
        <Accordion type="single" collapsible>
          <AccordionItem value="power-management" className="border-0">
            <AccordionTrigger className="px-8 py-6 text-[#4ADE80] text-2xl font-bold hover:no-underline hover:text-[#4ADE80]/90">
              Power Management Overview
            </AccordionTrigger>
            <AccordionContent className="px-8 pb-8 text-gray-200 space-y-6 text-xl leading-relaxed">
              <p>
                Every RV power system combines multiple energy sources to keep your adventures running smoothly.
              </p>
              <p>
                Learning how these systems work together helps you make informed decisions about power management.
              </p>

              <h3 className="text-2xl font-bold text-blue-300 mt-8 mb-4">Energy Sources Explained</h3>
              <p>
                Shore power provides reliable electricity when connected at campgrounds, but understanding voltage variations prevents damage to sensitive equipment.
              </p>
              <p>
                Solar panels convert sunlight into usable power, with efficiency varying based on panel angle, shade, and weather conditions.
              </p>
              <p>
                Batteries store excess energy for later use, acting as your primary power source when boondocking or during overnight stays.
              </p>

              <h3 className="text-2xl font-bold text-blue-300 mt-8 mb-4">Making Smart Power Choices</h3>
              <p>
                Monitor your power consumption patterns to understand which appliances draw the most energy.
              </p>
              <p>
                Small adjustments in daily routines can significantly impact your power availability when off grid.
              </p>
              <p>
                Different seasons require different power management strategies as solar input and heating/cooling needs change.
              </p>

              <h3 className="text-2xl font-bold text-blue-300 mt-8 mb-4">Battery System Basics</h3>
              <p>
                Modern lithium batteries offer more usable capacity than traditional lead acid, but require proper charging parameters.
              </p>
              <p>
                Temperature affects battery performance and lifespan - extreme conditions need special consideration.
              </p>
              <p>
                Understanding charge cycles helps extend battery life and maintain reliable power storage.
              </p>

              <h3 className="text-2xl font-bold text-blue-300 mt-8 mb-4">Solar Power Insights</h3>
              <p>
                Panel placement significantly impacts energy generation - learn to optimize your setup for different parking situations.
              </p>
              <p>
                Partial shade affects solar panels more than many realize, making panel positioning crucial for maximum efficiency.
              </p>
              <p>
                Seasonal sun angles change your solar input - adjust your power usage expectations accordingly.
              </p>

              <h3 className="text-2xl font-bold text-blue-300 mt-8 mb-4">Practical Power Management</h3>
              <p>
                Start by tracking your actual power usage before making expensive system upgrades.
              </p>
              <p>
                Learn to identify essential versus optional power loads for effective energy prioritization.
              </p>
              <p>
                Develop backup plans for different scenarios to maintain critical systems during unexpected situations.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default PowerManagementSection;