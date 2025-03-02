
// Types for the checklist storage functionality
export interface ChecklistNotes {
  general: string;
  storageContact: string;
  emergencyContact: string;
  returnPreparation: string;
}

export interface ChecklistData {
  progress: {[key: string]: boolean};
  startDate?: Date;
  endDate?: Date;
  notes: ChecklistNotes;
  savedAt?: string;
}

export const STORAGE_KEY = 'rv-storage-checklist';
