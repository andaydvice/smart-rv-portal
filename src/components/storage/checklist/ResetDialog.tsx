
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ResetDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
}

const ResetDialog: React.FC<ResetDialogProps> = ({ open, setOpen, onConfirm }) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
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
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Reset
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResetDialog;
