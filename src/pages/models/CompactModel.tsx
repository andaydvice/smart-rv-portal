import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CarFront, Home, Car, Tent } from "lucide-react";

const CompactModel = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const rvTypes = [
    {
      title: "Class B Motorhomes (Camper Vans)",
      icon: <CarFront className="w-8 h-8 text-blue-400" />,
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
      image: "/lovable-uploads/ad2ac002-7ec7-479f-b437-6bdaced7fc5e.png",
      icon: <Home className="w-8 h-8 text-emerald-400" />,
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
      icon: <Car className="w-8 h-8 text-purple-400" />,
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
      icon: <Car className="w-8 h-8 text-purple-400" />,
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
      title: "Pop-Up Campers",
      icon: <Tent className="w-8 h-8 text-green-400" />,
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

  return (
    <>
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="relative w-full h-[60vh] overflow-hidden">
          <img
            src="/lovable-uploads/598a2cb5-ffcb-440a-9943-6c4440749b9f.png"
            alt="Compact RVs at sunset with campfires and string lights"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Compact RVs Guide</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl">
              Discover the perfect compact RV for your adventures
            </p>
          </div>
          <div className="absolute top-8 left-0 w-full px-4">
            <div className="container mx-auto">
              <Link to="/models">
                <Button 
                  variant="outline" 
                  className="bg-white/10 backdrop-blur-sm text-white hover:text-white hover:bg-white/20 active:bg-white/30 border-blue-400"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Models
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-12">
            {rvTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 hover:bg-gray-800/60 transition-colors"
              >
                {type.image && (
                  <div className="mb-8 rounded-lg overflow-hidden">
                    <img 
                      src={type.image} 
                      alt={`${type.title} example`}
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center gap-4 mb-6">
                  {type.icon}
                  <h2 className="text-3xl font-bold text-white">{type.title}</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-400 mb-2">Size</h3>
                      <p className="text-gray-300">{type.size}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-400 mb-2">Features</h3>
                      <p className="text-gray-300">{type.features}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-400 mb-2">Pros</h3>
                      <p className="text-gray-300">{type.pros}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-emerald-400 mb-4">Popular Brands</h3>
                      <div className="grid gap-6">
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">USA</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1">
                            {type.brands.usa.map((brand, idx) => (
                              <li key={idx}>{brand}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">Australia</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1">
                            {type.brands.australia.map((brand, idx) => (
                              <li key={idx}>{brand}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.main>
    </>
  );
};

export default CompactModel;