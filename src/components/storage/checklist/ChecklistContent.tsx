
import React from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
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
import ChecklistSection from './ChecklistSection';
import ChecklistTabTrigger from './ChecklistTabTrigger';
import { ChecklistData } from './useChecklistStorage';

type ChecklistContentProps = Omit<ChecklistData, 'savedAt'> & {
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
        <Tabs defaultValue="rv-info" className="space-y-6">
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-1 min-w-max">
              <ChecklistTabTrigger value="rv-info" label="RV Info" progress={0} total={0} />
              <ChecklistTabTrigger 
                value="electrical" 
                label="Electrical" 
                progress={
                  ['electrical1', 'electrical2', 'electrical3', 'electrical4', 'electrical5']
                    .filter(id => progress[id])
                    .length
                } 
                total={5} 
              />
              <ChecklistTabTrigger 
                value="plumbing" 
                label="Plumbing" 
                progress={
                  ['plumbing1', 'plumbing2', 'plumbing3', 'plumbing4', 'plumbing5', 'plumbing6']
                    .filter(id => progress[id])
                    .length
                } 
                total={6} 
              />
              <ChecklistTabTrigger 
                value="exterior" 
                label="Exterior" 
                progress={
                  ['exterior1', 'exterior2', 'exterior3', 'exterior4', 'exterior5', 'exterior6', 'exterior7']
                    .filter(id => progress[id])
                    .length
                } 
                total={7} 
              />
              <ChecklistTabTrigger 
                value="interior" 
                label="Interior" 
                progress={
                  ['interior1', 'interior2', 'interior3', 'interior4', 'interior5', 'interior6', 'interior7', 'interior8']
                    .filter(id => progress[id])
                    .length
                } 
                total={8} 
              />
              <ChecklistTabTrigger 
                value="mechanical" 
                label="Mechanical" 
                progress={
                  ['mechanical1', 'mechanical2', 'mechanical3', 'mechanical4', 'mechanical5', 'mechanical6']
                    .filter(id => progress[id])
                    .length
                } 
                total={6} 
              />
              <ChecklistTabTrigger 
                value="tires" 
                label="Tires & Suspension" 
                progress={
                  ['tires1', 'tires2', 'tires3', 'tires4', 'tires5']
                    .filter(id => progress[id])
                    .length
                } 
                total={5} 
              />
              <ChecklistTabTrigger 
                value="security" 
                label="Security" 
                progress={
                  ['security1', 'security2', 'security3', 'security4', 'security5', 'security6']
                    .filter(id => progress[id])
                    .length
                } 
                total={6} 
              />
              <ChecklistTabTrigger 
                value="pest" 
                label="Pest Control" 
                progress={
                  ['pest1', 'pest2', 'pest3', 'pest4', 'pest5', 'pest6', 'pest7']
                    .filter(id => progress[id])
                    .length
                } 
                total={7} 
              />
              <ChecklistTabTrigger value="notes" label="Notes" progress={0} total={0} />
            </div>
          </div>
          
          <TabsContent value="rv-info">
            <RVInfoTab startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
          </TabsContent>
          
          <TabsContent value="electrical">
            <ElectricalTab progress={progress} onCheckboxChange={handleCheckboxChange} />
          </TabsContent>
          
          <TabsContent value="plumbing">
            <PlumbingTab progress={progress} onCheckboxChange={handleCheckboxChange} />
          </TabsContent>
          
          <TabsContent value="exterior">
            <ExteriorTab progress={progress} onCheckboxChange={handleCheckboxChange} />
          </TabsContent>
          
          <TabsContent value="interior">
            <InteriorTab progress={progress} onCheckboxChange={handleCheckboxChange} />
          </TabsContent>
          
          <TabsContent value="mechanical">
            <MechanicalTab progress={progress} onCheckboxChange={handleCheckboxChange} />
          </TabsContent>
          
          <TabsContent value="tires">
            <TiresTab progress={progress} onCheckboxChange={handleCheckboxChange} />
          </TabsContent>
          
          <TabsContent value="security">
            <SecurityTab progress={progress} onCheckboxChange={handleCheckboxChange} />
          </TabsContent>
          
          <TabsContent value="pest">
            <PestControlTab progress={progress} onCheckboxChange={handleCheckboxChange} />
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
