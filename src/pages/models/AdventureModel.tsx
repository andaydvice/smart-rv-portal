import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <div className="relative w-full h-[50vh]">
        <img 
          src="/lovable-uploads/ae14102b-cf2e-443b-a722-7fe364e92e36.png"
          alt="Line up of luxury adventure RVs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1B2028] flex items-end">
          <div className="container mx-auto pb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Adventure Ready RVs
            </h1>
          </div>
        </div>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen px-4"
        style={{ backgroundColor: "#1B2028" }}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8" style={{ color: "#5B9BD5" }}>
            Adventure Ready RV Categories and Models
          </h1>

          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl" style={{ color: "#5B9BD5" }}>
                  Adventure RV Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-4">
                  {Object.entries(adventureCategories).map(([category, models]) => (
                    <AccordionItem 
                      key={category} 
                      value={category}
                      className="border-gray-700"
                    >
                      <AccordionTrigger className="text-blue-300 hover:text-blue-400">
                        {category}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {models.map((model, index) => (
                            <div 
                              key={index}
                              className="bg-gray-800/50 p-4 rounded-lg border border-gray-700"
                            >
                              <h3 className="text-lg font-medium text-blue-200">
                                {model.name}
                              </h3>
                              <p className="text-gray-300 mt-1">
                                Starting at {model.price}
                              </p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl" style={{ color: "#5B9BD5" }}>
                  Key Adventure Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {keyFeatures.map((feature, index) => (
                    <div 
                      key={index}
                      className="bg-gray-800/50 p-4 rounded-lg border border-gray-700"
                    >
                      <p className="text-gray-300">{feature}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AdventureModel;