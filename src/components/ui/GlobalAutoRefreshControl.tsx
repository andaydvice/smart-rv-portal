
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useAutoRefresh } from '@/hooks/useAutoRefresh';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface GlobalAutoRefreshControlProps {
  className?: string;
}

const GlobalAutoRefreshControl: React.FC<GlobalAutoRefreshControlProps> = ({
  className = ''
}) => {
  const { isEnabled, toggle } = useAutoRefresh(true);
  
  if (!isEnabled) return null;
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`refresh-status-indicator p-2 bg-[#5B9BD5] rounded-full cursor-pointer ${className}`}
          onClick={toggle}
        >
          <RefreshCw className="h-4 w-4 text-white animate-spin-slow" />
        </div>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Auto-refresh active</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default GlobalAutoRefreshControl;
