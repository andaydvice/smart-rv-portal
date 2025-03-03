
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ChecklistNotes } from '../hooks/types';
import { format } from 'date-fns';
import { checklistData, ChecklistSectionData } from './checklistData';

// Define the type of the checklist items
type ProgressMap = {[key: string]: boolean | string};

/**
 * Formats a date object for display or returns a placeholder if undefined
 * Ensures type safety by validating the date object
 */
const formatDate = (date: Date | undefined | string): string => {
  if (!date) return 'Not set';
  
  // Handle the case where we might get a string instead of a Date object
  if (typeof date === 'string') {
    try {
      // Try to parse the string into a Date object
      return format(new Date(date), 'MMMM d, yyyy');
    } catch (error) {
      console.error('Invalid date string:', date);
      return 'Not set';
    }
  }
  
  // If it's already a Date object, format it
  try {
    return format(date, 'MMMM d, yyyy');
  } catch (error) {
    console.error('Invalid date object:', date);
    return 'Not set';
  }
};

/**
 * Ensures a value is a valid Date object or undefined
 */
const ensureDate = (value: any): Date | undefined => {
  if (!value) return undefined;
  
  if (value instanceof Date) {
    return value;
  }
  
  if (typeof value === 'string') {
    try {
      const date = new Date(value);
      // Check if the date is valid
      if (!isNaN(date.getTime())) {
        return date;
      }
    } catch (error) {
      console.error('Failed to convert string to Date:', value);
    }
  }
  
  return undefined;
};

/**
 * Exports the RV Storage Checklist to a downloadable PDF file
 * Adds type safety for date handling
 */
export const exportChecklistToPDF = (
  progress: ProgressMap,
  startDate: Date | string | undefined,
  endDate: Date | string | undefined,
  notes: ChecklistNotes,
  completionPercentage: number,
  checklistDataObj: {[key: string]: ChecklistSectionData}
): void => {
  try {
    // Convert dates to proper Date objects or undefined
    const validStartDate = ensureDate(startDate);
    const validEndDate = ensureDate(endDate);
    
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(41, 65, 148); // Dark blue color
    doc.text('RV Storage Preparation Checklist', 105, 15, { align: 'center' });
    
    // Add completion percentage
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Completion: ${Math.round(completionPercentage)}%`, 105, 22, { align: 'center' });
    
    // Add storage dates
    doc.setFontSize(11);
    doc.text(`Storage Start: ${formatDate(validStartDate)}`, 20, 30);
    doc.text(`Expected Return: ${formatDate(validEndDate)}`, 20, 36);
    
    // Generate date stamp
    const currentDate = format(new Date(), 'MMMM d, yyyy - h:mm a');
    doc.setFontSize(9);
    doc.setTextColor(130);
    doc.text(`Generated: ${currentDate}`, 195, 10, { align: 'right' });
    
    // Add page number function
    const addPageNumbers = () => {
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(130);
        doc.text(`Page ${i} of ${totalPages}`, 195, 287, { align: 'right' });
      }
    };
    
    // Process and add each checklist section
    let currentY = 45;
    
    // Loop through each category/section in the checklist data
    Object.keys(checklistDataObj).forEach((sectionKey) => {
      const section = checklistDataObj[sectionKey];
      
      // Check if we need a new page (rough estimate for space needed)
      if (currentY > 250) {
        doc.addPage();
        currentY = 20;
      }
      
      // Add section title
      doc.setFontSize(12);
      doc.setTextColor(41, 65, 148); // Dark blue color
      doc.text(section.title, 20, currentY);
      currentY += 8;
      
      // Table data for this section
      const tableData: string[][] = [];
      
      // Process each item in the section
      section.items.forEach(item => {
        const status = progress[item.id] === true ? '✓' : '□';
        tableData.push([status, item.label]);
      });
      
      // Add table for this section
      autoTable(doc, {
        startY: currentY,
        head: [],
        body: tableData,
        theme: 'plain',
        styles: {
          fontSize: 10,
          cellPadding: 3,
        },
        columnStyles: {
          0: { cellWidth: 10, halign: 'center' },
          1: { cellWidth: 170 },
        },
      });
      
      // Update Y position after table
      currentY = (doc as any).lastAutoTable.finalY + 15;
    });
    
    // Add a new page for notes
    doc.addPage();
    
    // Add notes header
    doc.setFontSize(16);
    doc.setTextColor(41, 65, 148);
    doc.text('Notes & Additional Information', 105, 20, { align: 'center' });
    
    // Process notes
    const addNotesSection = (title: string, content: string, yPosition: number) => {
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      doc.text(title, 20, yPosition);
      
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      
      // Split long text into lines that fit the page width
      const textLines = doc.splitTextToSize(content || 'No notes added.', 170);
      doc.text(textLines, 20, yPosition + 8);
      
      return yPosition + 12 + (textLines.length * 5);
    };
    
    let notesY = 30;
    notesY = addNotesSection('General Notes', notes.general || '', notesY);
    
    // Add some spacing
    notesY += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(41, 65, 148);
    doc.text('Contact Information', 20, notesY);
    notesY += 8;
    
    notesY = addNotesSection('Storage Facility Contact', notes.storageContact || '', notesY);
    notesY = addNotesSection('Emergency Contact', notes.emergencyContact || '', notesY);
    
    // Add some spacing
    notesY += 10;
    
    notesY = addNotesSection('Return Preparation Notes', notes.returnPreparation || '', notesY);
    
    // Add page numbers
    addPageNumbers();
    
    // Save the PDF
    doc.save('RV_Storage_Checklist.pdf');
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
