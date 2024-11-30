import { Laptop, Signal, Antenna, Cloud } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const MobileOfficeSection = () => {
  return (
    <AccordionItem value="office" className="border-gray-700">
      <AccordionTrigger className="text-blue-300 hover:text-blue-400">
        <div className="flex items-center gap-2">
          <Laptop className="h-5 w-5" />
          Professional Mobile Office Configuration
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-gray-300 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Signal className="h-4 w-4 text-green-400" />
              <h4 className="font-medium text-blue-200">Multi-Carrier Strategy</h4>
            </div>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Use a combination of Verizon and AT&T for maximum coverage</li>
              <li>Consider T-Mobile for areas with Band 71 coverage</li>
              <li>Load balancing across multiple carriers</li>
              <li>Automatic carrier switching based on signal strength</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Antenna className="h-4 w-4 text-yellow-400" />
              <h4 className="font-medium text-blue-200">Antenna Installation</h4>
            </div>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Mount a MIMO antenna on the RV roof</li>
              <li>Use cellular boosters with external antennas</li>
              <li>Optimal placement for maximum signal reception</li>
              <li>Professional installation recommended</li>
            </ul>
          </div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Cloud className="h-4 w-4 text-blue-400" />
            <h4 className="font-medium text-blue-200">Network Configuration</h4>
          </div>
          <div className="space-y-4">
            <div>
              <h5 className="text-blue-300 text-sm mb-2">Network Optimization</h5>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Set up a mobile-optimized mesh network inside the RV</li>
                <li>Use a router that supports load balancing</li>
                <li>QoS implementation for critical services</li>
              </ul>
            </div>
            <div>
              <h5 className="text-blue-300 text-sm mb-2">Failover Configuration</h5>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Configure automatic switching between connections</li>
                <li>Use VPN service for seamless connection bonding</li>
                <li>Starlink Roam backup for remote areas (100-200ms latency)</li>
              </ul>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};