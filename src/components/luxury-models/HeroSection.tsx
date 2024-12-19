import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <img
        src="/lovable-uploads/9f7333b9-367c-48a8-b1db-ddf01cadf706.png"
        alt="Luxury RV with outdoor setup by the lake at sunset"
        className="w-full h-full object-cover"
        loading="eager"
        fetchpriority="high"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute top-20 left-0 w-full px-4">
        <div className="container mx-auto">
          <Link to="/models">
            <Button 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm text-white hover:text-white hover:bg-white/20 active:bg-white/30 border-blue-400"
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