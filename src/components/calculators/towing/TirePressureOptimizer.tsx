import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCalculatorHistory } from "@/hooks/useCalculatorHistory";
import { useAuth } from "@/components/auth/AuthContext";

const TirePressureOptimizer = () => {
  const [loadWeight, setLoadWeight] = useState("");
  const { toast } = useToast();
  const { saveCalculation, isAuthenticated } = useCalculatorHistory();

  const calculateOptimalPressure = () => {
    const weight = parseFloat(loadWeight);
    if (weight > 0) {
      // Basic calculation - this could be made more sophisticated
      const frontPressure = Math.min(35 + (weight / 1000) * 2, 50);
      const rearPressure = Math.min(40 + (weight / 1000) * 3, 80);

      toast({
        title: "Optimal Tire Pressure Calculated",
        description: `Front tires: ${frontPressure.toFixed(1)} PSI\nRear tires: ${rearPressure.toFixed(1)} PSI`,
      });
    }
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

    const weight = parseFloat(loadWeight);
    const frontPressure = Math.min(35 + (weight / 1000) * 2, 50);
    const rearPressure = Math.min(40 + (weight / 1000) * 3, 80);

    const inputs = { loadWeight };
    const results = { frontPressure: frontPressure.toFixed(1), rearPressure: rearPressure.toFixed(1) };
    
    saveCalculation({
      calculatorType: "tire_pressure",
      inputs,
      results
    });

    toast({
      title: "Calculation saved!",
      description: "Your tire pressure optimization has been saved to your history."
    });
  };

  return (
    <Card className="bg-[#091020] border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-2xl text-[#60A5FA]">Tire Pressure Optimizer</CardTitle>
        <CardDescription className="text-gray-400">
          Calculate optimal tire pressure based on load weight for safe towing.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-white">Total Load Weight (lbs)</label>
          <Input
            type="number"
            placeholder="e.g., 5000"
            value={loadWeight}
            onChange={(e) => setLoadWeight(e.target.value)}
            className="bg-[#131a2a] border-gray-700 text-white"
          />
        </div>
        <div className="space-y-3">
          <Button 
            onClick={calculateOptimalPressure}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Calculate Optimal Pressure
          </Button>
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
  );
};

export default TirePressureOptimizer;