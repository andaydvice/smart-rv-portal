
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { ChecklistNotes } from './useChecklistStorage';

interface NotesTabProps {
  notes: ChecklistNotes;
  onNotesChange: (field: keyof ChecklistNotes, value: string) => void;
}

const NotesTab: React.FC<NotesTabProps> = ({ notes, onNotesChange }) => {
  // Ensure changes to any textarea trigger the onNotesChange callback immediately
  const handleNotesChange = (field: keyof ChecklistNotes, value: string) => {
    console.log(`NotesTab: Notes changed for field: ${field}`, value);
    // Immediately propagate the change to parent component
    onNotesChange(field, value);
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
            value={notes.general}
            onChange={(e) => handleNotesChange('general', e.target.value)}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-200">Storage Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea 
              className="bg-[#131a2a] border-gray-700 h-32 text-white placeholder:text-gray-500" 
              placeholder="Storage facility contact information..." 
              value={notes.storageContact}
              onChange={(e) => handleNotesChange('storageContact', e.target.value)}
            />
            <Textarea 
              className="bg-[#131a2a] border-gray-700 h-32 text-white placeholder:text-gray-500" 
              placeholder="Emergency contact information..." 
              value={notes.emergencyContact}
              onChange={(e) => handleNotesChange('emergencyContact', e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-200">Return Preparation Notes</h3>
          
          <Textarea 
            className="bg-[#131a2a] border-gray-700 min-h-[150px] text-white placeholder:text-gray-500" 
            placeholder="Notes for when you return to use the RV (de-winterizing procedures, systems to check, etc.)..." 
            value={notes.returnPreparation}
            onChange={(e) => handleNotesChange('returnPreparation', e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default NotesTab;
