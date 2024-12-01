import { Settings } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SoftwareSection = () => {
  return (
    <AccordionItem value="software" className="border-gray-700">
      <AccordionTrigger className="text-blue-300 hover:text-blue-400">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Software Troubleshooting
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-gray-300 space-y-4">
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h4 className="font-medium text-blue-200 mb-2">App Data Management</h4>
          <ol className="list-decimal list-inside space-y-2">
            <li>Clear app cache</li>
            <li>Force stop application</li>
            <li>Clear app data (Note: This will reset all settings)</li>
            <li>Reinstall app if issues persist</li>
          </ol>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h4 className="font-medium text-blue-200 mb-2">Control Tablet Reset</h4>
          <ol className="list-decimal list-inside space-y-2">
            <li>Perform soft reset (hold power button for 10 seconds)</li>
            <li>Check for system updates</li>
            <li>Factory reset as last resort</li>
          </ol>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SoftwareSection;