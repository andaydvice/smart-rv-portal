import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import TirePressureOptimizer from "./TirePressureOptimizer";
import WeightDistributionAnalyzer from "./WeightDistributionAnalyzer";

const TowingSafetyCalculator = () => {
  const [vehicleWeight, setVehicleWeight] = useState("");
  const [trailerWeight, setTrailerWeight] = useState("");

  const calculateTowingCapacity = () => {
    const vehicle = parseFloat(vehicleWeight);
    const trailer = parseFloat(trailerWeight);
    if (vehicle && trailer) {
      return (vehicle - trailer).toFixed(0);
    }
    return "0";
  };

  return (
    <div className="space-y-8 pt-16">
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
      
      <TirePressureOptimizer />
      <WeightDistributionAnalyzer />
    </div>
  );
};

export default TowingSafetyCalculator;