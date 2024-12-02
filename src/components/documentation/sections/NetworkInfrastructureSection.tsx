import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Network } from "lucide-react";

const NetworkInfrastructureSection = () => {
  return (
    <AccordionItem value="network-infrastructure" className="border-b border-gray-700 last:border-0">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-full bg-blue-500/10 border border-blue-500/20">
          <Network className="w-4 h-4 text-blue-400" />
        </div>
        <h2 className="text-blue-400 text-lg font-medium">Network Infrastructure</h2>
      </div>
      
      <AccordionTrigger className="hover:no-underline hover:bg-gray-700/30 rounded-lg transition-colors">
        <div className="rounded-lg border border-gray-700 bg-gray-800/50 overflow-hidden w-full">
          <div className="px-6 py-4 text-emerald-400 text-base font-medium">
            Network Infrastructure Overview
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 pt-4 text-gray-300 space-y-4 text-sm leading-relaxed">
        <p>
          Inside metal RV walls, radio signals struggle to reach all areas effectively. This creates unique challenges for maintaining reliable internet connectivity during your travels.
        </p>

        <p>
          The physical construction of RVs affects wireless signal propagation in ways most home networks never encounter.
        </p>

        <h3 className="text-lg font-semibold text-blue-300 mt-6 mb-3">Signal Distribution Explained</h3>
        
        <p>
          Metal walls, appliances, and tight spaces create reflection points and dead zones that fragment your wireless coverage.
        </p>

        <p>
          Radio waves behave differently in compact metal environments, requiring strategic equipment placement to maintain signal integrity.
        </p>

        <p>
          Network signals need clear paths between devices, which traditional RV layouts often interrupt.
        </p>

        <h3 className="text-lg font-semibold text-blue-300 mt-6 mb-3">Optimizing Campground Connections</h3>

        <p>
          Traditional campground WiFi infrastructure shares limited bandwidth across dozens or hundreds of RVs simultaneously.
        </p>

        <p>
          Understanding connection timing helps. Speeds often improve during off peak hours when fewer users compete for bandwidth.
        </p>

        <p>
          Distance from campground access points significantly impacts your connection quality more than most realize.
        </p>

        <h3 className="text-lg font-semibold text-blue-300 mt-6 mb-3">Making Cellular Work Better</h3>

        <p>
          Cellular signals encounter multiple obstacles in RV environments. Proper antenna placement becomes crucial for reliable connectivity.
        </p>

        <p>
          External antennas need clear line of sight to cell towers, while internal boosters require careful positioning to distribute signal effectively.
        </p>

        <p>
          Weather conditions affect cellular signals differently than WiFi, requiring flexible approaches to maintain connectivity.
        </p>

        <h3 className="text-lg font-semibold text-blue-300 mt-6 mb-3">Practical Network Planning</h3>

        <p>
          Start by mapping your RV signal patterns using free WiFi analyzer apps before investing in expensive equipment.
        </p>

        <p>
          Test connections in multiple locations to understand how your RV structure affects signal distribution.
        </p>

        <p>
          Document your findings to develop an effective strategy based on your specific layout and usage patterns.
        </p>

        <h3 className="text-lg font-semibold text-blue-300 mt-6 mb-3">DIY Network Enhancement</h3>

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
  );
};

export default NetworkInfrastructureSection;
