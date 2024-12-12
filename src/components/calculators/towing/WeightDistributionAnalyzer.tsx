import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const WeightDistributionAnalyzer = () => {
  const [tongueWeight, setTongueWeight] = useState("");
  const [trailerWeight, setTrailerWeight] = useState("");
  const { toast } = useToast();

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
        <Button 
          onClick={analyzeDistribution}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Analyze Distribution
        </Button>
      </CardContent>
    </Card>
  );
};

export default WeightDistributionAnalyzer;