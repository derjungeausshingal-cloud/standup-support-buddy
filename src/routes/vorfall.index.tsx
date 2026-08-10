import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Check, MessageSquare, MoreHorizontal, ShieldAlert, Users } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { Stepper } from "@/components/Stepper";
import { kindLabels, useIncidents, type IncidentKind } from "@/lib/incidents";

export const Route = createFileRoute("/vorfall/")({
  head: () => ({
    meta: [
      { title: "Vorfall dokumentieren – StandUp" },
      {
        name: "description",
        content: "Schritt 1 und 2: Art des Vorfalls wählen und in eigenen Worten beschreiben.",
      },
      { property: "og:title", content: "Vorfall dokumentieren – StandUp" },
      { property: "og:description", content: "Du entscheidest, was du teilst. Ruhig und in deinem Tempo." },
    ],
  }),
  component: VorfallPage,
});

const kinds: { key: IncidentKind; hint: string; icon: typeof Users }[] = [
  { key: "mobbing", hint: "Wiederholtes Schikanieren, Ausgrenzen", icon: Users },
  { key: "diskriminierung", hint: "Z. B. wegen Herkunft, Geschlecht, Religion", icon: ShieldAlert },
  { key: "beleidigung", hint: "Beschimpfungen, Herabwürdigungen", icon: MessageSquare },
  { key: "bedrohung", hint: "Drohungen, Einschüchterung", icon: AlertTriangle },
  { key: "anderes", hint: "Etwas, das hier nicht steht", icon: MoreHorizontal },
];

function VorfallPage() {
  const { draft, setDraft } = useIncidents();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Mir ist etwas passiert" subtitle="Du bestimmst, was du angibst." />
      <Stepper current={draft.kind ? 2 : 1} />

      <main className="mx-auto max-w-md px-5">
        <h2 className="mt-6 text-lg font-extrabold">1. Was ist passiert?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Wenn du möchtest, kannst du eine Art auswählen. Du kannst das später ändern.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {kinds.map((k) => {
            const active = draft.kind === k.key;
            return (
              <button
                key={k.key}
                type="button"
                aria-pressed={active}
                onClick={() => setDraft({ kind: active ? null : k.key })}
                className={`card-tile relative flex h-full flex-col items-start gap-3 p-4 text-left ${
                  active ? "border-primary bg-primary-soft" : ""
                }`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <k.icon className="h-5 w-5" />
                </span>
                {active && (
                  <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-4 w-4" />
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block text-base font-extrabold leading-tight">{kindLabels[k.key]}</span>
                  <span className="mt-1 block text-sm leading-snug text-muted-foreground">{k.hint}</span>
                </span>
              </button>
            );
          })}
        </div>

        <h2 className="mt-8 text-lg font-extrabold">2. Beschreibe, was passiert ist</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Schreibe in deinen eigenen Worten. Du entscheidest, was du teilst.
        </p>
        <textarea
          value={draft.description}
          maxLength={2000}
          rows={7}
          onChange={(e) => setDraft({ description: e.target.value })}
          placeholder="Zum Beispiel: Was ist passiert? Wie ging es dir dabei?"
          className="field-input mt-3 resize-none"
        />
        <p className="mt-1 text-right text-xs text-muted-foreground">{draft.description.length} / 2000</p>

        <div className="mt-4 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-bold">
              Datum <span className="font-semibold text-muted-foreground">(optional)</span>
            </span>
            <input
              type="date"
              value={draft.date}
              onChange={(e) => setDraft({ date: e.target.value })}
              className="field-input"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold">
              Ort <span className="font-semibold text-muted-foreground">(optional)</span>
            </span>
            <input
              type="text"
              value={draft.place}
              onChange={(e) => setDraft({ place: e.target.value })}
              placeholder="z. B. Schulhof, Klassenchat, Büro"
              className="field-input"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold">
              Zeugen <span className="font-semibold text-muted-foreground">(optional)</span>
            </span>
            <input
              type="text"
              value={draft.witnesses}
              onChange={(e) => setDraft({ witnesses: e.target.value })}
              placeholder="Wer war dabei? Nur wenn du magst."
              className="field-input"
            />
          </label>
        </div>

        <button type="button" onClick={() => navigate({ to: "/vorfall/beweise" })} className="btn-primary mt-7">
          Weiter: Beweise hinzufügen
          <ArrowRight className="h-5 w-5" />
        </button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Alle Angaben sind freiwillig. Du kannst jederzeit pausieren.
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
