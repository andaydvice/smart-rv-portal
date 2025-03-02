
import React from 'react';
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { ChecklistTabTrigger } from './ChecklistTabTrigger';
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
import { ChecklistNotes } from './useChecklistStorage';

interface ChecklistContentProps {
  progress: {[key: string]: boolean};
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  notes: ChecklistNotes;
  handleCheckboxChange: (id: string, checked: boolean) => void;
  handleNotesChange: (field: string, value: string) => void;
}

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
  return (
    <Tabs defaultValue="rv-info" className="space-y-8">
      <TabsList className="bg-[#151A22] mb-8 flex justify-between py-8 px-4 w-full">
        <ChecklistTabTrigger value="rv-info" icon="FileText" iconColor="#60A5FA" label="RV Info" />
        <ChecklistTabTrigger value="exterior" icon="ExternalLink" iconColor="#10B981" label="Exterior" />
        <ChecklistTabTrigger value="interior" icon="Home" iconColor="#F59E0B" label="Interior" />
        <ChecklistTabTrigger value="plumbing" icon="Droplet" iconColor="#3B82F6" label="Plumbing" />
        <ChecklistTabTrigger value="electrical" icon="Zap" iconColor="#EF4444" label="Electrical" />
        <ChecklistTabTrigger value="mechanical" icon="Settings" iconColor="#8B5CF6" label="Mechanical" />
        <ChecklistTabTrigger value="tires" icon="Truck" iconColor="#EC4899" label="Tires" />
        <ChecklistTabTrigger value="pest" icon="Bug" iconColor="#14B8A6" label="Pest Control" />
        <ChecklistTabTrigger value="security" icon="ShieldCheck" iconColor="#F97316" label="Security" />
        <ChecklistTabTrigger value="notes" icon="FileText" iconColor="#6366F1" label="Notes" />
      </TabsList>

      <div className="bg-[#0c1219] rounded-xl p-6 shadow-inner border border-gray-800">
        <TabsContent value="rv-info">
          <RVInfoTab startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
        </TabsContent>

        <TabsContent value="exterior">
          <ExteriorTab handleCheckboxChange={handleCheckboxChange} progress={progress} />
        </TabsContent>

        <TabsContent value="interior">
          <InteriorTab handleCheckboxChange={handleCheckboxChange} progress={progress} />
        </TabsContent>

        <TabsContent value="plumbing">
          <PlumbingTab handleCheckboxChange={handleCheckboxChange} progress={progress} />
        </TabsContent>

        <TabsContent value="electrical">
          <ElectricalTab handleCheckboxChange={handleCheckboxChange} progress={progress} />
        </TabsContent>

        <TabsContent value="mechanical">
          <MechanicalTab handleCheckboxChange={handleCheckboxChange} progress={progress} />
        </TabsContent>

        <TabsContent value="tires">
          <TiresTab handleCheckboxChange={handleCheckboxChange} progress={progress} />
        </TabsContent>

        <TabsContent value="pest">
          <PestControlTab handleCheckboxChange={handleCheckboxChange} progress={progress} />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab handleCheckboxChange={handleCheckboxChange} progress={progress} />
        </TabsContent>

        <TabsContent value="notes">
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
