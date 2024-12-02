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
    <div className="bg-[#0B1221] rounded-[20px] border border-gray-800/30 p-8">
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-[2.5rem] font-medium text-[#60A5FA] leading-tight">
            Smart System Integration Guide
          </h2>
          <p className="text-gray-300 text-xl">
            Complete setup and troubleshooting guide for your Smart RV systems
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <AccordionItem value="bluetooth" className="border-b border-gray-800/50 py-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-[#60A5FA]" viewBox="0 0 24 24" fill="none">
                <path d="M12 15L16 11L12 7V15Z" fill="currentColor"/>
                <path d="M12 19V15L8 11L12 7V3L4 11L12 19Z" fill="currentColor"/>
              </svg>
              <AccordionTrigger className="text-[#60A5FA] text-2xl hover:no-underline flex-1">
                Bluetooth Connectivity
                <ChevronDown className="h-8 w-8 shrink-0 text-[#4ADE80] transition-transform duration-200" />
              </AccordionTrigger>
            </div>
            <AccordionContent>
              <BluetoothSection />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="software" className="border-b border-gray-800/50 py-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-[#60A5FA]" viewBox="0 0 24 24" fill="none">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor"/>
                <path d="M19.4 15C19.7 14.1 20 13.1 20 12C20 9.6 18.9 7.3 17 5.8L18.3 2.7C18.5 2.1 18.2 1.5 17.6 1.3C17 1.1 16.4 1.4 16.2 2L14.9 5.1C14 4.7 13 4.5 12 4.5C11 4.5 10 4.7 9.1 5.1L7.8 2C7.6 1.4 7 1.1 6.4 1.3C5.8 1.5 5.5 2.1 5.7 2.7L7 5.8C5.1 7.3 4 9.6 4 12C4 13.1 4.3 14.1 4.6 15H19.4Z" fill="currentColor"/>
              </svg>
              <AccordionTrigger className="text-[#60A5FA] text-2xl hover:no-underline flex-1">
                Software Troubleshooting
                <ChevronDown className="h-8 w-8 shrink-0 text-[#4ADE80] transition-transform duration-200" />
              </AccordionTrigger>
            </div>
            <AccordionContent>
              <SoftwareSection />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="power" className="border-b border-gray-800/50 py-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-[#60A5FA]" viewBox="0 0 24 24" fill="none">
                <path d="M13 3H11V13H13V3Z" fill="currentColor"/>
                <path d="M16.9 6.1C17.9 7.3 18.5 8.8 18.7 10.6C19.1 14.4 16.7 18 13 19.1C9.3 20.2 5.5 18.3 4.1 14.7C2.7 11.1 4.1 7.1 7.5 5.3C8.1 4.9 8.1 4 7.5 3.6C6.9 3.2 6.1 3.3 5.5 3.7C1.1 6.1 -0.6 11.3 1.1 15.9C2.8 20.5 7.7 23 12.4 21.7C17.1 20.4 20.1 15.8 19.6 11C19.3 8.7 18.4 6.7 17.1 5.1C16.6 4.5 15.7 4.5 15.2 5C14.6 5.5 14.7 5.7 15.2 6.1H16.9Z" fill="currentColor"/>
              </svg>
              <AccordionTrigger className="text-[#60A5FA] text-2xl hover:no-underline flex-1">
                Power System Diagnostics
                <ChevronDown className="h-8 w-8 shrink-0 text-[#4ADE80] transition-transform duration-200" />
              </AccordionTrigger>
            </div>
            <AccordionContent>
              <PowerSection />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="connectivity" className="border-b border-gray-800/50 py-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-[#60A5FA]" viewBox="0 0 24 24" fill="none">
                <path d="M12 19C12.5523 19 13 18.5523 13 18C13 17.4477 12.5523 17 12 17C11.4477 17 11 17.4477 11 18C11 18.5523 11.4477 19 12 19Z" fill="currentColor"/>
                <path d="M17.4 15.6C17.8 15.2 17.8 14.6 17.4 14.2C16.3 13.1 14.2 12 12 12C9.8 12 7.7 13.1 6.6 14.2C6.2 14.6 6.2 15.2 6.6 15.6C7 16 7.6 16 8 15.6C8.7 14.9 10.3 14 12 14C13.7 14 15.3 14.9 16 15.6C16.4 16 17 16 17.4 15.6Z" fill="currentColor"/>
                <path d="M20.7 12.3C21.1 11.9 21.1 11.3 20.7 10.9C18.6 8.8 15.3 7 12 7C8.7 7 5.4 8.8 3.3 10.9C2.9 11.3 2.9 11.9 3.3 12.3C3.7 12.7 4.3 12.7 4.7 12.3C6.4 10.6 9.2 9 12 9C14.8 9 17.6 10.6 19.3 12.3C19.7 12.7 20.3 12.7 20.7 12.3Z" fill="currentColor"/>
              </svg>
              <AccordionTrigger className="text-[#60A5FA] text-2xl hover:no-underline flex-1">
                Remote Area Connectivity
                <ChevronDown className="h-8 w-8 shrink-0 text-[#4ADE80] transition-transform duration-200" />
              </AccordionTrigger>
            </div>
            <AccordionContent>
              <ConnectivitySection />
            </AccordionContent>
          </AccordionItem>
        </div>

        <div className="pt-6">
          <Link to="/documentation">
            <Button 
              variant="outline" 
              className="bg-transparent border-[#60A5FA] text-[#60A5FA] hover:bg-[#60A5FA]/10"
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