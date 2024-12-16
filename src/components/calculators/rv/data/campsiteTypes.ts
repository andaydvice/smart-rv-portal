export interface CampsitePricing {
  min_per_night: number;
  max_per_night: number;
  additional_fees: string[];
}

export interface CampsiteType {
  site_type: string;
  price_range: CampsitePricing;
  amenities: string[];
  typical_features: string[];
  limitations: string[];
  booking_requirements: string[];
  stay_duration: string;
  accessibility: string;
}

export const campsiteTypes = {
  primitive: {
    site_type: "Primitive/Dispersed Camping",
    price_range: {
      min_per_night: 0,
      max_per_night: 20,
      additional_fees: ["Optional parking pass", "Backcountry permits"]
    },
    amenities: ["None/minimal", "Sometimes vault toilets", "Occasional water spigots"],
    typical_features: ["Natural setting", "No hookups", "Pack-in/pack-out required"],
    limitations: ["Vehicle size restrictions", "No services", "Weather dependent access"],
    booking_requirements: ["Sometimes first-come-first-served", "May require permits"],
    stay_duration: "Usually 14-day maximum",
    accessibility: "Often requires high-clearance vehicles"
  },
  state: {
    site_type: "State/National Parks",
    price_range: {
      min_per_night: 35,
      max_per_night: 75,
      additional_fees: ["Entrance fees", "Reservation fees", "Park passes"]
    },
    amenities: ["Basic restrooms", "Water stations", "Dump stations"],
    typical_features: ["Natural settings", "Educational programs", "Hiking trails"],
    limitations: ["Length restrictions", "Generator hours", "Maximum stay limits"],
    booking_requirements: ["Advance reservations recommended", "Park passes"],
    stay_duration: "Typically 14 days maximum",
    accessibility: "Most sites accessible to standard RVs"
  },
  standard: {
    site_type: "Standard Private RV Parks",
    price_range: {
      min_per_night: 45,
      max_per_night: 85,
      additional_fees: ["Electric usage", "Pet fees", "Extra vehicle"]
    },
    amenities: ["Full hookups", "WiFi", "Laundry", "Showers"],
    typical_features: ["Level sites", "Basic cable TV", "Camp store"],
    limitations: ["Pet restrictions", "Quiet hours", "Age restrictions on RVs"],
    booking_requirements: ["Credit card required", "Advance registration"],
    stay_duration: "Flexible, daily to monthly",
    accessibility: "Good for most RV sizes"
  },
  premium: {
    site_type: "Premium/Resort RV Parks",
    price_range: {
      min_per_night: 85,
      max_per_night: 200,
      additional_fees: ["Resort fees", "Activity fees", "Premium site location"]
    },
    amenities: ["Premium hookups", "Cable/Internet", "Pool/Spa", "Fitness center"],
    typical_features: ["Concrete pads", "Luxury facilities", "Planned activities"],
    limitations: ["Class A only sections", "Age restrictions", "Membership requirements"],
    booking_requirements: ["Deposits required", "Minimum stays in peak season"],
    stay_duration: "Daily to seasonal",
    accessibility: "Excellent for all RV types"
  },
  membership: {
    site_type: "Membership Campgrounds",
    price_range: {
      min_per_night: 0,
      max_per_night: 50,
      additional_fees: ["Annual membership fees", "Premium location fees"]
    },
    amenities: ["Varies by location", "Usually full hookups", "Common areas"],
    typical_features: ["Member lounges", "Organized events", "Discounted rates"],
    limitations: ["Membership required", "Reservation windows", "Maximum stays"],
    booking_requirements: ["Active membership", "Advance booking windows"],
    stay_duration: "Often extended stay options",
    accessibility: "Variable by location"
  },
  urban: {
    site_type: "Urban RV Parks",
    price_range: {
      min_per_night: 75,
      max_per_night: 150,
      additional_fees: ["Premium location fee", "City tax", "Utility surcharges"]
    },
    amenities: ["Full hookups", "Security", "Urban conveniences"],
    typical_features: ["Close to attractions", "Public transport access", "Secure access"],
    limitations: ["Size restrictions", "Limited availability", "Higher noise levels"],
    booking_requirements: ["Advance reservations essential", "Security deposits"],
    stay_duration: "Daily to weekly typical",
    accessibility: "May have limited access for larger RVs"
  }
};

// Base rates for quick calculator reference
export const campsiteRates = {
  primitive: 10,    // Basic dispersed camping
  state: 40,        // State/National Parks
  standard: 65,     // Standard Private RV Parks
  premium: 95,      // Premium/Resort RV Parks
  membership: 25,   // Membership-based (after membership fees)
  urban: 100        // Urban RV Parks
} as const;

// Helper function to get average nightly rate
export const getAverageRate = (type: keyof typeof campsiteRates): number => {
  return campsiteRates[type];
};