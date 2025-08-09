
import { Mic } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="hero-section">
      <img 
        src="/lovable-uploads/ff43ed8a-b7cd-42f7-a45e-a3a706d39d07.png"
        alt="Futuristic RV interior with smart display and mountain view"
        className="hero-image"
      />
      <div className="absolute inset-0 bg-black/60" /> {/* Darkened overlay for better text contrast */}
      
      <div className="hero-content text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 p-4 bg-black/50 backdrop-blur-sm rounded-lg text-white image-overlay-headline">
          Voice Control for Smart RVs
        </h1>
        <p className="text-xl text-white/90 mb-12 p-4 bg-black/50 backdrop-blur-sm rounded-lg max-w-4xl mx-auto">
          Experience smart RV living's future: Voice control technology for hands-free intelligent system operation
        </p>
        {/* MODIFIED: Removed the button below */}
        {/* 
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
          <Mic className="w-6 h-6" />
          Start Voice Control
        </button> 
        */}
      </div>
    </section>
  );
};

