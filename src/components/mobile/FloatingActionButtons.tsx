import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import VoiceSearch from './VoiceSearch';
import { 
  Plus, Mic, Calculator, Phone, Search, 
  MessageCircle, X, Zap 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface FloatingActionButtonsProps {
  className?: string;
}

const FloatingActionButtons = ({ className = "" }: FloatingActionButtonsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: <Calculator className="h-5 w-5" />,
      label: "Calculator",
      action: () => navigate('/calculators'),
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Emergency",
      action: () => navigate('/rv-emergency-center'),
      color: "bg-red-600 hover:bg-red-700"
    },
    {
      icon: <Mic className="h-5 w-5" />,
      label: "Voice Search",
      action: () => setShowVoiceSearch(true),
      color: "bg-purple-600 hover:bg-purple-700"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      label: "Solar Guide",
      action: () => navigate('/solar-power-guide'),
      color: "bg-yellow-600 hover:bg-yellow-700"
    }
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  return (
    <>
      <div className={cn(
        "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3",
        "md:hidden", // Only show on mobile
        className
      )}>
        {/* Quick Action Buttons */}
        {isExpanded && (
          <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-2 duration-200">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                onClick={() => {
                  action.action();
                  setIsExpanded(false);
                }}
                className={cn(
                  "h-12 w-12 rounded-full shadow-lg touch-manipulation",
                  "transition-all duration-200 active:scale-95",
                  action.color
                )}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {action.icon}
                <span className="sr-only">{action.label}</span>
              </Button>
            ))}
            
            {/* Action Labels */}
            <div className="absolute right-16 top-0 flex flex-col gap-2 pointer-events-none">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap h-12 flex items-center"
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  {action.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main FAB */}
        <Button
          onClick={toggleExpanded}
          className={cn(
            "h-14 w-14 rounded-full shadow-xl touch-manipulation",
            "bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white",
            "transition-all duration-300 active:scale-95",
            isExpanded && "rotate-45"
          )}
        >
          {isExpanded ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </Button>

        {/* Background Overlay */}
        {isExpanded && (
          <div
            className="fixed inset-0 bg-black/20 -z-10"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </div>

      {/* Voice Search Modal */}
      {showVoiceSearch && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <VoiceSearch
              onClose={() => setShowVoiceSearch(false)}
              onSearch={(query) => {
                // Voice search query received
                setShowVoiceSearch(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingActionButtons;