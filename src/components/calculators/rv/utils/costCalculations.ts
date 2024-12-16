interface RVRates {
  [key: string]: {
    mpg: number;
    baseRate: number;
  };
}

interface SeasonMultipliers {
  [key: string]: number;
}

export const rvRates: RVRates = {
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

export const seasonMultipliers: SeasonMultipliers = {
  peak: 1.5,
  shoulder: 1.25,
  regular: 1.0,
  offPeak: 0.8
};

export const calculateCosts = (
  rvType: string,
  distance: number,
  days: number,
  season: string,
  fuelPrice: number,
  campsiteRate: number
) => {
  const { mpg, baseRate } = rvRates[rvType];
  
  const fuelCost = (distance / mpg) * fuelPrice;
  const rentalCost = baseRate * days * seasonMultipliers[season];
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