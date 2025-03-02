
import React from 'react';
import { TabsTrigger } from "@/components/ui/tabs";
import { Info, ExternalLink, Home, Droplets, Zap, Settings, CircleDashed, Bug, Lock, FileText } from "lucide-react";

interface ChecklistTabTriggerProps {
  value: string;
  icon?: string;
  label: string;
  iconColor?: string;
  progress?: number;
  total?: number;
  onTabClick?: () => void; // Tab click handler
}

const ChecklistTabTrigger: React.FC<ChecklistTabTriggerProps> = ({ 
  value, 
  icon, 
  label,
  iconColor,
  onTabClick
}) => {
  // Map labels to specific colors exactly as shown in the image
  let specificIconColor = "";
  
  switch(label) {
    case "RV Info":
      specificIconColor = "#5B9BD5"; // Blue
      break;
    case "Exterior":
      specificIconColor = "#00C29A"; // Green
      break;
    case "Interior":
      specificIconColor = "#FFA500"; // Orange
      break;
    case "Plumbing":
      specificIconColor = "#4B8FE3"; // Blue
      break;
    case "Electrical":
      specificIconColor = "#FF4444"; // Red
      break;
    case "Mechanical":
      specificIconColor = "#9853E0"; // Purple
      break;
    case "Tires":
      specificIconColor = "#FF5E93"; // Pink
      break;
    case "Pest Control":
      specificIconColor = "#06B6D4"; // Cyan
      break;
    case "Security":
      specificIconColor = "#FF9D00"; // Orange
      break;
    case "Notes":
      specificIconColor = "#5B9BD5"; // Blue
      break;
    default:
      specificIconColor = "#5B9BD5"; // Default blue
  }

  // Handle tab click to trigger save
  const handleTabClick = () => {
    if (onTabClick) {
      console.log(`Tab ${label} clicked - triggering save`);
      onTabClick();
    }
  };
  
  // Render the correct icon based on the icon prop
  const renderIcon = () => {
    switch(icon) {
      case "Info":
        return <Info className="h-6 w-6" stroke={specificIconColor} strokeWidth={2} />;
      case "ExternalLink":
        return <ExternalLink className="h-6 w-6" stroke={specificIconColor} strokeWidth={2} />;
      case "Home":
        return <Home className="h-6 w-6" stroke={specificIconColor} strokeWidth={2} />;
      case "Droplets":
        return <Droplets className="h-6 w-6" stroke={specificIconColor} strokeWidth={2} />;
      case "Zap":
        return <Zap className="h-6 w-6" stroke={specificIconColor} strokeWidth={2} />;
      case "Settings":
        return <Settings className="h-6 w-6" stroke={specificIconColor} strokeWidth={2} />;
      case "CircleDashed":
        return <CircleDashed className="h-6 w-6" stroke={specificIconColor} strokeWidth={2} />;
      case "Bug":
        return <Bug className="h-6 w-6" stroke={specificIconColor} strokeWidth={2} />;
      case "Lock":
        return <Lock className="h-6 w-6" stroke={specificIconColor} strokeWidth={2} />;
      case "FileText":
        return <FileText className="h-6 w-6" stroke={specificIconColor} strokeWidth={2} />;
      default:
        return null;
    }
  };
  
  return (
    <TabsTrigger 
      value={value}
      className="flex flex-col items-center justify-center w-full py-4 text-white"
      onClick={handleTabClick}
    >
      <div className="flex flex-col items-center gap-2 justify-center">
        {renderIcon()}
        <span className="text-sm font-medium">{label}</span>
      </div>
    </TabsTrigger>
  );
};

export default ChecklistTabTrigger;
