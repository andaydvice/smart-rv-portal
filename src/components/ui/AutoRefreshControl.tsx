
import React from 'react';
import { RefreshCw, RefreshCcw } from 'lucide-react';
import { useAutoRefresh } from '@/hooks/useAutoRefresh';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

interface AutoRefreshControlProps {
  className?: string;
  initialEnabled?: boolean;
}

const AutoRefreshControl: React.FC<AutoRefreshControlProps> = ({
  className = '',
  initialEnabled = true
}) => {
  const { isEnabled, toggle } = useAutoRefresh(initialEnabled);
  const { toast } = useToast();
  
  const handleToggle = () => {
    const newState = toggle();
    
    toast({
      title: newState ? "Auto-refresh enabled" : "Auto-refresh disabled",
      description: newState 
        ? "Preview will refresh automatically when changes are detected" 
        : "Preview will need to be refreshed manually",
      duration: 2000
    });
  };
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={isEnabled ? "default" : "outline"}
          size="sm"
          onClick={handleToggle}
          className={`${className} ${isEnabled ? 'bg-[#5B9BD5] hover:bg-[#4B8FE3]' : 'border-gray-700 bg-[#131a2a]'}`}
        >
          {isEnabled ? (
            <RefreshCw className={`h-4 w-4 ${isEnabled ? 'animate-spin-slow' : ''}`} />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
          <span className="ml-2 hidden sm:inline">
            {isEnabled ? "Auto-refresh on" : "Auto-refresh off"}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isEnabled ? 'Disable' : 'Enable'} auto-refresh</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default AutoRefreshControl;
