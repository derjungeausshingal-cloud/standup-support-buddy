export const INCIDENTS_KEY = "standup.incidents.v2";
export const LEGACY_INCIDENTS_KEY = "standup.incidents.v1";
export const PREFERENCES_KEY = "standup.preferences.v1";
export const APP_DATA_KEYS = [INCIDENTS_KEY, LEGACY_INCIDENTS_KEY, PREFERENCES_KEY] as const;
export const DATA_CLEARED_EVENT = "standup:data-cleared";
export type StorageProblem = "load" | "save" | "delete" | "conflict";

type BrowserStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

/** No mount-time writes: unreadable data must remain available for recovery. */
export class LocalDataStore<T> {
  private snapshot: (string | null)[] | null = null;
  private storage: () => BrowserStorage;
  private keys: readonly string[];
  private fallback: T;
  private decode: (data: unknown) => T;

  constructor(
    storage: () => BrowserStorage,
    keys: readonly string[],
    fallback: T,
    decode: (data: unknown) => T,
  ) {
    this.storage = storage;
    this.keys = keys;
    this.fallback = fallback;
    this.decode = decode;
  }

  blockWrites() {
    this.snapshot = null;
  }

  read(): { value: T; problem: StorageProblem | null } {
    try {
      const values = this.keys.map((key) => this.storage().getItem(key));
      const raw = values.find((value) => value !== null);
      const value = raw === undefined ? this.fallback : this.decode(JSON.parse(raw));
      this.snapshot = values;
      return { value, problem: null };
    } catch {
      this.snapshot = null;
      return { value: this.fallback, problem: "load" };
    }
  }

  write(value: T): StorageProblem | null {
    if (!this.snapshot) return "load";
    try {
      const storage = this.storage();
      const current = this.keys.map((key) => storage.getItem(key));
      if (current.some((raw, i) => raw !== this.snapshot![i])) return "conflict";
      const raw = JSON.stringify(value);
      storage.setItem(this.keys[0]!, raw);
      if (storage.getItem(this.keys[0]!) !== raw) return "save";
      this.snapshot = [raw, ...current.slice(1)];
      return null;
    } catch {
      return "save";
    }
  }
}

/** Remove only StandUp's keys; still attempt every key after an individual failure. */
export function deleteAppData(storage: () => BrowserStorage): boolean {
  let success = true;
  for (const key of APP_DATA_KEYS) {
    try {
      storage().removeItem(key);
      if (storage().getItem(key) !== null) success = false;
    } catch {
      success = false;
    }
  }
  return success;
}
