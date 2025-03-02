
import React from 'react';
import { Textarea } from "@/components/ui/textarea";

const NotesTab: React.FC = () => {
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
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-200">Storage Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea 
              className="bg-[#131a2a] border-gray-700 h-32 text-white placeholder:text-gray-500" 
              placeholder="Storage facility contact information..." 
            />
            <Textarea 
              className="bg-[#131a2a] border-gray-700 h-32 text-white placeholder:text-gray-500" 
              placeholder="Emergency contact information..." 
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-200">Return Preparation Notes</h3>
          
          <Textarea 
            className="bg-[#131a2a] border-gray-700 min-h-[150px] text-white placeholder:text-gray-500" 
            placeholder="Notes for when you return to use the RV (de-winterizing procedures, systems to check, etc.)..." 
          />
        </div>
      </div>
    </>
  );
};

export default NotesTab;
