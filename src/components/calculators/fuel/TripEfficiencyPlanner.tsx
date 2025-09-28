import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useCalculatorHistory } from "@/hooks/useCalculatorHistory";
import { useAuth } from "@/components/auth/AuthContext";
import { useToast } from "@/hooks/use-toast";

const TripEfficiencyPlanner = () => {
  const [tripDistance, setTripDistance] = useState("");
  const [avgSpeed, setAvgSpeed] = useState("");

  const { saveCalculation, isAuthenticated } = useCalculatorHistory();
  const { toast } = useToast();

  const calculateTripEfficiency = () => {
    const dist = parseFloat(tripDistance);
    const speed = parseFloat(avgSpeed);
    if (dist && speed) {
      const efficiency = speed > 60 ? (1 - (speed - 60) * 0.02) : 1;
      return (efficiency * 100).toFixed(1);
    }
    return "100.0";
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

    // Validate inputs before saving
    const distance = parseFloat(tripDistance);
    const speed = parseFloat(avgSpeed);
    
    if (!distance || distance <= 0 || !speed || speed <= 0) {
      toast({
        title: "Invalid inputs",
        description: "Please enter valid trip distance and average speed before saving.",
        variant: "destructive"
      });
      return;
    }

    const efficiency = calculateTripEfficiency();
    const inputs = { 
      tripDistance: distance, 
      avgSpeed: speed 
    };
    const results = { 
      efficiencyRating: parseFloat(efficiency),
      efficiencyRatingFormatted: `${efficiency}%`
    };
    
    saveCalculation({
      calculatorType: "trip_efficiency",
      inputs,
      results
    });

    toast({
      title: "Calculation saved!",
      description: "Your trip efficiency calculation has been saved to your history."
    });
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
          {isAuthenticated && (
            <Button
              onClick={handleSaveCalculation}
              className="w-full bg-[#5B9BD5] hover:bg-[#4A8BC2] text-white mt-4"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Calculation
            </Button>
          )}
          {!isAuthenticated && (
            <p className="text-sm text-gray-400 text-center mt-4">
              Sign in to save your calculations
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TripEfficiencyPlanner;