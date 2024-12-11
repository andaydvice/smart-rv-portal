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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen pt-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            RV Calculators Hub
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Welcome to your comprehensive RV calculator suite. Whether you're planning your power needs,
            tracking fuel efficiency, or ensuring safe towing, our calculators provide accurate,
            real-time results to enhance your RV experience.
          </p>

          <Tabs defaultValue="power" className="space-y-8">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-4">
              <TabsTrigger value="power" className="flex items-center gap-2">
                <Battery className="h-4 w-4" />
                Power & Solar
              </TabsTrigger>
              <TabsTrigger value="fuel" className="flex items-center gap-2">
                <Fuel className="h-4 w-4" />
                Fuel Efficiency
              </TabsTrigger>
              <TabsTrigger value="towing" className="flex items-center gap-2">
                <Scale className="h-4 w-4" />
                Towing Safety
              </TabsTrigger>
            </TabsList>

            <TabsContent value="power">
              <Card>
                <CardHeader>
                  <CardTitle>Power & Solar Calculator</CardTitle>
                  <CardDescription>
                    Calculate your RV's solar panel requirements based on daily power consumption
                    and available sunlight hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Daily Power Usage (Wh)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 3000"
                      value={dailyUsage}
                      onChange={(e) => setDailyUsage(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Peak Sun Hours</label>
                    <Input
                      type="number"
                      placeholder="e.g., 5"
                      value={sunHours}
                      onChange={(e) => setSunHours(e.target.value)}
                    />
                  </div>
                  <div className="pt-4">
                    <p className="text-lg font-semibold">
                      Required Solar Panel Capacity: {calculateSolarNeeds()} watts
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fuel">
              <Card>
                <CardHeader>
                  <CardTitle>Fuel Efficiency Calculator</CardTitle>
                  <CardDescription>
                    Track your RV's fuel efficiency and estimate costs for your upcoming trips.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Distance Traveled (miles)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 300"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fuel Used (gallons)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 20"
                      value={fuelUsed}
                      onChange={(e) => setFuelUsed(e.target.value)}
                    />
                  </div>
                  <div className="pt-4">
                    <p className="text-lg font-semibold">
                      Miles Per Gallon: {calculateMPG()} MPG
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="towing">
              <Card>
                <CardHeader>
                  <CardTitle>Towing Safety Calculator</CardTitle>
                  <CardDescription>
                    Verify your towing setup is within safe limits and optimize weight distribution.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vehicle Towing Capacity (lbs)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 7500"
                      value={vehicleWeight}
                      onChange={(e) => setVehicleWeight(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Trailer Weight (lbs)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 5000"
                      value={trailerWeight}
                      onChange={(e) => setTrailerWeight(e.target.value)}
                    />
                  </div>
                  <div className="pt-4">
                    <p className="text-lg font-semibold">
                      Remaining Capacity: {calculateTowingCapacity()} lbs
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </>
  );
};

export default Calculators;