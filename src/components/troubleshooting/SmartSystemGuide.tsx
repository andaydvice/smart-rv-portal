
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
    <div className="bg-[#0B1221] rounded-[24px] border border-gray-800/30 p-8">
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white">
            Smart System Integration Guide
          </h2>
          <p className="text-gray-300">
            Complete setup and troubleshooting guide for your Smart RV systems
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

        <div className="pt-6">
          <Link to="/documentation/complete">
            <Button 
              variant="outline" 
              className="bg-transparent border-[#60A5FA] text-[#60A5FA] hover:bg-[#60A5FA]/25 hover:text-white text-sm py-2 px-4 transition-all duration-300"
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
