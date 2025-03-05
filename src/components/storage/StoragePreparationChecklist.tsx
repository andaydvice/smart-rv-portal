
import { useState } from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { Clipboard, CheckSquare } from "lucide-react";
import ChecklistHeader from "./checklist/ChecklistHeader";
import ChecklistTabTrigger from "./checklist/ChecklistTabTrigger";
import RVInfoTab from "./checklist/RVInfoTab";
import InteriorTab from "./checklist/InteriorTab";
import ExteriorTab from "./checklist/ExteriorTab";
import MechanicalTab from "./checklist/MechanicalTab";
import ElectricalTab from "./checklist/ElectricalTab";
import PlumbingTab from "./checklist/PlumbingTab";
import TiresTab from "./checklist/TiresTab";
import PestControlTab from "./checklist/PestControlTab";
import SecurityTab from "./checklist/SecurityTab";
import NotesTab from "./checklist/NotesTab";
import useChecklistCore from "./checklist/hooks/useChecklistCore";

const StoragePreparationChecklist = () => {
  const {
    checklist,
    activeTab,
    setActiveTab,
    handleCheckboxChange,
    handleDateChange,
    handleNotesChange,
    completionStats,
  } = useChecklistCore();

  const [isSaving, setIsSaving] = useState(false);

  // Show saving indicator
  const handleChange = (...args: any[]) => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
    
    // Pass to appropriate handler based on argument types
    if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'boolean') {
      handleCheckboxChange(args[0], args[1]);
    } else if (args.length === 2 && typeof args[0] === 'string' && (args[1] instanceof Date || typeof args[1] === 'string')) {
      handleDateChange(args[0], args[1]);
    } else if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'string') {
      handleNotesChange(args[0], args[1]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <ChecklistHeader 
        completionStats={completionStats} 
        isSaving={isSaving}
      />
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="mt-8"
      >
        <TabsList className="storage-preparation-checklist mb-6">
          <ChecklistTabTrigger 
            value="rv-info" 
            icon={<Clipboard className="h-4 w-4" />}
            label="RV Info"
            completionPercent={completionStats.tabs["rv-info"]}
          />
          <ChecklistTabTrigger 
            value="interior" 
            icon={<CheckSquare className="h-4 w-4" />}
            label="Interior"
            completionPercent={completionStats.tabs.interior}
          />
          <ChecklistTabTrigger 
            value="exterior" 
            icon={<CheckSquare className="h-4 w-4" />}
            label="Exterior"
            completionPercent={completionStats.tabs.exterior}
          />
          <ChecklistTabTrigger 
            value="mechanical" 
            icon={<CheckSquare className="h-4 w-4" />}
            label="Mechanical"
            completionPercent={completionStats.tabs.mechanical}
          />
          <ChecklistTabTrigger 
            value="electrical" 
            icon={<CheckSquare className="h-4 w-4" />}
            label="Electrical"
            completionPercent={completionStats.tabs.electrical}
          />
          <ChecklistTabTrigger 
            value="plumbing" 
            icon={<CheckSquare className="h-4 w-4" />}
            label="Plumbing"
            completionPercent={completionStats.tabs.plumbing}
          />
          <ChecklistTabTrigger 
            value="tires" 
            icon={<CheckSquare className="h-4 w-4" />}
            label="Tires"
            completionPercent={completionStats.tabs.tires}
          />
          <ChecklistTabTrigger 
            value="pest-control" 
            icon={<CheckSquare className="h-4 w-4" />}
            label="Pest Control"
            completionPercent={completionStats.tabs["pest-control"]}
          />
          <ChecklistTabTrigger 
            value="security" 
            icon={<CheckSquare className="h-4 w-4" />}
            label="Security"
            completionPercent={completionStats.tabs.security}
          />
          <ChecklistTabTrigger 
            value="notes" 
            icon={<CheckSquare className="h-4 w-4" />}
            label="Notes"
            completionPercent={completionStats.tabs.notes}
          />
        </TabsList>

        <TabsContent value="rv-info">
          <RVInfoTab 
            data={checklist.rvInfo} 
            onDateChange={handleChange}
            onNotesChange={handleChange}
          />
        </TabsContent>
        
        <TabsContent value="interior">
          <InteriorTab 
            data={checklist.interior} 
            onCheckboxChange={handleChange} 
          />
        </TabsContent>
        
        <TabsContent value="exterior">
          <ExteriorTab 
            data={checklist.exterior} 
            onCheckboxChange={handleChange} 
          />
        </TabsContent>
        
        <TabsContent value="mechanical">
          <MechanicalTab 
            data={checklist.mechanical} 
            onCheckboxChange={handleChange} 
          />
        </TabsContent>
        
        <TabsContent value="electrical">
          <ElectricalTab 
            data={checklist.electrical} 
            onCheckboxChange={handleChange} 
          />
        </TabsContent>
        
        <TabsContent value="plumbing">
          <PlumbingTab 
            data={checklist.plumbing} 
            onCheckboxChange={handleChange} 
          />
        </TabsContent>
        
        <TabsContent value="tires">
          <TiresTab 
            data={checklist.tires} 
            onCheckboxChange={handleChange} 
          />
        </TabsContent>
        
        <TabsContent value="pest-control">
          <PestControlTab 
            data={checklist.pestControl} 
            onCheckboxChange={handleChange} 
          />
        </TabsContent>
        
        <TabsContent value="security">
          <SecurityTab 
            data={checklist.security} 
            onCheckboxChange={handleChange} 
          />
        </TabsContent>
        
        <TabsContent value="notes">
          <NotesTab 
            data={checklist.notes} 
            onNotesChange={handleChange} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoragePreparationChecklist;
