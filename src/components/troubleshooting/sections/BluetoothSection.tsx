import { Bluetooth, DollarSign, Zap, Wrench } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BluetoothSection = () => {
  return (
    <AccordionItem value="bluetooth" className="border-gray-700">
      <AccordionTrigger className="text-blue-300 hover:text-blue-400">
        <div className="flex items-center gap-2">
          <Bluetooth className="h-5 w-5" />
          Bluetooth Connectivity
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-gray-300 space-y-4">
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 text-blue-200 mb-3">
            <DollarSign className="h-4 w-4" />
            <span>Cost Range: $50-200 for premium adapters and boosters</span>
          </div>
          <div className="flex items-center gap-2 text-green-200 mb-3">
            <Zap className="h-4 w-4" />
            <span>Power Usage: Very Low (0.5-1W when active)</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-200 mb-4">
            <Wrench className="h-4 w-4" />
            <span>Installation: DIY-friendly, plug-and-play setup</span>
          </div>
          <h4 className="font-medium text-blue-200 mb-2">Common Issues</h4>
          <ul className="list-disc list-inside space-y-2">
            <li>Device not appearing in pairing list</li>
            <li>Connection drops frequently</li>
            <li>Audio quality issues</li>
          </ul>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h4 className="font-medium text-blue-200 mb-2">Solutions</h4>
          <ol className="list-decimal list-inside space-y-2">
            <li>Ensure Bluetooth is enabled on both devices</li>
            <li>Clear existing paired devices list</li>
            <li>Restart both devices</li>
            <li>Update device firmware if available</li>
          </ol>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default BluetoothSection;