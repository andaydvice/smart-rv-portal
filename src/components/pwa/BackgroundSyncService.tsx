import { offlineStorage } from './OfflineStorage';
import { supabase } from '@/integrations/supabase/client';

interface SyncQueueItem {
  id: string;
  type: 'favorite' | 'search' | 'calculation' | 'checklist';
  action: 'create' | 'update' | 'delete';
  data: unknown;
  timestamp: number;
  retries: number;
}

class BackgroundSyncService {
  private syncQueue: SyncQueueItem[] = [];
  private isOnline: boolean = navigator.onLine;
  private syncInProgress: boolean = false;
  private maxRetries: number = 3;

  constructor() {
    this.setupEventListeners();
    this.loadSyncQueue();
    
    // Start periodic sync if online
    if (this.isOnline) {
      this.startPeriodicSync();
    }
  }

  private setupEventListeners() {
    // Online/offline event listeners
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processQueue();
      this.startPeriodicSync();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.stopPeriodicSync();
    });

    // Register background sync with service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        if ('sync' in registration && (registration as any).sync) {
          // Register background sync
          (registration as any).sync.register('background-sync');
        }
      });
    }
  }

  private loadSyncQueue() {
    const saved = localStorage.getItem('sync-queue');
    if (saved) {
      this.syncQueue = JSON.parse(saved);
    }
  }

  private saveSyncQueue() {
    localStorage.setItem('sync-queue', JSON.stringify(this.syncQueue));
  }

  // Add item to sync queue
  addToQueue(type: SyncQueueItem['type'], action: SyncQueueItem['action'], data: unknown): string {
    const id = `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const item: SyncQueueItem = {
      id,
      type,
      action,
      data,
      timestamp: Date.now(),
      retries: 0,
    };

    this.syncQueue.push(item);
    this.saveSyncQueue();

    // Try to sync immediately if online
    if (this.isOnline) {
      setTimeout(() => this.processQueue(), 100);
    }

    return id;
  }

  // Process sync queue
  async processQueue(): Promise<void> {
    if (this.syncInProgress || !this.isOnline || this.syncQueue.length === 0) {
      return;
    }

    this.syncInProgress = true;

    const failedItems: SyncQueueItem[] = [];

    for (const item of this.syncQueue) {
      try {
        await this.syncItem(item);
      } catch (error) {
        item.retries++;
        if (item.retries < this.maxRetries) {
          failedItems.push(item);
        }
      }
    }

    // Update queue with failed items
    this.syncQueue = failedItems;
    this.saveSyncQueue();
    this.syncInProgress = false;
  }

  private async syncItem(item: SyncQueueItem): Promise<void> {
    switch (item.type) {
      case 'favorite':
        await this.syncFavorite(item);
        break;
      case 'search':
        await this.syncSearch(item);
        break;
      case 'calculation':
        await this.syncCalculation(item);
        break;
      case 'checklist':
        await this.syncChecklist(item);
        break;
      default:
        throw new Error(`Unknown sync type: ${item.type}`);
    }
  }

  private async syncFavorite(item: SyncQueueItem): Promise<void> {
    const { action, data } = item;
    const favoriteData = data as any;

    switch (action) {
      case 'create':
        // For now, store in localStorage until database tables are created
        const favorites = JSON.parse(localStorage.getItem('synced-favorites') || '[]');
        favorites.push({
          userId: favoriteData.userId,
          itemType: favoriteData.type,
          itemId: favoriteData.itemId,
          itemData: favoriteData.data,
          syncedAt: Date.now()
        });
        localStorage.setItem('synced-favorites', JSON.stringify(favorites));
        
        // Mark as synced in offline storage
        await offlineStorage.markAsSynced('favorites', favoriteData.offlineId);
        break;

      case 'delete':
        const existingFavorites = JSON.parse(localStorage.getItem('synced-favorites') || '[]');
        const filtered = existingFavorites.filter((fav: any) => 
          !(fav.userId === favoriteData.userId && fav.itemId === favoriteData.itemId)
        );
        localStorage.setItem('synced-favorites', JSON.stringify(filtered));
        break;
    }
  }

  private async syncSearch(item: SyncQueueItem): Promise<void> {
    const { action, data } = item;
    const searchData = data as any;

    if (action === 'create') {
      const { error } = await supabase
        .from('saved_searches')
        .insert({
          user_id: searchData.userId,
          query: searchData.query,
          filters: searchData.filters,
          category: 'general',
        });
      
      if (error) throw error;
      
      // Mark as synced in offline storage
      await offlineStorage.markAsSynced('searches', searchData.offlineId);
    }
  }

  private async syncCalculation(item: SyncQueueItem): Promise<void> {
    const { action, data } = item;
    const calcData = data as any;

    if (action === 'create') {
      // For now, store in localStorage until database tables are created
      const calculations = JSON.parse(localStorage.getItem('synced-calculations') || '[]');
      calculations.push({
        userId: calcData.userId,
        calculatorType: calcData.type,
        inputs: calcData.inputs,
        results: calcData.results,
        syncedAt: Date.now()
      });
      localStorage.setItem('synced-calculations', JSON.stringify(calculations));
      
      // Mark as synced in offline storage
      await offlineStorage.markAsSynced('calculations', calcData.offlineId);
    }
  }

  private async syncChecklist(item: SyncQueueItem): Promise<void> {
    const { action, data } = item;
    const checklistInput = data as any;

    switch (action) {
      case 'create':
      case 'update':
        // For now, store in localStorage until database tables are created
        const checklists = JSON.parse(localStorage.getItem('synced-checklists') || '[]');
        const existingIndex = checklists.findIndex((cl: any) => 
          cl.userId === checklistInput.userId && cl.checklistId === checklistInput.checklistId
        );
        
        const checklistData = {
          userId: checklistInput.userId,
          checklistId: checklistInput.checklistId,
          checklistName: checklistInput.name,
          items: checklistInput.items,
          progress: checklistInput.progress,
          lastModified: checklistInput.lastModified,
          syncedAt: Date.now()
        };
        
        if (existingIndex >= 0) {
          checklists[existingIndex] = checklistData;
        } else {
          checklists.push(checklistData);
        }
        
        localStorage.setItem('synced-checklists', JSON.stringify(checklists));
        
        // Mark as synced in offline storage
        await offlineStorage.markAsSynced('checklists', checklistInput.offlineId);
        break;
    }
  }

  // Get sync status
  getSyncStatus(): { pending: number; lastSync: number | null } {
    const lastSync = localStorage.getItem('last-sync-time');
    return {
      pending: this.syncQueue.length,
      lastSync: lastSync ? parseInt(lastSync) : null,
    };
  }

  // Force sync
  async forceSync(): Promise<void> {
    await this.processQueue();
    localStorage.setItem('last-sync-time', Date.now().toString());
  }

  // Periodic sync
  private syncInterval: NodeJS.Timeout | null = null;

  private startPeriodicSync() {
    if (this.syncInterval) return;

    // Sync every 5 minutes when online
    this.syncInterval = setInterval(() => {
      if (this.isOnline && this.syncQueue.length > 0) {
        this.processQueue();
      }
    }, 5 * 60 * 1000);
  }

  private stopPeriodicSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  // Cleanup
  destroy() {
    this.stopPeriodicSync();
    window.removeEventListener('online', this.processQueue);
    window.removeEventListener('offline', this.stopPeriodicSync);
  }
}

// Export singleton instance
export const backgroundSync = new BackgroundSyncService();

// Hook for React components
export const useBackgroundSync = () => {
  return {
    addToQueue: backgroundSync.addToQueue.bind(backgroundSync),
    forceSync: backgroundSync.forceSync.bind(backgroundSync),
    getSyncStatus: backgroundSync.getSyncStatus.bind(backgroundSync),
  };
};