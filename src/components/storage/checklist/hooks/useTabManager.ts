
import { useState } from 'react';

export const useTabManager = (initialTab: string = "rv-info") => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [isSaving, setIsSaving] = useState(false);

  const handleTabChange = (value: string, saveCallback: () => void) => {
    console.log(`Tab changed to: ${value}`);
    setActiveTab(value);
    saveCallback();
  };

  const startSavingIndicator = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return {
    activeTab,
    setActiveTab,
    isSaving,
    setIsSaving,
    handleTabChange,
    startSavingIndicator
  };
};
