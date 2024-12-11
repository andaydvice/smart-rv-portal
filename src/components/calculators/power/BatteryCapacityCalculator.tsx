import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BatteryFull } from "lucide-react";

const BatteryCapacityCalculator = () => {
  const [dailyUsage, setDailyUsage] = useState("");
  const [daysAutonomy, setDaysAutonomy] = useState("");
  const [depthDischarge, setDepthDischarge] = useState("50");

  const calculateBatteryCapacity = () => {
    const usage = parseFloat(dailyUsage) || 0;
    const days = parseFloat(daysAutonomy) || 0;
    const depth = parseFloat(depthDischarge) || 50;
    
    const capacity = (usage * days) / (depth / 100);
    return capacity.toFixed(2);
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
          <label className="text-sm font-medium text-gray-300">Days of Autonomy</label>
          <Input
            type="number"
            placeholder="e.g., 3"
            value={daysAutonomy}
            onChange={(e) => setDaysAutonomy(e.target.value)}
            className="bg-[#131a2a] border-gray-700 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Depth of Discharge (%)</label>
          <Input
            type="number"
            placeholder="e.g., 50"
            value={depthDischarge}
            onChange={(e) => setDepthDischarge(e.target.value)}
            className="bg-[#131a2a] border-gray-700 text-white"
          />
        </div>
        <div className="pt-4">
          <p className="text-lg font-semibold text-[#60A5FA]">
            Required Battery Capacity: {calculateBatteryCapacity()} Wh
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatteryCapacityCalculator;