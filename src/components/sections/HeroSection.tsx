
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { HighQualityHeroImage } from "@/components/ui/OptimizedImage";


export const HeroSection = () => {

  return (
    <section className="relative w-full min-h-screen overflow-hidden -mt-16 pt-16">
      {/* Full width image container - HIGH-QUALITY OPTIMIZED IMAGE with SEO */}
      <div className="absolute inset-0 left-0 right-0">
        <HighQualityHeroImage
          src="f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png"
          width={1920}
          height={1080}
          sizes="100vw"
          className="h-full w-full object-cover"
          // Alt text auto-generated from SEO mapping:
          // "Luxury smart RV interior with panoramic windows, modern intelligent design, and advanced technology systems"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      {/* Content positioned within the container */}
      <Container className="relative z-10 h-full">
        <motion.div
          initial={false}
          className="flex items-center justify-center h-screen text-center"
        >
          <div className="space-y-8 max-w-3xl mx-auto">
            <motion.h1 
              className="text-6xl md:text-7xl font-bold leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                Revolutionising
              </span> <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                Smart RV Travel
              </span>
            </motion.h1>
            <motion.p 
               className="text-xl md:text-2xl mb-12 text-gray-200"
            >
              Experience unparalleled smart RV luxury and innovation with cutting edge intelligent technology
            </motion.p>
            <motion.div 
               className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link to="/calculators">
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Calculate ROI
                </Button>
              </Link>
              <Link to="/features">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white bg-transparent hover:bg-blue-500 hover:border-blue-500 hover:text-white text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  See Smart Features
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
