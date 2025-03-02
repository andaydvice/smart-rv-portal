
import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useChecklistStorage } from './checklist/hooks/useChecklistStorage';
import ChecklistHeader from './checklist/ChecklistHeader';
import ChecklistContent from './checklist/ChecklistContent';

const StoragePreparationChecklist: React.FC = () => {
  const {
    progress,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    notes,
    lastSavedAt,
    handleCheckboxChange,
    handleNotesChange,
    handleTabChange,
    saveData,
    resetData,
    getLastSavedMessage
  } = useChecklistStorage();

  // Handle visibility change for saving when user leaves page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        console.log("Page visibility changed - saving data");
        saveData(true);
      }
    };

    // Save when user navigates away or switches tabs
    window.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Handle browser refresh/unload event
    const handleBeforeUnload = () => {
      console.log("Window unloading - final save");
      saveData(true);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Force save when component unmounts
    return () => {
      console.log("Component unmounting - final save");
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      saveData(true);
    };
  }, [saveData]);

  // IMPORTANT: Reduced auto-save frequency to prevent freezing
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Periodic save triggered");
      saveData(false); // Use silent save to prevent UI freezing
    }, 30000); // Save every 30 seconds instead of 10 seconds

    return () => clearInterval(intervalId);
  }, [saveData]);

  const handleSaveProgress = () => {
    saveData(true);
    
    toast({
      title: "Progress Saved",
      description: "Your checklist progress has been saved successfully.",
      variant: "default",
    });
  };

  const handleReset = () => {
    resetData();
    
    toast({
      title: "Progress Reset",
      description: "Your checklist has been reset to default state.",
    });
  };

  const handlePrint = () => {
    // Force a save before printing
    saveData(true);
    
    window.print();
    
    toast({
      title: "Printing",
      description: "Sending checklist to printer...",
    });
  };

  // Remove the extra auto-save effect that was causing duplicate saves
  // This was causing performance issues

  const totalItems = 50;
  const completedItems = Object.values(progress).filter(val => val).length;
  const completionPercentage = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="min-h-screen bg-[#080F1F] py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <Card className="border-gray-700 bg-[#091020] shadow-xl overflow-hidden">
          <ChecklistHeader 
            completionPercentage={completionPercentage}
            lastSavedAt={lastSavedAt}
            getLastSavedMessage={getLastSavedMessage}
            onSave={handleSaveProgress}
            onReset={handleReset}
            onPrint={handlePrint}
          />
          
          <CardContent className="pt-6">
            <ChecklistContent 
              progress={progress}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              notes={notes}
              handleCheckboxChange={handleCheckboxChange}
              handleNotesChange={handleNotesChange}
              onTabChange={handleTabChange}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoragePreparationChecklist;
