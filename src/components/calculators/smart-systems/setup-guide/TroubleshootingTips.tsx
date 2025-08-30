
import React, { useRef, useEffect, useState } from "react";
import { Check, Info, ChevronDown } from "lucide-react";
import { createResizeHandler, createViewportObserver } from "@/utils/domPerformance";

interface TroubleshootingTipsProps {
  tips: string[];
}

const TroubleshootingTips = ({ tips }: TroubleshootingTipsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    // Use IntersectionObserver to detect if content overflows
    const observer = createViewportObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.target === scrollContainerRef.current) {
          // Check if content is scrollable by comparing scroll height vs client height
          const container = scrollContainerRef.current;
          if (container) {
            // Use ResizeObserver instead of direct DOM queries to avoid forced reflow
            const resizeObserver = new ResizeObserver((entries) => {
              const entry = entries[0];
              if (entry) {
                const { contentRect } = entry;
                const scrollHeight = container.scrollHeight;
                setShowScrollIndicator(scrollHeight > contentRect.height + 10);
              }
            });
            
            resizeObserver.observe(container);
            
            return () => {
              resizeObserver.disconnect();
            };
          }
        }
      },
      { threshold: [0, 1] }
    );

    observer.observe(scrollContainerRef.current);

    // Create debounced resize handler
    const handleResize = createResizeHandler(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        // Defer the scroll check to avoid forced reflow
        requestAnimationFrame(() => {
          const hasOverflow = container.scrollHeight > container.clientHeight + 10;
          setShowScrollIndicator(hasOverflow);
        });
      }
    }, 100);

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [tips]);

  const handleArrowClick = () => {
    if (scrollContainerRef.current) {
      // Use smooth scrolling without querying dimensions
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative mt-4">
      <div 
        ref={scrollContainerRef}
        className="h-[200px] rounded-md border border-gray-700 p-4 pb-12 overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-yellow-400">
            <Info className="w-4 h-4" />
            <h4 className="font-medium">Troubleshooting Tips</h4>
          </div>
          <ul className="space-y-2">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-100">
                <Check className="w-4 h-4 mt-1 text-green-400" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showScrollIndicator && (
        <button 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-blue-400 animate-bounce cursor-pointer hover:text-blue-300 transition-colors bg-gray-800/50 rounded-full p-1"
          onClick={handleArrowClick}
          style={{ 
            bottom: '20px',
            zIndex: 10
          }}
          aria-label="Scroll to see more tips"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default TroubleshootingTips;
