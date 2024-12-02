import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import BluetoothSection from "./sections/BluetoothSection";
import SoftwareSection from "./sections/SoftwareSection";
import PowerSection from "./sections/PowerSection";
import ConnectivitySection from "./sections/ConnectivitySection";

const SmartSystemGuide = () => {
  return (
    <div className="bg-[#0F172A] rounded-2xl border border-gray-800 p-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-[2rem] font-semibold text-[#60A5FA] mb-2">
            Smart System Integration Guide
          </h2>
          <p className="text-gray-400 text-lg">
            Complete setup and troubleshooting guide for your Smart RV systems
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-0 pt-4">
          <AccordionItem value="bluetooth" className="border-b border-gray-800 py-4">
            <AccordionTrigger className="text-[#60A5FA] text-xl hover:no-underline">
              Bluetooth Connectivity
            </AccordionTrigger>
            <AccordionContent>
              <BluetoothSection />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="software" className="border-b border-gray-800 py-4">
            <AccordionTrigger className="text-[#60A5FA] text-xl hover:no-underline">
              Software Troubleshooting
            </AccordionTrigger>
            <AccordionContent>
              <SoftwareSection />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="power" className="border-b border-gray-800 py-4">
            <AccordionTrigger className="text-[#60A5FA] text-xl hover:no-underline">
              Power System Diagnostics
            </AccordionTrigger>
            <AccordionContent>
              <PowerSection />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="connectivity" className="border-b border-gray-800 py-4">
            <AccordionTrigger className="text-[#60A5FA] text-xl hover:no-underline">
              Remote Area Connectivity
            </AccordionTrigger>
            <AccordionContent>
              <ConnectivitySection />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="pt-6">
          <Link to="/documentation">
            <Button 
              variant="outline" 
              className="bg-transparent border-[#60A5FA] text-[#60A5FA] hover:bg-[#60A5FA]/10"
            >
              View Complete System Documentation
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmartSystemGuide;