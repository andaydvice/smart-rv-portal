
import React from 'react';
import { toast } from "@/components/ui/use-toast";
import { useCallback, useState } from 'react';

interface ChecklistActionsProps {
  saveData: (explicit: boolean) => void;
  resetData: () => void;
  setResetDialogOpen: (open: boolean) => void;
}

export const useChecklistActions = ({ 
  saveData, 
  resetData, 
  setResetDialogOpen 
}: ChecklistActionsProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProgress = useCallback(() => {
    try {
      setIsSaving(true);
      
      // Short timeout to allow UI to update before potentially blocking operation
      setTimeout(() => {
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
        } finally {
          setIsSaving(false);
        }
      }, 50);
    } catch (error) {
      console.error("Error in save handler:", error);
      setIsSaving(false);
    }
  }, [saveData]);

  const handleResetRequest = useCallback(() => {
    setResetDialogOpen(true);
  }, [setResetDialogOpen]);

  const handleResetConfirm = useCallback(() => {
    resetData();
    setResetDialogOpen(false);
    
    toast({
      title: "Progress Reset",
      description: "Your checklist has been reset to default state.",
    });
  }, [resetData, setResetDialogOpen]);

  const handlePrint = useCallback(() => {
    // Force a save before printing
    try {
      setIsSaving(true);
      
      // Short timeout to allow UI to update
      setTimeout(() => {
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
        } finally {
          setIsSaving(false);
        }
      }, 50);
    } catch (error) {
      console.error("Error in print handler:", error);
      setIsSaving(false);
    }
  }, [saveData]);

  return {
    isSaving,
    handleSaveProgress,
    handleResetRequest,
    handleResetConfirm,
    handlePrint
  };
};
