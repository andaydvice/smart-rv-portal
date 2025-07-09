
import { motion } from "framer-motion";
import { Sun, Leaf, MapPin, HeartHandshake } from "lucide-react";

const sustainability = [
  {
    icon: Sun,
    title: "Solar Power",
    description: "Integrated solar panels for sustainable energy"
  },
  {
    icon: Leaf,
    title: "Eco Materials",
    description: "Sustainable materials and manufacturing processes"
  },
  {
    icon: MapPin,
    title: "Green Routes",
    description: "Eco friendly route planning and charging stations"
  },
  {
    icon: HeartHandshake,
    title: "Carbon Neutral",
    description: "Commitment to reducing environmental impact"
  },
];

export const SustainabilitySection = () => (
  <section className="py-24 px-4 bg-gradient-to-b from-[#1E453E] to-[#0A261F] relative overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/b6a46bec-1ca8-4f7b-89fa-37bb5415d9fa.png')] opacity-10 bg-cover bg-fixed" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E453E]/80 to-[#0A261F]/80" />
    </div>
    <div className="max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-emerald-400/10 text-emerald-300 rounded-full">
          Eco Friendly
        </span>
        <h2 className="text-4xl font-bold mb-4 text-white">Sustainable Innovation</h2>
        <p className="text-lg text-emerald-100/80 max-w-2xl mx-auto">
          Leading the way in eco friendly RV technology
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
            className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-emerald-400/10 hover:border-emerald-400/20 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="p-8">
              <item.icon className="w-12 h-12 mb-4 text-emerald-400" />
              <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
              <p className="text-emerald-100/80">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
