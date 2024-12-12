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
import GasCalculator from "@/components/calculators/fuel/GasCalculator";
import { Battery, Fuel, Scale } from "lucide-react";
import { MPGRecord } from "@/components/calculators/fuel/MPGTrackingSystem";
import { Helmet } from "react-helmet";

const Calculators = () => {
  const [activeTab, setActiveTab] = useState("power");
  const [historicalMPG, setHistoricalMPG] = useState<MPGRecord[]>([]);

  const handleAddMPGRecord = (record: MPGRecord) => {
    setHistoricalMPG(prev => [...prev, record]);
  };

  return (
    <>
      <Helmet>
        {/* Main title - Keep it under 60 characters for optimal display */}
        <title>RV Calculator Suite | Essential Tools for RV Life</title>
        
        {/* Meta description - Aim for 150-160 characters */}
        <meta 
          name="description" 
          content="Plan your RV journey with our free calculator suite. Calculate power needs, track fuel efficiency, and ensure safe towing. Mobile-friendly tools for smarter RV travel." 
        />
        
        {/* Keywords - Focus on specific calculator functions and user intent */}
        <meta 
          name="keywords" 
          content="RV power calculator, MPG tracker, towing weight calculator, RV fuel efficiency, battery capacity calculator, solar panel calculator, tire pressure calculator, weight distribution" 
        />
        
        {/* Mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* OpenGraph tags for social sharing */}
        <meta property="og:title" content="RV Calculator Suite | Plan Your Journey Better" />
        <meta 
          property="og:description" 
          content="Free RV calculators for power consumption, fuel efficiency, and towing safety. Plan smarter trips with our comprehensive calculator suite." 
        />
        
        {/* Canonical URL to prevent duplicate content issues */}
        <link rel="canonical" href="/calculators" />
      </Helmet>

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
            <h1 className="text-3xl md:text-4xl font-bold text-[#60A5FA] mb-6">
              RV Calculator Suite
            </h1>
            <div className="text-lg text-gray-300 max-w-3xl mx-auto space-y-6">
              <p>Professional tools for smarter RV travel planning</p>
              <p>Make informed decisions about your power, fuel, and towing needs</p>
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
              <section aria-label="Power Calculators">
                <PowerConsumptionCalculator />
                <BatteryCapacityCalculator />
                <SolarPanelCalculator />
              </section>
            </TabsContent>

            <TabsContent value="fuel" className="space-y-8">
              <section aria-label="Fuel Efficiency Tools">
                <GasCalculator />
                <FuelEfficiencyCalculator onAddMPGRecord={handleAddMPGRecord} />
                <TripEfficiencyPlanner />
                <MPGTrackingSystem historicalMPG={historicalMPG} />
              </section>
            </TabsContent>

            <TabsContent value="towing">
              <section aria-label="Towing Safety Tools">
                <TowingSafetyCalculator />
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Calculators;