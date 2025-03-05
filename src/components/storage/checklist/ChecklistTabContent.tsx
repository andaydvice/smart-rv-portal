
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import RVInfoTab from "./RVInfoTab";
import InteriorTab from "./InteriorTab";
import ExteriorTab from "./ExteriorTab";
import MechanicalTab from "./MechanicalTab";
import ElectricalTab from "./ElectricalTab";
import PlumbingTab from "./PlumbingTab";
import TiresTab from "./TiresTab";
import PestControlTab from "./PestControlTab";
import SecurityTab from "./SecurityTab";
import NotesTab from "./NotesTab";
import { ChecklistNotes } from './hooks/types';

interface ChecklistTabContentProps {
  progress: {[key: string]: boolean | string};
  startDate: Date | undefined;
  endDate: Date | undefined;
  notes: ChecklistNotes;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  handleCheckboxChange: (id: string, checked: boolean) => void;
  handleNotesChange: (id: string, value: string) => void;
}

const ChecklistTabContent: React.FC<ChecklistTabContentProps> = ({
  progress,
  startDate,
  endDate,
  notes,
  setStartDate,
  setEndDate,
  handleCheckboxChange,
  handleNotesChange
}) => {
  return (
    <>
      <TabsContent value="rv-info">
        <RVInfoTab 
          progress={progress}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TabsContent>
      
      <TabsContent value="interior">
        <InteriorTab 
          progress={progress}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TabsContent>
      
      <TabsContent value="exterior">
        <ExteriorTab 
          progress={progress}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TabsContent>
      
      <TabsContent value="mechanical">
        <MechanicalTab 
          progress={progress}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TabsContent>
      
      <TabsContent value="electrical">
        <ElectricalTab 
          progress={progress}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TabsContent>
      
      <TabsContent value="plumbing">
        <PlumbingTab 
          progress={progress}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TabsContent>
      
      <TabsContent value="tires">
        <TiresTab 
          progress={progress}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TabsContent>
      
      <TabsContent value="pest-control">
        <PestControlTab 
          progress={progress}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TabsContent>
      
      <TabsContent value="security">
        <SecurityTab 
          progress={progress}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TabsContent>
      
      <TabsContent value="notes">
        <NotesTab 
          notes={notes}
          onNotesChange={handleNotesChange}
        />
      </TabsContent>
    </>
  );
};

export default ChecklistTabContent;
