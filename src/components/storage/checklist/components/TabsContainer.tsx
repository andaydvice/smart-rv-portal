
import React, { useEffect } from 'react';
import { Tabs, TabsList } from "@/components/ui/tabs";
import ChecklistTabTrigger from "../ChecklistTabTrigger";

interface TabsContainerProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  onSaveTab?: () => void;
  children: React.ReactNode;
}

const TabsContainer: React.FC<TabsContainerProps> = ({
  activeTab,
  onTabChange,
  onSaveTab,
  children
}) => {
  // On component mount/unmount, force a save
  useEffect(() => {
    if (onSaveTab) {
      console.log("TabsContainer mounted - initial save");
      onSaveTab();
    }
    
    // Add beforeprint listener to make all tab content visible
    const handleBeforePrint = () => {
      // Make all tab panels visible in print
      document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
        const htmlPanel = panel as HTMLElement;
        const originalDisplay = htmlPanel.style.display;
        htmlPanel.style.display = 'block';
        htmlPanel.style.visibility = 'visible';
        htmlPanel.setAttribute('data-original-display', originalDisplay);
      });
    };
    
    // Add afterprint listener to restore the original visibility
    const handleAfterPrint = () => {
      document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
        const htmlPanel = panel as HTMLElement;
        const originalDisplay = panel.getAttribute('data-original-display') || '';
        if (panel.getAttribute('value') !== activeTab) {
          htmlPanel.style.display = originalDisplay;
        }
      });
    };
    
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    
    return () => {
      if (onSaveTab) {
        console.log("TabsContainer unmounting - final save");
        onSaveTab();
      }
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [onSaveTab, activeTab]);

  return (
    <Tabs 
      value={activeTab}
      onValueChange={onTabChange}
      className="w-full"
    >
      <TabsList 
        className="grid grid-cols-5 lg:grid-cols-10 h-auto bg-[#151A22] mb-6 border-b border-gray-700 rounded-none no-print"
        style={{ display: 'grid', visibility: 'visible' }}
      >
        <ChecklistTabTrigger value="rv-info" icon="Info" label="RV Info" onTabClick={onSaveTab} />
        <ChecklistTabTrigger value="exterior" icon="ExternalLink" label="Exterior" onTabClick={onSaveTab} />
        <ChecklistTabTrigger value="interior" icon="Home" label="Interior" onTabClick={onSaveTab} />
        <ChecklistTabTrigger value="plumbing" icon="Droplets" label="Plumbing" onTabClick={onSaveTab} />
        <ChecklistTabTrigger value="electrical" icon="Zap" label="Electrical" onTabClick={onSaveTab} />
        <ChecklistTabTrigger value="mechanical" icon="Settings" label="Mechanical" onTabClick={onSaveTab} />
        <ChecklistTabTrigger value="tires" icon="CircleDashed" label="Tires" onTabClick={onSaveTab} />
        <ChecklistTabTrigger value="pest-control" icon="Bug" label="Pest Control" onTabClick={onSaveTab} />
        <ChecklistTabTrigger value="security" icon="Lock" label="Security" onTabClick={onSaveTab} />
        <ChecklistTabTrigger value="notes" icon="FileText" label="Notes" onTabClick={onSaveTab} />
      </TabsList>
      
      <div 
        className="tab-content-wrapper"
        style={{ visibility: 'visible', display: 'block' }}
      >
        {children}
      </div>
    </Tabs>
  );
};

export default TabsContainer;
