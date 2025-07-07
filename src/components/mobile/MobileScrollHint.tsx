import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface MobileScrollHintProps {
  targetSection?: string;
  text?: string;
  className?: string;
}

const MobileScrollHint = ({ 
  targetSection, 
  text = "Scroll to explore more", 
  className = "" 
}: MobileScrollHintProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsVisible(!scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (targetSection) {
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      window.scrollBy({
        top: window.innerHeight * 0.8,
        behavior: 'smooth'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`md:hidden fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 ${className}`}>
      <button
        onClick={handleClick}
        className="
          flex flex-col items-center gap-2 
          bg-[#5B9BD5]/90 
          backdrop-blur-sm 
          text-white 
          px-4 py-3 
          rounded-full 
          shadow-lg 
          touch-manipulation
          active:scale-95
          transition-all
          duration-200
          border border-white/20
        "
      >
        <span className="text-xs font-medium">{text}</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </button>
    </div>
  );
};

export default MobileScrollHint;