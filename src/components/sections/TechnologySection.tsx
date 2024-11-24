import { motion } from "framer-motion";
import { Lock, Phone, Mic, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

const systems = [
  {
    icon: Lock,
    name: "Smart Security",
    description: "Advanced security systems with remote monitoring and smart locks",
    image: "/lovable-uploads/smart-security.jpg"
  },
  {
    icon: Phone,
    name: "Remote Control",
    description: "Control all RV systems from your smartphone",
    image: "/lovable-uploads/remote-control.jpg"
  },
  {
    icon: Mic,
    name: "Voice Control",
    description: "Hands-free control with virtual assistant integration",
    image: "/lovable-uploads/voice-control.jpg"
  },
  {
    icon: Utensils,
    name: "Smart Kitchen",
    description: "Connected appliances with remote monitoring",
    image: "/lovable-uploads/smart-kitchen.jpg"
  },
];

export const TechnologySection = () => (
  <section className="py-24 px-4 bg-gradient-to-br from-[#2A2A4A] to-[#1A1A2F] relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475')] opacity-5 bg-cover bg-fixed" />
    <div className="max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-white/10 text-white rounded-full">
          Smart Systems
        </span>
        <h2 className="text-4xl font-bold mb-4 text-white">Cutting-Edge Technology</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Advanced systems for a smarter, more comfortable journey
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {systems.map((system, index) => (
          <motion.div
            key={system.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="p-8">
              <system.icon className="w-16 h-16 mb-4 text-blue-400" />
              <h3 className="text-2xl font-bold mb-2 text-white">{system.name}</h3>
              <p className="text-gray-300 mb-4">{system.description}</p>
              <Button variant="outline" className="bg-white/5 text-white border-white/20 hover:bg-white/10 transition-colors">
                Learn More
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);