
import { Mic } from "lucide-react";
import { useEffect } from "react";

export const HeroSection = () => {
  useEffect(() => {
    // Force visibility of hero section on mount
    const heroSection = document.querySelector('section.h-screen');
    if (heroSection) {
      (heroSection as HTMLElement).style.display = 'flex';
      (heroSection as HTMLElement).style.visibility = 'visible';
      (heroSection as HTMLElement).style.opacity = '1';
    }
    
    // Force visibility of the background image
    const backgroundImg = document.querySelector('section.h-screen img');
    if (backgroundImg) {
      (backgroundImg as HTMLElement).style.display = 'block';
      (backgroundImg as HTMLElement).style.visibility = 'visible';
      (backgroundImg as HTMLElement).style.opacity = '1';
    }
  }, []);

  return (
    <section className="h-screen w-full relative overflow-hidden flex items-center justify-center" style={{display: 'flex', visibility: 'visible', opacity: 1}}>
      <div className="absolute top-0 left-0 w-full h-full">
        <img 
          src="/lovable-uploads/ff43ed8a-b7cd-42f7-a45e-a3a706d39d07.png"
          alt="Futuristic RV interior with smart display and mountain view"
          className="w-full h-full object-cover"
          style={{ display: 'block', visibility: 'visible', opacity: 1 }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-4 z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 p-4 bg-black/30 backdrop-blur-sm rounded-lg">
            Voice Control for Smart RVs
          </h1>
          <p className="text-xl text-white/90 mb-12 p-4 bg-black/30 backdrop-blur-sm rounded-lg">
            Experience RV living's future: Voice control technology for hands-free system operation
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
            <Mic className="w-6 h-6" />
            Start Voice Control
          </button>
        </div>
      </div>
    </section>
  );
};
