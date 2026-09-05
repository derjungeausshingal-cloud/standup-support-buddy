/** Unterstützte Sprachen: Deutsch, Englisch, Türkisch, Arabisch, Russisch. */
export const langs = ["de", "en", "tr", "ar", "ru"] as const;
export type Lang = (typeof langs)[number];

/** Ein Wörterbuch für einen Bereich der App. */
export type PageDict = Record<string, string>;
