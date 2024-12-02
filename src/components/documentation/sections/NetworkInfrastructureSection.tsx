import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Network } from "lucide-react";

const NetworkInfrastructureSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Network className="w-8 h-8 text-[#60A5FA]" />
        <h2 className="text-[#60A5FA] text-3xl font-bold">Network Infrastructure</h2>
      </div>
      
      <div className="rounded-2xl border-2 border-gray-800 bg-[#0F172A] shadow-lg overflow-hidden">
        <Accordion type="single" collapsible>
          <AccordionItem value="network-infrastructure" className="border-0">
            <AccordionTrigger className="px-8 py-6 text-[#4ADE80] text-2xl font-bold hover:no-underline hover:text-[#4ADE80]/90">
              Network Infrastructure Overview
            </AccordionTrigger>
            <AccordionContent className="px-8 pb-8 text-gray-200 space-y-6 text-xl leading-relaxed">
              <p>
                Inside metal RV walls, radio signals struggle to reach all areas effectively. This creates unique challenges for maintaining reliable internet connectivity during your travels.
              </p>

              <p>
                The physical construction of RVs affects wireless signal propagation in ways most home networks never encounter.
              </p>

              <h3 className="text-2xl font-bold text-blue-300 mt-8 mb-4">Signal Distribution Explained</h3>
              
              <p>
                Metal walls, appliances, and tight spaces create reflection points and dead zones that fragment your wireless coverage.
              </p>

              <p>
                Radio waves behave differently in compact metal environments, requiring strategic equipment placement to maintain signal integrity.
              </p>

              <p>
                Network signals need clear paths between devices, which traditional RV layouts often interrupt.
              </p>

              <h3 className="text-2xl font-bold text-blue-300 mt-8 mb-4">Optimizing Campground Connections</h3>

              <p>
                Traditional campground WiFi infrastructure shares limited bandwidth across dozens or hundreds of RVs simultaneously.
              </p>

              <p>
                Understanding connection timing helps. Speeds often improve during off peak hours when fewer users compete for bandwidth.
              </p>

              <p>
                Distance from campground access points significantly impacts your connection quality more than most realize.
              </p>

              <h3 className="text-2xl font-bold text-blue-300 mt-8 mb-4">Making Cellular Work Better</h3>

              <p>
                Cellular signals encounter multiple obstacles in RV environments. Proper antenna placement becomes crucial for reliable connectivity.
              </p>

              <p>
                External antennas need clear line of sight to cell towers, while internal boosters require careful positioning to distribute signal effectively.
              </p>

              <p>
                Weather conditions affect cellular signals differently than WiFi, requiring flexible approaches to maintain connectivity.
              </p>

              <h3 className="text-2xl font-bold text-blue-300 mt-8 mb-4">Practical Network Planning</h3>

              <p>
                Start by mapping your RV signal patterns using free WiFi analyzer apps before investing in expensive equipment.
              </p>

              <p>
                Test connections in multiple locations to understand how your RV structure affects signal distribution.
              </p>

              <p>
                Document your findings to develop an effective strategy based on your specific layout and usage patterns.
              </p>

              <h3 className="text-2xl font-bold text-blue-300 mt-8 mb-4">DIY Network Enhancement</h3>

              <p>
                Begin with basic solutions like repositioning existing equipment before considering costly upgrades.
              </p>

              <p>
                Learn to identify genuine signal issues versus simple configuration problems that you can solve yourself.
              </p>

              <p>
                Understand how different materials and mounting options affect signal propagation throughout your RV.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default NetworkInfrastructureSection;