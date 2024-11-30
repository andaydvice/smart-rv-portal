import { Wifi } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const SignalBoostingSection = () => {
  return (
    <AccordionItem value="boosting" className="border-gray-700">
      <AccordionTrigger className="text-blue-300 hover:text-blue-400">
        <div className="flex items-center gap-2">
          <Wifi className="h-5 w-5" />
          Signal Boosting Solutions
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-gray-300">
        <div className="space-y-6">
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-blue-200 mb-3">WeBoost Drive X RV</h4>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Cellular signal booster specifically designed for RVs</li>
              <li>Enhances 4G LTE and 5G signals for all major carriers</li>
              <li>Includes an external antenna for improved reception</li>
              <li>Multi-carrier signal amplification</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-blue-200 mb-3">Winegard ConnecT 2.0</h4>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Wi-Fi range extender with built-in 4G LTE</li>
              <li>Can switch between Wi-Fi and cellular data automatically</li>
              <li>Roof-mounted design for optimal signal capture</li>
              <li>Weather-resistant enclosure</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-blue-200 mb-3">Pepwave MAX Transit Duo</h4>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Dual-cellular router for load balancing and failover</li>
              <li>Supports multiple carriers simultaneously</li>
              <li>Enterprise-grade features for advanced users</li>
              <li>Remote management capabilities</li>
            </ul>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};