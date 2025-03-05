
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import { ChecklistNotes } from '../hooks/types';

// Add the autotable plugin to the jsPDF types
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

// Format dates for the PDF
const formatDate = (date: Date | undefined): string => {
  if (!date) return 'Not set';
  return format(date, 'MMM d, yyyy');
};

// Helper to create section header in PDF
const addSectionHeader = (doc: jsPDF, title: string, y: number): number => {
  doc.setFillColor(21, 26, 34); // Dark background
  doc.setTextColor(91, 155, 213); // Blue text
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  
  // Draw section header with background
  doc.rect(15, y, doc.internal.pageSize.width - 30, 10, 'F');
  doc.text(title, 20, y + 7);
  
  return y + 15; // Return the next y position
};

// Helper to add a checklist section with items
const addChecklistSection = (
  doc: jsPDF, 
  title: string, 
  items: { id: string; label: string; checked: boolean }[],
  y: number
): number => {
  // Add section header
  y = addSectionHeader(doc, title, y);
  
  // Add checklist items
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(226, 232, 255); // Light text for items
  
  items.forEach((item) => {
    const checkboxChar = item.checked ? '☑' : '☐';
    doc.text(`${checkboxChar} ${item.label}`, 20, y);
    y += 7;
    
    // Add page if needed
    if (y > doc.internal.pageSize.height - 20) {
      doc.addPage();
      y = 20;
    }
  });
  
  return y + 10; // Return the next y position with spacing
};

// Helper to process checklist data into sections
interface ChecklistSection {
  title: string;
  items: { id: string; label: string; checked: boolean }[];
}

// Main export function
export const exportChecklistToPDF = (
  progress: {[key: string]: boolean | string},
  startDate: Date | undefined,
  endDate: Date | undefined,
  notes: ChecklistNotes,
  completionPercentage: number,
  checklistItems: {[sectionId: string]: {title: string, items: {id: string, label: string}[]}}
) => {
  // Create new PDF document
  const doc = new jsPDF();
  
  // Set document metadata
  doc.setProperties({
    title: 'RV Storage Preparation Checklist',
    subject: 'RV Storage Checklist',
    author: 'RV Connection',
    keywords: 'RV, storage, checklist, preparation',
    creator: 'RV Connection Checklist Tool'
  });
  
  // Add title
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('RV STORAGE PREPARATION CHECKLIST', 105, 20, { align: 'center' });
  
  // Add completion percentage
  doc.setFontSize(12);
  doc.text(`Completion: ${Math.round(completionPercentage)}%`, 105, 30, { align: 'center' });
  
  // Add dates
  doc.setFontSize(10);
  doc.text(`Storage Start: ${formatDate(startDate)} | Storage End: ${formatDate(endDate)}`, 105, 40, { align: 'center' });
  
  // Draw progress bar
  const barWidth = 180;
  const completionWidth = (barWidth * completionPercentage) / 100;
  
  doc.setDrawColor(50, 50, 50);
  doc.setFillColor(50, 50, 50);
  doc.roundedRect(15, 45, barWidth, 5, 1, 1, 'F');
  
  doc.setFillColor(91, 155, 213); // Blue
  doc.roundedRect(15, 45, completionWidth, 5, 1, 1, 'F');
  
  let y = 60; // Starting y position for content
  
  // Process all sections and items
  for (const sectionId in checklistItems) {
    const section = checklistItems[sectionId];
    
    const sectionItems = section.items.map(item => ({
      id: item.id,
      label: item.label,
      checked: !!progress[item.id]
    }));
    
    y = addChecklistSection(doc, section.title, sectionItems, y);
    
    // Add page if needed
    if (y > doc.internal.pageSize.height - 30) {
      doc.addPage();
      y = 20;
    }
  }
  
  // Add notes section at the end
  if (Object.values(notes).some(note => note.trim() !== '')) {
    y = addSectionHeader(doc, 'NOTES', y);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(226, 232, 255);
    
    // Add each note if it has content
    Object.entries(notes).forEach(([key, value]) => {
      if (value.trim() !== '') {
        const noteTitle = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        
        doc.setFont('helvetica', 'bold');
        doc.text(noteTitle, 20, y);
        y += 7;
        
        doc.setFont('helvetica', 'normal');
        
        // Split notes into multiple lines
        const splitText = doc.splitTextToSize(value, doc.internal.pageSize.width - 40);
        
        splitText.forEach(line => {
          doc.text(line, 20, y);
          y += 7;
          
          // Add page if needed
          if (y > doc.internal.pageSize.height - 20) {
            doc.addPage();
            y = 20;
          }
        });
        
        y += 5; // Space after each note
      }
    });
  }
  
  // Add footer with date
  const dateStr = format(new Date(), 'MMMM d, yyyy');
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(`Generated on ${dateStr}`, 105, doc.internal.pageSize.height - 10, { align: 'center' });
  
  // Save the PDF
  doc.save('RV_Storage_Checklist.pdf');
};
