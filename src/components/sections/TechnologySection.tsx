import { motion } from "framer-motion";
import { Lock, Phone, Mic, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const systems = [
  {
    icon: Lock,
    name: "Smart Security",
    description: "Advanced security systems with remote monitoring and smart locks",
    image: "/lovable-uploads/smart-security.jpg",
    link: "/features/security"
  },
  {
    icon: Phone,
    name: "Connectivity",
    description: "Stay connected with high-speed internet and mobile optimization",
    image: "/lovable-uploads/connectivity.jpg",
    link: "/features/internet"
  },
  {
    icon: Mic,
    name: "Voice Control",
    description: "Control your RV systems with simple voice commands",
    image: "/lovable-uploads/voice-control.jpg",
    link: "/features/audio"
  },
  {
    icon: Utensils,
    name: "Smart Kitchen",
    description: "Modern kitchen appliances with smart controls and monitoring",
    image: "/lovable-uploads/smart-kitchen.jpg",
    link: "/features/smart-kitchen"
  }
];

export const TechnologySection = () => {
  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
          >
            Smart Systems Integration
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Experience the future of RV living with our integrated smart systems
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {systems.map((system, index) => (
            <motion.div
              key={system.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-xl p-6 text-center hover:bg-gray-800/70 transition-colors"
            >
              <div className="flex flex-col items-center">
                <system.icon className="w-16 h-16 mb-4 text-blue-400" />
                <h3 className="text-2xl font-bold mb-2 text-white">{system.name}</h3>
                <p className="text-gray-300 mb-4">{system.description}</p>
                <Link to={system.link}>
                  <Button variant="outline" className="bg-white/5 text-white border-white/20 hover:bg-white/10 transition-colors">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};