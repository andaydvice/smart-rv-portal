import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const adventureCategories = {
  "Rugged Class B Vans (Adventure Vans)": [
    { name: "Winnebago Revel 4x4", price: "$185K - $210K" },
    { name: "Storyteller Overland MODE 4x4", price: "$190K - $225K" },
    { name: "Outside Van Custom Builds", price: "$180K - $350K" },
    { name: "Advanced RV Custom 4x4", price: "$250K - $400K" },
    { name: "Sportsmobile Classic 4x4", price: "$175K - $250K" },
    { name: "Winnebago EKKO AWD", price: "$215K - $245K" },
    { name: "Tiger Adventure Vehicles", price: "Price varies" },
    { name: "27 North Venture 170", price: "Price varies" },
    { name: "Airstream Interstate 19X", price: "Price varies" }
  ],
  "Off Road Travel Trailers": [
    { name: "Black Series HQ19", price: "$70K - $85K" },
    { name: "Bruder EXP 6", price: "$125K - $180K" },
    { name: "Off Grid Trailers Expedition 2.0", price: "$45K - $65K" },
    { name: "Taxa Outdoors Mantis", price: "$45K - $60K" },
    { name: "Airstream Basecamp X", price: "$48K - $55K" },
    { name: "Eclipse RV Overland Adventure Series Mojo 12BD", price: "Price varies" },
    { name: "inTech OVR Expedition", price: "Price varies" },
    { name: "Taxa Outdoors TigerMoth", price: "$27,900" },
    { name: "Vorsheer XOC Extreme Overland Camper", price: "$49,995" },
    { name: "nüCamp RV Tab S Teardrop Camper", price: "$31,523" }
  ],
  "Compact Adventure Class C": [
    { name: "Jayco Redhawk 4x4", price: "$130K - $160K" },
    { name: "Thor Magnitude 4x4", price: "$150K - $180K" },
    { name: "Dynamax Isata 3 4x4", price: "$160K - $190K" },
    { name: "Forester MBS 4x4", price: "$120K - $140K" },
    { name: "Winnebago EKKO Sprinter 23B", price: "$245K - $270K" },
    { name: "Jayco Comet", price: "Price varies" }
  ],
  "Overlanding Fifth Wheels": [
    { name: "Arctic Fox 27 5L", price: "$65K - $80K" },
    { name: "Northwood Fox Mountain", price: "$60K - $75K" },
    { name: "KZ Durango Half Ton", price: "$55K - $70K" },
    { name: "Bruder EXP 7", price: "Price varies" }
  ],
  "Truck Campers": [
    { name: "Adventurer 901SB", price: "Price varies" },
    { name: "Adventurer 910DB", price: "Price varies" }
  ]
};

const keyFeatures = [
  "Four wheel drive or all wheel drive capability",
  "Enhanced ground clearance and off road suspension",
  "Solar power systems and extended battery capacity",
  "All weather insulation and climate control",
  "Reinforced construction for rough terrain",
  "Extra storage for adventure gear",
  "All season tires and recovery equipment",
  "Off grid power systems",
  "Ample storage for outdoor gear",
  "Dedicated workspace for remote work",
  "Upgraded wheels and tires",
  "External shower ports",
  "On board air compressors",
  "Advanced off grid systems (large solar arrays, battery banks, sustainable water systems)",
  "Durable construction using high quality materials for harsh environments",
  "Flexible interior configurations for customizable living spaces"
];

const AdventureModel = () => {
  return (
    <>
      <Navbar />
      <div className="relative w-full h-[60vh]">
        <img 
          src="/lovable-uploads/ae14102b-cf2e-443b-a722-7fe364e92e36.png"
          alt="Line up of luxury adventure RVs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
          <h1 className="text-5xl font-bold text-white mb-4">Adventure Ready RVs</h1>
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-blue-400">
              Unrivaled Luxury: Class A Diesel Pushers & Custom Coaches
            </h2>
            <h3 className="text-2xl font-semibold text-blue-400">
              From $1.3M | Custom Excellence
            </h3>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <Link to="/models">
          <Button variant="outline" className="mb-4 bg-white/10 backdrop-blur-sm text-white hover:text-white hover:bg-white/20 active:bg-white/30">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Models
          </Button>
        </Link>
          
        <div className="bg-gray-800/50 rounded-lg p-8 backdrop-blur-sm mb-4 mt-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-gray-300 text-lg">
                Each model represents the pinnacle of mobile living, where cutting edge technology meets timeless elegance.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white">Key Features</h2>
              <ul className="grid gap-6">
                {keyFeatures.map((feature, index) => (
                  <li key={index} className="text-gray-300">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 rounded-xl p-6 mt-4"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Complete Guide to Adventure RVs: Authentic Owner Insights 2024</h2>
          <p className="text-gray-300 mb-8 italic">
            Note: Prices are approximate ranges based on 2024 models and can vary significantly based on options, customizations, and dealer location. 
            Many of these manufacturers also offer custom builds that can exceed these ranges.
          </p>

          <div className="space-y-8">
            {Object.entries(adventureCategories).map(([category, models]) => (
              <Accordion key={category} type="single" collapsible className="mb-6">
                <AccordionItem value={category}>
                  <AccordionTrigger className="text-lg font-semibold text-blue-400">
                    {category}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-4 pt-4">
                      {models.map((model, index) => (
                        <li key={index} className="p-4 bg-gray-700/30 rounded-lg">
                          <h3 className="text-lg font-medium text-blue-200">
                            {model.name}
                          </h3>
                          <p className="text-gray-300 mt-1">
                            Starting at {model.price}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdventureModel;
