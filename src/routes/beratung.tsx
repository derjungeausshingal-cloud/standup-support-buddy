import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clock, Globe, Phone, Search } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/beratung")({
  head: () => ({
    meta: [
      { title: "Beratung & Hilfe finden – StandUp" },
      { name: "description", content: "Professionelle Beratungsstellen und Anlaufstellen bei Mobbing, Diskriminierung und Gewalt – nach Ort und Thema filtern." },
      { property: "og:title", content: "Beratung & Hilfe finden – StandUp" },
      { property: "og:description", content: "Anlaufstellen finden, die zu deiner Situation passen." },
    ],
  }),
  component: BeratungPage,
});

type Stelle = {
  name: string;
  ort: string;
  themen: string[];
  tel: string;
  zeiten: string;
  beschreibung: string;
};

const stellen: Stelle[] = [
  {
    name: "Nummer gegen Kummer (Kinder- und Jugendtelefon)",
    ort: "Bundesweit / Telefon",
    themen: ["Mobbing", "Schule", "Krise"],
    tel: "116 111",
    zeiten: "Mo–Sa 14–20 Uhr",
    beschreibung: "Kostenlose und anonyme Beratung für Kinder und Jugendliche.",
  },
  {
    name: "Telefonseelsorge",
    ort: "Bundesweit / Telefon",
    themen: ["Krise", "Belastung"],
    tel: "0800 111 0 111",
    zeiten: "Rund um die Uhr",
    beschreibung: "Vertrauliche Gespräche, wenn dir etwas schwer auf der Seele liegt.",
  },
  {
    name: "Antidiskriminierungsstelle des Bundes",
    ort: "Bundesweit / Online",
    themen: ["Diskriminierung", "Arbeit", "Recht"],
    tel: "0800 546 546 5",
    zeiten: "Mo–Do 9–15 Uhr",
    beschreibung: "Erstberatung zu Diskriminierung und rechtlichen Möglichkeiten.",
  },
  {
    name: "Hilfetelefon Gewalt gegen Frauen",
    ort: "Bundesweit / Telefon",
    themen: ["Gewalt", "Bedrohung"],
    tel: "116 016",
    zeiten: "Rund um die Uhr",
    beschreibung: "Beratung in vielen Sprachen, anonym und kostenfrei.",
  },
  {
    name: "Schulpsychologische Beratungsstelle",
    ort: "Vor Ort",
    themen: ["Mobbing", "Schule"],
    tel: "Über deine Schule erreichbar",
    zeiten: "Nach Vereinbarung",
    beschreibung: "Unterstützung bei Konflikten in der Schule – auch gemeinsam mit deinen Eltern.",
  },
  {
    name: "Weisser Ring – Opferhilfe",
    ort: "Bundesweit / Vor Ort",
    themen: ["Gewalt", "Bedrohung", "Recht"],
    tel: "116 006",
    zeiten: "Täglich 7–22 Uhr",
    beschreibung: "Begleitung nach Straftaten, auf Wunsch auch bei Behördengängen.",
  },
];

const themen = ["Mobbing", "Diskriminierung", "Gewalt", "Bedrohung", "Schule", "Arbeit", "Recht", "Krise"];

function BeratungPage() {
  const [query, setQuery] = useState("");
  const [thema, setThema] = useState<string | null>(null);

  const results = useMemo(
    () =>
      stellen.filter((s) => {
        const q = query.trim().toLowerCase();
        const matchQuery =
          !q ||
          s.name.toLowerCase().includes(q) ||
          s.ort.toLowerCase().includes(q) ||
          s.beschreibung.toLowerCase().includes(q);
        const matchThema = !thema || s.themen.includes(thema);
        return matchQuery && matchThema;
      }),
    [query, thema],
  );

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Beratung & Hilfe" subtitle="Du entscheidest, ob und wen du kontaktierst." />

      <main className="mx-auto max-w-md px-5">
        <div className="relative mt-5">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ort oder Stichwort suchen"
            className="field-input pl-12"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {themen.map((t) => {
            const active = thema === t;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={active}
                onClick={() => setThema(active ? null : t)}
                className={`rounded-full px-3.5 py-2 text-sm font-bold ${
                  active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "Anlaufstelle" : "Anlaufstellen"} gefunden
        </p>

        <ul className="mt-3 grid gap-3">
          {results.map((s) => (
            <li key={s.name} className="card-tile p-4">
              <h2 className="text-base font-extrabold leading-tight">{s.name}</h2>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">{s.beschreibung}</p>
              <div className="mt-3 grid gap-1.5 text-sm">
                <span className="flex items-center gap-2">
                  <Globe className="h-4 w-4 shrink-0 text-muted-foreground" /> {s.ort}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-muted-foreground" /> {s.zeiten}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.themen.map((t) => (
                  <span key={t} className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-bold text-primary">
                    {t}
                  </span>
                ))}
              </div>
              {/^[\d\s]+$/.test(s.tel) ? (
                <a href={`tel:${s.tel.replace(/\s/g, "")}`} className="btn-primary mt-4">
                  <Phone className="h-5 w-5" />
                  {s.tel} anrufen
                </a>
              ) : (
                <p className="mt-4 text-sm font-bold">{s.tel}</p>
              )}
            </li>
          ))}
        </ul>

        {results.length === 0 ? (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Keine Treffer. Du kannst die Filter zurücksetzen oder anders suchen.
          </p>
        ) : null}
      </main>

      <BottomNav />
    </div>
  );
}
