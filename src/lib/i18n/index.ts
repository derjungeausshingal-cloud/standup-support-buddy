import { langs, type Lang, type PageDict } from "./types";
import { core } from "./core";
import { incident } from "./incident";
import { diary } from "./diary";
import { help } from "./help";
import { advice } from "./advice";
import { infoPages } from "./info";

export { langs };
export type { Lang, PageDict };

const modules: Record<Lang, PageDict>[] = [core, incident, diary, help, advice, infoPages];

function merge(lang: Lang): PageDict {
  return Object.assign({}, ...modules.map((m) => m[lang] ?? {}));
}

export const translations: Record<Lang, PageDict> = Object.fromEntries(
  langs.map((l) => [l, merge(l)]),
) as Record<Lang, PageDict>;
