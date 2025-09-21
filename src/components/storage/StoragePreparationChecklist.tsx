
import { Tabs } from "@/components/ui/tabs";
import ChecklistHeader from "./checklist/ChecklistHeader";
import ChecklistTabNavigation from "./checklist/ChecklistTabNavigation";
import ChecklistTabContent from "./checklist/ChecklistTabContent";
import { useChecklistCore } from "./checklist/hooks/useChecklistCore";
import { useTabManager } from "./checklist/hooks/useTabManager";
import { useChecklistOperations } from "./checklist/hooks/useChecklistOperations";
import { calculateCompletionPercentage } from "./checklist/utils/completionCalculator";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";

const StoragePreparationChecklist = () => {
  // Load core checklist functionality
  const {
    progress,
    startDate,
    endDate,
    notes,
    setStartDate,
    setEndDate,
    setProgress,
    setNotes,
    saveDataWrapper,
    resetData,
    lastSavedAt,
  } = useChecklistCore();

  // Tab management
  const {
    activeTab,
    isSaving,
    handleTabChange,
    startSavingIndicator
  } = useTabManager();

  // Operations for handling user interactions
  const {
    handleCheckboxChange,
    handleNotesChange,
    handleDateChange
  } = useChecklistOperations({
    progress,
    notes,
    setProgress,
    setNotes,
    saveDataWrapper,
    startSavingIndicator
  });

  const completionPercentage = calculateCompletionPercentage(progress);

  const getLastSavedMessage = () => {
    if (!lastSavedAt) return "";
    return `Last saved: ${new Date(lastSavedAt).toLocaleTimeString()}`;
  };

  const handleSave = () => {
    startSavingIndicator();
    saveDataWrapper(true);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all checklist data? This cannot be undone.")) {
      resetData();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleStartDateChange = (date: Date | string) => 
    handleDateChange('startDate', date, setStartDate, setEndDate);

  const handleEndDateChange = (date: Date | string) => 
    handleDateChange('endDate', date, setStartDate, setEndDate);

  return (
    <div className="max-w-full mx-auto px-0 sm:px-6 lg:px-8 pt-0 pb-16">
      <div className="max-w-7xl mx-auto">
        <ChecklistHeader 
          title="Storage Preparation Checklist"
          completionPercentage={completionPercentage} 
          lastSavedAt={lastSavedAt}
          getLastSavedMessage={getLastSavedMessage}
          onSave={handleSave}
          onReset={handleReset}
          onPrint={handlePrint}
          isSaving={isSaving}
        />
        
        <div className="px-2 sm:px-0">
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => handleTabChange(value, () => saveDataWrapper(true))}
            className="mt-8"
          >
            <ChecklistTabNavigation 
              onTabClick={() => saveDataWrapper(true)} 
            />

            <ChecklistTabContent 
              progress={progress}
              startDate={startDate}
              endDate={endDate}
              notes={notes}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              handleCheckboxChange={handleCheckboxChange}
              handleNotesChange={handleNotesChange}
            />
          </Tabs>
        </div>
        
        {/* Storage and Preparation Services */}
        <div className="mt-16">
          <OptimizedAffiliateGrid
            title="Professional Storage & Preparation Services"
            subtitle="Expert services and quality products to properly prepare and store your RV for any season."
            partners={[
              {
                partner: 'goodsam',
                title: 'Professional RV Storage Services',
                description: 'Find trusted storage facilities, winterization services, and maintenance support nationwide.',
                features: ['Certified Storage Facilities', 'Winterization Services', 'Maintenance Support', 'Member Discounts'],
                buttonText: 'Find Storage Services'
              },
              {
                partner: 'rvlife',
                title: 'Smart Storage Monitoring',
                description: 'Advanced monitoring systems to track your RV conditions while in storage.',
                features: ['Remote Monitoring', 'Climate Tracking', 'Security Alerts', 'Battery Management'],
                buttonText: 'Shop Monitoring Systems'
              },
              {
                partner: 'rvwaterfilter',
                title: 'Winterization & Water Systems',
                description: 'Complete water system protection, winterization supplies, and storage preparation products.',
                features: ['Winterization Kits', 'System Protection', 'Quality Products', 'Expert Guidance'],
                buttonText: 'Shop Winterization Supplies'
              }
            ]}
            gridCols="3"
          />
        </div>
      </div>
    </div>
  );
};

export default StoragePreparationChecklist;
