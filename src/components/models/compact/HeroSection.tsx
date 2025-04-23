
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { LazyImage } from "@/components/ui/LazyImage";
import { useEffect, useState } from "react";
import { preloadCriticalImages } from "@/utils/performance";

const HeroSection = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    // Preload the next images that will be needed
    preloadCriticalImages(["/lovable-uploads/ad2ac002-7ec7-479f-b437-6bdaced7fc5e.png"]);
  }, []);

  const imageUrl = "/lovable-uploads/598a2cb5-ffcb-440a-9943-6c4440749b9f.png";
  
  return (
    <div className="relative w-full h-[60vh] overflow-hidden bg-gray-900">
      <LazyImage
        src={imageUrl}
        alt="Compact RVs at sunset with campfires and string lights"
        className="w-full h-full object-cover"
        style={{ backgroundColor: '#111827' }}
        sizes="100vw"
        blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23111827'/%3E%3C/svg%3E"
        fetchPriority="high"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4">
        <div className="max-w-2xl w-full text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Compact RVs Guide</h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Discover the perfect compact RV for your adventures
          </p>
        </div>
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
