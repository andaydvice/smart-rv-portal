import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const RVCostCalculator = () => {
  const [rvType, setRvType] = useState('small');
  const [distance, setDistance] = useState(100);
  const [days, setDays] = useState(7);
  const [season, setSeason] = useState('regular');
  const [fuelPrice, setFuelPrice] = useState(4);
  const [campsiteType, setCampsiteType] = useState('state');

  // Updated rates and consumption based on current market data
  const rates = {
    popUp: { mpg: 16, baseRate: 100 },      // Pop Up Campers
    truckCamper: { mpg: 14, baseRate: 120 }, // Truck Campers
    camperVan: { mpg: 16, baseRate: 150 },   // Compact Camper Vans
    ultraCompact: { mpg: 15, baseRate: 175 }, // Ultra Compact Travel Trailers
    small: { mpg: 12, baseRate: 200 },       // Small RVs (20-25 feet)
    medium: { mpg: 9, baseRate: 275 },       // Medium RVs (26-32 feet)
    large: { mpg: 7, baseRate: 350 },        // Large RVs (33-39 feet)
    fifthWheel: { mpg: 10, baseRate: 300 },  // Fifth Wheel Trailers
    superSize: { mpg: 5.5, baseRate: 400 }   // Super Size Class A
  };

  // Enhanced season data with comprehensive information
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

  const seasonMultiplier = {
    peak: 1.5,
    shoulder: 1.25,
    regular: 1.0,
    offPeak: 0.8
  };

  const campsiteRates = {
    state: 40,        // State/National Parks
    standard: 65,     // Standard Private RV Parks
    premium: 95       // Premium/Resort RV Parks
  };

  const calculateCosts = () => {
    const { mpg, baseRate } = rates[rvType as keyof typeof rates];
    const campsiteRate = campsiteRates[campsiteType as keyof typeof campsiteRates];

    const fuelCost = (distance / mpg) * fuelPrice;
    const rentalCost = baseRate * days * seasonMultiplier[season as keyof typeof seasonMultiplier];
    const campsiteCost = campsiteRate * days;
    
    // Add 10% for miscellaneous costs (propane, supplies, etc.)
    const miscCosts = (fuelCost + rentalCost + campsiteCost) * 0.1;
    
    return {
      fuel: Math.round(fuelCost),
      rental: Math.round(rentalCost),
      campsite: Math.round(campsiteCost),
      misc: Math.round(miscCosts),
      total: Math.round(fuelCost + rentalCost + campsiteCost + miscCosts)
    };
  };

  const costs = calculateCosts();

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">RV Size</label>
              <Select value={rvType} onValueChange={setRvType}>
                <SelectTrigger className="bg-[#131a2a] border-gray-700 text-white">
                  <SelectValue placeholder="Select RV size" />
                </SelectTrigger>
                <SelectContent className="bg-[#131a2a] border-gray-700 text-white z-[9999] relative">
                  <SelectItem value="popUp">Pop Up Camper (8-16 ft, ~16 MPG)</SelectItem>
                  <SelectItem value="truckCamper">Truck Camper (12-18 ft, ~14 MPG)</SelectItem>
                  <SelectItem value="camperVan">Camper Van (16-19 ft, ~16 MPG)</SelectItem>
                  <SelectItem value="ultraCompact">Ultra Compact (13-19 ft, ~15 MPG)</SelectItem>
                  <SelectItem value="small">Small RV (20-25 ft, ~12 MPG)</SelectItem>
                  <SelectItem value="medium">Medium RV (26-32 ft, ~9 MPG)</SelectItem>
                  <SelectItem value="large">Large RV (33-39 ft, ~7 MPG)</SelectItem>
                  <SelectItem value="fifthWheel">Fifth Wheel (28-42 ft, ~10 MPG)</SelectItem>
                  <SelectItem value="superSize">Super Size Class A (40-45 ft, ~5.5 MPG)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Trip Distance (miles)</label>
              <Input 
                type="number" 
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="bg-[#131a2a] border-gray-700 text-white"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Number of Days</label>
              <Input 
                type="number" 
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="bg-[#131a2a] border-gray-700 text-white"
                min="1"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Season</label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger className="bg-[#131a2a] border-gray-700 text-white">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent className="bg-[#131a2a] border-gray-700 text-white z-[9999] relative">
                  <SelectItem value="peak">Peak Season (Summer, Major Holidays) - 50% Premium</SelectItem>
                  <SelectItem value="shoulder">Shoulder Season (Spring/Fall) - 25% Premium</SelectItem>
                  <SelectItem value="regular">Regular Season (Early Spring/Late Fall) - Base Rate</SelectItem>
                  <SelectItem value="offPeak">Off-Peak Season (Winter) - 20% Discount</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400 mt-1">
                {seasonData[season as keyof typeof seasonData].weather_notes}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Fuel Price per Gallon</label>
              <Input 
                type="number" 
                value={fuelPrice}
                onChange={(e) => setFuelPrice(Number(e.target.value))}
                className="bg-[#131a2a] border-gray-700 text-white"
                min="0"
                step="0.10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Campsite Type</label>
              <Select value={campsiteType} onValueChange={setCampsiteType}>
                <SelectTrigger className="bg-[#131a2a] border-gray-700 text-white">
                  <SelectValue placeholder="Select campsite type" />
                </SelectTrigger>
                <SelectContent className="bg-[#131a2a] border-gray-700 text-white z-[9999] relative">
                  <SelectItem value="state">State/National Park (${campsiteRates.state}/night)</SelectItem>
                  <SelectItem value="standard">Standard RV Park (${campsiteRates.standard}/night)</SelectItem>
                  <SelectItem value="premium">Premium Resort (${campsiteRates.premium}/night)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-8 p-6 bg-[#131a2a] rounded-lg border border-gray-700">
            <h3 className="text-lg font-medium text-[#60A5FA] mb-4">Estimated Costs</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-300">Rental Cost</span>
                <span className="text-white font-medium">${costs.rental}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-300">Fuel Cost</span>
                <span className="text-white font-medium">${costs.fuel}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-300">Campsite Cost</span>
                <span className="text-white font-medium">${costs.campsite}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-300">Miscellaneous (10%)</span>
                <span className="text-white font-medium">${costs.misc}</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-lg font-medium text-[#60A5FA]">Total Estimated Cost</span>
                <span className="text-xl font-bold text-[#60A5FA]">${costs.total}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RVCostCalculator;