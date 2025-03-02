
import React from 'react';
import { TabsTrigger } from "@/components/ui/tabs";
import { 
  Info, 
  ExternalLink, 
  Home, 
  Droplets, 
  Zap, 
  Settings, 
  CircleDashed, 
  Bug, 
  Lock, 
  FileText 
} from "lucide-react";

interface ChecklistTabTriggerProps {
  value: string;
  icon?: string;
  label: string;
  iconColor?: string;
  progress?: number;
  total?: number;
  onTabClick?: () => void;
}

// Optimize rendering with memo and useMemo/useCallback to prevent unnecessary re-renders
const ChecklistTabTrigger = React.memo(({ 
  value, 
  icon, 
  label,
  onTabClick
}: ChecklistTabTriggerProps) => {
  // Map labels to specific colors - this is a static mapping, so no need for useMemo
  const color = getIconColor(label);
  
  // Optimized click handler using React.useCallback to prevent recreation on render
  const handleTabClick = React.useCallback(() => {
    if (onTabClick) {
      onTabClick();
    }
  }, [onTabClick]);
  
  return (
    <TabsTrigger 
      value={value}
      className="flex flex-col items-center justify-center w-full py-4 text-white"
      onClick={handleTabClick}
    >
      <div className="flex flex-col items-center gap-2 justify-center">
        {renderIconComponent(icon, color)}
        <span className="text-sm font-medium">{label}</span>
      </div>
    </TabsTrigger>
  );
});

// Helper function to get icon color based on label - no need to recreate on each render
function getIconColor(label: string): string {
  switch(label) {
    case "RV Info": return "#5B9BD5"; // Blue
    case "Exterior": return "#00C29A"; // Green
    case "Interior": return "#FFA500"; // Orange
    case "Plumbing": return "#4B8FE3"; // Blue
    case "Electrical": return "#FF4444"; // Red
    case "Mechanical": return "#9853E0"; // Purple
    case "Tires": return "#FF5E93"; // Pink
    case "Pest Control": return "#06B6D4"; // Cyan
    case "Security": return "#FF9D00"; // Orange
    case "Notes": return "#5B9BD5"; // Blue
    default: return "#5B9BD5"; // Default blue
  }
}

// Helper function to render the correct icon component - simplified approach
function renderIconComponent(iconName?: string, color: string = "#5B9BD5") {
  const props = { className: "h-6 w-6", stroke: color, strokeWidth: 2 };

  switch(iconName) {
    case "Info": return <Info {...props} />;
    case "ExternalLink": return <ExternalLink {...props} />;
    case "Home": return <Home {...props} />;
    case "Droplets": return <Droplets {...props} />;
    case "Zap": return <Zap {...props} />;
    case "Settings": return <Settings {...props} />;
    case "CircleDashed": return <CircleDashed {...props} />;
    case "Bug": return <Bug {...props} />;
    case "Lock": return <Lock {...props} />;
    case "FileText": return <FileText {...props} />;
    default: return null;
  }
}

// Add display name for better debugging
ChecklistTabTrigger.displayName = 'ChecklistTabTrigger';

export default ChecklistTabTrigger;
