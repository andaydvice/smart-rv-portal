
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { TypographyH1 } from "@/components/ui/typography";

interface LuxuryHeroProps {
  handleNavigation: (e: React.MouseEvent) => void;
}

export const LuxuryHero = ({ handleNavigation }: LuxuryHeroProps) => {
  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <img
        src="/lovable-uploads/Luxury-Class-RVs-min.jpg"
        alt="Luxury Class RV with slide-out in mountain setting"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
    
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <TypographyH1 className="text-5xl font-bold text-white mb-4">
            Luxury RV Living
          </TypographyH1>
        </motion.div>
      </div>
      <div className="absolute top-8 left-0 w-full px-4">
        <div className="container mx-auto">
          <Link to="/models">
            <Button 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm text-white hover:text-white hover:bg-white/20 active:bg-white/30 border-blue-400"
              onClick={handleNavigation}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Models
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
