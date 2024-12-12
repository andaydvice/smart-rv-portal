import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PowerConsumptionCalculator from "@/components/calculators/power/PowerConsumptionCalculator";
import BatteryCapacityCalculator from "@/components/calculators/power/BatteryCapacityCalculator";
import SolarPanelCalculator from "@/components/calculators/power/SolarPanelCalculator";
import FuelEfficiencyCalculator from "@/components/calculators/fuel/FuelEfficiencyCalculator";
import TripEfficiencyPlanner from "@/components/calculators/fuel/TripEfficiencyPlanner";
import MPGTrackingSystem from "@/components/calculators/fuel/MPGTrackingSystem";
import TowingSafetyCalculator from "@/components/calculators/towing/TowingSafetyCalculator";
import { Battery, Fuel, Scale } from "lucide-react";

const Calculators = () => {
  const [activeTab, setActiveTab] = useState("power");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#131a2a]">
        <div className="relative h-[400px] w-full overflow-hidden">
          <img
            src="/lovable-uploads/53093373-3df3-49cc-b4cc-91b800c53fa9.png"
            alt="RV under starry night sky with ambient lighting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#131a2a]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white z-10">
              RV Calculator Suite
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#60A5FA] mb-6">
              Travel Safer, Spend Smarter, Drive Further
            </h2>
            <div className="text-lg text-gray-300 max-w-3xl mx-auto space-y-6">
              <p>RV Power Tools</p>
              <p>Smart answers fast. Adventure calls now.</p>
            </div>
          </div>

          <Tabs 
            defaultValue="power" 
            className="space-y-8"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="bg-[#091020] p-2 mb-8">
              <TabsTrigger 
                value="power" 
                className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white text-gray-300 hover:text-white font-semibold text-base px-6 py-3"
              >
                <Battery className="mr-2 h-4 w-4" />
                Power & Solar
              </TabsTrigger>
              <TabsTrigger 
                value="fuel" 
                className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white text-gray-300 hover:text-white font-semibold text-base px-6 py-3"
              >
                <Fuel className="mr-2 h-4 w-4" />
                Fuel Efficiency
              </TabsTrigger>
              <TabsTrigger 
                value="towing" 
                className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white text-gray-300 hover:text-white font-semibold text-base px-6 py-3"
              >
                <Scale className="mr-2 h-4 w-4" />
                Towing Safety
              </TabsTrigger>
            </TabsList>

            <TabsContent value="power" className="space-y-8">
              <PowerConsumptionCalculator />
              <BatteryCapacityCalculator />
              <SolarPanelCalculator />
            </TabsContent>

            <TabsContent value="fuel" className="space-y-8">
              <FuelEfficiencyCalculator />
              <TripEfficiencyPlanner />
              <MPGTrackingSystem />
            </TabsContent>

            <TabsContent value="towing">
              <TowingSafetyCalculator />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Calculators;