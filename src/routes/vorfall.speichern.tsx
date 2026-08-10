import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Save } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { Stepper } from "@/components/Stepper";
import { evidenceLabels, formatDate, kindLabels, useIncidents } from "@/lib/incidents";

export const Route = createFileRoute("/vorfall/speichern")({
  head: () => ({
    meta: [
      { title: "Vorfall speichern – StandUp" },
      { name: "description", content: "Überprüfe deine Angaben und speichere den Vorfall in deinem Tagebuch." },
      { property: "og:title", content: "Vorfall speichern – StandUp" },
      { property: "og:description", content: "Deine Angaben in Ruhe prüfen und im Tagebuch sichern." },
    ],
  }),
  component: SpeichernPage,
});

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-0.5 border-b border-border py-3 last:border-0">
      <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className="whitespace-pre-wrap text-sm">{value || "Keine Angabe"}</span>
    </div>
  );
}

function SpeichernPage() {
  const { draft, saveDraft } = useIncidents();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Speichern" subtitle="Schau in Ruhe, ob alles passt." />
      <Stepper current={4} />

      <main className="mx-auto max-w-md px-5">
        <section className="card-tile mt-6 px-4 py-1">
          <Row label="Art" value={draft.kind ? kindLabels[draft.kind] : ""} />
          <Row label="Beschreibung" value={draft.description} />
          <Row label="Datum" value={draft.date ? formatDate(draft.date) : ""} />
          <Row label="Ort" value={draft.place} />
          <Row label="Zeugen" value={draft.witnesses} />
          <Row
            label="Beweise"
            value={
              draft.evidence.length
                ? draft.evidence.map((e) => `${e.name} (${evidenceLabels[e.type]})`).join("\n")
                : "Keine – das ist in Ordnung"
            }
          />
        </section>

        <p className="mt-4 text-sm leading-snug text-muted-foreground">
          Dein Eintrag wird in dieser Prototyp-Version nur lokal in deinem Browser gespeichert. Es gibt noch
          keine Verschlüsselung und keine Übertragung an einen Server.
        </p>

        <button
          type="button"
          onClick={() => {
            saveDraft();
            navigate({ to: "/vorfall/hilfe" });
          }}
          className="btn-primary mt-6"
        >
          <Save className="h-5 w-5" />
          Vorfall speichern
        </button>
        <button type="button" onClick={() => navigate({ to: "/vorfall" })} className="btn-ghost mt-3">
          Zurück zu den Angaben
        </button>
      </main>

      <BottomNav />
    </div>
  );
}
