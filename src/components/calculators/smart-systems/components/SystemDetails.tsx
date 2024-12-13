import { Info, AlertTriangle } from "lucide-react";
import { SystemInfo } from "../types/SystemTypes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SystemDetailsProps {
  system: SystemInfo;
  systemId: string;
}

export const SystemDetails = ({ system, systemId }: SystemDetailsProps) => {
  return (
    <div key={systemId} className="mb-6 last:mb-0">
      <h3 className="text-lg font-semibold text-[#60A5FA] mb-3 flex items-center gap-2">
        <Info className="w-4 h-4" />
        {system.name}
      </h3>
      
      <Accordion type="single" collapsible className="space-y-2">
        <AccordionItem value="compatibility" className="border-gray-700">
          <AccordionTrigger className="text-sm font-semibold text-gray-300">
            Compatibility Information
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Compatible With</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-green-400">
                  {system.compatibleWith?.map((compatSystem, index) => (
                    <li key={index}>{system.name || compatSystem}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Not Compatible With</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-red-400">
                  {system.incompatibleWith?.map((incompatSystem, index) => (
                    <li key={index}>{system.name || incompatSystem}</li>
                  ))}
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="features" className="border-gray-700">
          <AccordionTrigger className="text-sm font-semibold text-gray-300">
            Key Features
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              {system.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="issues" className="border-gray-700">
          <AccordionTrigger className="text-sm font-semibold text-gray-300">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              Common Issues
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              {system.commonIssues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};