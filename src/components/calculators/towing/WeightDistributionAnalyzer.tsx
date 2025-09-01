import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCalculatorHistory } from "@/hooks/useCalculatorHistory";
import { useAuth } from "@/components/auth/AuthContext";

const WeightDistributionAnalyzer = () => {
  const [tongueWeight, setTongueWeight] = useState("");
  const [trailerWeight, setTrailerWeight] = useState("");
  const { toast } = useToast();
  const { saveCalculation, isAuthenticated } = useCalculatorHistory();

  const analyzeDistribution = () => {
    const tongue = parseFloat(tongueWeight);
    const trailer = parseFloat(trailerWeight);
    
    if (tongue > 0 && trailer > 0) {
      const percentage = (tongue / trailer) * 100;
      let status = "Optimal";
      let message = "Weight distribution is within recommended range.";
      
      if (percentage < 10) {
        status = "Warning";
        message = "Tongue weight is too low. Aim for 10-15% of trailer weight.";
      } else if (percentage > 15) {
        status = "Warning";
        message = "Tongue weight is too high. Aim for 10-15% of trailer weight.";
      }

      toast({
        title: `Distribution Status: ${status}`,
        description: `${message}\nCurrent tongue weight is ${percentage.toFixed(1)}% of trailer weight.`,
        variant: status === "Warning" ? "destructive" : "default",
      });
    }
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

    const inputs = { tongueWeight, trailerWeight };
    const tongue = parseFloat(tongueWeight);
    const trailer = parseFloat(trailerWeight);
    const percentage = (tongue / trailer) * 100;
    const results = { tongueWeightPercentage: percentage.toFixed(1) };
    
    saveCalculation({
      calculatorType: "weight_distribution",
      inputs,
      results
    });

    toast({
      title: "Calculation saved!",
      description: "Your weight distribution analysis has been saved to your history."
    });
  };

  return (
    <Card className="bg-[#091020] border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-2xl text-[#60A5FA]">Weight Distribution Analyzer</CardTitle>
        <CardDescription className="text-gray-400">
          Analyze tongue weight distribution for optimal towing stability.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-white">Tongue Weight (lbs)</label>
          <Input
            type="number"
            placeholder="e.g., 500"
            value={tongueWeight}
            onChange={(e) => setTongueWeight(e.target.value)}
            className="bg-[#131a2a] border-gray-700 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-white">Total Trailer Weight (lbs)</label>
          <Input
            type="number"
            placeholder="e.g., 5000"
            value={trailerWeight}
            onChange={(e) => setTrailerWeight(e.target.value)}
            className="bg-[#131a2a] border-gray-700 text-white"
          />
        </div>
        <div className="space-y-3">
          <Button 
            onClick={analyzeDistribution}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Analyze Distribution
          </Button>
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

export default WeightDistributionAnalyzer;