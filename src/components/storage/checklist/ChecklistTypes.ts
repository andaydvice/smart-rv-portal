
import { Dispatch, SetStateAction } from 'react';

export interface ChecklistTabProps {
  progress: {[key: string]: boolean};
  handleCheckboxChange: (id: string, checked: boolean) => void;
}

export interface RVInfoTabProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: ((date: Date | undefined) => void) | undefined;
  setEndDate: ((date: Date | undefined) => void) | undefined;
}
