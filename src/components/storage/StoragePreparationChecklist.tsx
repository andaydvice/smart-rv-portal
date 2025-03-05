
import { useState } from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
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
    setProgress,
    setNotes,
    saveDataWrapper,
    resetData,
    lastSavedAt,
  } = useChecklistCore();

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("rv-info");

  // Create these handlers locally since they're not provided by useChecklistCore
  const handleCheckboxChange = (id: string, checked: boolean) => {
    setProgress({ ...progress, [id]: checked });
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
    saveDataWrapper(true);
  };

  const handleDateChange = (id: string, date: Date | string) => {
    if (id === 'startDate') {
      setStartDate(date instanceof Date ? date : new Date(date));
    } else if (id === 'endDate') {
      setEndDate(date instanceof Date ? date : new Date(date));
    }
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
    saveDataWrapper(true);
  };

  const handleNotesChange = (id: string, value: string) => {
    setNotes({
      ...notes,
      [id]: value
    });
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
    saveDataWrapper(true);
  };

  // Calculate completion percentage
  const completionPercentage = Math.round(
    Object.entries(progress)
      .filter(([key, value]) => typeof value === 'boolean' && key !== 'activeTab')
      .filter(([_, value]) => value === true).length / 
    Math.max(1, Object.entries(progress)
      .filter(([key, value]) => typeof value === 'boolean' && key !== 'activeTab').length) * 100
  ) || 0;

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

  // Handle tab change
  const handleTabChange = (value: string) => {
    console.log(`Tab changed to: ${value}`);
    setActiveTab(value);
    saveDataWrapper(true);
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
        isSaving={isSaving}
      />
      
      <Tabs 
        value={activeTab} 
        onValueChange={handleTabChange}
        className="mt-8"
      >
        <TabsList className="storage-preparation-checklist mb-6 grid grid-cols-5 md:grid-cols-10 gap-1">
          <ChecklistTabTrigger 
            value="rv-info" 
            icon="Clipboard"
            label="RV Info"
            onTabClick={() => saveDataWrapper(true)}
          />
          <ChecklistTabTrigger 
            value="interior" 
            icon="Home"
            label="Interior"
            onTabClick={() => saveDataWrapper(true)}
          />
          <ChecklistTabTrigger 
            value="exterior" 
            icon="Warehouse"
            label="Exterior"
            onTabClick={() => saveDataWrapper(true)}
          />
          <ChecklistTabTrigger 
            value="mechanical" 
            icon="Wrench"
            label="Mechanical"
            onTabClick={() => saveDataWrapper(true)}
          />
          <ChecklistTabTrigger 
            value="electrical" 
            icon="Zap"
            label="Electrical"
            onTabClick={() => saveDataWrapper(true)}
          />
          <ChecklistTabTrigger 
            value="plumbing" 
            icon="Droplets"
            label="Plumbing"
            onTabClick={() => saveDataWrapper(true)}
          />
          <ChecklistTabTrigger 
            value="tires" 
            icon="Disc"
            label="Tires"
            onTabClick={() => saveDataWrapper(true)}
          />
          <ChecklistTabTrigger 
            value="pest-control" 
            icon="Bug"
            label="Pest Control"
            onTabClick={() => saveDataWrapper(true)}
          />
          <ChecklistTabTrigger 
            value="security" 
            icon="ShieldCheck"
            label="Security"
            onTabClick={() => saveDataWrapper(true)}
          />
          <ChecklistTabTrigger 
            value="notes" 
            icon="FileText"
            label="Notes"
            onTabClick={() => saveDataWrapper(true)}
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
