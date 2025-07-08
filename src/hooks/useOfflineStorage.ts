import { useState, useEffect } from 'react';
import { offlineStorage } from '@/components/pwa/OfflineStorage';

export const useOfflineStorage = () => {
  const [storageInfo, setStorageInfo] = useState({ used: 0, quota: 0, percentage: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initStorage = async () => {
      await offlineStorage.init();
      setIsInitialized(true);
      updateStorageInfo();
    };

    initStorage();
  }, []);

  const updateStorageInfo = async () => {
    const info = await offlineStorage.getStorageInfo();
    setStorageInfo(info);
  };

  const saveCalculation = async (type: string, data: any) => {
    await offlineStorage.saveCalculation(type, data);
    updateStorageInfo();
  };

  const saveChecklistProgress = async (id: string, name: string, items: any[], progress: number) => {
    await offlineStorage.saveChecklistProgress(id, name, items, progress);
    updateStorageInfo();
  };

  const saveFavorite = async (type: 'facility' | 'rv' | 'blog' | 'calculator', data: any) => {
    const id = await offlineStorage.saveFavorite(type, data);
    updateStorageInfo();
    return id;
  };

  const saveSearch = async (query: string, filters: any, results: any[]) => {
    const id = await offlineStorage.saveSearch(query, filters, results);
    updateStorageInfo();
    return id;
  };

  return {
    isInitialized,
    storageInfo,
    updateStorageInfo,
    
    // Calculator functions
    saveCalculation,
    getCalculations: offlineStorage.getCalculations.bind(offlineStorage),
    deleteCalculation: offlineStorage.deleteCalculation.bind(offlineStorage),
    
    // Checklist functions
    saveChecklistProgress,
    getChecklistProgress: offlineStorage.getChecklistProgress.bind(offlineStorage),
    getAllChecklists: offlineStorage.getAllChecklists.bind(offlineStorage),
    
    // Favorites functions
    saveFavorite,
    getFavorites: offlineStorage.getFavorites.bind(offlineStorage),
    removeFavorite: offlineStorage.removeFavorite.bind(offlineStorage),
    
    // Search functions
    saveSearch,
    getSavedSearches: offlineStorage.getSavedSearches.bind(offlineStorage),
    deleteSearch: offlineStorage.deleteSearch.bind(offlineStorage),
    
    // Sync functions
    getUnsyncedData: offlineStorage.getUnsyncedData.bind(offlineStorage),
    markAsSynced: offlineStorage.markAsSynced.bind(offlineStorage),
    
    // Utility functions
    clearAllData: offlineStorage.clearAllData.bind(offlineStorage),
  };
};