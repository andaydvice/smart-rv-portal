
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cpu, Wifi, Battery, Shield, Smartphone, Bot, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import TechnologyFAQ from "@/components/technology/TechnologyFAQ";
import { useEffect } from "react";
import { scrollToTop } from "@/utils/scrollToTop";

const technologies = [
  {
    icon: Cpu,
    title: "AI Integration",
    description:
      "Advanced artificial intelligence systems for smart automation and personalized experiences",
    color: "text-cyan-400",
  },
  {
    icon: Wifi,
    title: "Connected Systems",
    description: "Seamless integration of all RV components through our proprietary network",
    color: "text-blue-400",
  },
  {
    icon: Battery,
    title: "Smart Power",
    description: "Intelligent power management with solar integration and battery optimization",
    color: "text-green-400",
  },
  {
    icon: Shield,
    title: "Security Suite",
    description: "State of the art security systems with biometric access and 24/7 monitoring",
    color: "text-purple-400",
  },
  {
    icon: Smartphone,
    title: "Mobile Control",
    description: "Complete control of your RV through our intuitive mobile application",
    color: "text-pink-400",
  },
  {
    icon: Bot,
    title: "Automation",
    description: "Smart automation for climate, lighting, and entertainment systems",
    color: "text-orange-400",
  },
];

const Technology = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Layout>
      <div className="flex-grow bg-gradient-to-b from-gray-900 to-gray-800">
        {/* Full width container with no padding constraints */}
        <div className="w-full py-10">
          {/* MAIN HEADER IMAGE - full width with proper sizing */}
          <div className="w-full overflow-hidden mb-12 shadow-lg flex justify-center">
            <img
              src="/lovable-uploads/9ad50274-5f5b-47fa-8278-32599d734b3e.png"
              alt="Technology Main Header"
              className="w-full max-w-[1600px]"
              loading="eager"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the cutting edge technologies that power the Smart RVs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <tech.icon className={`w-12 h-12 mb-4 ${tech.color}`} />
                <h3 className="text-xl font-bold text-white mb-2">{tech.title}</h3>
                <p className="text-gray-300">{tech.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Insert FAQ section here */}
          <TechnologyFAQ />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <img
              src="/lovable-uploads/db5f9104-32a0-458f-a2ca-5ecb38415ec9.png"
              alt="Technology Overview"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent flex items-center justify-center">
              <div className="text-center p-8">
                <h2 className="text-3xl font-bold text-white mb-4">Experience the Future Today</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                  Our smart RVs combine cutting edge technology with luxurious comfort to create
                  the ultimate travel experience
                </p>
                <Link to="/schedule-demo">
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    Schedule a Demo <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Technology;
