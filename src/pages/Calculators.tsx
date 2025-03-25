
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalculatorHeader from "@/components/calculator-layout/CalculatorHeader";
import CalculatorIntro from "@/components/calculator-layout/CalculatorIntro";
import ScrollHint from "@/components/calculator-layout/ScrollHint";
import GasCalculator from "@/components/calculators/fuel/GasCalculator";
import FuelEfficiencyCalculator from "@/components/calculators/fuel/FuelEfficiencyCalculator";
import MPGTrackingSystem, { MPGRecord } from "@/components/calculators/fuel/MPGTrackingSystem";
import TripEfficiencyPlanner from "@/components/calculators/fuel/TripEfficiencyPlanner";
import BatteryCapacityCalculator from "@/components/calculators/power/BatteryCapacityCalculator";
import PowerConsumptionCalculator from "@/components/calculators/power/PowerConsumptionCalculator";
import SolarPanelCalculator from "@/components/calculators/power/SolarPanelCalculator";
import TirePressureOptimizer from "@/components/calculators/towing/TirePressureOptimizer";
import TowingSafetyCalculator from "@/components/calculators/towing/TowingSafetyCalculator";
import WeightDistributionAnalyzer from "@/components/calculators/towing/WeightDistributionAnalyzer";
import SmartSystemDecoder from "@/components/calculators/smart-systems/SmartSystemDecoder";
import SmartAlertTranslator from "@/components/calculators/smart-systems/SmartAlertTranslator";
import SetupGuideCreator from "@/components/calculators/smart-systems/SetupGuideCreator";
import RVCostCalculator from "@/components/calculators/rv/RVCostCalculator";
import Navbar from "@/components/Navbar";
import Footer2 from "@/components/ui/Footer2";

const Calculators = () => {
  const [historicalMPG, setHistoricalMPG] = useState<MPGRecord[]>([]);

  // Define the footer links and socials for this page
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { text: "Home", href: "/" },
        { text: "Features", href: "/features" },
        { text: "Models", href: "/models" }
      ]
    },
    {
      title: "Tools",
      links: [
        { text: "Weather", href: "/rv-weather" },
        { text: "Storage", href: "/storage-facilities" },
        { text: "Documentation", href: "/documentation" }
      ]
    }
  ];

  const footerSocials = [
    { icon: "facebook", href: "https://facebook.com" },
    { icon: "twitter", href: "https://twitter.com" },
    { icon: "instagram", href: "https://instagram.com" },
    { icon: "youtube", href: "https://youtube.com" }
  ];

  const handleAddMPGRecord = (record: MPGRecord) => {
    setHistoricalMPG(prev => [...prev, record]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#080F1F] text-white">
      <Navbar />
      <div className="pt-16 flex-grow">
        <CalculatorHeader />
        <CalculatorIntro />
        <ScrollHint />
        
        <div className="container mx-auto px-4 mt-8">
          <Tabs defaultValue="cost" className="w-full">
            <TabsList className="w-full h-[60px] flex overflow-x-auto no-scrollbar bg-[#1a202c] p-1 rounded-lg mb-6">
              <TabsTrigger 
                value="cost" 
                className="flex-1 min-w-[44px] text-[#60A5FA] hover:text-[#93C5FD] data-[state=active]:text-[#93C5FD] data-[state=active]:bg-[#2D3748] transition-colors"
              >
                Cost
              </TabsTrigger>
              <TabsTrigger 
                value="fuel"
                className="flex-1 min-w-[44px] text-[#60A5FA] hover:text-[#93C5FD] data-[state=active]:text-[#93C5FD] data-[state=active]:bg-[#2D3748] transition-colors"
              >
                Fuel
              </TabsTrigger>
              <TabsTrigger 
                value="power"
                className="flex-1 min-w-[44px] text-[#60A5FA] hover:text-[#93C5FD] data-[state=active]:text-[#93C5FD] data-[state=active]:bg-[#2D3748] transition-colors"
              >
                Power
              </TabsTrigger>
              <TabsTrigger 
                value="towing"
                className="flex-1 min-w-[44px] text-[#60A5FA] hover:text-[#93C5FD] data-[state=active]:text-[#93C5FD] data-[state=active]:bg-[#2D3748] transition-colors"
              >
                Towing
              </TabsTrigger>
              <TabsTrigger 
                value="smart"
                className="flex-1 min-w-[44px] text-[#60A5FA] hover:text-[#93C5FD] data-[state=active]:text-[#93C5FD] data-[state=active]:bg-[#2D3748] transition-colors"
              >
                Smart
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cost" className="mt-8">
              <div className="space-y-8">
                <RVCostCalculator />
              </div>
            </TabsContent>

            <TabsContent value="fuel" className="mt-8">
              <div className="space-y-8">
                <GasCalculator />
                <FuelEfficiencyCalculator onAddMPGRecord={handleAddMPGRecord} />
                <MPGTrackingSystem historicalMPG={historicalMPG} />
                <TripEfficiencyPlanner />
              </div>
            </TabsContent>

            <TabsContent value="power" className="mt-8">
              <div className="space-y-8">
                <BatteryCapacityCalculator />
                <PowerConsumptionCalculator />
                <SolarPanelCalculator />
              </div>
            </TabsContent>

            <TabsContent value="towing" className="mt-8">
              <div className="space-y-8">
                <TowingSafetyCalculator />
                <WeightDistributionAnalyzer />
                <TirePressureOptimizer />
              </div>
            </TabsContent>

            <TabsContent value="smart" className="mt-8">
              <div className="space-y-8">
                <SmartSystemDecoder />
                <SmartAlertTranslator />
                <SetupGuideCreator />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer2 
        links={footerLinks}
        socials={footerSocials}
        description="Essential calculators and tools for Smart RV owners and enthusiasts"
      />
    </div>
  );
};

export default Calculators;
