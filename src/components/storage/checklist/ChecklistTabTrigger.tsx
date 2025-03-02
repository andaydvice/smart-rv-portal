
import React from 'react';
import { TabsTrigger } from "@/components/ui/tabs";
import * as LucideIcons from "lucide-react";

interface ChecklistTabTriggerProps {
  value: string;
  icon: keyof typeof LucideIcons;
  label: string;
}

export const ChecklistTabTrigger: React.FC<ChecklistTabTriggerProps> = ({ 
  value, 
  icon, 
  label 
}) => {
  // Use dynamic import to get the specific icon component
  const IconComponent = LucideIcons[icon] as React.ElementType;
  
  return (
    <TabsTrigger 
      value={value} 
      className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white flex items-center gap-1"
    >
      {IconComponent && <IconComponent className="h-3.5 w-3.5" />}
      {label}
    </TabsTrigger>
  );
};
