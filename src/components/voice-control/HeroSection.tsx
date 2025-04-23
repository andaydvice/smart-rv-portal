
import { Mic } from "lucide-react";
import { LazyImage } from "@/components/ui/LazyImage";
import { useEffect } from "react";
import { preloadCriticalImages } from "@/utils/performance";

export const HeroSection = () => {
  useEffect(() => {
    // Preload this critical image
    preloadCriticalImages(["/lovable-uploads/ff43ed8a-b7cd-42f7-a45e-a3a706d39d07.png"]);
  }, []);

  return (
    <section className="h-screen w-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <LazyImage 
          src="/lovable-uploads/ff43ed8a-b7cd-42f7-a45e-a3a706d39d07.png"
          alt="Futuristic RV interior with smart display and mountain view"
          className="w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%23000000'/%3E%3C/svg%3E"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-4">
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
