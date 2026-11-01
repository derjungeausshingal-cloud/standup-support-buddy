import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";

import { PREFERENCES_KEY, type StorageProblem } from "./local-data";
import { useLocalData } from "./use-local-data";

export type ThemeMode = "system" | "light" | "dark";

export type FocusArea = "schule" | "arbeit" | "online" | "privat" | "unsicher";

export const focusLabels: Record<FocusArea, string> = {
  schule: "Schule",
  arbeit: "Arbeit",
  online: "Online",
  privat: "Privates Umfeld",
  unsicher: "Noch unsicher",
};

export type TrustedContact = {
  name: string;
  relation: string;
  phone: string;
  email: string;
};

export const emptyContact: TrustedContact = { name: "", relation: "", phone: "", email: "" };

export type UserPreferences = {
  theme: ThemeMode;
  /** Sprachcode (ISO 639-1) der gewählten Anzeigesprache. */
  language: string;
  onboarded: boolean;
  focus: FocusArea | null;
  /** Diskreter Modus: weniger sichtbare Details auf Übersichten. */
  discreet: boolean;
  trustedContact: TrustedContact | null;
};

const defaultPreferences: UserPreferences = {
  theme: "system",
  language: "de",
  onboarded: false,
  focus: null,
  discreet: false,
  trustedContact: null,
};

type Ctx = {
  prefs: UserPreferences;
  hydrated: boolean;
  setPrefs: (patch: Partial<UserPreferences>) => void;
  resetPrefs: () => void;
  storageProblem: StorageProblem | null;
};

const PreferencesContext = createContext<Ctx | null>(null);
const preferenceKeys = [PREFERENCES_KEY];

function decodePreferences(raw: unknown): UserPreferences {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("Invalid preferences");
  const r = raw as Partial<UserPreferences>;
  if (r.language !== undefined && typeof r.language !== "string")
    throw new Error("Invalid language");
  return { ...defaultPreferences, ...r };
}

function applyTheme(_theme: ThemeMode) {
  if (typeof document === "undefined") return;
  // StandUp ist immer hell gehalten.
  document.documentElement.classList.remove("dark");
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const {
    value: prefs,
    hydrated,
    problem: storageProblem,
    write,
  } = useLocalData(preferenceKeys, defaultPreferences, decodePreferences);
  useEffect(() => {
    applyTheme(prefs.theme);
  }, [prefs.theme]);

  const value = useMemo<Ctx>(
    () => ({
      prefs,
      hydrated,
      storageProblem,
      setPrefs: (patch) => {
        write((p) => ({ ...p, ...patch }));
      },
      resetPrefs: () => {
        write(defaultPreferences);
      },
    }),
    [prefs, hydrated, storageProblem, write],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx)
    throw new Error("usePreferences muss innerhalb von PreferencesProvider verwendet werden");
  return ctx;
}
