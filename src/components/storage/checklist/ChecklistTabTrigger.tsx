
import React from 'react';
import { TabsTrigger } from "@/components/ui/tabs";
import * as LucideIcons from "lucide-react";

type IconName = keyof typeof LucideIcons;

interface ChecklistTabTriggerProps {
  value: string;
  icon: IconName;
  label: string;
  iconColor?: string;
}

export const ChecklistTabTrigger: React.FC<ChecklistTabTriggerProps> = ({ 
  value, 
  icon, 
  label,
  iconColor = "#60A5FA" // Default color if not specified
}) => {
  const IconComponent = LucideIcons[icon];
  
  return (
    <TabsTrigger 
      value={value}
      className="data-[state=active]:bg-[#131a2a] data-[state=active]:border-[#5B9BD5] data-[state=active]:border-b-2 py-3 px-4 whitespace-nowrap"
    >
      <div className="flex flex-col items-center gap-1.5">
        <IconComponent className="h-5 w-5" style={{ color: iconColor }} />
        <span className="text-xs font-medium">{label}</span>
      </div>
    </TabsTrigger>
  );
};
