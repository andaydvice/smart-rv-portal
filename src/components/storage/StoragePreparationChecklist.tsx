
import React, { useEffect, useCallback, memo, useMemo } from 'react';
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
    try {
      saveData(true);
      
      toast({
        title: "Progress Saved",
        description: "Your checklist progress has been saved successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error saving progress:", error);
      toast({
        title: "Save Failed",
        description: "There was an error saving your progress. Please try again.",
        variant: "destructive",
      });
    }
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
    try {
      saveData(true);
      window.print();
      
      toast({
        title: "Printing",
        description: "Sending checklist to printer...",
      });
    } catch (error) {
      console.error("Error preparing for print:", error);
      toast({
        title: "Print Failed",
        description: "There was an error preparing the document for printing.",
        variant: "destructive",
      });
    }
  }, [saveData]);

  // Calculate completion stats - memoize to prevent recalculation on every render
  const completionStats = useMemo(() => {
    const totalItems = 50;
    const completedItems = Object.values(progress).filter(val => val === true).length;
    const completionPercentage = Math.round((completedItems / totalItems) * 100);
    return { totalItems, completedItems, completionPercentage };
  }, [progress]);

  return (
    <div className="min-h-screen bg-[#080F1F] py-12 storage-preparation-checklist">
      <div className="container mx-auto px-4 max-w-5xl">
        <Card className="border-gray-700 bg-[#091020] shadow-xl overflow-hidden">
          <ChecklistHeader 
            completionPercentage={completionStats.completionPercentage}
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

StoragePreparationChecklist.displayName = 'StoragePreparationChecklist';

export default StoragePreparationChecklist;
