import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clock, Globe, MapPin, Phone, Search, X } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { useI18n } from "@/lib/i18n";
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
  const { t } = useI18n();
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
        {s.themen.map((th) => (
          <span key={th} className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-bold text-primary">
            {t(`adv.topic.${th}`)}
          </span>
        ))}
      </div>
      {anrufbar ? (
        <a href={`tel:${s.tel.replace(/\s/g, "")}`} className="btn-primary mt-4">
          <Phone className="h-5 w-5" />
          {t("adv.card.call", { tel: s.tel })}
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
          {t("adv.card.website")}
        </a>
      ) : null}
    </li>
  );
}

function BeratungPage() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [thema, setThema] = useState<Thema | null>(null);

  const { ort, lokal, bundesweit, unbekannterOrt } = useMemo(
    () => sucheStellen(query, thema),
    [query, thema],
  );

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title={t("adv.head.title")} subtitle={t("adv.head.subtitle")} />

      <main className="mx-auto max-w-md px-5">
        <div className="relative mt-5">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            inputMode="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("adv.search.placeholder")}
            className="field-input pl-12 pr-11"
          />
          {query ? (
            <button
              type="button"
              aria-label={t("adv.search.clear")}
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-muted text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {themen.map((th) => {
            const active = thema === th;
            return (
              <button
                key={th}
                type="button"
                aria-pressed={active}
                onClick={() => setThema(active ? null : th)}
                className={`rounded-full px-3.5 py-2 text-sm font-bold ${
                  active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {t(`adv.topic.${th}`)}
              </button>
            );
          })}
        </div>

        {ort ? (
          <section className="card-tile mt-4 border-primary/30 bg-primary-soft p-4">
            <p className="text-sm font-extrabold text-primary">{ort.label}</p>
            <p className="mt-1 text-sm leading-snug">
              {t("adv.region.label", { region: ort.region, land: ort.land })}
            </p>
          </section>
        ) : null}

        {unbekannterOrt ? (
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {t("adv.unknownPlace", { query })}
          </p>
        ) : null}

        {ort ? (
          <>
            <h2 className="mt-6 text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
              {t("adv.local.heading", { n: lokal.length })}
            </h2>
            {lokal.length > 0 ? (
              <ul className="mt-3 grid gap-3">
                {lokal.map((s) => (
                  <StelleCard key={s.id} s={s} />
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                {t("adv.local.empty")}
              </p>
            )}
          </>
        ) : null}

        <h2 className="mt-6 text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
          {t("adv.national.heading", { n: bundesweit.length })}
        </h2>
        {bundesweit.length > 0 ? (
          <ul className="mt-3 grid gap-3">
            {bundesweit.map((s) => (
              <StelleCard key={s.id} s={s} />
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            {t("adv.national.empty")}
          </p>
        )}

        {thema ? (
          <button type="button" onClick={() => setThema(null)} className="btn-ghost mt-4">
            {t("adv.resetFilter")}
          </button>
        ) : null}
      </main>

      <BottomNav />
    </div>
  );
}
