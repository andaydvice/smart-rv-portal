export interface AdventureModel {
  name: string;
  priceRange: string;
  image?: string;
  highlight?: string; // New field for descriptive highlight
  notes?: string;     // New field for pricing notes
}

export interface AdventureCategory {
  name: string;
  description: string;
  models: AdventureModel[];
  image: string;
  // Potentially add other category-specific fields if needed in the future
}

export const adventureCategories: AdventureCategory[] = [
  {
    name: "Rugged Class B Vans (Adventure Vans)",
    description: "Built on van chassis with 4x4 or AWD, these are designed for off-road capability and self-sufficiency, ideal for overlanding and remote exploration.",
    image: "/lovable-uploads/b5fe467f-f975-4847-97b3-6ae051921bfa.png",
    models: [
      { 
        name: "Winnebago Revel 4x4", 
        priceRange: "$185K – $210K", 
        image: "/lovable-uploads/c1732ddf-458c-4eeb-b6ad-7a817ae9ba17.png",
        highlight: "Built on a Mercedes-Benz Sprinter chassis, the Revel features true 4x4 capability, a power lift bed, and off-grid amenities for serious adventure seekers.",
        notes: "Confirmed for new 2025 models"
      },
      { 
        name: "Storyteller Overland MODE 4x4", 
        priceRange: "$190K – $225K", 
        image: "/lovable-uploads/b1b0e81e-825c-4f31-aaab-5d7c50e67122.png",
        highlight: "Known for its flexible “garage” space and modular interior, the MODE 4x4 blends rugged performance with luxury touches and advanced power systems.",
        notes: "Matches current MSRP for new builds"
      },
      { 
        name: "Outside Van Custom Builds", 
        priceRange: "$180K – $350K+", // User table says "$180K – $350K", current data says +
        image: "/lovable-uploads/d02155c8-4397-497a-b884-610341d5ba0f.png",
        highlight: "Fully customizable interiors and robust off-road upgrades let you create a van uniquely tailored to your travel style and terrain preferences.",
        notes: "Custom pricing varies by build and options"
      },
      { 
        name: "Advanced RV Custom 4x4", // New model
        priceRange: "$250K – $400K", 
        // image: "/placeholder.svg", // Add a placeholder or ask user for image
        highlight: "Premium craftsmanship, advanced lithium battery systems, and bespoke interiors deliver unmatched comfort and autonomy for extended journeys.",
        notes: "Bespoke pricing, aligns with current market"
      },
      { 
        name: "Sportsmobile Classic 4x4", 
        priceRange: "$175K – $250K", 
        image: "/lovable-uploads/c74fc5fd-d76a-4edf-9dad-d3349d6826a8.png",
        highlight: "Legendary for its pop-top roof and heavy-duty 4WD system, the Classic is a favorite among overlanders seeking simplicity and durability.",
        notes: "Consistent with current published prices"
      },
      { 
        name: "Winnebago EKKO AWD", // New model
        priceRange: "$215K – $245K", 
        // image: "/placeholder.svg", 
        highlight: "Combines all-wheel drive with a compact footprint, full bathroom, and large gear garage—ideal for active adventurers.",
        notes: "Matches current dealer listings"
      },
      { 
        name: "Tiger Adventure Vehicles", // New model
        priceRange: "Price varies", 
        // image: "/placeholder.svg", 
        highlight: "Unique truck-based RVs with true off-road capability and customizable living spaces for remote exploration.",
        notes: "Custom builds; pricing on request"
      },
      { 
        name: "27 North Venture 170", // New model
        priceRange: "Price varies", 
        // image: "/placeholder.svg", 
        highlight: "Luxury meets performance in this Sprinter-based build, offering high-end finishes and advanced tech for discerning travelers.",
        notes: "Custom builds; pricing on request"
      },
      { 
        name: "Airstream Interstate 19X", // New model
        priceRange: "Price varies", 
        // image: "/placeholder.svg", 
        highlight: "Iconic Airstream design in a nimble package, featuring off-road tires, all-terrain upgrades, and a versatile interior.",
        notes: "New model; pricing set by dealers/custom options"
      },
      // Existing models not in user's update list, keeping them as is for now
      { name: "Pleasure-Way Rekon 4x4", priceRange: "$170K - $200K", image: "/lovable-uploads/97e63b3f-4389-48fd-995b-6d490d682089.png" },
      { name: "Mercedes-Benz Sprinter 4x4 (Custom Converters)", priceRange: "Varies Greatly", image: "/lovable-uploads/ee98c157-2dd2-47f8-bcbd-55749f6e09e4.png" }
    ],
  },
  {
    name: "Overland Trucks & Chassis Cabs",
    description: "Heavy-duty trucks converted for extreme off-road travel, offering robust platforms for custom living modules and extended self-sufficiency.",
    image: "/lovable-uploads/ab7d2423-0ab6-4868-83b1-c84f220e5736.png",
    models: [
      { name: "EarthRoamer LTi/HD", priceRange: "$700K – $2M+", image: "/lovable-uploads/af7df254-2b02-454a-a483-7e1e230dc571.png" },
      { name: "Global Expedition Vehicles (GXV)", priceRange: "$500K – $1.5M+", image: "/lovable-uploads/0a0224b4-f5cb-4f90-9f84-dd5ad3e2c21c.png" },
      { name: "AEV Prospector XL", priceRange: "$150K+ (truck & conversion)", image: "/lovable-uploads/598a2cb5-ffcb-440a-9943-6c4440749b9f.png" },
      { name: "Bowen Customs (custom truck builds)", priceRange: "Varies", image: "/lovable-uploads/8137a7b0-17f6-4adc-a1b8-c790843192e0.png" }
    ],
  },
  {
    name: "Off-Road Travel Trailers & Pop-Ups",
    description: "Towable units designed for rugged terrain, featuring reinforced chassis, off-road suspension, and often, more compact footprints.",
    image: "/lovable-uploads/8fbad7d4-f6a2-4af0-b5e4-1a3c5417cfcb.png",
    models: [
      { name: "Black Series Campers", priceRange: "$50K – $100K+", image: "/lovable-uploads/11a2f8d8-22f5-4ed7-83f9-28b08a64aeb5.png" },
      { name: "Opus OPUS Camper", priceRange: "$30K – $50K", image: "/lovable-uploads/e8141652-de4b-49aa-b99c-ad70b8523e3f.png" }, // Re-used image from rvTypes
      { name: "Taxa Outdoors Mantis/Cricket", priceRange: "$35K – $60K", image: "/lovable-uploads/51ac2438-08c7-47ee-b56d-876aa3bbdc80.png" },
      { name: "Bruder Expedition Trailers", priceRange: "$150K – $300K+", image: "/lovable-uploads/3175b015-a5c7-4df7-b8ca-b8a130b05519.png" }
    ],
  },
];

// Data for KeyFeaturesCard, assuming it's still relevant.
export const keyFeatures: string[] = [
  "Advanced 4x4/AWD Systems",
  "Solar Power & Lithium Battery Banks",
  "Reinforced Chassis & Off-Road Suspension",
  "Integrated Water Filtration Systems",
  "Durable, All-Weather Construction",
  "Smart Home Technology Integration",
  "Maximized Storage Solutions",
  "Compact and Efficient Layouts"
];
