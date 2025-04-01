
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[60vh] overflow-hidden bg-gray-900">
      <img
        src="/lovable-uploads/598a2cb5-ffcb-440a-9943-6c4440749b9f.png"
        alt="Compact RVs at sunset with campfires and string lights"
        className="w-full h-full object-cover"
        loading="lazy"
        style={{ backgroundColor: '#111827' }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <TypographyH1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          Compact RVs Guide
        </TypographyH1>
        <TypographyP className="text-xl md:text-2xl text-gray-200 max-w-2xl">
          Discover the perfect compact RV for your adventures
        </TypographyP>
      </div>
      <div className="absolute top-8 left-0 w-full px-4">
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
    </div>
  );
};

export default HeroSection;
