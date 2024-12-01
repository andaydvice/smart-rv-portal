import { Bluetooth } from "lucide-react";
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