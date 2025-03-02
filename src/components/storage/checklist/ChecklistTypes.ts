
import { Dispatch, SetStateAction } from 'react';
import { ChecklistNotes } from './hooks/types';

export interface ChecklistTabProps {
  handleCheckboxChange: (id: string, checked: boolean) => void;
  progress: {[key: string]: boolean};
}

export interface RVInfoTabProps {
  progress: {[key: string]: boolean};
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  handleCheckboxChange: (id: string, checked: boolean) => void;
}

// Adding this interface to make it clear what the tab components expect
export interface TabContentProps {
  progress: {[key: string]: boolean};
  handleCheckboxChange: (id: string, checked: boolean) => void;
}
