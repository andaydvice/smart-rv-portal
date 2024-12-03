import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import BluetoothSection from "./sections/BluetoothSection";
import SoftwareSection from "./sections/SoftwareSection";
import PowerSection from "./sections/PowerSection";
import ConnectivitySection from "./sections/ConnectivitySection";

const SmartSystemGuide = () => {
  return (
    <div className="bg-[#0B1221] rounded-[32px] border border-gray-800/30 p-8 mt-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-[1.75rem] font-medium text-[#60A5FA] leading-tight">
            Smart System Integration Guide
          </h2>
          <p className="text-gray-300 text-base">
            Complete setup and troubleshooting guide for your Smart RV systems
          </p>
        </div>

        <div className="space-y-0 pt-2 border rounded-lg border-gray-800/50">
          <Accordion type="single" collapsible>
            <BluetoothSection />
            <SoftwareSection />
            <PowerSection />
            <ConnectivitySection />
          </Accordion>
        </div>

        <div className="pt-4">
          <Link to="/documentation">
            <Button 
              variant="outline" 
              className="bg-transparent border-[#60A5FA] text-[#60A5FA] hover:bg-[#60A5FA]/10 text-sm py-3 px-4"
            >
              View Complete System Documentation
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmartSystemGuide;