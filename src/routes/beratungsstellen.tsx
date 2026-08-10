import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, Globe, Phone, Clock, ChevronDown, X } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/beratungsstellen")({
  head: () => ({
    meta: [
      { title: "Beratungsstellen finden – standUp" },
      {
        name: "description",
        content:
          "Suche Beratungsstellen nach Ort und Thema – anonym, kostenlos und vertraulich. Mit Details zu Kontakt und Öffnungszeiten.",
      },
      { property: "og:title", content: "Beratungsstellen finden – standUp" },
      {
        property: "og:description",
        content: "Anlaufstellen in deiner Nähe und online – filterbar nach Ort und Thema.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BeratungPage,
});

type Stelle = {
  name: string;
  ort: string;
  stadt: string;
  themen: string[];
  online: boolean;
  telefon: string;
  zeiten: string;
  beschreibung: string;
  sprachen: string;
};

const stellen: Stelle[] = [
  {
    name: "Weißer Ring",
    ort: "Beratungsstellen vor Ort",
    stadt: "Bundesweit",
    themen: ["Gewalt", "Opferhilfe"],
    online: false,
    telefon: "116 006",
    zeiten: "Täglich 7–22 Uhr",
    beschreibung:
      "Begleitung für Betroffene von Straftaten: persönliche Gespräche, Hilfe bei Anzeigen und Begleitung zu Terminen.",
    sprachen: "Deutsch, Englisch",
  },
  {
    name: "Antidiskriminierungsstelle des Bundes",
    ort: "Online & telefonisch",
    stadt: "Bundesweit",
    themen: ["Diskriminierung", "Recht"],
    online: true,
    telefon: "0800 546 546 5",
    zeiten: "Mo–Fr 9–15 Uhr",
    beschreibung:
      "Kostenlose Erstberatung bei Diskriminierung – erklärt deine Rechte und mögliche nächste Schritte.",
    sprachen: "Deutsch, Englisch, Leichte Sprache",
  },
  {
    name: "Schulpsychologischer Dienst Berlin",
    ort: "Beratung vor Ort",
    stadt: "Berlin",
    themen: ["Schule", "Mobbing"],
    online: false,
    telefon: "030 90227 5555",
    zeiten: "Mo–Do 9–16 Uhr",
    beschreibung:
      "Unterstützung bei Konflikten in der Schule, Mobbing und Prüfungsangst – auch ohne Wissen der Schule.",
    sprachen: "Deutsch",
  },
  {
    name: "JugendNotmail",
    ort: "Online-Beratung, anonym",
    stadt: "Online",
    themen: ["Jugendliche", "Psyche"],
    online: true,
    telefon: "Nur Chat & Mail",
    zeiten: "Antwort meist in 48 Std.",
    beschreibung:
      "Anonyme Online-Beratung für junge Menschen bis 25 – per geschütztem Postfach oder Chat.",
    sprachen: "Deutsch",
  },
  {
    name: "Pro Familia München",
    ort: "Beratungsstelle & Video",
    stadt: "München",
    themen: ["Sexualität", "Partnerschaft"],
    online: true,
    telefon: "089 330 840",
    zeiten: "Mo–Fr 9–13 Uhr",
    beschreibung:
      "Vertrauliche Beratung zu Sexualität, Partnerschaft und Grenzverletzungen – auf Wunsch anonym.",
    sprachen: "Deutsch, Türkisch",
  },
  {
    name: "Frauennotruf Hamburg",
    ort: "Beratung & Begleitung",
    stadt: "Hamburg",
    themen: ["Gewalt", "Sexualität"],
    online: false,
    telefon: "040 255 566",
    zeiten: "Mo, Di, Do 10–13 Uhr",
    beschreibung:
      "Fachberatung nach sexualisierter Gewalt, mit Begleitung zu Polizei, Ärztinnen und Gericht.",
    sprachen: "Deutsch, Englisch",
  },
  {
    name: "Nummer gegen Kummer",
    ort: "Telefonisch & online",
    stadt: "Bundesweit",
    themen: ["Jugendliche", "Psyche", "Mobbing"],
    online: true,
    telefon: "116 111",
    zeiten: "Mo–Sa 14–20 Uhr",
    beschreibung: "Anonymes Zuhören für Kinder und Jugendliche – kostenlos und ohne Anmeldung.",
    sprachen: "Deutsch",
  },
  {
    name: "Beratungsstelle Köln – Wegweiser",
    ort: "Beratung vor Ort",
    stadt: "Köln",
    themen: ["Recht", "Diskriminierung"],
    online: false,
    telefon: "0221 221 0",
    zeiten: "Di & Do 10–17 Uhr",
    beschreibung: "Orientierung zu rechtlichen Möglichkeiten, Anzeige und Unterstützung im Alltag.",
    sprachen: "Deutsch, Arabisch",
  },
];

const orte = ["Bundesweit", "Online", "Berlin", "Hamburg", "München", "Köln"];
const themen = Array.from(new Set(stellen.flatMap((s) => s.themen))).sort();

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 text-base font-semibold transition ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-primary-soft text-primary hover:opacity-90"
      }`}
    >
      {children}
    </button>
  );
}

function BeratungPage() {
  const [q, setQ] = useState("");
  const [ort, setOrt] = useState<string | null>(null);
  const [thema, setThema] = useState<string | null>(null);
  const [offen, setOffen] = useState<string | null>(null);

  const gefiltert = useMemo(() => {
    const suche = q.trim().toLowerCase();
    return stellen.filter((s) => {
      const textTreffer =
        suche === "" ||
        (s.name + s.ort + s.stadt + s.themen.join(" ") + s.beschreibung)
          .toLowerCase()
          .includes(suche);
      const ortTreffer = !ort || s.stadt === ort || (ort === "Online" && s.online);
      const themaTreffer = !thema || s.themen.includes(thema);
      return textTreffer && ortTreffer && themaTreffer;
    });
  }, [q, ort, thema]);

  const hatFilter = Boolean(ort || thema || q);

  return (
    <div className="min-h-screen pb-28">
      <AppHeader back subtitle="Anonym, kostenlos und vertraulich." />

      <main className="mx-auto max-w-md px-5">
        <h1 className="mt-7 text-2xl font-extrabold">Beratungsstellen finden</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Suche nach Ort oder Thema. Tippe auf eine Stelle für Details.
        </p>

        <div className="card-tile mt-4 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ort oder Thema suchen"
            aria-label="Ort oder Thema suchen"
            className="min-w-0 bg-transparent text-base outline-none"
          />
          {q && (
            <button type="button" onClick={() => setQ("")} aria-label="Suche löschen">
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
        </div>

        <h2 className="mt-6 text-base font-bold">Ort</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {orte.map((o) => (
            <Chip key={o} active={ort === o} onClick={() => setOrt(ort === o ? null : o)}>
              {o}
            </Chip>
          ))}
        </div>

        <h2 className="mt-5 text-base font-bold">Thema</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {themen.map((t) => (
            <Chip key={t} active={thema === t} onClick={() => setThema(thema === t ? null : t)}>
              {t}
            </Chip>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-base text-muted-foreground">
            {gefiltert.length} {gefiltert.length === 1 ? "Treffer" : "Treffer"}
          </p>
          {hatFilter && (
            <button
              type="button"
              onClick={() => {
                setQ("");
                setOrt(null);
                setThema(null);
              }}
              className="text-base font-semibold text-primary"
            >
              Filter zurücksetzen
            </button>
          )}
        </div>

        <div className="mt-3 grid gap-4">
          {gefiltert.map((s) => {
            const isOpen = offen === s.name;
            return (
              <div key={s.name} className="card-tile p-5">
                <button
                  type="button"
                  onClick={() => setOffen(isOpen ? null : s.name)}
                  aria-expanded={isOpen}
                  className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 text-left"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                    {s.online ? <Globe className="h-6 w-6" /> : <MapPin className="h-6 w-6" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-lg font-bold leading-tight">{s.name}</span>
                    <span className="block text-base text-muted-foreground">
                      {s.stadt} · {s.ort}
                    </span>
                    <span className="mt-2 flex flex-wrap gap-2">
                      {s.themen.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-primary"
                        >
                          {t}
                        </span>
                      ))}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="mt-4 grid gap-3 border-t border-border pt-4">
                    <p className="text-base">{s.beschreibung}</p>
                    <p className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 text-base">
                      <Phone className="h-5 w-5 text-primary" />
                      <span className="min-w-0">{s.telefon}</span>
                    </p>
                    <p className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 text-base">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="min-w-0">{s.zeiten}</span>
                    </p>
                    <p className="text-base text-muted-foreground">Sprachen: {s.sprachen}</p>
                  </div>
                )}
              </div>
            );
          })}
          {gefiltert.length === 0 && (
            <p className="text-base text-muted-foreground">
              Keine Treffer. Setz die Filter zurück oder such mit einem anderen Wort.
            </p>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
