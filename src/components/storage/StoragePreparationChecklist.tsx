
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
import { useChecklistCore } from "./checklist/hooks/useChecklistCore";

const StoragePreparationChecklist = () => {
  const {
    progress,
    startDate,
    endDate,
    notes,
    setStartDate,
    setEndDate,
    handleCheckboxChange,
    handleDateChange,
    handleNotesChange,
    saveDataWrapper,
    resetData,
    lastSavedAt,
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

  // Calculate completion percentage
  const completionPercentage = Math.round(
    Object.values(progress).filter(value => value === true).length / 
    Object.keys(progress).length * 100
  ) || 0;

  // Calculate completion stats for each tab
  const completionStats = {
    overall: completionPercentage,
    tabs: {
      "rv-info": 0,
      interior: 0,
      exterior: 0,
      mechanical: 0,
      electrical: 0,
      plumbing: 0,
      tires: 0,
      "pest-control": 0,
      security: 0,
      notes: 0
    }
  };

  // Get formatted "last saved" message
  const getLastSavedMessage = () => {
    if (!lastSavedAt) return "";
    return `Last saved: ${new Date(lastSavedAt).toLocaleTimeString()}`;
  };

  // Handle manual save
  const handleSave = () => {
    setIsSaving(true);
    saveDataWrapper(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  // Handle reset
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all checklist data? This cannot be undone.")) {
      resetData();
    }
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <ChecklistHeader 
        completionPercentage={completionPercentage} 
        lastSavedAt={lastSavedAt}
        getLastSavedMessage={getLastSavedMessage}
        onSave={handleSave}
        onReset={handleReset}
        onPrint={handlePrint}
      />
      
      <Tabs 
        value={progress.activeTab as string || "rv-info"} 
        onValueChange={(tab) => handleChange("activeTab", tab)}
        className="mt-8"
      >
        <TabsList className="storage-preparation-checklist mb-6">
          <ChecklistTabTrigger 
            value="rv-info" 
            icon="Clipboard"
            label="RV Info"
          />
          <ChecklistTabTrigger 
            value="interior" 
            icon="CheckSquare"
            label="Interior"
          />
          <ChecklistTabTrigger 
            value="exterior" 
            icon="CheckSquare"
            label="Exterior"
          />
          <ChecklistTabTrigger 
            value="mechanical" 
            icon="CheckSquare"
            label="Mechanical"
          />
          <ChecklistTabTrigger 
            value="electrical" 
            icon="CheckSquare"
            label="Electrical"
          />
          <ChecklistTabTrigger 
            value="plumbing" 
            icon="CheckSquare"
            label="Plumbing"
          />
          <ChecklistTabTrigger 
            value="tires" 
            icon="CheckSquare"
            label="Tires"
          />
          <ChecklistTabTrigger 
            value="pest-control" 
            icon="CheckSquare"
            label="Pest Control"
          />
          <ChecklistTabTrigger 
            value="security" 
            icon="CheckSquare"
            label="Security"
          />
          <ChecklistTabTrigger 
            value="notes" 
            icon="CheckSquare"
            label="Notes"
          />
        </TabsList>

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
      </Tabs>
    </div>
  );
};

export default StoragePreparationChecklist;
