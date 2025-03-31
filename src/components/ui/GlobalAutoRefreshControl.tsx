
import React, { useState } from 'react';
import { RefreshCw, RefreshCwOff } from 'lucide-react';
import { useAutoRefresh } from '@/hooks/useAutoRefresh';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

interface GlobalAutoRefreshControlProps {
  className?: string;
}

const GlobalAutoRefreshControl: React.FC<GlobalAutoRefreshControlProps> = ({
  className = ''
}) => {
  const { isEnabled, toggle } = useAutoRefresh(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleToggle = () => {
    const newState = toggle();
    toast(
      newState ? 'Auto-refresh enabled' : 'Auto-refresh disabled',
      { 
        duration: 3000,
        position: 'bottom-right'
      }
    );
  };
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`refresh-status-indicator p-2 ${isEnabled ? 'bg-[#5B9BD5]' : 'bg-gray-600'} rounded-full cursor-pointer transition-all hover:scale-110 ${isHovered ? 'shadow-lg' : ''} ${className}`}
          onClick={handleToggle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isEnabled ? (
            <RefreshCw className="h-4 w-4 text-white animate-spin-slow" />
          ) : (
            <RefreshCwOff className="h-4 w-4 text-white" />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>{isEnabled ? 'Auto-refresh active' : 'Auto-refresh disabled'}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default GlobalAutoRefreshControl;
