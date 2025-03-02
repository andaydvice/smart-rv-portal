
import { Dispatch, SetStateAction } from 'react';

export interface ChecklistTabProps {
  handleCheckboxChange: (id: string, checked: boolean) => void;
  progress: {[key: string]: boolean};
}

export interface RVInfoTabProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: Dispatch<SetStateAction<Date | undefined>>;
  setEndDate: Dispatch<SetStateAction<Date | undefined>>;
}
