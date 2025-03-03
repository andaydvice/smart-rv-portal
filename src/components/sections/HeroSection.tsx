
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // If the image is already in browser cache, it might not trigger onLoad
    if (imageRef.current && imageRef.current.complete) {
      setImageLoaded(true);
    }
  }, []);

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
          style={{ opacity: 1, visibility: "visible" }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Hero content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative text-center text-white px-4 max-w-3xl mx-auto mt-16"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
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
      </motion.div>
    </section>
  );
};
