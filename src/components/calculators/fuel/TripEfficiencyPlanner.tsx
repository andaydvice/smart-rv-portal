import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const TripEfficiencyPlanner = () => {
  const [tripDistance, setTripDistance] = useState("");
  const [avgSpeed, setAvgSpeed] = useState("");

  const calculateTripEfficiency = () => {
    const dist = parseFloat(tripDistance);
    const speed = parseFloat(avgSpeed);
    if (dist && speed) {
      const efficiency = speed > 60 ? (1 - (speed - 60) * 0.02) : 1;
      return (efficiency * 100).toFixed(1);
    }
    return "100.0";
  };

  return (
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
  );
};

export default TripEfficiencyPlanner;