import React, { useRef } from "react";
import { Check, Info, ChevronDown } from "lucide-react";

interface TroubleshootingTipsProps {
  tips: string[];
}

const TroubleshootingTips = ({ tips }: TroubleshootingTipsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleArrowClick = () => {
    if (scrollContainerRef.current) {
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
        className="h-[200px] rounded-md border border-gray-700 p-4 overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
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
      <div 
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-blue-400 animate-bounce cursor-pointer hover:text-blue-300 transition-colors"
        onClick={handleArrowClick}
      >
        <ChevronDown className="w-5 h-5" />
      </div>
    </div>
  );
};

export default TroubleshootingTips;