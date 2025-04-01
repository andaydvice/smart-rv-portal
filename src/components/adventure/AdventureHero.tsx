
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { TypographyH1 } from "@/components/ui/typography";

const AdventureHero = () => {
  console.log("[AdventureHero] Component rendered");
  const navigate = useNavigate();
  console.log("[AdventureHero] useNavigate hook initialized");

  const handleNavigation = () => {
    console.log("[AdventureHero] Navigation attempt started");
    console.log("[AdventureHero] Current location:", window.location.pathname);
    console.log("[AdventureHero] Target location: /models");
    
    try {
      navigate("/models");
      console.log("[AdventureHero] Navigation function called successfully");
    } catch (error) {
      console.error("[AdventureHero] Navigation error:", error);
    }
  };

  return (
    <div 
      className="relative w-full h-[60vh] overflow-hidden"
      onClick={(e) => {
        console.log("[AdventureHero] Container clicked, target:", e.target);
      }}
    >
      <img 
        src="/lovable-uploads/ae14102b-cf2e-443b-a722-7fe364e92e36.png"
        alt="Line up of luxury adventure RVs"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <Link to="/models">
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              console.log("[AdventureHero] Hero title button clicked");
              handleNavigation();
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-transparent border-none focus:outline-none"
          >
            <TypographyH1 className="text-5xl font-bold text-white hover:text-blue-400 transition-colors cursor-pointer">
              Ultimate Adventure Vehicles
            </TypographyH1>
          </motion.button>
        </Link>
      </div>
      <div className="absolute top-8 left-0 w-full px-4">
        <div className="container mx-auto">
          <Link to="/models">
            <Button 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm text-white hover:text-white hover:bg-white/20 active:bg-white/30 border-blue-400"
              onClick={(e) => {
                e.preventDefault();
                console.log("[AdventureHero] Top 'Back to Models' button clicked");
                handleNavigation();
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Models
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdventureHero;
