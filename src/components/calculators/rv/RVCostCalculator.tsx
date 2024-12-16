import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { campsiteRates } from "./data/campsiteTypes";
import TripInputs from "./components/TripInputs";
import CostBreakdown from "./components/CostBreakdown";
import { calculateCosts } from "./utils/costCalculations";

const RVCostCalculator = () => {
  const [rvType, setRvType] = useState('small');
  const [distance, setDistance] = useState(100);
  const [days, setDays] = useState(7);
  const [season, setSeason] = useState('regular');
  const [fuelPrice, setFuelPrice] = useState(4);
  const [campsiteType, setCampsiteType] = useState('state');

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
        </div>
      </CardContent>
    </Card>
  );
};

export default RVCostCalculator;