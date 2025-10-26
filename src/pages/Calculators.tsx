import { useState } from "react";
import { Link } from "react-router-dom";
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
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import { Helmet } from "react-helmet-async";

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
                
                <OptimizedAffiliateGrid
                  title="☀️ Recommended Solar Equipment Based on Your Calculations"
                  subtitle="Professional solar systems, batteries, and power stations designed for RV installations with industry-leading support."
                  partners={[
                    {
                      name: 'A1 Solar Store',
                      url: 'https://a1solarstore.com',
                      title: 'Complete Solar Systems & Kits',
                      description: 'Premium solar panels, battery banks, and complete off-grid electrical systems perfectly sized for your calculated power needs.',
                      features: ['Complete Solar Kits', 'Off-Grid Systems', 'Power Stations', '180-Day Cookie', '90% Confirmation Rate'],
                      buttonText: 'Shop A1 Solar Systems'
                    },
                    {
                      name: 'Solar Direct',
                      url: 'https://solardirect.com',
                      title: 'Solar Panels & Lithium Batteries',
                      description: 'High-quality solar panels, lithium batteries, and charge controllers with comprehensive warranties and expert support.',
                      features: ['Solar Panels', 'Lithium Batteries', 'Charge Controllers', '365-Day Cookie', 'Industry Leading Warranties'],
                      buttonText: 'Get Solar Direct'
                    },
                    {
                      name: 'A1 Solar Store',
                      url: 'https://a1solarstore.com',
                      title: 'Battery Banks & Energy Storage',
                      description: 'High-capacity lithium battery banks and portable power stations for reliable off-grid power based on your battery calculations.',
                      features: ['Lithium Battery Banks', 'Portable Power Stations', 'High Capacity Storage', 'Professional Support', '180-Day Cookie'],
                      buttonText: 'Shop Battery Systems'
                    }
                  ]}
                  gridCols="3"
                />
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

        {/* Learn More About RV Systems */}
        <div className="container mx-auto px-4 mb-12">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Learn More About RV Systems</h2>
            <p className="text-gray-300 mb-6">Explore our comprehensive guides to understand the systems behind these calculations</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/features/power-management" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-yellow-500 rounded-lg p-4 transition-all">
                <h3 className="text-white font-semibold mb-2">Power Management</h3>
                <p className="text-gray-400 text-sm">Learn about solar integration, battery systems, and smart power distribution</p>
              </Link>
              <Link to="/solar-power-guide" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-orange-500 rounded-lg p-4 transition-all">
                <h3 className="text-white font-semibold mb-2">Solar Power Guide</h3>
                <p className="text-gray-400 text-sm">Complete guide to solar power systems for your RV</p>
              </Link>
              <Link to="/features/smart-automation" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-purple-500 rounded-lg p-4 transition-all">
                <h3 className="text-white font-semibold mb-2">Smart Automation</h3>
                <p className="text-gray-400 text-sm">Discover how automation can optimize your RV's systems</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calculators;
