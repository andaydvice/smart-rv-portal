import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Battery, Navigation, Shield, Wifi } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const models = [
  {
    name: "Luxury Class",
    image: "https://smartrvhub.netlify.app/lovable-uploads/Luxury_RV_Living-minx800.jpg",
    price: "Starting From 1.3M",
    description: "Experience unparalleled luxury with our flagship model, featuring advanced automation and premium finishes.",
    features: [
      { icon: Navigation, text: "Advanced Navigation System", color: "text-blue-400" },
      { icon: Shield, text: "Premium Security Suite", color: "text-emerald-400" },
      { icon: Battery, text: "Extended Range Power System", color: "text-yellow-400" },
      { icon: Wifi, text: "High-Speed Internet", color: "text-purple-400" },
    ],
    learnMoreLink: "/models/luxury"
  },
  {
    name: "Adventure Class",
    image: "/lovable-uploads/2935caf5-f345-40a6-8676-0f20817c6d6e.png",
    price: "Starting From $50,000",
    description: "Built for the modern explorer, combining durability with smart technology for off-grid adventures.",
    features: [
      { icon: Battery, text: "Solar Power Integration", color: "text-yellow-400" },
      { icon: Shield, text: "All-Terrain Monitoring", color: "text-emerald-400" },
      { icon: Navigation, text: "Off-Road Navigation", color: "text-blue-400" },
      { icon: Wifi, text: "Satellite Connectivity", color: "text-purple-400" },
    ],
    learnMoreLink: "/models/adventure"
  },
  {
    name: "Compact Smart",
    image: "/lovable-uploads/e6619d24-bebf-439f-96b0-6aca2fb69380.png",
    price: "Starting From $20,000",
    description: "Perfect for weekend getaways, packed with smart features in an efficient, easy-to-maneuver package.",
    features: [
      { icon: Navigation, text: "City-Optimized Navigation", color: "text-blue-400" },
      { icon: Battery, text: "Efficient Power Management", color: "text-yellow-400" },
      { icon: Shield, text: "Smart Security System", color: "text-emerald-400" },
      { icon: Wifi, text: "4G/5G Connectivity", color: "text-purple-400" },
    ],
    learnMoreLink: "/models/compact"
  }
];

const Models = () => {
  const { toast } = useToast();

  const handleCompareModels = () => {
    window.location.href = '/models/compare';
  };

  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-16"
      >
        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-white mb-6">Our Models</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our range of luxury smart RVs, each designed to provide the ultimate blend of comfort and innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {models.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700 group hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{model.name}</h2>
                  <p className="text-blue-400 font-medium mb-4">{model.price}</p>
                  <p className="text-gray-300 mb-6">{model.description}</p>
                  <div className="space-y-3 mb-6">
                    {model.features.map((feature) => (
                      <div key={feature.text} className="flex items-center gap-2">
                        <feature.icon className={`w-5 h-5 ${feature.color}`} />
                        <span className="text-gray-300">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={model.learnMoreLink}>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <Link to="/models/compare">
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-blue-500/50 hover:text-white"
              >
                Compare All Models <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Models;
