
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ChecklistNotes } from './hooks/types';

interface NotesTabProps {
  notes: ChecklistNotes;
  onNotesChange: (id: string, value: string) => void;
}

const NotesTab: React.FC<NotesTabProps> = ({ notes, onNotesChange }) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">ADDITIONAL NOTES</h2>
      
      <div className="space-y-6">
        <Card className="bg-[#131a2a] border-gray-700">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="general-notes" className="text-[#5B9BD5] font-medium mb-2 block">General Notes</Label>
                <Textarea 
                  id="general-notes" 
                  className="bg-[#151A22] border-gray-700 min-h-[100px] focus:border-[#5B9BD5] focus:ring-1 focus:ring-[#5B9BD5] text-white placeholder:text-gray-500" 
                  placeholder="Enter any general notes about your RV storage..." 
                  value={notes.general}
                  onChange={(e) => onNotesChange('general', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="storage-contact" className="text-[#5B9BD5] font-medium mb-2 block">Storage Facility Contact Information</Label>
                <Textarea 
                  id="storage-contact" 
                  className="bg-[#151A22] border-gray-700 min-h-[100px] focus:border-[#5B9BD5] focus:ring-1 focus:ring-[#5B9BD5] text-white placeholder:text-gray-500" 
                  placeholder="Enter contact information for your storage facility..." 
                  value={notes.storageContact}
                  onChange={(e) => onNotesChange('storageContact', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="emergency-contact" className="text-[#5B9BD5] font-medium mb-2 block">Emergency Contact Information</Label>
                <Textarea 
                  id="emergency-contact" 
                  className="bg-[#151A22] border-gray-700 min-h-[100px] focus:border-[#5B9BD5] focus:ring-1 focus:ring-[#5B9BD5] text-white placeholder:text-gray-500" 
                  placeholder="Enter emergency contact information..." 
                  value={notes.emergencyContact}
                  onChange={(e) => onNotesChange('emergencyContact', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="return-prep" className="text-[#5B9BD5] font-medium mb-2 block">Return Preparation Notes</Label>
                <Textarea 
                  id="return-prep" 
                  className="bg-[#151A22] border-gray-700 min-h-[100px] focus:border-[#5B9BD5] focus:ring-1 focus:ring-[#5B9BD5] text-white placeholder:text-gray-500" 
                  placeholder="Enter notes about preparations needed when returning to use your RV..." 
                  value={notes.returnPreparation}
                  onChange={(e) => onNotesChange('returnPreparation', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NotesTab;
