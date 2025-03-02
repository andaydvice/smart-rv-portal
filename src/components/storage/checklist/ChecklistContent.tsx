
import React, { useEffect, useCallback, useMemo, memo } from 'react';
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import RVInfoTab from './RVInfoTab';
import ExteriorTab from './ExteriorTab';
import InteriorTab from './InteriorTab';
import PlumbingTab from './PlumbingTab';
import ElectricalTab from './ElectricalTab';
import MechanicalTab from './MechanicalTab';
import TiresTab from './TiresTab';
import PestControlTab from './PestControlTab';
import SecurityTab from './SecurityTab';
import NotesTab from './NotesTab';
import ChecklistTabTrigger from "./ChecklistTabTrigger";
import { ChecklistNotes } from './hooks/types';

interface ChecklistContentProps {
  progress: {[key: string]: boolean};
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  notes: ChecklistNotes;
  handleCheckboxChange: (id: string, checked: boolean) => void;
  handleNotesChange: (field: keyof ChecklistNotes, value: string) => void;
  onTabChange?: () => void;
}

// Use memo to prevent unnecessary re-renders
const ChecklistContent: React.FC<ChecklistContentProps> = memo(({
  progress,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  notes,
  handleCheckboxChange,
  handleNotesChange,
  onTabChange
}) => {
  // Track active tab for explicit saving
  const [activeTab, setActiveTab] = React.useState("rv-info");
  
  // Using useMemo to create stable tab configurations
  const tabConfigurations = useMemo(() => [
    { value: "rv-info", icon: "Info", label: "RV Info" },
    { value: "exterior", icon: "ExternalLink", label: "Exterior" },
    { value: "interior", icon: "Home", label: "Interior" },
    { value: "plumbing", icon: "Droplets", label: "Plumbing" },
    { value: "electrical", icon: "Zap", label: "Electrical" },
    { value: "mechanical", icon: "Settings", label: "Mechanical" },
    { value: "tires", icon: "CircleDashed", label: "Tires" },
    { value: "pest-control", icon: "Bug", label: "Pest Control" },
    { value: "security", icon: "Lock", label: "Security" },
    { value: "notes", icon: "FileText", label: "Notes" }
  ], []);
  
  // Optimize with useCallback to prevent recreation on each render
  const handleTabValueChange = useCallback((newValue: string) => {
    console.log(`Tab changed to ${newValue}`);
    
    // First save the current tab's data
    if (onTabChange) {
      onTabChange();
    }
    
    // Change tabs without delay
    setActiveTab(newValue);
  }, [onTabChange]);
  
  // Create a memoized tab click handler 
  const handleTabClick = useCallback(() => {
    if (onTabChange) {
      onTabChange();
    }
  }, [onTabChange]);
  
  // On component mount/unmount, force a save
  useEffect(() => {
    if (onTabChange) {
      console.log("ChecklistContent mounted - initial save");
      onTabChange();
    }
    
    return () => {
      if (onTabChange) {
        console.log("ChecklistContent unmounting - final save");
        onTabChange();
      }
    };
  }, [onTabChange]);

  return (
    <Tabs 
      defaultValue="rv-info" 
      className="w-full"
      value={activeTab}
      onValueChange={handleTabValueChange}
    >
      <TabsList className="grid grid-cols-5 lg:grid-cols-10 h-auto bg-[#151A22] mb-6 border-b border-gray-700 rounded-none">
        {tabConfigurations.map((tab) => (
          <ChecklistTabTrigger 
            key={tab.value}
            value={tab.value} 
            icon={tab.icon} 
            label={tab.label} 
            onTabClick={handleTabClick} 
          />
        ))}
      </TabsList>
      
      <div className="tab-content-wrapper">
        <TabsContent value="rv-info" className="mt-0">
          <RVInfoTab
            progress={progress}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            handleCheckboxChange={handleCheckboxChange}
          />
        </TabsContent>
        
        <TabsContent value="exterior" className="mt-0">
          <ExteriorTab 
            progress={progress}
            handleCheckboxChange={handleCheckboxChange}
          />
        </TabsContent>
        
        <TabsContent value="interior" className="mt-0">
          <InteriorTab 
            progress={progress}
            handleCheckboxChange={handleCheckboxChange}
          />
        </TabsContent>
        
        <TabsContent value="plumbing" className="mt-0">
          <PlumbingTab 
            progress={progress}
            handleCheckboxChange={handleCheckboxChange}
          />
        </TabsContent>
        
        <TabsContent value="electrical" className="mt-0">
          <ElectricalTab 
            progress={progress}
            handleCheckboxChange={handleCheckboxChange}
          />
        </TabsContent>
        
        <TabsContent value="mechanical" className="mt-0">
          <MechanicalTab 
            progress={progress}
            handleCheckboxChange={handleCheckboxChange}
          />
        </TabsContent>
        
        <TabsContent value="tires" className="mt-0">
          <TiresTab 
            progress={progress}
            handleCheckboxChange={handleCheckboxChange}
          />
        </TabsContent>
        
        <TabsContent value="pest-control" className="mt-0">
          <PestControlTab 
            progress={progress}
            handleCheckboxChange={handleCheckboxChange}
          />
        </TabsContent>
        
        <TabsContent value="security" className="mt-0">
          <SecurityTab 
            progress={progress}
            handleCheckboxChange={handleCheckboxChange}
          />
        </TabsContent>
        
        <TabsContent value="notes" className="mt-0">
          <NotesTab 
            notes={notes}
            onNotesChange={handleNotesChange}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
});

ChecklistContent.displayName = 'ChecklistContent';

export default ChecklistContent;
