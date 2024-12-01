import { Settings, Clock, AlertTriangle, HelpCircle } from "lucide-react";
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
            <li>
              <div className="inline-flex items-center gap-2">
                Clear app cache
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(2-3 min)</span>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center gap-2">
                Force stop application
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(1 min)</span>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center gap-2">
                Clear app data (Note: This will reset all settings)
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(5 min)</span>
                <AlertTriangle className="h-4 w-4 text-yellow-400" title="Backup settings before proceeding" />
              </div>
            </li>
            <li>
              <div className="inline-flex items-center gap-2">
                Reinstall app if issues persist
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(10-15 min)</span>
                <HelpCircle className="h-4 w-4 text-purple-400" title="Contact support if installation fails" />
              </div>
            </li>
          </ol>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h4 className="font-medium text-blue-200 mb-2">Control Tablet Reset</h4>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <div className="inline-flex items-center gap-2">
                Perform soft reset (hold power button for 10 seconds)
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(2 min)</span>
              </div>
            </li>
            <li>
              <div className="inline-flex items-center gap-2">
                Check for system updates
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(10-30 min)</span>
                <AlertTriangle className="h-4 w-4 text-yellow-400" title="Ensure stable internet connection" />
              </div>
            </li>
            <li>
              <div className="inline-flex items-center gap-2">
                Factory reset as last resort
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-blue-300">(30-45 min)</span>
                <HelpCircle className="h-4 w-4 text-purple-400" title="Professional assistance recommended" />
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
            <li>System crashes during normal operation</li>
            <li>Data corruption or unexpected data loss</li>
            <li>Failed system updates multiple times</li>
          </ul>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SoftwareSection;