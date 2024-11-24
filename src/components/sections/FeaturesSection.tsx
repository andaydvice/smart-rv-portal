import { motion } from "framer-motion";
import { Car, Shield, Wifi, Battery, Navigation, Tv } from "lucide-react";

const features = [
  {
    icon: Car,
    title: "Smart Navigation",
    description: "AI-powered route planning and real-time traffic updates",
    image: "/lovable-uploads/50e7b0c3-9d9a-4dae-bdb8-4c237aa4e3fe.png"
  },
  {
    icon: Shield,
    title: "Advanced Security",
    description: "24/7 monitoring and smart lock system for peace of mind",
  },
  {
    icon: Wifi,
    title: "Always Connected",
    description: "High-speed internet and smart device integration",
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
  <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-secondary rounded-full">
            Smart Features
          </span>
          <h2 className="text-4xl font-bold mb-4">
            Intelligent Living on Wheels
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
            className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <feature.icon className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);