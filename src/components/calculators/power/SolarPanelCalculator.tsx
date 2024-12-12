import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sun } from "lucide-react";

const SolarPanelCalculator = () => {
  const [dailyUsage, setDailyUsage] = useState("");
  const [sunHours, setSunHours] = useState("");
  const [efficiency, setEfficiency] = useState("80");

  const calculateSolarNeeds = () => {
    const usage = parseFloat(dailyUsage) || 0;
    const hours = parseFloat(sunHours) || 0;
    const eff = parseFloat(efficiency) || 80;
    
    const required = (usage / hours) / (eff / 100);
    return required.toFixed(2);
  };

  return (
    <Card className="bg-[#091020] border-gray-700 text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sun className="w-5 h-5 text-[#60A5FA]" />
          <CardTitle className="text-xl text-[#60A5FA]">Solar Panel Sizing Tool</CardTitle>
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
          <label className="text-sm font-bold text-white">Peak Sun Hours</label>
          <Input
            type="number"
            placeholder="e.g., 5"
            value={sunHours}
            onChange={(e) => setSunHours(e.target.value)}
            className="bg-[#131a2a] border-gray-700 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-white">System Efficiency (%)</label>
          <Input
            type="number"
            placeholder="e.g., 80"
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
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
  );
};

export default SolarPanelCalculator;