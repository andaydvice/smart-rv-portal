
import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import RVInfoTab from './RVInfoTab';
import ElectricalTab from './ElectricalTab';
import PlumbingTab from './PlumbingTab';
import ExteriorTab from './ExteriorTab';
import InteriorTab from './InteriorTab';
import MechanicalTab from './MechanicalTab';
import TiresTab from './TiresTab';
import SecurityTab from './SecurityTab';
import PestControlTab from './PestControlTab';
import NotesTab from './NotesTab';
import ChecklistTabTrigger from './ChecklistTabTrigger';

// Update the prop interface to include the setter functions
type ChecklistContentProps = {
  progress: {[key: string]: boolean};
  startDate: Date | undefined;
  endDate: Date | undefined;
  notes: {
    general: string;
    storageContact: string;
    emergencyContact: string;
    returnPreparation: string;
  };
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  handleCheckboxChange: (id: string, checked: boolean) => void;
  handleNotesChange: (field: string, value: string) => void;
};

const ChecklistContent: React.FC<ChecklistContentProps> = ({
  progress,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  notes,
  handleCheckboxChange,
  handleNotesChange
}) => {
  // Force immediate save when tab changes to preserve notes
  const handleTabChange = (value: string) => {
    console.log("Tab changed to:", value);
    // This is a noop function as the actual save happens in the NotesTab component
    // We're just making sure React registers the tab change event
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#60A5FA]">
        RV STORAGE PREPARATION CHECKLIST
      </h1>
      
      <p className="text-gray-300">
        Use this comprehensive checklist to properly prepare your RV for storage. 
        Track your progress and ensure nothing is missed before putting your RV into storage.
      </p>
      
      <div className="bg-[#131a2a] rounded-xl p-6 shadow-inner border border-gray-800">
        <Tabs defaultValue="rv-info" className="space-y-6" onValueChange={handleTabChange}>
          <div className="overflow-x-auto pb-2 no-scrollbar">
            <TabsList className="bg-[#0a101e] min-w-full grid grid-cols-10 rounded-none p-0 h-auto">
              <ChecklistTabTrigger value="rv-info" label="RV Info" icon="File" />
              <ChecklistTabTrigger value="exterior" label="Exterior" icon="ExternalLink" />
              <ChecklistTabTrigger value="interior" label="Interior" icon="Home" />
              <ChecklistTabTrigger value="plumbing" label="Plumbing" icon="Droplet" />
              <ChecklistTabTrigger value="electrical" label="Electrical" icon="Zap" />
              <ChecklistTabTrigger value="mechanical" label="Mechanical" icon="Settings" />
              <ChecklistTabTrigger value="tires" label="Tires" icon="Truck" />
              <ChecklistTabTrigger value="pest" label="Pest Control" icon="Bug" />
              <ChecklistTabTrigger value="security" label="Security" icon="ShieldCheck" />
              <ChecklistTabTrigger value="notes" label="Notes" icon="File" />
            </TabsList>
          </div>
          
          <TabsContent value="rv-info">
            <RVInfoTab startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
          </TabsContent>
          
          <TabsContent value="electrical">
            <ElectricalTab progress={progress} handleCheckboxChange={handleCheckboxChange} />
          </TabsContent>
          
          <TabsContent value="plumbing">
            <PlumbingTab progress={progress} handleCheckboxChange={handleCheckboxChange} />
          </TabsContent>
          
          <TabsContent value="exterior">
            <ExteriorTab progress={progress} handleCheckboxChange={handleCheckboxChange} />
          </TabsContent>
          
          <TabsContent value="interior">
            <InteriorTab progress={progress} handleCheckboxChange={handleCheckboxChange} />
          </TabsContent>
          
          <TabsContent value="mechanical">
            <MechanicalTab progress={progress} handleCheckboxChange={handleCheckboxChange} />
          </TabsContent>
          
          <TabsContent value="tires">
            <TiresTab progress={progress} handleCheckboxChange={handleCheckboxChange} />
          </TabsContent>
          
          <TabsContent value="security">
            <SecurityTab progress={progress} handleCheckboxChange={handleCheckboxChange} />
          </TabsContent>
          
          <TabsContent value="pest">
            <PestControlTab progress={progress} handleCheckboxChange={handleCheckboxChange} />
          </TabsContent>
          
          <TabsContent value="notes">
            <NotesTab notes={notes} onNotesChange={handleNotesChange} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChecklistContent;
