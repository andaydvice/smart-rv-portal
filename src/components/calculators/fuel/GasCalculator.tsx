import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCalculatorHistory } from "@/hooks/useCalculatorHistory";
import { useAuth } from "@/components/auth/AuthContext";
import { Save, History } from "lucide-react";

const GasCalculator = () => {
  const [distance, setDistance] = useState("");
  const [gasPrice, setGasPrice] = useState("");
  const [tankSize, setTankSize] = useState("");
  const [avgMPG, setAvgMPG] = useState("");
  const [results, setResults] = useState<{ totalCost: number; gallonsNeeded: number; numOfFillUps: number } | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { saveCalculation, history, isAuthenticated } = useCalculatorHistory('gas-calculator');

  const calculateGasCost = () => {
    const dist = parseFloat(distance);
    const price = parseFloat(gasPrice);
    const mpg = parseFloat(avgMPG);
    
    if (dist && price && mpg) {
      const gallonsNeeded = dist / mpg;
      const totalCost = gallonsNeeded * price;
      const numOfFillUps = tankSize ? Math.ceil(gallonsNeeded / parseFloat(tankSize)) : 0;
      
      const calculationResults = { totalCost, gallonsNeeded, numOfFillUps };
      setResults(calculationResults);
      
      console.log("Gas calculation:", { dist, price, mpg, gallonsNeeded, totalCost, numOfFillUps });
      
      toast({
        title: "Gas Cost Calculation",
        description: `Estimated cost: $${totalCost.toFixed(2)}
          ${numOfFillUps ? `\nApproximately ${numOfFillUps} refills needed` : ""}`,
      });
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  const handleSaveCalculation = () => {
    if (!results) return;
    
    const inputs = {
      distance: parseFloat(distance),
      gasPrice: parseFloat(gasPrice),
      tankSize: tankSize ? parseFloat(tankSize) : null,
      avgMPG: parseFloat(avgMPG)
    };
    
    saveCalculation({
      calculatorType: 'gas-calculator',
      inputs,
      results
    });
    
    toast({
      title: "Calculation Saved",
      description: "Your gas calculation has been saved to your account.",
    });
  };

  const loadCalculation = (calculation: any) => {
    setDistance(calculation.inputs.distance.toString());
    setGasPrice(calculation.inputs.gasPrice.toString());
    setTankSize(calculation.inputs.tankSize ? calculation.inputs.tankSize.toString() : "");
    setAvgMPG(calculation.inputs.avgMPG.toString());
    setResults(calculation.results);
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
        <div className="flex gap-2">
          <Button 
            onClick={calculateGasCost}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Calculate Gas Cost
          </Button>
          
          {isAuthenticated && results && (
            <Button 
              onClick={handleSaveCalculation}
              variant="outline"
              className="border-[#60A5FA] text-[#60A5FA] hover:bg-[#60A5FA] hover:text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          )}
        </div>

        {/* Results Display */}
        {results && (
          <div className="mt-6 p-4 bg-[#131a2a] rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-[#60A5FA] mb-3">Calculation Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">${results.totalCost.toFixed(2)}</p>
                <p className="text-gray-400">Total Cost</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{results.gallonsNeeded.toFixed(1)}</p>
                <p className="text-gray-400">Gallons Needed</p>
              </div>
              {results.numOfFillUps > 0 && (
                <div>
                  <p className="text-2xl font-bold text-white">{results.numOfFillUps}</p>
                  <p className="text-gray-400">Fill-ups</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Saved Calculations History */}
        {isAuthenticated && history.length > 0 && (
          <div className="mt-6 p-4 bg-[#131a2a] rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-[#60A5FA] mb-3 flex items-center">
              <History className="h-4 w-4 mr-2" />
              Recent Calculations
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {history.slice(0, 3).map((calc) => (
                <div 
                  key={calc.id}
                  className="flex justify-between items-center p-2 bg-[#0a1018] rounded cursor-pointer hover:bg-[#0f1520]"
                  onClick={() => loadCalculation(calc)}
                >
                  <div className="text-sm">
                    <span className="text-white">{calc.inputs.distance} mi, ${calc.inputs.gasPrice}/gal</span>
                    <p className="text-gray-400 text-xs">
                      {new Date(calc.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-[#60A5FA] font-semibold">${calc.results.totalCost.toFixed(2)}</p>
                    <p className="text-gray-400 text-xs">{calc.results.gallonsNeeded.toFixed(1)} gal</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isAuthenticated && (
          <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
            <p className="text-blue-200 text-sm text-center">
              <a href="/auth" className="text-[#60A5FA] hover:underline">Sign in</a> to save your calculations and access them later
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GasCalculator;