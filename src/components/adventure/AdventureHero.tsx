import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AdventureHero = () => {
  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <img 
        src="/lovable-uploads/ae14102b-cf2e-443b-a722-7fe364e92e36.png"
        alt="Line up of luxury adventure RVs"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute top-8 left-0 w-full px-4">
        <div className="container mx-auto">
          <Button 
            variant="outline" 
            className="bg-white/10 backdrop-blur-sm text-white hover:text-white hover:bg-white/20 active:bg-white/30 border-blue-400"
            onClick={() => window.location.href = '/models'}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Models
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white"
        >
          Ultimate Adventure Vehicles
        </motion.h1>
      </div>
    </div>
  );
};

export default AdventureHero;