import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const GasCalculator = () => {
  const [distance, setDistance] = useState("");
  const [gasPrice, setGasPrice] = useState("");
  const [tankSize, setTankSize] = useState("");
  const [avgMPG, setAvgMPG] = useState("");
  const { toast } = useToast();

  const calculateGasCost = () => {
    const dist = parseFloat(distance);
    const price = parseFloat(gasPrice);
    const mpg = parseFloat(avgMPG);
    
    if (dist && price && mpg) {
      const gallonsNeeded = dist / mpg;
      const totalCost = gallonsNeeded * price;
      const numOfFillUps = tankSize ? Math.ceil(gallonsNeeded / parseFloat(tankSize)) : 0;
      
      console.log("Gas calculation:", { dist, price, mpg, gallonsNeeded, totalCost, numOfFillUps });
      
      toast({
        title: "Gas Cost Calculation",
        description: `Estimated cost: $${totalCost.toFixed(2)}
          ${numOfFillUps ? `\nApprox. ${numOfFillUps} fill-ups needed` : ""}`,
      });
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-[#091020] border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-2xl text-[#60A5FA]">RV Gas Cost Calculator</CardTitle>
        <CardDescription className="text-gray-400">
          Calculate fuel costs for your RV trip and estimate the number of fill-ups needed.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-white">Trip Distance (miles)</label>
            <Input
              type="number"
              placeholder="e.g., 500"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="bg-[#131a2a] border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-white">Gas Price ($/gallon)</label>
            <Input
              type="number"
              placeholder="e.g., 3.50"
              value={gasPrice}
              onChange={(e) => setGasPrice(e.target.value)}
              className="bg-[#131a2a] border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-white">Average MPG</label>
            <Input
              type="number"
              placeholder="e.g., 10"
              value={avgMPG}
              onChange={(e) => setAvgMPG(e.target.value)}
              className="bg-[#131a2a] border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-white">Tank Size (gallons, optional)</label>
            <Input
              type="number"
              placeholder="e.g., 50"
              value={tankSize}
              onChange={(e) => setTankSize(e.target.value)}
              className="bg-[#131a2a] border-gray-700 text-white"
            />
          </div>
        </div>
        <Button 
          onClick={calculateGasCost}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Calculate Gas Cost
        </Button>
      </CardContent>
    </Card>
  );
};

export default GasCalculator;