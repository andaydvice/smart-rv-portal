import { ChevronRight } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BluetoothSection from "./sections/BluetoothSection";
import SoftwareSection from "./sections/SoftwareSection";
import PowerSection from "./sections/PowerSection";
import ConnectivitySection from "./sections/ConnectivitySection";

const SmartSystemGuide = () => {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-gray-700 mb-6">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-400">Smart System Integration Guide</CardTitle>
        <CardDescription className="text-gray-300">
          Complete setup and troubleshooting guide for your Smart RV systems
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <Accordion type="single" collapsible className="space-y-4">
          <BluetoothSection />
          <SoftwareSection />
          <PowerSection />
          <ConnectivitySection />
        </Accordion>

        <div className="mt-8">
          <Button 
            variant="outline" 
            className="bg-blue-500/10 text-blue-400 border-blue-400 hover:bg-blue-400/20"
          >
            View Complete System Documentation
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSystemGuide;