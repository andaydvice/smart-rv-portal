import { Bluetooth, Clock, AlertTriangle, HelpCircle } from "lucide-react";
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
            <li>
              <div className="inline-flex items-center gap-2">
                Device not appearing in pairing list
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(5-10 min)</span>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center gap-2">
                Connection drops frequently
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(10-15 min)</span>
                <AlertTriangle className="h-4 w-4 text-yellow-400" title="May indicate interference issues" />
              </div>
            </li>
            <li>
              <div className="inline-flex items-center gap-2">
                Audio quality issues
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(5-10 min)</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h4 className="font-medium text-blue-200 mb-2">Solutions</h4>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <div className="inline-flex items-center gap-2">
                Ensure Bluetooth is enabled on both devices
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(1 min)</span>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center gap-2">
                Clear existing paired devices list
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(2-3 min)</span>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center gap-2">
                Restart both devices
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(5 min)</span>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center gap-2">
                Update device firmware if available
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(15-30 min)</span>
                <HelpCircle className="h-4 w-4 text-purple-400" title="Contact support if firmware update fails" />
              </div>
            </li>
          </ol>
        </div>
        <div className="bg-red-900/20 p-4 rounded-lg border border-red-800">
          <h4 className="font-medium text-red-400 flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4" />
            Warning Signs
          </h4>
          <ul className="list-disc list-inside space-y-2 text-red-300">
            <li>Multiple devices experiencing simultaneous connection issues</li>
            <li>Persistent connection drops after all troubleshooting steps</li>
            <li>Device not detected after firmware update</li>
          </ul>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default BluetoothSection;