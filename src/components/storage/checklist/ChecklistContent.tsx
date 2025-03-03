
import React from 'react';
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
import TabsContainer from './components/TabsContainer';
import TabContent from './components/TabContent';
import { ChecklistNotes } from './hooks/types';
import { updateCheckboxPrintAttributes } from './utils/checkboxUtils';

interface ChecklistContentProps {
  progress: {[key: string]: boolean | string};
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  notes: ChecklistNotes;
  handleCheckboxChange: (id: string, checked: boolean) => void;
  handleNotesChange: (field: keyof ChecklistNotes, value: string) => void;
  onTabChange?: () => void;
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
    updateCheckboxPrintAttributes(progress);
  };

  return (
    <TabsContainer 
      activeTab={activeTab} 
      onTabChange={handleTabValueChange}
      onSaveTab={onTabChange}
    >
      <TabContent value="rv-info">
        <RVInfoTab
          progress={progress}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TabContent>
      
      <TabContent value="exterior">
        <ExteriorTab 
          progress={progress}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TabContent>
      
      <TabContent value="interior">
        <InteriorTab 
          progress={progress}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TabContent>
      
      <TabContent value="plumbing">
        <PlumbingTab 
          progress={progress}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TabContent>
      
      <TabContent value="electrical">
        <ElectricalTab 
          progress={progress}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TabContent>
      
      <TabContent value="mechanical">
        <MechanicalTab 
          progress={progress}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TabContent>
      
      <TabContent value="tires">
        <TiresTab 
          progress={progress}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TabContent>
      
      <TabContent value="pest-control">
        <PestControlTab 
          progress={progress}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TabContent>
      
      <TabContent value="security">
        <SecurityTab 
          progress={progress}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TabContent>
      
      <TabContent value="notes">
        <NotesTab 
          notes={notes}
          onNotesChange={handleNotesChange}
        />
      </TabContent>
    </TabsContainer>
  );
};

export default ChecklistContent;
