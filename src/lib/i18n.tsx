import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { usePreferences } from "@/lib/preferences";
import { langs, translations, type Lang } from "@/lib/i18n/index";

/**
 * Zentrales Sprachsystem für StandUp.
 * Deutsch ist die Basissprache; fehlende Übersetzungen fallen auf Deutsch zurück.
 */

export type TranslationKey = string;
export { translations };

/** Sprachen, für die eine Übersetzung vorliegt. */
export const supportedLanguages: string[] = [...langs];

const rtlLanguages = new Set(["ar", "fa", "he", "ur"]);

export function languageLabel(code: string, uiLocale: string) {
  try {
    return new Intl.DisplayNames([uiLocale], { type: "language" }).of(code) ?? code;
  } catch {
    return code;
  }
}

type I18nCtx = {
  lang: string;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const { prefs } = usePreferences();
  const lang: Lang = (langs as readonly string[]).includes(prefs.language)
    ? (prefs.language as Lang)
    : "de";

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = rtlLanguages.has(lang) ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo<I18nCtx>(() => {
    const dict = translations[lang] ?? {};
    const base = translations.de;
    return {
      lang,
      t: (key, vars) => {
        let text = dict[key] ?? base[key] ?? String(key);
        if (vars) {
          for (const [k, v] of Object.entries(vars)) {
            text = text.replaceAll(`{${k}}`, String(v));
          }
        }
        return text;
      },
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n muss innerhalb von I18nProvider verwendet werden");
  return ctx;
}
