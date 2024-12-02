import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const NetworkInfrastructureSection = () => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      <AccordionItem value="network-infrastructure" className="border-none">
        <AccordionTrigger className="text-[1.75rem] font-normal text-[#60A5FA] hover:no-underline hover:text-[#60A5FA]">
          Network Infrastructure
        </AccordionTrigger>
        <AccordionContent className="text-gray-100 space-y-4">
          <p className="leading-relaxed">
            Inside metal RV walls, radio signals struggle to reach all areas effectively. This creates unique challenges for maintaining reliable internet connectivity during your travels.
          </p>

          <p className="leading-relaxed">
            The physical construction of RVs affects wireless signal propagation in ways most home networks never encounter.
          </p>

          <h3 className="text-2xl font-semibold text-blue-200 mb-6">Signal Distribution Explained</h3>
          
          <p className="leading-relaxed">
            Metal walls, appliances, and tight spaces create reflection points and dead zones that fragment your wireless coverage.
          </p>

          <p className="leading-relaxed">
            Radio waves behave differently in compact metal environments, requiring strategic equipment placement to maintain signal integrity.
          </p>

          <p className="leading-relaxed">
            Network signals need clear paths between devices, which traditional RV layouts often interrupt.
          </p>

          <h3 className="text-xl font-semibold text-blue-200 mt-8 mb-4">Optimizing Campground Connections</h3>

          <p className="leading-relaxed">
            Traditional campground WiFi infrastructure shares limited bandwidth across dozens or hundreds of RVs simultaneously.
          </p>

          <p className="leading-relaxed">
            Understanding connection timing helps. Speeds often improve during off peak hours when fewer users compete for bandwidth.
          </p>

          <p className="leading-relaxed">
            Distance from campground access points significantly impacts your connection quality more than most realize.
          </p>

          <h3 className="text-xl font-semibold text-blue-200 mt-8 mb-4">Making Cellular Work Better</h3>

          <p className="leading-relaxed">
            Cellular signals encounter multiple obstacles in RV environments. Proper antenna placement becomes crucial for reliable connectivity.
          </p>

          <p className="leading-relaxed">
            External antennas need clear line of sight to cell towers, while internal boosters require careful positioning to distribute signal effectively.
          </p>

          <p className="leading-relaxed">
            Weather conditions affect cellular signals differently than WiFi, requiring flexible approaches to maintain connectivity.
          </p>

          <h3 className="text-xl font-semibold text-blue-200 mt-8 mb-4">Practical Network Planning</h3>

          <p className="leading-relaxed">
            Start by mapping your RV signal patterns using free WiFi analyzer apps before investing in expensive equipment.
          </p>

          <p className="leading-relaxed">
            Test connections in multiple locations to understand how your RV structure affects signal distribution.
          </p>

          <p className="leading-relaxed">
            Document your findings to develop an effective strategy based on your specific layout and usage patterns.
          </p>

          <h3 className="text-xl font-semibold text-blue-200 mt-8 mb-4">DIY Network Enhancement</h3>

          <p className="leading-relaxed">
            Begin with basic solutions like repositioning existing equipment before considering costly upgrades.
          </p>

          <p className="leading-relaxed">
            Learn to identify genuine signal issues versus simple configuration problems that you can solve yourself.
          </p>

          <p className="leading-relaxed">
            Understand how different materials and mounting options affect signal propagation throughout your RV.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default NetworkInfrastructureSection;