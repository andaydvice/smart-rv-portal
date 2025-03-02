
import React, { useEffect, useCallback, memo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useChecklistStorage } from './checklist/hooks/useChecklistStorage';
import ChecklistHeader from './checklist/ChecklistHeader';
import ChecklistContent from './checklist/ChecklistContent';

// Memoize the component to prevent unnecessary re-renders
const StoragePreparationChecklist: React.FC = memo(() => {
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

  // Create memoized handlers to prevent recreation on every render
  const handleSaveProgress = useCallback(() => {
    saveData(true);
    
    toast({
      title: "Progress Saved",
      description: "Your checklist progress has been saved successfully.",
      variant: "default",
    });
  }, [saveData]);

  const handleReset = useCallback(() => {
    resetData();
    
    toast({
      title: "Progress Reset",
      description: "Your checklist has been reset to default state.",
    });
  }, [resetData]);

  const handlePrint = useCallback(() => {
    // Force a save before printing
    saveData(true);
    
    window.print();
    
    toast({
      title: "Printing",
      description: "Sending checklist to printer...",
    });
  }, [saveData]);

  // Reduced frequency of auto-save - IMPORTANT: removed the force save on every render
  useEffect(() => {
    // Setup visibility and unload event handlers for saving
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        console.log("Page visibility changed - saving data");
        saveData(true);
      }
    };

    const handleBeforeUnload = () => {
      console.log("Window unloading - final save");
      saveData(true);
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Periodic save but with much lower frequency (30 seconds instead of 3)
    const intervalId = setInterval(() => {
      console.log("Periodic save triggered");
      saveData(true);
    }, 30000);
    
    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(intervalId);
      saveData(true);
    };
  }, [saveData]);

  // Calculate completion stats
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
});

export default StoragePreparationChecklist;
