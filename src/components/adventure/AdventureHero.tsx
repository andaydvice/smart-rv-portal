import { motion } from "framer-motion";

const AdventureHero = () => {
  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <img 
        src="/lovable-uploads/ae14102b-cf2e-443b-a722-7fe364e92e36.png"
        alt="Line up of luxury adventure RVs"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white mb-4 mt-[20%]"
        >
          Ultimate Adventure Vehicles
        </motion.h1>
      </div>
    </div>
  );
};

export default AdventureHero;