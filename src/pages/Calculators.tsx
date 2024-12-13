import { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import CalculatorHeader from "@/components/calculator-layout/CalculatorHeader";
import CalculatorIntro from "@/components/calculator-layout/CalculatorIntro";
import CalculatorTabs from "@/components/calculator-layout/CalculatorTabs";
import ScrollHint from "@/components/calculator-layout/ScrollHint";

// Import calculator components
import PowerConsumptionCalculator from "@/components/calculators/power/PowerConsumptionCalculator";
import BatteryCapacityCalculator from "@/components/calculators/power/BatteryCapacityCalculator";
import SolarPanelCalculator from "@/components/calculators/power/SolarPanelCalculator";
import FuelEfficiencyCalculator from "@/components/calculators/fuel/FuelEfficiencyCalculator";
import TripEfficiencyPlanner from "@/components/calculators/fuel/TripEfficiencyPlanner";
import MPGTrackingSystem from "@/components/calculators/fuel/MPGTrackingSystem";
import TowingSafetyCalculator from "@/components/calculators/towing/TowingSafetyCalculator";
import GasCalculator from "@/components/calculators/fuel/GasCalculator";
import SmartSystemDecoder from "@/components/calculators/smart-systems/SmartSystemDecoder";
import SetupGuideCreator from "@/components/calculators/smart-systems/SetupGuideCreator";
import SmartAlertTranslator from "@/components/calculators/smart-systems/SmartAlertTranslator";
import { MPGRecord } from "@/components/calculators/fuel/MPGTrackingSystem";

const Calculators = () => {
  const [activeTab, setActiveTab] = useState("smart-systems");
  const [historicalMPG, setHistoricalMPG] = useState<MPGRecord[]>([]);

  const handleAddMPGRecord = (record: MPGRecord) => {
    setHistoricalMPG(prev => [...prev, record]);
  };

  return (
    <>
      <Helmet>
        <title>RV Calculator Suite | Essential Tools for RV Life</title>
        <meta 
          name="description" 
          content="Plan your RV journey with our free calculator suite. Calculate power needs, track fuel efficiency, and ensure safe towing. Mobile-friendly tools for smarter RV travel." 
        />
        <meta 
          name="keywords" 
          content="RV power calculator, MPG tracker, towing weight calculator, RV fuel efficiency, battery capacity calculator, solar panel calculator, tire pressure calculator, weight distribution" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="RV Calculator Suite | Plan Your Journey Better" />
        <meta 
          property="og:description" 
          content="Free RV calculators for power consumption, fuel efficiency, and towing safety. Plan smarter trips with our comprehensive calculator suite." 
        />
        <link rel="canonical" href="/calculators" />
      </Helmet>

      <Navbar />
      <div className="min-h-screen bg-[#131a2a]">
        <CalculatorHeader />
        <div className="container mx-auto px-4 py-8">
          <CalculatorIntro />
          
          <Tabs 
            defaultValue="smart-systems"
            className="space-y-6"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <CalculatorTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <ScrollArea className="h-[calc(100vh-400px)] pr-4 relative">
              <div className="pb-16">
                <TabsContent value="power" className="space-y-6 mt-0">
                  <section aria-label="Power Calculators">
                    <PowerConsumptionCalculator />
                    <div className="h-6" />
                    <BatteryCapacityCalculator />
                    <div className="h-6" />
                    <SolarPanelCalculator />
                  </section>
                </TabsContent>

                <TabsContent value="fuel" className="space-y-6 mt-0">
                  <section aria-label="Fuel Efficiency Tools">
                    <GasCalculator />
                    <div className="h-6" />
                    <FuelEfficiencyCalculator onAddMPGRecord={handleAddMPGRecord} />
                    <div className="h-6" />
                    <TripEfficiencyPlanner />
                    <div className="h-6" />
                    <MPGTrackingSystem historicalMPG={historicalMPG} />
                  </section>
                </TabsContent>

                <TabsContent value="towing">
                  <section aria-label="Towing Safety Tools">
                    <TowingSafetyCalculator />
                  </section>
                </TabsContent>

                <TabsContent value="smart-systems" className="space-y-6 mt-0">
                  <section aria-label="Smart Systems Tools">
                    <SmartSystemDecoder />
                    <div className="h-6" />
                    <SetupGuideCreator />
                    <div className="h-6" />
                    <SmartAlertTranslator />
                  </section>
                </TabsContent>
              </div>

              <ScrollHint />
            </ScrollArea>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Calculators;