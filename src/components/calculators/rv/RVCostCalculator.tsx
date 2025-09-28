import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { campsiteRates } from "./data/campsiteTypes";
import TripInputs from "./components/TripInputs";
import CostBreakdown from "./components/CostBreakdown";
// Removed fake affiliate system
import { calculateCosts } from "./utils/costCalculations";
import { useCalculatorHistory } from "@/hooks/useCalculatorHistory";
import { useAuth } from "@/components/auth/AuthContext";
import { useToast } from "@/hooks/use-toast";

const RVCostCalculator = () => {
  const [rvType, setRvType] = useState('small');
  const [distance, setDistance] = useState(100);
  const [days, setDays] = useState(7);
  const [season, setSeason] = useState('regular');
  const [fuelPrice, setFuelPrice] = useState(4);
  const [campsiteType, setCampsiteType] = useState('state');

  const { saveCalculation, isAuthenticated } = useCalculatorHistory();
  const { toast } = useToast();

  const seasonData = {
    peak: {
      season_name: "Peak Season",
      date_range: "June 15 - August 31, Major Holidays",
      regional_variations: [
        "Extended summer in Southern states (May-September)",
        "Shorter peak in Northern regions",
        "Year-round peaks in tourist destinations"
      ],
      pricing_tier: "Premium (50% above base)",
      demand_level: "Very High",
      weather_notes: "Optimal conditions in most regions, but hot in Southern states"
    },
    shoulder: {
      season_name: "Shoulder Season",
      date_range: "April 15 - June 14, September 1 - October 31",
      regional_variations: [
        "Earlier spring in Southern states",
        "Later fall in warmer climates",
        "Variable by location"
      ],
      pricing_tier: "Moderate (25% above base)",
      demand_level: "Moderate to High",
      weather_notes: "Mild temperatures, occasional rain, ideal for many locations"
    },
    regular: {
      season_name: "Regular Season",
      date_range: "March 1 - April 14, November 1 - 30",
      regional_variations: [
        "Extended season in temperate zones",
        "Limited availability in colder regions",
        "Popular in desert areas"
      ],
      pricing_tier: "Standard (base rate)",
      demand_level: "Moderate",
      weather_notes: "Variable conditions, check local forecasts"
    },
    offPeak: {
      season_name: "Off-Peak Season",
      date_range: "December 1 - February 28",
      regional_variations: [
        "Winter sports regions become peak season",
        "Southern states remain moderate",
        "Limited services in some areas"
      ],
      pricing_tier: "Discounted (20% below base)",
      demand_level: "Low",
      weather_notes: "Cold in most regions, winter weather considerations"
    }
  };

  const costs = calculateCosts(
    rvType,
    distance,
    days,
    season,
    fuelPrice,
    campsiteRates[campsiteType]
  );

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
    if (!distance || distance <= 0 || !days || days <= 0 || !fuelPrice || fuelPrice <= 0) {
      toast({
        title: "Invalid inputs",
        description: "Please enter valid distance, days, and fuel price before saving.",
        variant: "destructive"
      });
      return;
    }

    const inputs = { 
      rvType, 
      distance: Number(distance), 
      days: Number(days), 
      season, 
      fuelPrice: Number(fuelPrice), 
      campsiteType 
    };
    
    // Flatten the results object for better display
    const results = {
      totalCost: costs.total,
      fuelCost: costs.fuel,
      rentalCost: costs.rental,
      campsiteCost: costs.campsite,
      miscCost: costs.misc,
      totalCostFormatted: `$${costs.total.toFixed(2)}`,
      breakdown: `Fuel: $${costs.fuel.toFixed(2)}, Rental: $${costs.rental.toFixed(2)}, Campsite: $${costs.campsite.toFixed(2)}, Misc: $${costs.misc.toFixed(2)}`
    };
    
    saveCalculation({
      calculatorType: "rv_cost",
      inputs,
      results
    });

    toast({
      title: "Calculation saved!",
      description: "Your RV cost calculation has been saved to your history."
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-[#091020] border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-2xl text-[#60A5FA]">RV Trip Cost Estimator</CardTitle>
        <CardDescription className="text-gray-400">
          Calculate the estimated costs for your RV adventure, including rental, fuel, and campsite expenses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <TripInputs
            rvType={rvType}
            setRvType={setRvType}
            distance={distance}
            setDistance={setDistance}
            days={days}
            setDays={setDays}
            season={season}
            setSeason={setSeason}
            fuelPrice={fuelPrice}
            setFuelPrice={setFuelPrice}
            campsiteType={campsiteType}
            setCampsiteType={setCampsiteType}
            seasonData={seasonData}
          />
          <CostBreakdown costs={costs} />
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
          {/* Affiliate recommendations removed */}
        </div>
      </CardContent>
    </Card>
  );
};

export default RVCostCalculator;