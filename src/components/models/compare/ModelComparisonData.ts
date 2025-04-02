
import { Car, Cpu, Battery, ShieldCheck, Wifi, Ruler, AreaChart, Zap } from "lucide-react";

// Model comparison data
export const models = [
  {
    name: "Luxury Class",
    image: "/lovable-uploads/Luxury-Class-RVs-min.jpg",
    price: "$1,300,000+",
    description: "Our flagship model with unparalleled luxury features and premium finishes for discerning travelers.",
    specs: {
      length: "45 ft",
      height: "13.5 ft",
      weight: "54,000 lbs",
      sleeps: "6-8",
      powerSystem: "800Ah Lithium + 3kW Solar",
      connectivity: "Starlink + 5G",
      automation: "Full Smart Home Integration",
      security: "Advanced 360° Monitoring"
    },
    features: [
      { name: "Automated Driving Assistant", icon: Car, included: true },
      { name: "Neural Voice Control", icon: Cpu, included: true },
      { name: "Extended Range Power", icon: Battery, included: true },
      { name: "Advanced Security", icon: ShieldCheck, included: true },
      { name: "High-Speed Connectivity", icon: Wifi, included: true },
      { name: "Premium Space Design", icon: Ruler, included: true },
      { name: "Adaptive Climate System", icon: AreaChart, included: true },
      { name: "Solar Integration", icon: Zap, included: true },
    ]
  },
  {
    name: "Adventure Class",
    image: "/lovable-uploads/2935caf5-f345-40a6-8676-0f20817c6d6e.png",
    price: "$550,000+",
    description: "Designed for explorers who want to venture off the beaten path without sacrificing technology.",
    specs: {
      length: "32 ft",
      height: "12 ft",
      weight: "28,000 lbs",
      sleeps: "4-6",
      powerSystem: "600Ah Lithium + 2kW Solar",
      connectivity: "4G/5G + Local Mesh",
      automation: "Core Smart Systems",
      security: "Perimeter + Internal Monitoring"
    },
    features: [
      { name: "Automated Driving Assistant", icon: Car, included: true },
      { name: "Neural Voice Control", icon: Cpu, included: true },
      { name: "Extended Range Power", icon: Battery, included: true },
      { name: "Advanced Security", icon: ShieldCheck, included: true },
      { name: "High-Speed Connectivity", icon: Wifi, included: true },
      { name: "Premium Space Design", icon: Ruler, included: false },
      { name: "Adaptive Climate System", icon: AreaChart, included: true },
      { name: "Solar Integration", icon: Zap, included: true },
    ]
  },
  {
    name: "Compact Smart",
    image: "/lovable-uploads/e6619d24-bebf-439f-96b0-6aca2fb69380.png",
    price: "$220,000+",
    description: "Perfect for weekend getaways with smart technology in an efficient, easy-to-maneuver package.",
    specs: {
      length: "24 ft",
      height: "10.5 ft",
      weight: "12,000 lbs",
      sleeps: "2-4",
      powerSystem: "300Ah Lithium + 1kW Solar",
      connectivity: "4G/5G",
      automation: "Basic Smart Controls",
      security: "Entry + Motion Detection"
    },
    features: [
      { name: "Automated Driving Assistant", icon: Car, included: false },
      { name: "Neural Voice Control", icon: Cpu, included: false },
      { name: "Extended Range Power", icon: Battery, included: false },
      { name: "Advanced Security", icon: ShieldCheck, included: false },
      { name: "High-Speed Connectivity", icon: Wifi, included: true },
      { name: "Premium Space Design", icon: Ruler, included: false },
      { name: "Adaptive Climate System", icon: AreaChart, included: false },
      { name: "Solar Integration", icon: Zap, included: true },
    ]
  }
];

export default models;
