import { motion } from "framer-motion";

const Models = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Our Models</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Luxury Class</h2>
            <p className="text-gray-300">Premium RVs with all smart features included, designed for the ultimate camping experience.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">Adventure Class</h2>
            <p className="text-gray-300">Rugged and reliable RVs with smart capabilities, perfect for off-grid adventures.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Models;