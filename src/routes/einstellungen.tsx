import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Accessibility, Database, Globe, Info, Lock, Palette, Trash2 } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { useIncidents } from "@/lib/incidents";
import { usePreferences, type ThemeMode } from "@/lib/preferences";

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
          Aktuell: Deutsch. Weitere Sprachen sind für eine spätere Version geplant.
        </Section>

        <Section icon={Info} title="Über StandUp">
          StandUp begleitet dich, wenn du Mobbing, Diskriminierung, Beleidigungen oder Bedrohungen erlebst.
          Die App ersetzt keine professionelle psychologische oder rechtliche Beratung und trifft keine
          verbindlichen rechtlichen Entscheidungen. Prototyp-Version 0.1.
        </Section>
      </main>

      <BottomNav />
    </div>
  );
}
