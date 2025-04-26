
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface LuxuryHeroProps {
  handleNavigation: (e: React.MouseEvent) => void;
}

export const LuxuryHero = ({ handleNavigation }: LuxuryHeroProps) => {
  return (
    <section className="hero-section">
      <img
        src="/lovable-uploads/Luxury-Class-RVs-min.jpg"
        alt="Luxury RV exterior"
        className="hero-image"
      />
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="hero-content">
        <Button
          variant="outline"
          onClick={handleNavigation}
          className="absolute top-24 left-4 md:left-8 bg-white/10 text-white border-white/20 hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Models
        </Button>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          Luxury RV Models
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto">
          Experience unparalleled comfort and sophistication with our premium luxury RV lineup
        </p>
      </div>
    </section>
  );
};
