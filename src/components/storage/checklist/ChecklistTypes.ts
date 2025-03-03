
import { Dispatch, SetStateAction } from 'react';
import { ChecklistNotes } from './hooks/types';

export interface ChecklistTabProps {
  handleCheckboxChange: (id: string, checked: boolean) => void;
  progress: {[key: string]: boolean | string};
}

export interface RVInfoTabProps {
  progress: {[key: string]: boolean | string};
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  handleCheckboxChange: (id: string, checked: boolean) => void;
}

// Adding this interface to make it clear what the tab components expect
export interface TabContentProps {
  progress: {[key: string]: boolean | string};
  handleCheckboxChange: (id: string, checked: boolean) => void;
}

// Updated ChecklistContentProps interface to ensure proper Date typing
export interface ChecklistContentProps {
  progress: {[key: string]: boolean | string};
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  notes: ChecklistNotes;
  handleCheckboxChange: (id: string, checked: boolean) => void;
  handleNotesChange: (field: keyof ChecklistNotes, value: string) => void;
  onTabChange: () => void;
}

// Define NotesTabProps interface to match the component implementation
export interface NotesTabProps {
  notes: ChecklistNotes;
  onNotesChange: (field: keyof ChecklistNotes, value: string) => void;
}
