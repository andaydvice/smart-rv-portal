import { motion } from "framer-motion";

export const TechnologyHeader = () => (
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
    <h2 className="text-4xl font-bold mb-4 text-white">Cutting Edge Smart RV Technology</h2>
    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
      Advanced systems for a smarter, more comfortable smart RV journey
    </p>
  </motion.div>
);