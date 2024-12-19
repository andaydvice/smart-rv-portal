import { LucideIcon, CarFront, Home, Car, Tent } from "lucide-react";

interface RVType {
  title: string;
  icon: LucideIcon;
  size: string;
  features: string;
  pros: string;
  brands: {
    usa: string[];
    australia: string[];
  };
  image?: string;
}

export const rvTypes: RVType[] = [
  {
    title: "Class B Motorhomes (Camper Vans)",
    icon: CarFront,
    size: "18-24 feet long",
    features: "Built on a van chassis, including sleeping areas, small kitchen, and wet bath",
    pros: "Easy to drive, park, and store. Great for solo travellers or couples",
    brands: {
      usa: ["Winnebago (Travato, Solis)", "Airstream (Interstate, Atlas)", "Thor Motor Coach (Tellaro, Sequence)"],
      australia: ["Trakka (Trakkadu, Jabiru)", "Sunliner (Rialta, Vida)", "KEA Campers (Nomad, Beach)"]
    }
  },
  {
    title: "Class C Motorhomes (Mini Motorhomes)",
    icon: Home,
    image: "/lovable-uploads/ad2ac002-7ec7-479f-b437-6bdaced7fc5e.png",
    size: "20-26 feet long",
    features: "Built on a truck chassis with over-cab sleeping area, kitchenette, and bathroom",
    pros: "Compact enough for most parking spaces but more spacious than Class B",
    brands: {
      usa: ["Coachmen (Freelander, Leprechaun)", "Thor Motor Coach (Chateau, Four Winds)", "Winnebago (View, Minnie Winnie)"],
      australia: ["Avida (Esperance, Ceduna)", "Jayco Australia (Conquest, Optimum)", "Sunliner (Switch, Habitat)"]
    }
  },
  {
    title: "Teardrop Trailers",
    icon: Car,
    image: "/lovable-uploads/989028bc-89ec-4ec4-841d-e38421cc7626.png",
    size: "8-15 feet long",
    features: "Lightweight and towable by small vehicles, with sleeping area and basic kitchen",
    pros: "Affordable, easy to tow, and perfect for minimalist campers",
    brands: {
      usa: ["nuCamp (TAB 320, TAG)", "Little Guy Trailers (Max, Mini Max)", "inTech RV (Luna, Flyer)"],
      australia: ["Gidget Retro Teardrop Campers", "Caretta Australia", "Trackabout"]
    }
  },
  {
    title: "Compact Travel Trailers",
    icon: Car,
    image: "/lovable-uploads/46dcd85e-d26f-4d08-afc1-5f5818266116.png",
    size: "Typically under 20 feet long",
    features: "Include more amenities than teardrop trailers, such as a kitchen, bathroom, and dining area",
    pros: "Still lightweight and easy to tow",
    brands: {
      usa: [
        "Scamp Trailers (13', 16', 19')",
        "Casita Travel Trailers (Spirit, Freedom)",
        "Oliver Travel Trailers (Legacy Elite)",
        "Forest River (R-Pod, No Boundaries)",
        "Airstream (Basecamp, Bambi)",
        "Aliner (Expedition, Ascape)",
        "Happier Camper (HC1)"
      ],
      australia: [
        "Kokoda Caravans (Challenger)",
        "Jayco Australia (Journey Pop Top, CrossTrak)",
        "Avida (Wave, Emerald)",
        "Avan (Aliner, Aspire)",
        "Track Trailer (Tvan, Mate)"
      ]
    }
  },
  {
    title: "Pop Up Campers",
    icon: Tent,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    size: "Collapsible, often 8-16 feet when folded",
    features: "Expandable canvas sides, sleeping areas, and basic kitchen amenities",
    pros: "Easy to store and tow; affordable",
    brands: {
      usa: [
        "Jayco (Jay Sport)",
        "Forest River (Rockwood, Flagstaff)",
        "Coachmen (Clipper, Viking)",
        "Aliner (Classic, Scout)",
        "Opus Camper USA (OP4, OP Lite)"
      ],
      australia: [
        "Jayco Australia (Journey Pop Top)",
        "Track Trailer (Topaz, Tvan)",
        "Cub Campers (Brumby, Scout)",
        "EzyTrail (Parks, Stirling)",
        "Coromal (Pioneer Silhouette)"
      ]
    }
  }
];
