import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Accessibility, Database, Globe, Info, Lock, Trash2 } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { useIncidents } from "@/lib/incidents";
import { usePreferences } from "@/lib/preferences";

export const Route = createFileRoute("/einstellungen")({
  head: () => ({
    meta: [
      { title: "Einstellungen – StandUp" },
      { name: "description", content: "Datenschutz, gespeicherte Daten, Daten löschen, Barrierefreiheit, Sprache und Infos über StandUp." },
      { property: "og:title", content: "Einstellungen – StandUp" },
      { property: "og:description", content: "Deine Daten, deine Entscheidungen." },
    ],
  }),
  component: EinstellungenPage,
});

/** Alle ISO-639-1-Sprachcodes; Namen werden lokalisiert angezeigt. */
const languageCodes =
  "aa ab ae af ak am an ar as av ay az ba be bg bi bm bn bo br bs ca ce ch co cr cs cu cv cy da de dv dz ee el en eo es et eu fa ff fi fj fo fr fy ga gd gl gn gu gv ha he hi ho hr ht hu hy hz ia id ie ig ii ik io is it iu ja jv ka kg ki kj kk kl km kn ko kr ks ku kv kw ky la lb lg li ln lo lt lu lv mg mh mi mk ml mn mr ms mt my na nb nd ne ng nl nn no nr nv ny oc oj om or os pa pi pl ps pt qu rm rn ro ru rw sa sc sd se sg si sk sl sm sn so sq sr ss st su sv sw ta te tg th ti tk tl tn to tr ts tt tw ty ug uk ur uz ve vi vo wa wo xh yi yo za zh zu".split(
    " ",
  );

const languages = (() => {
  let names: Intl.DisplayNames | null = null;
  try {
    names = new Intl.DisplayNames(["de"], { type: "language" });
  } catch {
    names = null;
  }
  return languageCodes
    .map((code) => ({ code, label: names?.of(code) ?? code }))
    .sort((a, b) => a.label.localeCompare(b.label, "de"));
})();

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Lock;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card-tile grid grid-cols-[auto_minmax(0,1fr)] gap-4 p-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <h2 className="text-base font-extrabold leading-tight">{title}</h2>
        <div className="mt-1 text-sm leading-snug text-muted-foreground">{children}</div>
      </div>
    </section>
  );
}

function EinstellungenPage() {
  const { incidents, clearAll } = useIncidents();
  const { prefs, setPrefs } = usePreferences();
  const [confirm, setConfirm] = useState(false);
  const evidenceCount = incidents.reduce((n, i) => n + i.evidence.length, 0);

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Einstellungen" back={false} />

      <main className="mx-auto max-w-md grid gap-3 px-5 pt-5">
        <Section icon={Lock} title="Datenschutz">
          In dieser Prototyp-Version bleiben deine Einträge lokal in deinem Browser. Es findet keine
          Übertragung an einen Server statt und es ist noch keine Verschlüsselung eingebaut. Teile Angaben
          über andere Menschen nur, wenn es wirklich nötig ist.
        </Section>

        <Section icon={Database} title="Gespeicherte Daten">
          {incidents.length} {incidents.length === 1 ? "Eintrag" : "Einträge"} · {evidenceCount}{" "}
          {evidenceCount === 1 ? "Beweis" : "Beweise"} auf diesem Gerät.
        </Section>

        <Section icon={Trash2} title="Daten löschen">
          Du kannst alle Einträge jederzeit entfernen. Das lässt sich nicht rückgängig machen.
          {confirm ? (
            <div className="mt-3 grid gap-2">
              <button
                type="button"
                onClick={() => {
                  clearAll();
                  setConfirm(false);
                }}
                className="btn-primary bg-destructive"
              >
                Ja, alle Daten löschen
              </button>
              <button type="button" onClick={() => setConfirm(false)} className="btn-ghost">
                Abbrechen
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => setConfirm(true)} className="btn-ghost mt-3 text-destructive">
              Alle Daten löschen
            </button>
          )}
        </Section>

        <Section icon={Accessibility} title="Barrierefreiheit">
          StandUp nutzt große Schrift, klare Kontraste und große Touch-Flächen. Die Schriftgröße kannst du
          zusätzlich in den Einstellungen deines Geräts anpassen.
        </Section>

        <Section icon={Globe} title="Sprache">
          Wähle deine Sprache. Alle Sprachen stehen zur Auswahl; Inhalte, die noch nicht übersetzt sind,
          werden weiterhin auf Deutsch angezeigt.
          <select
            aria-label="Sprache wählen"
            value={prefs.language}
            onChange={(e) => setPrefs({ language: e.target.value })}
            className="mt-3 h-12 w-full rounded-2xl border border-border bg-card px-3 text-base font-bold text-foreground"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </Section>

        <Section icon={Info} title="Über StandUp">
          <p>
            StandUp ist eine App für Menschen, die Mobbing, Diskriminierung, Beleidigungen, Bedrohungen
            oder andere belastende Situationen erleben – in der Schule, am Arbeitsplatz, online oder im
            privaten Umfeld.
          </p>
          <p className="mt-2">
            Die App hilft dir dabei, Situationen einzuordnen („Ist das Mobbing?“), Vorfälle strukturiert zu
            dokumentieren (Datum, Ort, Beteiligte, Zeugen, Auswirkungen), Beweise zu sammeln, eine
            Chronologie über längere Zeit sichtbar zu machen, Nachrichten an Vertrauenspersonen
            vorzubereiten und passende Beratungsstellen sowie Notfallnummern zu finden.
          </p>
          <p className="mt-2">
            StandUp entscheidet nichts für dich: Du bestimmst, was du aufschreibst, was du löschst und mit
            wem du etwas teilst. Deine Einträge bleiben in dieser Version lokal auf diesem Gerät.
          </p>
          <p className="mt-2">
            StandUp ersetzt keine professionelle psychologische, medizinische oder rechtliche Beratung und
            trifft keine verbindlichen rechtlichen Entscheidungen. In akuten Notfällen wende dich bitte an
            110, 112 oder eine Notfallnummer aus dem Bereich „Notfall-Hilfe“.
          </p>
          <p className="mt-2 font-bold text-foreground">
            Wichtiger Hinweis zum Missbrauch: Die App und die aufgeführten Telefonnummern sind ausschließlich
            für echte Hilfe- und Dokumentationszwecke gedacht. Missbrauch – etwa bewusst falsche
            Beschuldigungen, gefälschte oder manipulierte Dokumentationen, Verleumdung, das Veröffentlichen
            oder Weitergeben von Daten anderer Personen ohne Erlaubnis sowie missbräuchliche oder
            grundlose Anrufe bei Notruf- und Beratungsnummern – kann rechtliche Konsequenzen haben. Dazu
            zählen unter anderem Strafanzeigen wegen falscher Verdächtigung, Verleumdung, übler Nachrede
            oder Missbrauchs von Notrufen sowie zivilrechtliche Schadenersatzforderungen.
          </p>
          <p className="mt-2">Prototyp-Version 0.1.</p>
        </Section>
      </main>

      <BottomNav />
    </div>
  );
}
