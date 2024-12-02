import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PowerManagementSection = () => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      <AccordionItem value="power-management" className="border-none">
        <AccordionTrigger className="text-[1.75rem] font-semibold text-[#60A5FA] hover:text-[#60A5FA] hover:no-underline">
          Power Management
        </AccordionTrigger>
        <AccordionContent className="text-gray-100 space-y-4">
          <p className="leading-relaxed">
            Every RV power system combines multiple energy sources to keep your adventures running smoothly.
          </p>
          <p className="leading-relaxed">
            Learning how these systems work together helps you make informed decisions about power management.
          </p>

          <h3 className="text-lg font-semibold text-blue-200">Energy Sources Explained</h3>
          <p className="leading-relaxed">
            Shore power provides reliable electricity when connected at campgrounds, but understanding voltage variations prevents damage to sensitive equipment.
          </p>
          <p className="leading-relaxed">
            Solar panels convert sunlight into usable power, with efficiency varying based on panel angle, shade, and weather conditions.
          </p>
          <p className="leading-relaxed">
            Batteries store excess energy for later use, acting as your primary power source when boondocking or during overnight stays.
          </p>

          <h3 className="text-lg font-semibold text-blue-200">Making Smart Power Choices</h3>
          <p className="leading-relaxed">
            Monitor your power consumption patterns to understand which appliances draw the most energy.
          </p>
          <p className="leading-relaxed">
            Small adjustments in daily routines can significantly impact your power availability when off grid.
          </p>
          <p className="leading-relaxed">
            Different seasons require different power management strategies as solar input and heating/cooling needs change.
          </p>

          <h3 className="text-lg font-semibold text-blue-200">Battery System Basics</h3>
          <p className="leading-relaxed">
            Modern lithium batteries offer more usable capacity than traditional lead acid, but require proper charging parameters.
          </p>
          <p className="leading-relaxed">
            Temperature affects battery performance and lifespan - extreme conditions need special consideration.
          </p>
          <p className="leading-relaxed">
            Understanding charge cycles helps extend battery life and maintain reliable power storage.
          </p>

          <h3 className="text-lg font-semibold text-blue-200">Solar Power Insights</h3>
          <p className="leading-relaxed">
            Panel placement significantly impacts energy generation - learn to optimize your setup for different parking situations.
          </p>
          <p className="leading-relaxed">
            Partial shade affects solar panels more than many realize, making panel positioning crucial for maximum efficiency.
          </p>
          <p className="leading-relaxed">
            Seasonal sun angles change your solar input - adjust your power usage expectations accordingly.
          </p>

          <h3 className="text-lg font-semibold text-blue-200">Practical Power Management</h3>
          <p className="leading-relaxed">
            Start by tracking your actual power usage before making expensive system upgrades.
          </p>
          <p className="leading-relaxed">
            Learn to identify essential versus optional power loads for effective energy prioritization.
          </p>
          <p className="leading-relaxed">
            Develop backup plans for different scenarios to maintain critical systems during unexpected situations.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PowerManagementSection;