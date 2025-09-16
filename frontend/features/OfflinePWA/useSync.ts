import { useEffect, useState } from 'react';
import { indexedDBService } from '../../utils/indexedDB';

export function useSync() {
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function syncData() {
      setSyncing(true);
      setError(null);
      try {
        const syncQueue = await indexedDBService.getAll('syncQueue');
        for (const item of syncQueue) {
          // TODO: Implement API sync call based on item type and data
          // Example:
          // await api.syncData(item);
          // After successful sync, remove from queue
          await indexedDBService.delete('syncQueue', item.id);
        }
      } catch (err) {
        setError('Failed to sync data');
        console.error(err);
      } finally {
        setSyncing(false);
      }
    }

    if (navigator.onLine) {
      syncData();
    }

    window.addEventListener('online', syncData);
    return () => {
      window.removeEventListener('online', syncData);
    };
  }, []);

  return { syncing, error };
}
