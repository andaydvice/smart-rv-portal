import { Info } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ImportantInfoSection = () => {
  return (
    <AccordionItem value="important" className="border-gray-700">
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#60A5FA]" />
          <span className="text-[16px] leading-[24px] font-medium text-[#60A5FA] font-['Inter']">
            Important Things to Know
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-sm space-y-4 text-white">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-200 mb-3">
            <span>Power Usage: 2.7 kWh/day</span>
          </div>
          <p>Your residential RV refrigerator uses about 2.7 kilowatt-hours per day – the biggest power consumer in most RVs.</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-200 mb-3">
            <span>AC Power Draw: 1,500W</span>
          </div>
          <p>The air conditioner draws 1,500 watts while running, which is why you get about 3 hours of runtime on battery power.</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-200 mb-3">
            <span>Charging Time: 2-4 hours</span>
          </div>
          <p>Charging batteries from shore power takes about 4 hours for a full charge from 20%, but only 2 hours from 50%.</p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ImportantInfoSection;