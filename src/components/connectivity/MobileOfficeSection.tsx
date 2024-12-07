import { Laptop, Signal, Antenna, Cloud, Satellite } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const MobileOfficeSection = () => {
  return (
    <AccordionItem value="office" className="border-gray-700">
      <AccordionTrigger className="text-blue-300 hover:text-blue-400">
        <div className="flex items-center gap-2">
          <Laptop className="h-5 w-5" />
          Mobile Office Setup Tips
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-gray-300">
        <div className="space-y-6">
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Signal className="h-4 w-4 text-green-400" />
              <h4 className="font-medium text-blue-200">Multi-Carrier Strategy</h4>
            </div>
            <ul className="space-y-2 text-sm list-disc list-inside">
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
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Mount a MIMO antenna on the RV roof</li>
              <li>Use cellular boosters with external antennas</li>
              <li>Optimal placement for maximum signal reception</li>
              <li>Professional installation recommended</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Cloud className="h-4 w-4 text-blue-400" />
              <h4 className="font-medium text-blue-200">Network Configuration</h4>
            </div>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Set up a mobile optimized mesh network inside the RV</li>
              <li>Configure automatic failover between connections</li>
              <li>Use a router that supports load balancing</li>
              <li>Implement QoS for critical services</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Satellite className="h-4 w-4 text-purple-400" />
              <h4 className="font-medium text-blue-200">Satellite Backup</h4>
            </div>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Consider Starlink Roam for remote areas</li>
              <li>Be aware of higher latency (100-200ms)</li>
              <li>Use as backup when cellular is unavailable</li>
              <li>Plan for clear sky visibility requirements</li>
            </ul>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};