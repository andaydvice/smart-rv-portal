import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useCalculatorHistory } from "@/hooks/useCalculatorHistory";
import { useAuth } from "@/components/auth/AuthContext";
import { useToast } from "@/hooks/use-toast";
import TirePressureOptimizer from "./TirePressureOptimizer";
import WeightDistributionAnalyzer from "./WeightDistributionAnalyzer";

const TowingSafetyCalculator = () => {
  const [vehicleWeight, setVehicleWeight] = useState("");
  const [trailerWeight, setTrailerWeight] = useState("");

  const { saveCalculation, isAuthenticated } = useCalculatorHistory();
  const { toast } = useToast();

  const calculateTowingCapacity = () => {
    const vehicle = parseFloat(vehicleWeight);
    const trailer = parseFloat(trailerWeight);
    if (vehicle && trailer) {
      return (vehicle - trailer).toFixed(0);
    }
    return "0";
  };

  const handleSaveCalculation = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save your calculations",
        variant: "destructive"
      });
      return;
    }

    const inputs = { vehicleWeight, trailerWeight };
    const results = { remainingCapacity: calculateTowingCapacity() };
    
    saveCalculation({
      calculatorType: "towing_safety",
      inputs,
      results
    });

    toast({
      title: "Calculation saved!",
      description: "Your towing safety calculation has been saved to your history."
    });
  };

  return (
    <div className="space-y-8">
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
          <div className="pt-4 space-y-3">
            <p className="text-lg font-semibold text-[#60A5FA]">
              Remaining Capacity: {calculateTowingCapacity()} lbs
            </p>
            {isAuthenticated && (
              <Button
                onClick={handleSaveCalculation}
                className="w-full bg-[#5B9BD5] hover:bg-[#4A8BC2] text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Calculation
              </Button>
            )}
            {!isAuthenticated && (
              <p className="text-sm text-gray-400 text-center">
                Sign in to save your calculations
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <TirePressureOptimizer />
      <WeightDistributionAnalyzer />
    </div>
  );
};

export default TowingSafetyCalculator;