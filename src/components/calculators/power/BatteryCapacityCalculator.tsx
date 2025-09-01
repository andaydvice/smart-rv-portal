import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BatteryFull, Save } from "lucide-react";
import { useCalculatorHistory } from "@/hooks/useCalculatorHistory";
import { useAuth } from "@/components/auth/AuthContext";
import { useToast } from "@/hooks/use-toast";

const BatteryCapacityCalculator = () => {
  const [dailyUsage, setDailyUsage] = useState("");
  const [daysAutonomy, setDaysAutonomy] = useState("");
  const [depthDischarge, setDepthDischarge] = useState("50");
  
  const { saveCalculation, isAuthenticated } = useCalculatorHistory();
  const { toast } = useToast();

  const calculateBatteryCapacity = () => {
    const usage = parseFloat(dailyUsage) || 0;
    const days = parseFloat(daysAutonomy) || 0;
    const depth = parseFloat(depthDischarge) || 50;
    
    const capacity = (usage * days) / (depth / 100);
    return capacity.toFixed(2);
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

    const inputs = { dailyUsage, daysAutonomy, depthDischarge };
    const results = { requiredCapacity: calculateBatteryCapacity() };
    
    saveCalculation({
      calculatorType: "battery_capacity",
      inputs,
      results
    });

    toast({
      title: "Calculation saved!",
      description: "Your battery capacity calculation has been saved to your history."
    });
  };

  return (
    <Card className="bg-[#091020] border-gray-700 text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BatteryFull className="w-5 h-5 text-[#60A5FA]" />
          <CardTitle className="text-xl text-[#60A5FA]">Battery Capacity Planner</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-white">Daily Power Usage (Wh)</label>
          <Input
            type="number"
            placeholder="e.g., 3000"
            value={dailyUsage}
            onChange={(e) => setDailyUsage(e.target.value)}
            className="bg-[#131a2a] border-gray-700 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-white">Days of Autonomy</label>
          <Input
            type="number"
            placeholder="e.g., 3"
            value={daysAutonomy}
            onChange={(e) => setDaysAutonomy(e.target.value)}
            className="bg-[#131a2a] border-gray-700 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-white">Depth of Discharge (%)</label>
          <Input
            type="number"
            placeholder="e.g., 50"
            value={depthDischarge}
            onChange={(e) => setDepthDischarge(e.target.value)}
            className="bg-[#131a2a] border-gray-700 text-white"
          />
        </div>
        <div className="pt-4 space-y-3">
          <p className="text-lg font-semibold text-[#60A5FA]">
            Required Battery Capacity: {calculateBatteryCapacity()} Wh
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
  );
};

export default BatteryCapacityCalculator;