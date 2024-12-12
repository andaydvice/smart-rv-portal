import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MPGTrackingSystem = () => {
  const [historicalMPG, setHistoricalMPG] = useState<{date: string, mpg: number}[]>([]);

  return (
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
  );
};

export default MPGTrackingSystem;