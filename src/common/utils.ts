function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

class LocalStorageManager {
  static checkLocalStorage<T>(key: string, maxHours: number): T | null {
    try {
      const cachedData = localStorage.getItem(key);
      const cachedTimestamp = localStorage.getItem(`${key}Timestamp`);

      if (cachedData && cachedTimestamp) {
        const currentTime = new Date().getTime();
        const lastFetchTime = new Date(parseInt(cachedTimestamp)).getTime();
        const timeDifferenceInHours =
          (currentTime - lastFetchTime) / (1000 * 60 * 60);

        if (timeDifferenceInHours < maxHours) {
          const parsedData = JSON.parse(cachedData) as T;
          return parsedData;
        }
      }

      return null;
    } catch (error) {
      console.error("Error while checking localStorage:", error);
      return null;
    }
  }

  static keepInLocalStorage<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      localStorage.setItem(`${key}Timestamp`, new Date().getTime().toString());
    } catch (error) {
      console.error("Error while saving data to localStorage:", error);
    }
  }
}

export { deepEqual, LocalStorageManager };
