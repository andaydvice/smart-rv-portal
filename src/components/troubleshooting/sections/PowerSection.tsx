import { Power } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PowerSection = () => {
  return (
    <AccordionItem value="power" className="border-gray-700">
      <AccordionTrigger className="text-blue-300 hover:text-blue-400">
        <div className="flex items-center gap-2">
          <Power className="h-5 w-5" />
          Power System Diagnostics
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-gray-300 space-y-4">
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h4 className="font-medium text-blue-200 mb-2">Converter Testing</h4>
          <ol className="list-decimal list-inside space-y-2">
            <li>Test output voltage (should be 13.6-14.4V DC)</li>
            <li>Check for unusual noise or vibration</li>
            <li>Inspect cooling fan operation</li>
            <li>Verify proper grounding</li>
          </ol>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h4 className="font-medium text-blue-200 mb-2">Circuit Protection</h4>
          <ol className="list-decimal list-inside space-y-2">
            <li>Locate main circuit breaker panel</li>
            <li>Check for tripped breakers</li>
            <li>Inspect fuse box for blown fuses</li>
            <li>Test GFCI outlets</li>
          </ol>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PowerSection;