export const INCIDENTS_KEY = "standup.incidents.v2";
export const LEGACY_INCIDENTS_KEY = "standup.incidents.v1";
export const PREFERENCES_KEY = "standup.preferences.v1";
export const VAULT_KEY = "standup.vault.v1";
export const APP_DATA_KEYS = [
  INCIDENTS_KEY,
  LEGACY_INCIDENTS_KEY,
  PREFERENCES_KEY,
  VAULT_KEY,
] as const;
export const DATA_CLEARED_EVENT = "standup:data-cleared";
export type StorageProblem = "load" | "save" | "delete" | "conflict";

type BrowserStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

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
