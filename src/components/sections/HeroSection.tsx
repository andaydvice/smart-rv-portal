
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Ensure component is always visible with enhanced fallback
  useEffect(() => {
    console.log("HeroSection mounted");
    
    // Force visibility on section immediately
    if (sectionRef.current) {
      sectionRef.current.style.visibility = 'visible';
      sectionRef.current.style.opacity = '1';
      sectionRef.current.style.display = 'block';
    }
    
    // Force re-render once after mount to ensure visibility
    setTimeout(() => {
      setRenderKey(prev => prev + 1);
      
      // Make sure all elements are visible
      document.querySelectorAll('.hero-section, .hero-section *, h1, p, button, a, img')
        .forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.display = el.style.display === 'none' ? 'block' : el.style.display;
          }
        });
    }, 100);
    
    // Additional visibility enforcement after a longer delay
    setTimeout(() => {
      if (!imageLoaded && imageRef.current) {
        console.log("Forcing image load");
        // Force image load with timestamp to bypass cache
        if (retryCount < 3) {
          setRetryCount(prev => prev + 1);
          imageRef.current.src = `/lovable-uploads/f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png?retry=${Date.now()}`;
        } else {
          // If image still fails, mark as loaded anyway to show fallback
          setImageLoaded(true);
        }
      }
    }, 1000);

    // Explicitly set loaded to true after timeout to prevent perpetual loading
    const fallbackTimer = setTimeout(() => {
      if (!imageLoaded) {
        console.log("Using fallback for hero image");
        setImageLoaded(true);
      }
    }, 3000);
    
    return () => {
      console.log("HeroSection unmounted");
      clearTimeout(fallbackTimer);
    };
  }, [imageLoaded, retryCount]);

  return (
    <section 
      ref={sectionRef}
      key={renderKey} 
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ visibility: 'visible', opacity: 1, display: 'block' }}
    >
      <div className="absolute inset-0">
        {/* Use a background color as fallback while image loads */}
        <div className="w-full h-full bg-gray-800"></div>
        
        <img
          ref={imageRef}
          src="/lovable-uploads/f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png"
          alt="Luxury RV interior with panoramic windows and modern design"
          className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="eager"
          onLoad={() => {
            console.log("Hero image loaded");
            setImageLoaded(true);
          }}
          onError={(e) => {
            console.error("Hero image failed to load", e);
            // Try one more time with cache-busting
            if (retryCount < 3 && e.currentTarget) {
              setRetryCount(prev => prev + 1);
              e.currentTarget.src = `/lovable-uploads/f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png?retry=${Date.now()}`;
            } else {
              // Still mark as loaded to show the fallback
              setImageLoaded(true);
            }
          }}
          style={{ visibility: 'visible', display: 'block' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>
      <div
        className="relative text-center text-white px-4 max-w-5xl mx-auto"
        style={{ visibility: 'visible', display: 'block', opacity: 1 }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-xl -bottom-8" />
        <h1 
          className="text-6xl md:text-7xl font-bold mb-8 leading-tight relative z-10"
          style={{ visibility: 'visible', display: 'block', opacity: 1 }}
        >
          The Future of <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Luxury Travel
          </span>
        </h1>
        <p 
          className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-gray-200 relative z-10"
          style={{ visibility: 'visible', display: 'block', opacity: 1 }}
        >
          Experience unparalleled luxury and innovation with cutting edge smart technology
        </p>
        <div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10"
          style={{ visibility: 'visible', display: 'block', opacity: 1 }}
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
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </section>
  );
};
