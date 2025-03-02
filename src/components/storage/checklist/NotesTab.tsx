
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { ChecklistNotes } from './hooks/types';
import { debounce } from 'lodash';

interface NotesTabProps {
  notes: ChecklistNotes;
  onNotesChange: (field: keyof ChecklistNotes, value: string) => void;
}

const NotesTab: React.FC<NotesTabProps> = ({ notes, onNotesChange }) => {
  // Keep track of previous notes to detect changes
  const prevNotesRef = useRef<ChecklistNotes>(notes);
  
  // Track if the component is mounted
  const isMountedRef = useRef<boolean>(true);
  
  // Local state for notes to prevent UI lag with large text
  const [localNotes, setLocalNotes] = useState<ChecklistNotes>(notes);
  
  // Update local state when props change
  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);
  
  // Force save on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      console.log("NotesTab unmounting - ensuring notes are saved");
      
      // Compare current notes with previous to see if we need to force save
      Object.keys(localNotes).forEach(key => {
        const typedKey = key as keyof ChecklistNotes;
        if (localNotes[typedKey] !== prevNotesRef.current[typedKey]) {
          console.log(`Detected unsaved changes in ${key} notes - forcing save`);
          onNotesChange(typedKey, localNotes[typedKey]);
        }
      });
    };
  }, [localNotes, onNotesChange]);
  
  // Update previous notes ref whenever notes change
  useEffect(() => {
    if (isMountedRef.current) {
      prevNotesRef.current = { ...localNotes };
    }
  }, [localNotes]);

  // Create debounced save function for each field
  const debouncedSave = useCallback(
    debounce((field: keyof ChecklistNotes, value: string) => {
      if (isMountedRef.current) {
        onNotesChange(field, value);
      }
    }, 800),
    [onNotesChange]
  );

  // Handle changes to any textarea
  const handleNotesChange = (field: keyof ChecklistNotes, value: string) => {
    // Update local state immediately for responsive UI
    setLocalNotes(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Save changes after debounce period
    debouncedSave(field, value);
  };

  // Handle blur events to ensure saving
  const handleBlur = (field: keyof ChecklistNotes) => {
    // Cancel any pending debounced saves
    debouncedSave.flush();
    
    // Force immediate save
    if (localNotes[field] !== notes[field]) {
      onNotesChange(field, localNotes[field]);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">NOTES & ADDITIONAL INFORMATION</h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="text-gray-300">
            Use this section to record any additional information, special procedures, or reminders 
            for your specific RV model. This can include manufacturer recommendations, custom modifications, 
            or special instructions for when you return to use the RV.
          </p>
          
          <Textarea 
            className="bg-[#131a2a] border-gray-700 min-h-[300px] text-white placeholder:text-gray-500" 
            placeholder="Enter any additional notes, special procedures, or reminders here..." 
            value={localNotes.general || ''}
            onChange={(e) => handleNotesChange('general', e.target.value)}
            style={{ color: 'white !important', caretColor: 'white !important' }}
            onBlur={() => handleBlur('general')}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-200">Storage Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea 
              className="bg-[#131a2a] border-gray-700 h-32 text-white placeholder:text-gray-500" 
              placeholder="Storage facility contact information..." 
              value={localNotes.storageContact || ''}
              onChange={(e) => handleNotesChange('storageContact', e.target.value)}
              style={{ color: 'white !important', caretColor: 'white !important' }}
              onBlur={() => handleBlur('storageContact')}
            />
            <Textarea 
              className="bg-[#131a2a] border-gray-700 h-32 text-white placeholder:text-gray-500" 
              placeholder="Emergency contact information..." 
              value={localNotes.emergencyContact || ''}
              onChange={(e) => handleNotesChange('emergencyContact', e.target.value)}
              style={{ color: 'white !important', caretColor: 'white !important' }}
              onBlur={() => handleBlur('emergencyContact')}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-200">Return Preparation Notes</h3>
          
          <Textarea 
            className="bg-[#131a2a] border-gray-700 min-h-[150px] text-white placeholder:text-gray-500" 
            placeholder="Notes for when you return to use the RV (de-winterizing procedures, systems to check, etc.)..." 
            value={localNotes.returnPreparation || ''}
            onChange={(e) => handleNotesChange('returnPreparation', e.target.value)}
            style={{ color: 'white !important', caretColor: 'white !important' }}
            onBlur={() => handleBlur('returnPreparation')}
          />
        </div>
      </div>
    </>
  );
};

export default NotesTab;
