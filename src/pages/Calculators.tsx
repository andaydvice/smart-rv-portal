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
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Calculators = () => {
  const [activeTab, setActiveTab] = useState("power");
  const [distance, setDistance] = useState("");
  const [fuelUsed, setFuelUsed] = useState("");
  const [vehicleWeight, setVehicleWeight] = useState("");
  const [trailerWeight, setTrailerWeight] = useState("");
  const [tripDistance, setTripDistance] = useState("");
  const [avgSpeed, setAvgSpeed] = useState("");
  const [historicalMPG, setHistoricalMPG] = useState<{date: string, mpg: number}[]>([]);
  const { toast } = useToast();

  const calculateMPG = () => {
    const dist = parseFloat(distance);
    const fuel = parseFloat(fuelUsed);
    if (dist && fuel && fuel !== 0) {
      return (dist / fuel).toFixed(2);
    }
    return "0.00";
  };

  const calculateTripEfficiency = () => {
    const dist = parseFloat(tripDistance);
    const speed = parseFloat(avgSpeed);
    if (dist && speed) {
      const efficiency = speed > 60 ? (1 - (speed - 60) * 0.02) : 1;
      return (efficiency * 100).toFixed(1);
    }
    return "100.0";
  };

  const addMPGRecord = () => {
    const mpg = parseFloat(calculateMPG());
    if (mpg > 0) {
      setHistoricalMPG([...historicalMPG, {
        date: new Date().toLocaleDateString(),
        mpg: mpg
      }]);
      setDistance("");
      setFuelUsed("");
      console.log("MPG record added:", mpg);
      toast({
        title: "MPG Record Added",
        description: `Added ${mpg.toFixed(2)} MPG to your history.`,
      });
    } else {
      console.log("Cannot add MPG record: Please enter valid distance and fuel values");
      toast({
        title: "Invalid Values",
        description: "Please enter valid distance and fuel values first",
        variant: "destructive",
      });
    }
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

            <TabsContent value="fuel" className="space-y-8">
              <Card className="bg-[#091020] border-gray-700 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#60A5FA]">Fuel Efficiency Calculator</CardTitle>
                  <CardDescription className="text-gray-400">
                    Track your RV's fuel efficiency and estimate costs for your upcoming trips.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>
                  <div className="pt-4">
                    <p className="text-lg font-semibold text-[#60A5FA]">
                      Miles Per Gallon: {calculateMPG()} MPG
                    </p>
                    <Button 
                      onClick={addMPGRecord}
                      className="mt-4 bg-[#60A5FA] text-white hover:bg-[#4B8FE3]"
                    >
                      Add Current MPG to History
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#091020] border-gray-700 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#60A5FA]">Trip Efficiency Planning</CardTitle>
                  <CardDescription className="text-gray-400">
                    Plan your trip's fuel efficiency based on distance and average speed.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white">Trip Distance (miles)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 500"
                      value={tripDistance}
                      onChange={(e) => setTripDistance(e.target.value)}
                      className="bg-[#131a2a] border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white">Average Speed (mph)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 65"
                      value={avgSpeed}
                      onChange={(e) => setAvgSpeed(e.target.value)}
                      className="bg-[#131a2a] border-gray-700 text-white"
                    />
                  </div>
                  <div className="pt-4">
                    <p className="text-lg font-semibold text-[#60A5FA]">
                      Efficiency Rating: {calculateTripEfficiency()}%
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Based on optimal cruising speed of 60mph for best fuel economy
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#091020] border-gray-700 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#60A5FA]">MPG Tracking System</CardTitle>
                  <CardDescription className="text-gray-400">
                    Keep track of your fuel efficiency over time to optimize your driving habits.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold mb-2">MPG History</h4>
                    <div className="space-y-2">
                      {historicalMPG.map((record, index) => (
                        <div key={index} className="flex justify-between items-center bg-[#131a2a] p-2 rounded">
                          <span>{record.date}</span>
                          <span>{record.mpg.toFixed(2)} MPG</span>
                        </div>
                      ))}
                    </div>
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
