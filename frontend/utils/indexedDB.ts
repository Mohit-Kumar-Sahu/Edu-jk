interface DBConfig {
  name: string;
  version: number;
  stores: {
    name: string;
    keyPath: string;
    indexes?: { name: string; keyPath: string; unique?: boolean }[];
  }[];
}

class IndexedDBService {
  private db: IDBDatabase | null = null;
  private dbName: string;
  private version: number;

  constructor(config: DBConfig) {
    this.dbName = config.name;
    this.version = config.version;
    this.initDB(config);
  }

  private async initDB(config: DBConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        config.stores.forEach(store => {
          if (!db.objectStoreNames.contains(store.name)) {
            const objectStore = db.createObjectStore(store.name, { keyPath: store.keyPath });

            store.indexes?.forEach(index => {
              objectStore.createIndex(index.name, index.keyPath, { unique: index.unique });
            });
          }
        });
      };
    });
  }

  async add(storeName: string, data: any): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async get(storeName: string, key: any): Promise<any> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async getAll(storeName: string): Promise<any[]> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async update(storeName: string, data: any): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async delete(storeName: string, key: any): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async clear(storeName: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

// Create IndexedDB instance for EduPath Navigator
const dbConfig: DBConfig = {
  name: 'EduPathNavigatorDB',
  version: 1,
  stores: [
    {
      name: 'userData',
      keyPath: 'id',
      indexes: [
        { name: 'userId', keyPath: 'userId', unique: true }
      ]
    },
    {
      name: 'quizResults',
      keyPath: 'id',
      indexes: [
        { name: 'userId', keyPath: 'userId', unique: false }
      ]
    },
    {
      name: 'achievements',
      keyPath: 'id',
      indexes: [
        { name: 'userId', keyPath: 'userId', unique: false }
      ]
    },
    {
      name: 'syncQueue',
      keyPath: 'id',
      indexes: [
        { name: 'timestamp', keyPath: 'timestamp', unique: false }
      ]
    }
  ]
};

export const indexedDBService = new IndexedDBService(dbConfig);
