
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

  // Force save on any tab change (component blur/focus)
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
    window.addEventListener('beforeunload', () => {
      console.log("Window unloading - final save");
      saveData(true);
    });
    
    // Force save when component unmounts
    return () => {
      console.log("Component unmounting - final save");
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', () => {
        console.log("Window unload listener removed");
      });
      saveData(true);
    };
  }, [saveData]);

  // Force periodic saves
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Periodic save triggered");
      saveData(true);
    }, 3000); // Save more frequently - every 3 seconds

    return () => clearInterval(intervalId);
  }, [saveData]);

  const handleSaveProgress = () => {
    const currentTime = saveData(true);
    
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

  // Force a save before every render by doing an automatic save in the background
  useEffect(() => {
    console.log("StoragePreparationChecklist rendered - auto-saving");
    const timeoutId = setTimeout(() => saveData(false), 500);
    return () => clearTimeout(timeoutId);
  });

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
