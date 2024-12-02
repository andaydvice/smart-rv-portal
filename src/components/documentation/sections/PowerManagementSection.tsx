import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Zap, ChevronDown } from "lucide-react";

const PowerManagementSection = () => {
  return (
    <AccordionItem value="power-management" className="border-b border-gray-800/50 px-4 py-3">
      <div className="flex items-center gap-3">
        <Zap className="w-4 h-4 text-[#60A5FA]" />
        <AccordionTrigger className="text-[#60A5FA] text-base hover:no-underline flex-1">
          Power Management
          <ChevronDown className="h-4 w-4 shrink-0 text-[#4ADE80] transition-transform duration-200" />
        </AccordionTrigger>
      </div>
      <AccordionContent className="text-gray-300 space-y-4 pl-7">
        <p>Every RV power system combines multiple energy sources to keep your adventures running smoothly.</p>
        <p>Learning how these systems work together helps you make informed decisions about power management.</p>

        <h3 className="text-lg font-semibold text-blue-300 mt-6 mb-3">Energy Sources Explained</h3>
        <p>Shore power provides reliable electricity when connected at campgrounds, but understanding voltage variations prevents damage to sensitive equipment.</p>
        <p>Solar panels convert sunlight into usable power, with efficiency varying based on panel angle, shade, and weather conditions.</p>
        <p>Batteries store excess energy for later use, acting as your primary power source when boondocking or during overnight stays.</p>

        <h3 className="text-lg font-semibold text-blue-300 mt-6 mb-3">Making Smart Power Choices</h3>
        <p>Monitor your power consumption patterns to understand which appliances draw the most energy.</p>
        <p>Small adjustments in daily routines can significantly impact your power availability when off grid.</p>
        <p>Different seasons require different power management strategies as solar input and heating/cooling needs change.</p>

        <h3 className="text-lg font-semibold text-blue-300 mt-6 mb-3">Battery System Basics</h3>
        <p>Modern lithium batteries offer more usable capacity than traditional lead acid, but require proper charging parameters.</p>
        <p>Temperature affects battery performance and lifespan - extreme conditions need special consideration.</p>
        <p>Understanding charge cycles helps extend battery life and maintain reliable power storage.</p>

        <h3 className="text-lg font-semibold text-blue-300 mt-6 mb-3">Solar Power Insights</h3>
        <p>Panel placement significantly impacts energy generation - learn to optimize your setup for different parking situations.</p>
        <p>Partial shade affects solar panels more than many realize, making panel positioning crucial for maximum efficiency.</p>
        <p>Seasonal sun angles change your solar input - adjust your power usage expectations accordingly.</p>

        <h3 className="text-lg font-semibold text-blue-300 mt-6 mb-3">Practical Power Management</h3>
        <p>Start by tracking your actual power usage before making expensive system upgrades.</p>
        <p>Learn to identify essential versus optional power loads for effective energy prioritization.</p>
        <p>Develop backup plans for different scenarios to maintain critical systems during unexpected situations.</p>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PowerManagementSection;
