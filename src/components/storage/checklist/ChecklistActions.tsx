
import { useState, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { exportChecklistToPDF } from './utils/pdfExport';
import { checklistData } from './utils/checklistData';

interface ChecklistActionsProps {
  saveData: (showToast?: boolean) => void;
  resetData: () => void;
  setResetDialogOpen: (open: boolean) => void;
}

export const useChecklistActions = ({
  saveData,
  resetData,
  setResetDialogOpen
}: ChecklistActionsProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Handle save progress with debounce
  const handleSaveProgress = useCallback(() => {
    if (isSaving) return;
    
    setIsSaving(true);
    
    try {
      saveData(true);
      
      // Show success toast
      toast({
        title: "Progress saved",
        description: "Your checklist has been saved successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error saving progress:", error);
      
      // Show error toast
      toast({
        title: "Save failed",
        description: "There was an error saving your progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsSaving(false);
      }, 800);
    }
  }, [isSaving, saveData, toast]);

  // Handle reset request
  const handleResetRequest = useCallback(() => {
    setResetDialogOpen(true);
  }, [setResetDialogOpen]);

  // Handle reset confirm
  const handleResetConfirm = useCallback(() => {
    resetData();
    setResetDialogOpen(false);
    
    // Show reset toast
    toast({
      title: "Checklist reset",
      description: "Your checklist has been reset to default state.",
      variant: "default",
    });
  }, [resetData, setResetDialogOpen, toast]);

  // Handle print
  const handlePrint = useCallback(() => {
    // First, save the current progress
    saveData(false);
    
    // Then prepare for print and trigger browser print dialog
    setTimeout(() => {
      window.print();
    }, 300);
  }, [saveData]);
  
  // Handle PDF export - update the type definition to accept Date | undefined
  const handleExportPDF = useCallback((
    progress: {[key: string]: boolean | string},
    startDate: Date | undefined,
    endDate: Date | undefined,
    notes: any,
    completionPercentage: number
  ) => {
    // First, save the current progress
    saveData(false);
    
    // Then export to PDF
    try {
      exportChecklistToPDF(
        progress,
        startDate,
        endDate,
        notes,
        completionPercentage,
        checklistData
      );
      
      // Show success toast
      toast({
        title: "PDF exported",
        description: "Your checklist has been exported to PDF successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error exporting PDF:", error);
      
      // Show error toast
      toast({
        title: "Export failed",
        description: "There was an error exporting your checklist. Please try again.",
        variant: "destructive",
      });
    }
  }, [saveData, toast]);

  return {
    isSaving,
    handleSaveProgress,
    handleResetRequest,
    handleResetConfirm,
    handlePrint,
    handleExportPDF
  };
};
