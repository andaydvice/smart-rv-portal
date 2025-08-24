
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import BluetoothSection from "./sections/BluetoothSection";
import SoftwareSection from "./sections/SoftwareSection";
import PowerSection from "./sections/PowerSection";
import ConnectivitySection from "./sections/ConnectivitySection";

const SmartSystemGuide = () => {
  return (
    <div className="bg-[#0B1221] rounded-[24px] border border-gray-800/30 p-6 md:p-8 shadow-lg">
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            Smart System Integration Guide
          </h2>
          <p className="text-gray-200 text-lg">
            Complete setup and troubleshooting guide for your Smart RV Hub systems
          </p>
        </div>

        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full space-y-2">
            <BluetoothSection />
            <SoftwareSection />
            <PowerSection />
            <ConnectivitySection />
          </Accordion>
        </div>

        <div className="pt-4 md:pt-6">
          <Link to="/documentation/complete">
            <Button 
              variant="outline" 
              className="bg-transparent border-[#5B9BD5] text-[#5B9BD5] hover:bg-[#5B9BD5]/20 hover:text-white hover:border-[#5B9BD5] transition-all duration-300 text-sm py-2 px-4"
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
