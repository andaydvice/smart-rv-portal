import { motion } from "framer-motion";
import { Car, Shield, Wifi, Battery, Navigation, Tv } from "lucide-react";

const features = [
  {
    icon: Car,
    title: "Smart Navigation",
    description: "AI-powered route planning and real-time traffic updates",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
  },
  {
    icon: Shield,
    title: "Advanced Security",
    description: "24/7 monitoring and smart lock system for peace of mind",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
  },
  {
    icon: Wifi,
    title: "Always Connected",
    description: "High-speed internet and smart device integration",
    image: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  },
  {
    icon: Battery,
    title: "Power Management",
    description: "Solar integration and intelligent energy distribution",
  },
  {
    icon: Navigation,
    title: "Autopilot Ready",
    description: "Advanced driver assistance for safer journeys",
  },
  {
    icon: Tv,
    title: "Entertainment Suite",
    description: "Smart TV and premium audio systems",
  },
];

export const FeaturesSection = () => (
  <section className="py-32 px-4 bg-[#1A1A2F] bg-opacity-98 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('/lovable-uploads/03ccf137-16cb-41a0-bfb5-2179fe20eb79.png')] opacity-10 bg-cover bg-center" />
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-white/10 text-white rounded-full">
            Smart Features
          </span>
          <h2 className="text-5xl font-bold mb-6 text-white">
            Intelligent Living on Wheels
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the perfect blend of comfort and innovation
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <feature.icon className="w-12 h-12 mb-6 text-blue-400" />
            <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
