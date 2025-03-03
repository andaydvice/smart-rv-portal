
import React, { useEffect } from 'react';
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
  progress: {[key: string]: boolean | string};
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  notes: ChecklistNotes;
  handleCheckboxChange: (id: string, checked: boolean) => void;
  handleNotesChange: (field: keyof ChecklistNotes, value: string) => void;
  onTabChange?: () => void; // New prop for tab change handling
}

const ChecklistContent: React.FC<ChecklistContentProps> = ({
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
  
  // Force save whenever tab changes
  const handleTabValueChange = (newValue: string) => {
    console.log(`Tab changed to ${newValue} - triggering save`);
    
    // First save the current tab's data
    if (onTabChange) {
      onTabChange();
    }
    
    // Then update the active tab
    setActiveTab(newValue);
    
    // Update print attributes for all checkboxes after tab change
    setTimeout(() => {
      const checkboxes = document.querySelectorAll('[role="checkbox"]');
      checkboxes.forEach(checkbox => {
        const id = checkbox.getAttribute('id');
        if (id && progress[id] !== undefined) {
          const isChecked = !!progress[id];
          checkbox.setAttribute('data-print-checked', isChecked ? 'true' : 'false');
          checkbox.setAttribute('aria-checked', isChecked ? 'true' : 'false');
          checkbox.setAttribute('data-state', isChecked ? 'checked' : 'unchecked');
        }
      });
    }, 100);
  };
  
  // On component mount/unmount, force a save
  useEffect(() => {
    if (onTabChange) {
      console.log("ChecklistContent mounted - initial save");
      onTabChange();
    }
    
    // Add beforeprint listener to make all tab content visible
    const handleBeforePrint = () => {
      // Make all tab panels visible in print
      document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
        const htmlPanel = panel as HTMLElement;
        const originalDisplay = htmlPanel.style.display;
        htmlPanel.style.display = 'block';
        htmlPanel.style.visibility = 'visible';
        htmlPanel.setAttribute('data-original-display', originalDisplay);
      });
    };
    
    // Add afterprint listener to restore the original visibility
    const handleAfterPrint = () => {
      document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
        const htmlPanel = panel as HTMLElement;
        const originalDisplay = panel.getAttribute('data-original-display') || '';
        if (panel.getAttribute('value') !== activeTab) {
          htmlPanel.style.display = originalDisplay;
        }
      });
    };
    
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    
    return () => {
      if (onTabChange) {
        console.log("ChecklistContent unmounting - final save");
        onTabChange();
      }
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [onTabChange, activeTab]);

  return (
    <Tabs 
      defaultValue="rv-info" 
      className="w-full"
      value={activeTab}
      onValueChange={handleTabValueChange}
    >
      <TabsList 
        className="grid grid-cols-5 lg:grid-cols-10 h-auto bg-[#151A22] mb-6 border-b border-gray-700 rounded-none no-print"
        style={{ display: 'grid', visibility: 'visible' }}
      >
        <ChecklistTabTrigger value="rv-info" icon="Info" label="RV Info" onTabClick={onTabChange} />
        <ChecklistTabTrigger value="exterior" icon="ExternalLink" label="Exterior" onTabClick={onTabChange} />
        <ChecklistTabTrigger value="interior" icon="Home" label="Interior" onTabClick={onTabChange} />
        <ChecklistTabTrigger value="plumbing" icon="Droplets" label="Plumbing" onTabClick={onTabChange} />
        <ChecklistTabTrigger value="electrical" icon="Zap" label="Electrical" onTabClick={onTabChange} />
        <ChecklistTabTrigger value="mechanical" icon="Settings" label="Mechanical" onTabClick={onTabChange} />
        <ChecklistTabTrigger value="tires" icon="CircleDashed" label="Tires" onTabClick={onTabChange} />
        <ChecklistTabTrigger value="pest-control" icon="Bug" label="Pest Control" onTabClick={onTabChange} />
        <ChecklistTabTrigger value="security" icon="Lock" label="Security" onTabClick={onTabChange} />
        <ChecklistTabTrigger value="notes" icon="FileText" label="Notes" onTabClick={onTabChange} />
      </TabsList>
      
      <div 
        className="tab-content-wrapper"
        style={{ visibility: 'visible', display: 'block' }}
      >
        <TabsContent value="rv-info" className="mt-0" style={{ visibility: 'visible' }}>
          <RVInfoTab
            progress={progress}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            handleCheckboxChange={handleCheckboxChange}
          />
        </TabsContent>
        
        <TabsContent value="exterior" className="mt-0" style={{ visibility: 'visible' }}>
          <ExteriorTab 
            progress={progress}
            handleCheckboxChange={handleCheckboxChange}
          />
        </TabsContent>
        
        <TabsContent value="interior" className="mt-0" style={{ visibility: 'visible' }}>
          <InteriorTab 
            progress={progress}
            handleCheckboxChange={handleCheckboxChange}
          />
        </TabsContent>
        
        <TabsContent value="plumbing" className="mt-0" style={{ visibility: 'visible' }}>
          <PlumbingTab 
            progress={progress}
            handleCheckboxChange={handleCheckboxChange}
          />
        </TabsContent>
        
        <TabsContent value="electrical" className="mt-0" style={{ visibility: 'visible' }}>
          <ElectricalTab 
            progress={progress}
            handleCheckboxChange={handleCheckboxChange}
          />
        </TabsContent>
        
        <TabsContent value="mechanical" className="mt-0" style={{ visibility: 'visible' }}>
          <MechanicalTab 
            progress={progress}
            handleCheckboxChange={handleCheckboxChange}
          />
        </TabsContent>
        
        <TabsContent value="tires" className="mt-0" style={{ visibility: 'visible' }}>
          <TiresTab 
            progress={progress}
            handleCheckboxChange={handleCheckboxChange}
          />
        </TabsContent>
        
        <TabsContent value="pest-control" className="mt-0" style={{ visibility: 'visible' }}>
          <PestControlTab 
            progress={progress}
            handleCheckboxChange={handleCheckboxChange}
          />
        </TabsContent>
        
        <TabsContent value="security" className="mt-0" style={{ visibility: 'visible' }}>
          <SecurityTab 
            progress={progress}
            handleCheckboxChange={handleCheckboxChange}
          />
        </TabsContent>
        
        <TabsContent value="notes" className="mt-0" style={{ visibility: 'visible' }}>
          <NotesTab 
            notes={notes}
            onNotesChange={handleNotesChange}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ChecklistContent;
