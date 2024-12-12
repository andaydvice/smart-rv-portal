import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const TirePressureOptimizer = () => {
  const [loadWeight, setLoadWeight] = useState("");
  const { toast } = useToast();

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
        <Button 
          onClick={calculateOptimalPressure}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Calculate Optimal Pressure
        </Button>
      </CardContent>
    </Card>
  );
};

export default TirePressureOptimizer;