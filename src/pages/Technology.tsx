import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cpu, Wifi, Battery, Shield, Smartphone, Bot, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const technologies = [
  {
    icon: Cpu,
    title: "AI Integration",
    description: "Advanced artificial intelligence systems for smart automation and personalized experiences",
    color: "text-cyan-400"
  },
  {
    icon: Wifi,
    title: "Connected Systems",
    description: "Seamless integration of all RV components through our proprietary network",
    color: "text-blue-400"
  },
  {
    icon: Battery,
    title: "Smart Power",
    description: "Intelligent power management with solar integration and battery optimization",
    color: "text-green-400"
  },
  {
    icon: Shield,
    title: "Security Suite",
    description: "State-of-the-art security systems with biometric access and 24/7 monitoring",
    color: "text-purple-400"
  },
  {
    icon: Smartphone,
    title: "Mobile Control",
    description: "Complete control of your RV through our intuitive mobile application",
    color: "text-pink-400"
  },
  {
    icon: Bot,
    title: "Automation",
    description: "Smart automation for climate, lighting, and entertainment systems",
    color: "text-orange-400"
  }
];

const Technology = () => {
  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-white mb-6">Our Technology</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the cutting-edge technologies that power our smart RVs
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
                  Our smart RVs combine cutting edge technology with luxurious comfort to create the ultimate travel experience
                </p>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  Schedule a Demo <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Technology;