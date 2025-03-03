
import React, { useEffect, memo, useState, useCallback } from 'react';
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
    handlePrint,
    handleExportPDF
  } = useChecklistActions({
    saveData,
    resetData,
    setResetDialogOpen
  });

  // Calculate completion stats using the optimized hook
  const completionStats = useCompletionStats(progress);
  
  // Force recalculation when progress changes
  useEffect(() => {
    console.log(`Completion stats updated: ${completionStats.completedItems}/${completionStats.totalItems} = ${completionStats.completionPercentage}%`);
  }, [completionStats]);
  
  // Enhanced checkbox handler that ensures values are always stored as booleans
  const enhancedCheckboxHandler = useCallback((id: string, checked: boolean) => {
    console.log(`Checkbox change: ${id} => ${checked}`);
    handleCheckboxChange(id, checked);
    
    // After a short delay, update the print-specific attributes for this checkbox
    setTimeout(() => {
      const checkbox = document.getElementById(id);
      if (checkbox && checkbox instanceof HTMLElement) {
        checkbox.setAttribute('data-print-checked', checked ? 'true' : 'false');
        checkbox.setAttribute('aria-checked', checked ? 'true' : 'false');
        checkbox.setAttribute('data-state', checked ? 'checked' : 'unchecked');
        
        // Also update the label
        const label = document.querySelector(`label[for="${id}"]`);
        if (label && label instanceof HTMLElement) {
          label.setAttribute('data-checked', checked ? 'true' : 'false');
          label.setAttribute('data-print-state', checked ? 'checked' : 'unchecked');
        }
      }
    }, 50);
  }, [handleCheckboxChange]);
  
  // Enhanced print handler to ensure all checkboxes are properly prepared
  const enhancedPrintHandler = useCallback(() => {
    // First prepare all checkboxes for printing
    const checkboxes = document.querySelectorAll('[role="checkbox"]');
    checkboxes.forEach(checkbox => {
      const id = checkbox.getAttribute('id');
      const isChecked = progress[id as string];
      
      checkbox.setAttribute('data-print-checked', isChecked ? 'true' : 'false');
      checkbox.setAttribute('aria-checked', isChecked ? 'true' : 'false');
      checkbox.setAttribute('data-state', isChecked ? 'checked' : 'unchecked');
    });
    
    // Then call the original print handler
    handlePrint();
  }, [handlePrint, progress]);
  
  // Enhanced PDF export handler with proper type safety
  const enhancedExportPDFHandler = useCallback(() => {
    // Validate that startDate and endDate are actual Date objects or undefined
    const ensureValidDate = (date: any): Date | undefined => {
      if (!date) return undefined;
      
      // If it's already a Date object
      if (date instanceof Date && !isNaN(date.getTime())) {
        return date;
      }
      
      // If it's a string, try to convert it
      if (typeof date === 'string') {
        try {
          const parsedDate = new Date(date);
          if (!isNaN(parsedDate.getTime())) {
            return parsedDate;
          }
        } catch (error) {
          console.error("Invalid date string:", date);
        }
      }
      
      return undefined;
    };
    
    // Call the export function with validated dates
    handleExportPDF(
      progress,
      ensureValidDate(startDate),
      ensureValidDate(endDate),
      notes,
      completionStats.completionPercentage
    );
  }, [progress, startDate, endDate, notes, completionStats.completionPercentage, handleExportPDF]);
  
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
            onPrint={enhancedPrintHandler}
            onExportPDF={enhancedExportPDFHandler}
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
              handleCheckboxChange={enhancedCheckboxHandler}
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
