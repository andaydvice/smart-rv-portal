import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PowerConsumptionCalculator from "@/components/calculators/power/PowerConsumptionCalculator";
import BatteryCapacityCalculator from "@/components/calculators/power/BatteryCapacityCalculator";
import SolarPanelCalculator from "@/components/calculators/power/SolarPanelCalculator";
import { Battery, Fuel, Scale } from "lucide-react";

const Calculators = () => {
  const [activeTab, setActiveTab] = useState("power");
  const [distance, setDistance] = useState("");
  const [fuelUsed, setFuelUsed] = useState("");
  const [vehicleWeight, setVehicleWeight] = useState("");
  const [trailerWeight, setTrailerWeight] = useState("");

  const calculateMPG = () => {
    const dist = parseFloat(distance);
    const fuel = parseFloat(fuelUsed);
    if (dist && fuel && fuel !== 0) {
      return (dist / fuel).toFixed(2);
    }
    return "0.00";
  };

  const calculateTowingCapacity = () => {
    const vehicle = parseFloat(vehicleWeight);
    const trailer = parseFloat(trailerWeight);
    if (vehicle && trailer) {
      return (vehicle - trailer).toFixed(0);
    }
    return "0";
  };

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
              <p>
                RV Power Tools
              </p>
              <p>
                Smart answers fast. Adventure calls now.
              </p>
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

            <TabsContent value="fuel">
              <Card className="bg-[#091020] border-gray-700 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#60A5FA]">Fuel Efficiency Calculator</CardTitle>
                  <CardDescription className="text-gray-400">
                    Track your RV's fuel efficiency and estimate costs for your upcoming trips.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white">Distance Traveled (miles)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 300"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      className="bg-[#131a2a] border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white">Fuel Used (gallons)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 20"
                      value={fuelUsed}
                      onChange={(e) => setFuelUsed(e.target.value)}
                      className="bg-[#131a2a] border-gray-700 text-white"
                    />
                  </div>
                  <div className="pt-4">
                    <p className="text-lg font-semibold text-[#60A5FA]">
                      Miles Per Gallon: {calculateMPG()} MPG
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="towing">
              <Card className="bg-[#091020] border-gray-700 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#60A5FA]">Towing Safety Calculator</CardTitle>
                  <CardDescription className="text-gray-400">
                    Verify your towing setup is within safe limits and optimize weight distribution.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white">Vehicle Towing Capacity (lbs)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 7500"
                      value={vehicleWeight}
                      onChange={(e) => setVehicleWeight(e.target.value)}
                      className="bg-[#131a2a] border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white">Trailer Weight (lbs)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 5000"
                      value={trailerWeight}
                      onChange={(e) => setTrailerWeight(e.target.value)}
                      className="bg-[#131a2a] border-gray-700 text-white"
                    />
                  </div>
                  <div className="pt-4">
                    <p className="text-lg font-semibold text-[#60A5FA]">
                      Remaining Capacity: {calculateTowingCapacity()} lbs
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Calculators;