import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Battery, Fuel, Scale } from "lucide-react";

const Calculators = () => {
  const [activeTab, setActiveTab] = useState("power");
  
  // Power & Solar Calculator States
  const [dailyUsage, setDailyUsage] = useState("");
  const [sunHours, setSunHours] = useState("");
  const [batteryCapacity, setBatteryCapacity] = useState("");
  
  // Fuel Efficiency Calculator States
  const [distance, setDistance] = useState("");
  const [fuelUsed, setFuelUsed] = useState("");
  
  // Towing Calculator States
  const [vehicleWeight, setVehicleWeight] = useState("");
  const [trailerWeight, setTrailerWeight] = useState("");

  const calculateSolarNeeds = () => {
    const usage = parseFloat(dailyUsage) || 0;
    const hours = parseFloat(sunHours) || 0;
    return usage && hours ? (usage / hours).toFixed(2) : "0";
  };

  const calculateMPG = () => {
    const dist = parseFloat(distance) || 0;
    const fuel = parseFloat(fuelUsed) || 0;
    return dist && fuel ? (dist / fuel).toFixed(2) : "0";
  };

  const calculateTowingCapacity = () => {
    const vehicle = parseFloat(vehicleWeight) || 0;
    const trailer = parseFloat(trailerWeight) || 0;
    return vehicle && trailer ? (vehicle - trailer).toFixed(2) : "0";
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#131a2a]">
        <div className="container mx-auto px-4 py-8 -mt-32 relative z-10">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#60A5FA] mb-6">
              RV Calculators Hub
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl">
              Welcome to your comprehensive RV calculator suite. Whether you're planning your power needs,
              tracking fuel efficiency, or ensuring safe towing, our calculators provide accurate,
              real-time results to enhance your RV experience.
            </p>
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

            <TabsContent value="power">
              <Card className="bg-[#091020] border-gray-700 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#60A5FA]">Power & Solar Calculator</CardTitle>
                  <CardDescription className="text-gray-400">
                    Calculate your RV's solar panel requirements based on daily power consumption
                    and available sunlight hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Daily Power Usage (Wh)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 3000"
                      value={dailyUsage}
                      onChange={(e) => setDailyUsage(e.target.value)}
                      className="bg-[#131a2a] border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Peak Sun Hours</label>
                    <Input
                      type="number"
                      placeholder="e.g., 5"
                      value={sunHours}
                      onChange={(e) => setSunHours(e.target.value)}
                      className="bg-[#131a2a] border-gray-700 text-white"
                    />
                  </div>
                  <div className="pt-4">
                    <p className="text-lg font-semibold text-[#60A5FA]">
                      Required Solar Panel Capacity: {calculateSolarNeeds()} watts
                    </p>
                  </div>
                </CardContent>
              </Card>
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
                    <label className="text-sm font-medium text-gray-300">Distance Traveled (miles)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 300"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      className="bg-[#131a2a] border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Fuel Used (gallons)</label>
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
                    <label className="text-sm font-medium text-gray-300">Vehicle Towing Capacity (lbs)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 7500"
                      value={vehicleWeight}
                      onChange={(e) => setVehicleWeight(e.target.value)}
                      className="bg-[#131a2a] border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Trailer Weight (lbs)</label>
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