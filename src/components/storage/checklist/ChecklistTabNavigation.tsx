
import React from 'react';
import { TabsList } from "@/components/ui/tabs";
import ChecklistTabTrigger from "./ChecklistTabTrigger";

interface ChecklistTabNavigationProps {
  onTabClick: () => void;
}

const ChecklistTabNavigation: React.FC<ChecklistTabNavigationProps> = ({ onTabClick }) => {
  return (
    <div className="overflow-x-auto no-scrollbar -mx-2 px-2 pb-1">
      <TabsList className="storage-preparation-checklist mb-6 grid grid-cols-5 md:grid-cols-10 min-w-[600px] gap-1">
        <ChecklistTabTrigger 
          value="rv-info" 
          icon="Clipboard"
          label="RV Info"
          onTabClick={onTabClick}
        />
        <ChecklistTabTrigger 
          value="interior" 
          icon="Home"
          label="Interior"
          onTabClick={onTabClick}
        />
        <ChecklistTabTrigger 
          value="exterior" 
          icon="Warehouse"
          label="Exterior"
          onTabClick={onTabClick}
        />
        <ChecklistTabTrigger 
          value="mechanical" 
          icon="Wrench"
          label="Mechanical"
          onTabClick={onTabClick}
        />
        <ChecklistTabTrigger 
          value="electrical" 
          icon="Zap"
          label="Electrical"
          onTabClick={onTabClick}
        />
        <ChecklistTabTrigger 
          value="plumbing" 
          icon="Droplets"
          label="Plumbing"
          onTabClick={onTabClick}
        />
        <ChecklistTabTrigger 
          value="tires" 
          icon="Disc"
          label="Tires"
          onTabClick={onTabClick}
        />
        <ChecklistTabTrigger 
          value="pest-control" 
          icon="Bug"
          label="Pest Control"
          onTabClick={onTabClick}
        />
        <ChecklistTabTrigger 
          value="security" 
          icon="ShieldCheck"
          label="Security"
          onTabClick={onTabClick}
        />
        <ChecklistTabTrigger 
          value="notes" 
          icon="FileText"
          label="Notes"
          onTabClick={onTabClick}
        />
      </TabsList>
    </div>
  );
};

export default ChecklistTabNavigation;
