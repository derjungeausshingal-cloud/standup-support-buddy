import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

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
};

const PreferencesContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "standup.preferences.v1";

function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") return;
  const dark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [prefs, setState] = useState<UserPreferences>(defaultPreferences);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<UserPreferences>;
        setState({ ...defaultPreferences, ...parsed });
      }
    } catch {
      /* Beschädigte Einstellungen werden ignoriert. */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      /* Speichern nicht möglich – App bleibt nutzbar. */
    }
    applyTheme(prefs.theme);
  }, [prefs, hydrated]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme(prefs.theme);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [prefs.theme]);

  const value = useMemo<Ctx>(
    () => ({
      prefs,
      hydrated,
      setPrefs: (patch) => setState((p) => ({ ...p, ...patch })),
      resetPrefs: () => setState(defaultPreferences),
    }),
    [prefs, hydrated],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences muss innerhalb von PreferencesProvider verwendet werden");
  return ctx;
}
