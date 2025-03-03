
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          ref={imageRef}
          src="/lovable-uploads/f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png"
          alt="Luxury RV interior with panoramic windows and modern design"
          className="w-full h-full object-cover"
          loading="eager"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Hero content */}
      <div className="relative text-center text-white px-4 max-w-3xl mx-auto mt-16">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 leading-tight">
          The Future of <br />
          <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Luxury Travel
          </span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Experience unparalleled luxury and innovation with cutting edge smart technology
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/schedule-demo">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6"
            >
              Schedule Demo
            </Button>
          </Link>
          <Link to="/models">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10 rounded-full px-8 py-6"
            >
              Explore Models
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
