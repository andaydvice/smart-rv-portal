
import React, { useEffect, memo, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useChecklistStorage } from './checklist/hooks/useChecklistStorage';
import ChecklistHeader from './checklist/ChecklistHeader';
import ChecklistContent from './checklist/ChecklistContent';
import ChecklistLoading from './checklist/ChecklistLoading';
import ResetDialog from './checklist/ResetDialog';
import useCompletionStats from './checklist/hooks/useCompletionStats';
import { useChecklistActions } from './checklist/ChecklistActions';

// Memoize the component to prevent unnecessary re-renders
const StoragePreparationChecklist: React.FC = memo(() => {
  console.log('StoragePreparationChecklist rendering');
  
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  
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
    getLastSavedMessage,
    isLoaded
  } = useChecklistStorage();

  // Use the extracted actions hook
  const {
    isSaving,
    handleSaveProgress,
    handleResetRequest,
    handleResetConfirm,
    handlePrint
  } = useChecklistActions({
    saveData,
    resetData,
    setResetDialogOpen
  });

  // Calculate completion stats using the hook
  const completionStats = useCompletionStats(progress);
  console.log(`Completion stats: ${completionStats.completedItems}/${completionStats.totalItems} = ${completionStats.completionPercentage}%`);
  
  // Auto-save on first load to ensure data is properly initialized
  useEffect(() => {
    if (isLoaded) {
      console.log("StoragePreparationChecklist - Data loaded, initializing auto-save");
      
      // Small delay to ensure all data is loaded
      const timer = setTimeout(() => {
        saveData(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, saveData]);

  // Show loading state while data is being loaded
  if (!isLoaded) {
    console.log("StoragePreparationChecklist - Still loading data");
    return <ChecklistLoading />;
  }

  console.log("StoragePreparationChecklist - Rendering main content");
  
  return (
    <div className="min-h-screen bg-[#080F1F] py-12 storage-preparation-checklist">
      <div className="container mx-auto px-4 max-w-5xl">
        <Card className="border-gray-700 bg-[#091020] shadow-xl overflow-hidden">
          <ChecklistHeader 
            completionPercentage={completionStats.completionPercentage}
            lastSavedAt={lastSavedAt}
            getLastSavedMessage={getLastSavedMessage}
            onSave={handleSaveProgress}
            onReset={handleResetRequest}
            onPrint={handlePrint}
            isSaving={isSaving}
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

      <ResetDialog 
        open={resetDialogOpen} 
        setOpen={setResetDialogOpen} 
        onConfirm={handleResetConfirm} 
      />
    </div>
  );
});

StoragePreparationChecklist.displayName = 'StoragePreparationChecklist';

export default StoragePreparationChecklist;
