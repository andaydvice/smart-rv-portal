import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Battery } from "lucide-react";

const PowerConsumptionCalculator = () => {
  const [appliances, setAppliances] = useState({
    fridge: "",
    ac: "",
    lights: "",
    other: ""
  });

  const calculateTotalConsumption = () => {
    const total = Object.values(appliances)
      .reduce((sum, value) => sum + (Number(value) || 0), 0);
    return total.toFixed(2);
  };

  return (
    <Card className="bg-[#091020] border-gray-700 text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Battery className="w-5 h-5 text-[#60A5FA]" />
          <CardTitle className="text-xl text-[#60A5FA]">Power Consumption Tracker</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Refrigerator (Watts)</label>
          <Input
            type="number"
            placeholder="e.g., 400"
            value={appliances.fridge}
            onChange={(e) => setAppliances({ ...appliances, fridge: e.target.value })}
            className="bg-[#131a2a] border-gray-700 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Air Conditioning (Watts)</label>
          <Input
            type="number"
            placeholder="e.g., 1500"
            value={appliances.ac}
            onChange={(e) => setAppliances({ ...appliances, ac: e.target.value })}
            className="bg-[#131a2a] border-gray-700 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Lighting (Watts)</label>
          <Input
            type="number"
            placeholder="e.g., 100"
            value={appliances.lights}
            onChange={(e) => setAppliances({ ...appliances, lights: e.target.value })}
            className="bg-[#131a2a] border-gray-700 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Other Appliances (Watts)</label>
          <Input
            type="number"
            placeholder="e.g., 300"
            value={appliances.other}
            onChange={(e) => setAppliances({ ...appliances, other: e.target.value })}
            className="bg-[#131a2a] border-gray-700 text-white"
          />
        </div>
        <div className="pt-4">
          <p className="text-lg font-semibold text-[#60A5FA]">
            Total Power Consumption: {calculateTotalConsumption()} watts
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerConsumptionCalculator;