
import React, { useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import ChecklistTabTrigger from './ChecklistTabTrigger';
import ExteriorTab from './ExteriorTab';
import InteriorTab from './InteriorTab';
import PlumbingTab from './PlumbingTab';
import TiresTab from './TiresTab';
import ElectricalTab from './ElectricalTab';
import MechanicalTab from './MechanicalTab';
import PestControlTab from './PestControlTab';
import SecurityTab from './SecurityTab';
import NotesTab from './NotesTab';
import RVInfoTab from './RVInfoTab';
import { ChecklistContentProps } from './ChecklistTypes';

const ChecklistContent: React.FC<ChecklistContentProps> = ({
  progress,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  notes,
  handleCheckboxChange,
  handleNotesChange,
  onTabChange
}) => {
  const didMountRef = useRef(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  
  // Auto-save when component unmounts
  useEffect(() => {
    // On mount, prepare for print by ensuring all checkboxes have appropriate attributes
    const prepareCheckboxesForPrint = () => {
      document.querySelectorAll('[role="checkbox"]').forEach(checkbox => {
        const id = checkbox.getAttribute('id');
        if (id && progress[id] !== undefined) {
          const isChecked = !!progress[id];
          checkbox.setAttribute('data-print-checked', isChecked ? 'true' : 'false');
          checkbox.setAttribute('data-state', isChecked ? 'checked' : 'unchecked');
        }
      });
    };
    
    prepareCheckboxesForPrint();
    
    // Force all tabs to be visible in print mode but hidden in screen mode
    const prepareTabsForPrint = () => {
      document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
        if (panel instanceof HTMLElement) {
          panel.dataset.printDisplay = 'block';
        }
      });
    };
    
    prepareTabsForPrint();
    
    // Prepare before print
    const beforePrintHandler = () => {
      prepareCheckboxesForPrint();
      prepareTabsForPrint();
      
      // Make all tab content visible for printing
      document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
        if (panel instanceof HTMLElement) {
          panel.style.display = 'block';
          panel.style.visibility = 'visible';
          panel.style.height = 'auto';
        }
      });
      
      // Add page breaks between tabs for cleaner printing
      const tabPanels = document.querySelectorAll('[role="tabpanel"]');
      tabPanels.forEach((panel, index) => {
        if (index > 0 && panel instanceof HTMLElement) {
          panel.style.pageBreakBefore = 'always';
        }
      });
    };
    
    // Reset after print
    const afterPrintHandler = () => {
      // Restore tab panel visibility to normal
      const tabPanels = document.querySelectorAll('[role="tabpanel"]');
      const activePanel = document.querySelector('[role="tabpanel"][data-state="active"]');
      
      tabPanels.forEach(panel => {
        if (panel !== activePanel && panel instanceof HTMLElement) {
          panel.style.display = '';
          panel.style.visibility = '';
          panel.style.height = '';
          panel.style.pageBreakBefore = '';
        }
      });
    };
    
    window.addEventListener('beforeprint', beforePrintHandler);
    window.addEventListener('afterprint', afterPrintHandler);
    
    console.log("ChecklistContent mounted - initial save");
    
    return () => {
      console.log("ChecklistContent unmounting - final save");
      onTabChange();
      window.removeEventListener('beforeprint', beforePrintHandler);
      window.removeEventListener('afterprint', afterPrintHandler);
    };
  }, [progress, onTabChange]);
  
  useEffect(() => {
    if (didMountRef.current) {
      // Setup resize observer to ensure tab content fills its container
      if (tabsRef.current) {
        const observer = new ResizeObserver(() => {
          if (tabsRef.current) {
            const tabsHeight = tabsRef.current.offsetHeight;
            const tabsList = tabsRef.current.querySelector('[role="tablist"]');
            const tabsListHeight = tabsList ? tabsList.clientHeight : 0;
            const contentHeight = tabsHeight - tabsListHeight - 20; // Subtract padding
            
            document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
              if (panel instanceof HTMLElement) {
                panel.style.minHeight = `${contentHeight}px`;
              }
            });
          }
        });
        
        observer.observe(tabsRef.current);
        return () => observer.disconnect();
      }
    } else {
      didMountRef.current = true;
    }
  }, []);
  
  return (
    <Tabs 
      defaultValue="rv-info" 
      className="space-y-4" 
      onValueChange={onTabChange}
      ref={tabsRef}
    >
      <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2 bg-[#131a2a] p-1">
        <ChecklistTabTrigger value="rv-info" label="RV Info" />
        <ChecklistTabTrigger value="exterior" label="Exterior" />
        <ChecklistTabTrigger value="interior" label="Interior" />
        <ChecklistTabTrigger value="plumbing" label="Plumbing" />
        <ChecklistTabTrigger value="tires" label="Tires" />
        <ChecklistTabTrigger value="electrical" label="Electrical" />
        <ChecklistTabTrigger value="mechanical" label="Engine" />
        <ChecklistTabTrigger value="pest-control" label="Pest Control" />
        <ChecklistTabTrigger value="security" label="Security" />
        <ChecklistTabTrigger value="notes" label="Notes" />
      </TabsList>
      
      <TabsContent value="rv-info" className="space-y-4 tab-content">
        <RVInfoTab 
          progress={progress}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TabsContent>
      
      <TabsContent value="exterior" className="space-y-4 tab-content">
        <ExteriorTab 
          progress={progress} 
          handleCheckboxChange={handleCheckboxChange} 
        />
      </TabsContent>
      
      <TabsContent value="interior" className="space-y-4 tab-content">
        <InteriorTab 
          progress={progress} 
          handleCheckboxChange={handleCheckboxChange} 
        />
      </TabsContent>
      
      <TabsContent value="plumbing" className="space-y-4 tab-content">
        <PlumbingTab 
          progress={progress} 
          handleCheckboxChange={handleCheckboxChange} 
        />
      </TabsContent>
      
      <TabsContent value="tires" className="space-y-4 tab-content">
        <TiresTab 
          progress={progress} 
          handleCheckboxChange={handleCheckboxChange} 
        />
      </TabsContent>
      
      <TabsContent value="electrical" className="space-y-4 tab-content">
        <ElectricalTab 
          progress={progress} 
          handleCheckboxChange={handleCheckboxChange} 
        />
      </TabsContent>
      
      <TabsContent value="mechanical" className="space-y-4 tab-content">
        <MechanicalTab 
          progress={progress} 
          handleCheckboxChange={handleCheckboxChange} 
        />
      </TabsContent>
      
      <TabsContent value="pest-control" className="space-y-4 tab-content">
        <PestControlTab 
          progress={progress} 
          handleCheckboxChange={handleCheckboxChange} 
        />
      </TabsContent>
      
      <TabsContent value="security" className="space-y-4 tab-content">
        <SecurityTab 
          progress={progress} 
          handleCheckboxChange={handleCheckboxChange} 
        />
      </TabsContent>
      
      <TabsContent value="notes" className="space-y-4 tab-content">
        <NotesTab 
          notes={notes} 
          handleNotesChange={handleNotesChange} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default ChecklistContent;
