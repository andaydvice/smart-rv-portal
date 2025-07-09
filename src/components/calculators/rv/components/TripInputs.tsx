import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { campsiteTypes, campsiteRates } from "../data/campsiteTypes";

interface TripInputsProps {
  rvType: string;
  setRvType: (value: string) => void;
  distance: number;
  setDistance: (value: number) => void;
  days: number;
  setDays: (value: number) => void;
  season: string;
  setSeason: (value: string) => void;
  fuelPrice: number;
  setFuelPrice: (value: number) => void;
  campsiteType: string;
  setCampsiteType: (value: string) => void;
  seasonData: Record<string, any>;
}

const TripInputs = ({
  rvType,
  setRvType,
  distance,
  setDistance,
  days,
  setDays,
  season,
  setSeason,
  fuelPrice,
  setFuelPrice,
  campsiteType,
  setCampsiteType,
  seasonData,
}: TripInputsProps) => {
  return (
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
            <SelectItem value="offPeak">Off Peak Season (Winter) - 20% Discount</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-400 mt-1">
          {seasonData[season].weather_notes}
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
            <SelectItem value="primitive">Primitive/Dispersed (${campsiteRates.primitive}/night)</SelectItem>
            <SelectItem value="state">State/National Park (${campsiteRates.state}/night)</SelectItem>
            <SelectItem value="standard">Standard RV Park (${campsiteRates.standard}/night)</SelectItem>
            <SelectItem value="premium">Premium Resort (${campsiteRates.premium}/night)</SelectItem>
            <SelectItem value="membership">Membership Campground (${campsiteRates.membership}/night)</SelectItem>
            <SelectItem value="urban">Urban RV Park (${campsiteRates.urban}/night)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-400 mt-1">
          {campsiteTypes[campsiteType].typical_features.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default TripInputs;