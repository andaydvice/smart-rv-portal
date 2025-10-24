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
import { PageSummary } from "@/components/ui/PageSummary";

const Calculators = () => {
  const [historicalMPG, setHistoricalMPG] = useState<MPGRecord[]>([]);

  const handleAddMPGRecord = (record: MPGRecord) => {
    setHistoricalMPG(prev => [...prev, record]);
  };

  return (
    <Layout>
      <Helmet>
        <title>RV Calculators & Tools</title>
        <meta name="description" content="Plan smarter with our RV calculators for fuel, power, towing, and smart systems. Compare options and optimize your trips." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/calculators' : ''} />
      </Helmet>
      <div className="pt-16 flex-grow">
        <CalculatorHeader />
        <CalculatorIntro />
        <ScrollHint />

        {/* Quick Overview of All Calculators */}
        <div className="container mx-auto px-4 mt-8 mb-8">
          <PageSummary
            question="What can you calculate with our RV tools?"
            answer="Access 13 free RV calculators organized into 5 categories. Plan your costs, optimize fuel efficiency, size your power systems, ensure towing safety, and decode smart system alerts. All calculators save your results for future reference."
            keyPoints={[
              "Cost Calculator - Total ownership costs, financing, and budget planning for your RV investment",
              "Fuel Calculators (4 tools) - Gas costs, fuel efficiency, MPG tracking, and trip efficiency planning",
              "Power Calculators (3 tools) - Battery capacity sizing, power consumption analysis, and solar panel requirements",
              "Towing Calculators (3 tools) - Safety ratings, weight distribution, and tire pressure optimization",
              "Smart System Tools (3 tools) - System decoder, alert translator, and custom setup guide creator"
            ]}
            readingTime="Use any calculator instantly"
          />
        </div>

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
