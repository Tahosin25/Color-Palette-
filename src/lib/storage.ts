const FAV_KEY = "cps_favorites";
const EMPTY: string[] = [];

let cache: string[] = EMPTY;
let cacheRaw: string | null = null;

const listeners = new Set<() => void>();

function readFromStorage(): string[] {
  if (typeof window === "undefined") return EMPTY;
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(FAV_KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cacheRaw) return cache;
  cacheRaw = raw;
  if (!raw) {
    cache = EMPTY;
    return cache;
  }
  try {
    const parsed = JSON.parse(raw);
    cache = Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeFavorites(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getFavoritesSnapshot(): string[] {
  return readFromStorage();
}

export function getFavoritesServerSnapshot(): string[] {
  return EMPTY;
}

export function getFavorites(): string[] {
  return readFromStorage();
}

export function isFavorite(id: string): boolean {
  return readFromStorage().includes(id);
}

export function toggleFavorite(id: string): boolean {
  if (typeof window === "undefined") return false;
  const favs = readFromStorage();
  const next = favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id];
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(next));
  } catch {
    return favs.includes(id);
  }
  cacheRaw = null;
  emit();
  return next.includes(id);
}
