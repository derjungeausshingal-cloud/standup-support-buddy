import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clock, Globe, MapPin, Phone, Search, X } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { sucheStellen, themen, type Stelle, type Thema } from "@/lib/beratung";

export const Route = createFileRoute("/beratung")({
  head: () => ({
    meta: [
      { title: "Beratung & Hilfe finden – StandUp" },
      { name: "description", content: "Beratungsstellen in ganz Deutschland nach Stadt oder Postleitzahl suchen und nach Themen wie Mobbing, Diskriminierung oder Gewalt filtern." },
      { property: "og:title", content: "Beratung & Hilfe finden – StandUp" },
      { property: "og:description", content: "Anlaufstellen finden, die zu deiner Situation passen." },
    ],
  }),
  component: BeratungPage,
});

function StelleCard({ s }: { s: Stelle }) {
  const anrufbar = /^[\d\s]+$/.test(s.tel);
  return (
    <li className="card-tile p-4">
      <h3 className="text-base font-extrabold leading-tight">{s.name}</h3>
      <p className="mt-1 text-sm leading-snug text-muted-foreground">{s.beschreibung}</p>
      <div className="mt-3 grid gap-1.5 text-sm">
        <span className="flex items-center gap-2">
          {s.art === "lokal" ? (
            <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
          ) : (
            <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
          )}
          {s.ort}
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
      {anrufbar ? (
        <a href={`tel:${s.tel.replace(/\s/g, "")}`} className="btn-primary mt-4">
          <Phone className="h-5 w-5" />
          {s.tel} anrufen
        </a>
      ) : (
        <p className="mt-4 text-sm font-bold">{s.tel}</p>
      )}
      {s.web ? (
        <a
          href={s.web}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost mt-2"
        >
          <Globe className="h-5 w-5" />
          Website öffnen
        </a>
      ) : null}
    </li>
  );
}

function BeratungPage() {
  const [query, setQuery] = useState("");
  const [thema, setThema] = useState<Thema | null>(null);

  const { ort, lokal, bundesweit, unbekannterOrt } = useMemo(
    () => sucheStellen(query, thema),
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
            inputMode="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ort, Stadt oder PLZ (z. B. Köln, 04109)"
            className="field-input pl-12 pr-11"
          />
          {query ? (
            <button
              type="button"
              aria-label="Suche löschen"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-muted text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
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

        {ort ? (
          <section className="card-tile mt-4 border-primary/30 bg-primary-soft p-4">
            <p className="text-sm font-extrabold text-primary">{ort.label}</p>
            <p className="mt-1 text-sm leading-snug">
              Region: {ort.region} · {ort.land}
            </p>
          </section>
        ) : null}

        {unbekannterOrt ? (
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Zu „{query}“ konnten wir keinen Ort zuordnen. Versuch es mit einer Postleitzahl (z. B. 20095) oder
            einer größeren Stadt in der Nähe. Bundesweite Angebote findest du unten.
          </p>
        ) : null}

        {ort ? (
          <>
            <h2 className="mt-6 text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
              In der Region ({lokal.length})
            </h2>
            {lokal.length > 0 ? (
              <ul className="mt-3 grid gap-3">
                {lokal.map((s) => (
                  <StelleCard key={s.id} s={s} />
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                Für dieses Thema haben wir vor Ort keine passende Stelle gefunden. Die bundesweiten Angebote
                helfen dir aber auch weiter.
              </p>
            )}
          </>
        ) : null}

        <h2 className="mt-6 text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
          Bundesweit erreichbar ({bundesweit.length})
        </h2>
        {bundesweit.length > 0 ? (
          <ul className="mt-3 grid gap-3">
            {bundesweit.map((s) => (
              <StelleCard key={s.id} s={s} />
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Für dieses Thema gibt es hier gerade keinen bundesweiten Eintrag. Du kannst den Themenfilter
            zurücksetzen.
          </p>
        )}

        {thema ? (
          <button type="button" onClick={() => setThema(null)} className="btn-ghost mt-4">
            Themenfilter zurücksetzen
          </button>
        ) : null}
      </main>

      <BottomNav />
    </div>
  );
}
