import { motion } from "framer-motion";
import { Sun, Leaf, MapPin, HeartHandshake } from "lucide-react";

const sustainability = [
  {
    icon: Sun,
    title: "Solar Power",
    description: "Integrated solar panels for sustainable energy",
    image: "/lovable-uploads/solar-power.jpg"
  },
  {
    icon: Leaf,
    title: "Eco-Materials",
    description: "Sustainable materials and manufacturing processes",
    image: "/lovable-uploads/eco-materials.jpg"
  },
  {
    icon: MapPin,
    title: "Green Routes",
    description: "Eco-friendly route planning and charging stations",
    image: "/lovable-uploads/green-routes.jpg"
  },
  {
    icon: HeartHandshake,
    title: "Carbon Neutral",
    description: "Commitment to reducing environmental impact",
    image: "/lovable-uploads/carbon-neutral.jpg"
  },
];

export const SustainabilitySection = () => (
  <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-secondary rounded-full">
          Eco-Friendly
        </span>
        <h2 className="text-4xl font-bold mb-4">Sustainable Innovation</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Leading the way in eco-friendly RV technology
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sustainability.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <item.icon className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);