import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const LuxuryHero = () => {
  const navigate = useNavigate();

  const handleNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("[LuxuryHero] Navigation attempt started");
    console.log("[LuxuryHero] Current location:", window.location.pathname);
    console.log("[LuxuryHero] Target location: /models");
    
    try {
      navigate("/models");
      console.log("[LuxuryHero] Navigation successful");
    } catch (error) {
      console.error("[LuxuryHero] Navigation failed:", error);
    }
  };

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <img
        src="/lovable-uploads/a6b26445-5849-4005-aae6-58d278afb447.png"
        alt="Luxury Class RV with slide-out in mountain setting at sunset"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
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
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
        <h1 className="text-5xl font-bold text-white mb-4">
          Luxury RV Living
        </h1>
      </div>
    </div>
  );
};