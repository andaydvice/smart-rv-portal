import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MPGRecord } from "./MPGTrackingSystem";

interface FuelEfficiencyCalculatorProps {
  onAddMPGRecord: (record: MPGRecord) => void;
}

const FuelEfficiencyCalculator = ({ onAddMPGRecord }: FuelEfficiencyCalculatorProps) => {
  const [distance, setDistance] = useState("");
  const [fuelUsed, setFuelUsed] = useState("");
  const { toast } = useToast();

  const calculateMPG = () => {
    const dist = parseFloat(distance);
    const fuel = parseFloat(fuelUsed);
    if (dist && fuel && fuel !== 0) {
      return (dist / fuel).toFixed(2);
    }
    return "0.00";
  };

  const addMPGRecord = () => {
    const mpg = parseFloat(calculateMPG());
    if (mpg > 0) {
      const newRecord = {
        date: new Date().toLocaleDateString(),
        mpg: mpg
      };
      onAddMPGRecord(newRecord);
      console.log("MPG record added:", newRecord);
      toast({
        title: "MPG Record Added",
        description: `Added ${mpg.toFixed(2)} MPG to your history.`,
      });
      setDistance("");
      setFuelUsed("");
    } else {
      console.log("Cannot add MPG record: Please enter valid distance and fuel values");
      toast({
        title: "Invalid Values",
        description: "Please enter valid distance and fuel values first",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-[#091020] border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-2xl text-[#60A5FA]">Fuel Efficiency Calculator</CardTitle>
        <CardDescription className="text-gray-400">
          Track your RV's fuel efficiency and estimate costs for your upcoming trips.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-white">Distance Traveled (miles)</label>
            <Input
              type="number"
              placeholder="e.g., 300"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="bg-[#131a2a] border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-white">Fuel Used (gallons)</label>
            <Input
              type="number"
              placeholder="e.g., 20"
              value={fuelUsed}
              onChange={(e) => setFuelUsed(e.target.value)}
              className="bg-[#131a2a] border-gray-700 text-white"
            />
          </div>
        </div>
        <div className="pt-4">
          <p className="text-lg font-semibold text-[#60A5FA]">
            Miles Per Gallon: {calculateMPG()} MPG
          </p>
          <Button 
            onClick={addMPGRecord}
            className="mt-4 bg-[#60A5FA] text-white hover:bg-[#4B8FE3]"
          >
            Add Current MPG to History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FuelEfficiencyCalculator;