import { Signal, DollarSign, Zap, Wrench } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const HotspotSection = () => {
  return (
    <AccordionItem value="hotspots" className="border-gray-700">
      <AccordionTrigger className="text-blue-300 hover:text-blue-400">
        <div className="flex items-center gap-2">
          <Signal className="h-5 w-5" />
          Mobile Hotspot Comparison
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-gray-300">
        <div className="space-y-6">
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-blue-200 mb-3">
              <DollarSign className="h-4 w-4" />
              <span>Cost Range: $300-400</span>
            </div>
            <div className="flex items-center gap-2 text-green-200 mb-3">
              <Zap className="h-4 w-4" />
              <span>Power Usage: 5-8W when active</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-200 mb-4">
              <Wrench className="h-4 w-4" />
              <span>Installation: Plug-and-play, no installation needed</span>
            </div>
            <h4 className="text-lg font-medium text-blue-200 mb-2">Netgear Nighthawk M6</h4>
            <p className="text-sm mb-3">Best For: High-speed needs, frequent travelers</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>5G capability with exceptional speeds</li>
              <li>Extended battery life for all-day use</li>
              <li>2.5Gbps ethernet port for wired connections</li>
              <li>Best overall performance</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-blue-200 mb-3">
              <DollarSign className="h-4 w-4" />
              <span>Cost Range: $150-200</span>
            </div>
            <div className="flex items-center gap-2 text-green-200 mb-3">
              <Zap className="h-4 w-4" />
              <span>Power Usage: 3-5W typical</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-200 mb-4">
              <Wrench className="h-4 w-4" />
              <span>Installation: DIY-friendly with basic setup required</span>
            </div>
            <h4 className="text-lg font-medium text-blue-200 mb-2">GL.iNet Beryl</h4>
            <p className="text-sm mb-3">Best For: Privacy-focused users, tech enthusiasts</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Builtin VPN support</li>
              <li>Opensource firmware for customization</li>
              <li>Tor network compatibility</li>
              <li>Advanced security features</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-blue-200 mb-3">
              <DollarSign className="h-4 w-4" />
              <span>Cost Range: $400-600</span>
            </div>
            <div className="flex items-center gap-2 text-green-200 mb-3">
              <Zap className="h-4 w-4" />
              <span>Power Usage: 10-12W under load</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-200 mb-4">
              <Wrench className="h-4 w-4" />
              <span>Installation: Professional setup recommended for optimal performance</span>
            </div>
            <h4 className="text-lg font-medium text-blue-200 mb-2">MoFi 5500</h4>
            <p className="text-sm mb-3">Best For: Rural areas, signal-challenged locations</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Multiple external antenna ports</li>
              <li>Rugged design for durability</li>
              <li>Advanced band selection capabilities</li>
              <li>Optimized for challenging environments</li>
            </ul>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};