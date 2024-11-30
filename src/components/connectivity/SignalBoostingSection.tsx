import { Antenna } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const SignalBoostingSection = () => {
  return (
    <AccordionItem value="boosting" className="border-gray-700">
      <AccordionTrigger className="text-blue-300 hover:text-blue-400">
        <div className="flex items-center gap-2">
          <Antenna className="h-5 w-5" />
          Signal Enhancement Systems
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-gray-300 space-y-4">
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-200 mb-4">Signal Boosting Solutions</h4>
          <div className="space-y-6">
            <div className="border-b border-gray-700 pb-4">
              <h5 className="text-blue-300 mb-2">WeBoost Drive X RV</h5>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Cellular signal booster specifically designed for RVs</li>
                <li>Enhances 4G LTE and 5G signals for all major carriers</li>
                <li>Includes an external antenna for improved reception</li>
                <li>Multi-carrier signal amplification up to 65dB gain</li>
              </ul>
            </div>
            <div className="border-b border-gray-700 pb-4">
              <h5 className="text-blue-300 mb-2">Winegard ConnecT 2.0</h5>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Wi-Fi range extender with built-in 4G LTE</li>
                <li>Can switch between Wi-Fi and cellular data automatically</li>
                <li>Roof-mounted design for optimal signal capture</li>
                <li>Weather-resistant enclosure (IP67 rated)</li>
              </ul>
            </div>
            <div>
              <h5 className="text-blue-300 mb-2">Pepwave MAX Transit Duo</h5>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Dual-cellular router for load balancing and failover</li>
                <li>Supports multiple carriers simultaneously</li>
                <li>Enterprise-grade features for advanced users</li>
                <li>Remote management interface</li>
              </ul>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};