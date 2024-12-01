import { Wifi, DollarSign, Zap, Wrench } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ConnectivitySection = () => {
  return (
    <AccordionItem value="remote" className="border-gray-700">
      <AccordionTrigger className="text-blue-300 hover:text-blue-400">
        <div className="flex items-center gap-2">
          <Wifi className="h-5 w-5" />
          Remote Area Connectivity
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-gray-300 space-y-4">
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 text-blue-200 mb-3">
            <DollarSign className="h-4 w-4" />
            <span>Cost Range: $300-1,500 for boosters and antennas</span>
          </div>
          <div className="flex items-center gap-2 text-green-200 mb-3">
            <Zap className="h-4 w-4" />
            <span>Power Usage: 10-30W for signal boosters</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-200 mb-4">
            <Wrench className="h-4 w-4" />
            <span>Installation: Professional recommended for optimal performance</span>
          </div>
          <h4 className="font-medium text-blue-200 mb-2">Signal Enhancement</h4>
          <ul className="list-disc list-inside space-y-2">
            <li>Install cellular signal booster</li>
            <li>Use directional antenna for better reception</li>
            <li>Consider satellite internet options</li>
          </ul>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h4 className="font-medium text-blue-200 mb-2">Connectivity Tips</h4>
          <ul className="list-disc list-inside space-y-2">
            <li>Park in elevated locations when possible</li>
            <li>Use multiple carriers for redundancy</li>
            <li>Monitor data usage and speeds</li>
          </ul>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ConnectivitySection;