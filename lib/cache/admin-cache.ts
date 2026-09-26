/**
 * In-Memory Stale-While-Revalidate (SWR) Cache
 * Enables 0ms instantaneous tab switching across dashboards by serving
 * cached in-memory data while silently revalidating in the background.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const memoryStore = new Map<string, CacheEntry<unknown>>();
const DEFAULT_TTL_MS = 3 * 60 * 1000; // 3 minutes fresh cache

export function getCachedDashboardData<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  const entry = memoryStore.get(key);
  if (!entry) return null;
  return entry.data as T;
}

export function setCachedDashboardData<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  memoryStore.set(key, {
    data,
    timestamp: Date.now(),
  });
}

export function isDashboardCacheFresh(key: string, maxAgeMs = DEFAULT_TTL_MS): boolean {
  if (typeof window === "undefined") return false;
  const entry = memoryStore.get(key);
  if (!entry) return false;
  return Date.now() - entry.timestamp < maxAgeMs;
}

export function invalidateDashboardCache(prefixOrKey?: string): void {
  if (typeof window === "undefined") return;
  if (!prefixOrKey) {
    memoryStore.clear();
    return;
  }
  for (const key of memoryStore.keys()) {
    if (key === prefixOrKey || key.startsWith(prefixOrKey)) {
      memoryStore.delete(key);
    }
  }
}
