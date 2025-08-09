
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { useEffect } from "react";

export const HeroSection = () => {
  // Preload hero image as soon as the component mounts
  useEffect(() => {
    const heroImageSrc = '/lovable-uploads/f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png';
    
    // Method 1: Create high priority preload link
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = heroImageSrc;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
    
    // Method 2: Use Image constructor for immediate loading
    const preloadImage = new Image();
    preloadImage.src = heroImageSrc;
    preloadImage.fetchPriority = 'high';
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Full width image container */}
      <div className="absolute inset-0 left-0 right-0">
        <img
          src="/lovable-uploads/f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png"
          alt="Luxury Smart RV interior with panoramic windows and modern intelligent design"
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      {/* Content positioned within the container */}
      <Container className="relative z-10 h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center h-screen text-center"
        >
          <div className="space-y-8 max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-6xl md:text-7xl font-bold leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                The Future of
              </span> <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                Smart RV Travel
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl md:text-2xl mb-12 text-gray-200"
            >
              Experience unparalleled smart RV luxury and innovation with cutting edge intelligent technology
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link to="/schedule-demo">
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Schedule Demo
                </Button>
              </Link>
              <Link to="/models">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white bg-transparent hover:bg-blue-500 hover:border-blue-500 hover:text-white text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Explore Models
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </section>
  );
};
