
import React, { useEffect, useCallback, memo, useMemo, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useChecklistStorage } from './checklist/hooks/useChecklistStorage';
import ChecklistHeader from './checklist/ChecklistHeader';
import ChecklistContent from './checklist/ChecklistContent';
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Memoize the component to prevent unnecessary re-renders
const StoragePreparationChecklist: React.FC = memo(() => {
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

  const handleResetRequest = useCallback(() => {
    setResetDialogOpen(true);
  }, []);

  const handleResetConfirm = useCallback(() => {
    resetData();
    setResetDialogOpen(false);
    
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
    // Only count true boolean values, not strings or other values
    const completedItems = Object.values(progress).filter(val => val === true).length;
    const completionPercentage = Math.round((completedItems / totalItems) * 100);
    return { totalItems, completedItems, completionPercentage };
  }, [progress]);
  
  // Auto-save on first load to ensure data is properly initialized
  useEffect(() => {
    if (isLoaded) {
      // Small delay to ensure all data is loaded
      const timer = setTimeout(() => {
        saveData(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, saveData]);

  // Show loading state while data is being loaded
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#080F1F] py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Card className="border-gray-700 bg-[#091020] shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-700 space-y-4">
              <Skeleton className="h-8 w-1/3 bg-gray-700" />
              <Skeleton className="h-4 w-1/2 bg-gray-700" />
              <div className="flex space-x-2">
                <Skeleton className="h-10 w-24 bg-gray-700" />
                <Skeleton className="h-10 w-24 bg-gray-700" />
              </div>
            </div>
            <CardContent className="pt-6 space-y-6">
              <Skeleton className="h-8 w-1/4 bg-gray-700" />
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <Skeleton key={i} className="h-10 w-full bg-gray-700" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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

      <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <AlertDialogContent className="bg-[#131a2a] border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Reset Checklist?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#E2E8FF]">
              This will reset all of your progress and notes. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#151A22] text-white border-gray-700 hover:bg-[#1d2532] hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleResetConfirm}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
});

StoragePreparationChecklist.displayName = 'StoragePreparationChecklist';

export default StoragePreparationChecklist;
