import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface RVAppDB extends DBSchema {
  calculations: {
    key: string;
    value: {
      id: string;
      type: string;
      data: any;
      timestamp: number;
      synced: boolean;
    };
  };
  checklists: {
    key: string;
    value: {
      id: string;
      name: string;
      items: any[];
      progress: number;
      lastModified: number;
      synced: boolean;
    };
  };
  favorites: {
    key: string;
    value: {
      id: string;
      type: 'facility' | 'rv' | 'blog' | 'calculator';
      data: any;
      timestamp: number;
      synced: boolean;
    };
  };
  searches: {
    key: string;
    value: {
      id: string;
      query: string;
      filters: any;
      results: any[];
      timestamp: number;
      synced: boolean;
    };
  };
}

class OfflineStorageService {
  private db: IDBPDatabase<RVAppDB> | null = null;

  async init(): Promise<void> {
    if (this.db) return;

    try {
      this.db = await openDB<RVAppDB>('rv-app-db', 1, {
        upgrade(db) {
          // Create object stores
          if (!db.objectStoreNames.contains('calculations')) {
            db.createObjectStore('calculations', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('checklists')) {
            db.createObjectStore('checklists', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('favorites')) {
            db.createObjectStore('favorites', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('searches')) {
            db.createObjectStore('searches', { keyPath: 'id' });
          }
        },
      });
    } catch (error) {
      console.error('Failed to initialize offline storage:', error);
    }
  }

  // Calculator Results
  async saveCalculation(type: string, data: any): Promise<string> {
    await this.init();
    if (!this.db) throw new Error('Database not initialized');

    const id = `calc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const calculation = {
      id,
      type,
      data,
      timestamp: Date.now(),
      synced: false,
    };

    await this.db.put('calculations', calculation);
    return id;
  }

  async getCalculations(): Promise<any[]> {
    await this.init();
    if (!this.db) return [];
    return await this.db.getAll('calculations');
  }

  async deleteCalculation(id: string): Promise<void> {
    await this.init();
    if (!this.db) return;
    await this.db.delete('calculations', id);
  }

  // Checklist Progress
  async saveChecklistProgress(id: string, name: string, items: any[], progress: number): Promise<void> {
    await this.init();
    if (!this.db) throw new Error('Database not initialized');

    const checklist = {
      id,
      name,
      items,
      progress,
      lastModified: Date.now(),
      synced: false,
    };

    await this.db.put('checklists', checklist);
  }

  async getChecklistProgress(id: string): Promise<any | null> {
    await this.init();
    if (!this.db) return null;
    return await this.db.get('checklists', id) || null;
  }

  async getAllChecklists(): Promise<any[]> {
    await this.init();
    if (!this.db) return [];
    return await this.db.getAll('checklists');
  }

  // Favorites
  async saveFavorite(type: 'facility' | 'rv' | 'blog' | 'calculator', data: any): Promise<string> {
    await this.init();
    if (!this.db) throw new Error('Database not initialized');

    const id = `fav_${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const favorite = {
      id,
      type,
      data,
      timestamp: Date.now(),
      synced: false,
    };

    await this.db.put('favorites', favorite);
    return id;
  }

  async getFavorites(type?: string): Promise<any[]> {
    await this.init();
    if (!this.db) return [];
    
    const all = await this.db.getAll('favorites');
    return type ? all.filter(fav => fav.type === type) : all;
  }

  async removeFavorite(id: string): Promise<void> {
    await this.init();
    if (!this.db) return;
    await this.db.delete('favorites', id);
  }

  // Saved Searches
  async saveSearch(query: string, filters: any, results: any[]): Promise<string> {
    await this.init();
    if (!this.db) throw new Error('Database not initialized');

    const id = `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const search = {
      id,
      query,
      filters,
      results,
      timestamp: Date.now(),
      synced: false,
    };

    await this.db.put('searches', search);
    return id;
  }

  async getSavedSearches(): Promise<any[]> {
    await this.init();
    if (!this.db) return [];
    return await this.db.getAll('searches');
  }

  async deleteSearch(id: string): Promise<void> {
    await this.init();
    if (!this.db) return;
    await this.db.delete('searches', id);
  }

  // Sync Management
  async getUnsyncedData(): Promise<{
    calculations: any[];
    checklists: any[];
    favorites: any[];
    searches: any[];
  }> {
    await this.init();
    if (!this.db) return { calculations: [], checklists: [], favorites: [], searches: [] };

    const [calculations, checklists, favorites, searches] = await Promise.all([
      this.db.getAll('calculations'),
      this.db.getAll('checklists'),
      this.db.getAll('favorites'),
      this.db.getAll('searches'),
    ]);

    return {
      calculations: calculations.filter(item => !item.synced),
      checklists: checklists.filter(item => !item.synced),
      favorites: favorites.filter(item => !item.synced),
      searches: searches.filter(item => !item.synced),
    };
  }

  async markAsSynced(store: 'calculations' | 'checklists' | 'favorites' | 'searches', id: string): Promise<void> {
    await this.init();
    if (!this.db) return;

    const item = await this.db.get(store, id);
    if (item) {
      item.synced = true;
      await this.db.put(store, item);
    }
  }

  // Storage Info
  async getStorageInfo(): Promise<{ used: number; quota: number; percentage: number }> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      const used = estimate.usage || 0;
      const quota = estimate.quota || 0;
      const percentage = quota > 0 ? (used / quota) * 100 : 0;
      
      return { used, quota, percentage };
    }
    
    return { used: 0, quota: 0, percentage: 0 };
  }

  // Clear all data
  async clearAllData(): Promise<void> {
    await this.init();
    if (!this.db) return;

    const stores = ['calculations', 'checklists', 'favorites', 'searches'] as const;
    for (const store of stores) {
      await this.db.clear(store);
    }
  }
}

export const offlineStorage = new OfflineStorageService();