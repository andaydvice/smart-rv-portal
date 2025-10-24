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
// Removed fake affiliate recommendation imports
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { Helmet } from "react-helmet-async";

const Calculators = () => {
  const [historicalMPG, setHistoricalMPG] = useState<MPGRecord[]>([]);

  const handleAddMPGRecord = (record: MPGRecord) => {
    setHistoricalMPG(prev => [...prev, record]);
  };

  return (
    <Layout>
      <Helmet>
        <title>Calculate RV Costs & Energy Usage | Free RV Planning Tools</title>
        <meta name="description" content="Calculate fuel costs, power consumption, solar needs, and towing capacity with free RV tools. Plan smarter trips, optimize energy usage, and compare system options for your RV." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/calculators' : ''} />
      </Helmet>
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
                {/* Affiliate recommendations removed */}
              </div>
            </TabsContent>

            <TabsContent value="power" className="mt-8">
              <div className="space-y-8">
                <BatteryCapacityCalculator />
                <PowerConsumptionCalculator />
                <SolarPanelCalculator />
                {/* Affiliate recommendations removed */}
              </div>
            </TabsContent>

            <TabsContent value="towing" className="mt-8">
              <div className="space-y-8">
                <TowingSafetyCalculator />
                <WeightDistributionAnalyzer />
                <TirePressureOptimizer />
                {/* Affiliate recommendations removed */}
              </div>
            </TabsContent>

            <TabsContent value="smart" className="mt-8">
              <div className="space-y-8">
                <SmartSystemDecoder />
                <SmartAlertTranslator />
                <SetupGuideCreator />
                {/* Affiliate recommendations removed */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="px-4">
          <AffiliateDisclosure className="max-w-6xl mx-auto my-8" />
        </div>
      </div>
    </Layout>
  );
};

export default Calculators;
