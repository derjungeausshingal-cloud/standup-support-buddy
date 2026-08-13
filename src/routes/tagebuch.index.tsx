import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BookOpen, ChevronRight, FileBarChart, Paperclip, Plus, Search, X, Zap } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import {
  formatDate,
  formatTime,
  incidentDate,
  kindLabels,
  sortByDateDesc,
  useIncidents,
  type Incident,
  type IncidentKind,
} from "@/lib/incidents";
import { usePreferences } from "@/lib/preferences";

export const Route = createFileRoute("/tagebuch/")({
  head: () => ({
    meta: [
      { title: "Mein Tagebuch – StandUp" },
      {
        name: "description",
        content:
          "Chronologische Übersicht deiner dokumentierten Vorfälle – mit Suche, Filter nach Art, Ort und Zeitraum.",
      },
      { property: "og:title", content: "Mein Tagebuch – StandUp" },
      { property: "og:description", content: "Deine dokumentierten Vorfälle an einem ruhigen Ort." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TagebuchPage,
});

type Range = "alle" | "30" | "90" | "365";

const rangeLabels: Record<Range, string> = {
  alle: "Gesamter Zeitraum",
  "30": "Letzte 30 Tage",
  "90": "Letzte 3 Monate",
  "365": "Letztes Jahr",
};

function withinRange(i: Incident, range: Range) {
  if (range === "alle") return true;
  const date = new Date(incidentDate(i));
  if (Number.isNaN(date.getTime())) return true;
  const days = (Date.now() - date.getTime()) / 86_400_000;
  return days <= Number(range);
}

function monthLabel(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Ohne Datum";
  return d.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
}

function TagebuchPage() {
  const { incidents, hydrated } = useIncidents();
  const { prefs } = usePreferences();
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<IncidentKind | "alle">("alle");
  const [place, setPlace] = useState("alle");
  const [range, setRange] = useState<Range>("alle");

  const usedKinds = useMemo(() => {
    const set = new Set<IncidentKind>();
    incidents.forEach((i) => {
      if (i.kind) set.add(i.kind);
    });
    return [...set];
  }, [incidents]);

  const usedPlaces = useMemo(() => {
    const set = new Set<string>();
    incidents.forEach((i) => {
      if (i.place.trim()) set.add(i.place.trim());
    });
    return [...set].sort((a, b) => a.localeCompare(b, "de"));
  }, [incidents]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sortByDateDesc(
      incidents.filter((i) => {
        if (kind !== "alle" && i.kind !== kind) return false;
        if (place !== "alle" && i.place.trim() !== place) return false;
        if (!withinRange(i, range)) return false;
        if (!q) return true;
        return [i.description, i.place, i.persons, i.witnesses, i.notes, i.impact, i.nextStep]
          .join(" ")
          .toLowerCase()
          .includes(q);
      }),
    );
  }, [incidents, query, kind, place, range]);

  const groups = useMemo(() => {
    const map = new Map<string, Incident[]>();
    filtered.forEach((i) => {
      const label = monthLabel(incidentDate(i));
      const list = map.get(label);
      if (list) list.push(i);
      else map.set(label, [i]);
    });
    return [...map.entries()];
  }, [filtered]);

  const hasFilters = query.trim() !== "" || kind !== "alle" || place !== "alle" || range !== "alle";

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Mein Tagebuch" back={false} subtitle="Alles, was du bisher festgehalten hast." />

      <main className="mx-auto max-w-md px-5">
        {incidents.length > 1 ? (
          <Link
            to="/bericht"
            className="card-tile mt-5 flex items-center gap-3 border-warning/30 bg-warning-soft p-4"
          >
            <FileBarChart className="h-5 w-5 shrink-0 text-warning" />
            <span className="min-w-0 text-sm font-bold">
              Du hast mehrere Einträge – du kannst daraus eine Zusammenfassung erstellen.
            </span>
          </Link>
        ) : null}

        {incidents.length > 0 ? (
          <section className="mt-5 grid gap-3">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <span className="sr-only">Einträge durchsuchen</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Suchen: Wort, Ort, Person …"
                className="field-input pl-11"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Art</span>
                <select
                  value={kind}
                  onChange={(e) => setKind(e.target.value as IncidentKind | "alle")}
                  className="field-input"
                >
                  <option value="alle">Alle Arten</option>
                  {usedKinds.map((k) => (
                    <option key={k} value={k}>
                      {kindLabels[k]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Zeitraum
                </span>
                <select
                  value={range}
                  onChange={(e) => setRange(e.target.value as Range)}
                  className="field-input"
                >
                  {(Object.keys(rangeLabels) as Range[]).map((r) => (
                    <option key={r} value={r}>
                      {rangeLabels[r]}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {usedPlaces.length > 0 ? (
              <label className="grid gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Ort</span>
                <select value={place} onChange={(e) => setPlace(e.target.value)} className="field-input">
                  <option value="alle">Alle Orte</option>
                  {usedPlaces.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-muted-foreground">
                {filtered.length} von {incidents.length} {incidents.length === 1 ? "Eintrag" : "Einträgen"}
              </p>
              {hasFilters ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setKind("alle");
                    setPlace("alle");
                    setRange("alle");
                  }}
                  className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-primary"
                >
                  <X className="h-4 w-4" />
                  Filter zurücksetzen
                </button>
              ) : null}
            </div>
          </section>
        ) : null}

        {!hydrated ? null : incidents.length === 0 ? (
          <section className="card-tile mt-6 grid justify-items-center gap-3 p-8 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
              <BookOpen className="h-7 w-7" />
            </span>
            <p className="text-base font-extrabold">Noch keine Einträge</p>
            <p className="text-sm text-muted-foreground">
              Wenn du möchtest, kannst du einen Vorfall dokumentieren. Du entscheidest, was du festhältst.
            </p>
            <Link to="/vorfall" className="btn-primary mt-2">
              <Plus className="h-5 w-5" />
              Vorfall dokumentieren
            </Link>
            <Link to="/vorfall/schnell" className="btn-ghost">
              <Zap className="h-5 w-5" />
              Schnell festhalten
            </Link>
          </section>
        ) : filtered.length === 0 ? (
          <section className="card-tile mt-5 grid justify-items-center gap-2 p-8 text-center">
            <p className="text-base font-extrabold">Keine passenden Einträge</p>
            <p className="text-sm text-muted-foreground">
              Ändere die Suche oder setze die Filter zurück, um wieder alle Einträge zu sehen.
            </p>
          </section>
        ) : (
          <div className="mt-5 grid gap-6">
            {groups.map(([label, list]) => (
              <section key={label}>
                <h2 className="text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
                  {label}
                </h2>
                <ul className="mt-2 grid gap-3">
                  {list.map((i) => (
                    <li key={i.id}>
                      <Link
                        to="/tagebuch/$id"
                        params={{ id: i.id }}
                        className="card-tile grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-extrabold text-primary">
                              {i.kind ? kindLabels[i.kind] : "Ohne Kategorie"}
                            </span>
                            <span className="text-xs font-semibold text-muted-foreground">
                              {formatDate(incidentDate(i))}
                              {i.time ? ` · ${formatTime(i.time)}` : ""}
                            </span>
                          </div>
                          {prefs.discreet ? (
                            <p className="mt-2 text-sm leading-snug text-muted-foreground">
                              Details ausgeblendet (diskreter Modus)
                            </p>
                          ) : (
                            <p className="mt-2 line-clamp-2 text-sm leading-snug text-foreground/85">
                              {i.description || "Keine Beschreibung"}
                            </p>
                          )}
                          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-muted-foreground">
                            {i.place && !prefs.discreet ? <span className="truncate">{i.place}</span> : null}
                            {i.evidence.length > 0 ? (
                              <span className="flex items-center gap-1">
                                <Paperclip className="h-3.5 w-3.5" />
                                {i.evidence.length} {i.evidence.length === 1 ? "Beweis" : "Beweise"}
                              </span>
                            ) : null}
                            {i.nextStep && !i.nextStepDone ? (
                              <span className="text-warning">Offener nächster Schritt</span>
                            ) : null}
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
