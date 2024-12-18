import { motion } from "framer-motion";

const AdventureHero = () => {
  return (
    <div className="relative w-full h-[50vh]">
      <img 
        src="/lovable-uploads/ae14102b-cf2e-443b-a722-7fe364e92e36.png"
        alt="Line up of luxury adventure RVs"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1B2028] flex items-end">
        <div className="container mx-auto pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Ultimate Adventure Vehicles
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AdventureHero;