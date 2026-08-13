import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Ban,
  Check,
  HeartCrack,
  MessageSquare,
  MessagesSquare,
  MoreHorizontal,
  ShieldAlert,
  Smartphone,
  Users,
  UserX,
  Zap,
} from "lucide-react";
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: VorfallPage,
});

const kinds: { key: IncidentKind; hint: string; icon: typeof Users }[] = [
  { key: "mobbing", hint: "Wiederholtes Schikanieren", icon: Users },
  { key: "ausgrenzung", hint: "Bewusst ausgeschlossen werden", icon: UserX },
  { key: "beleidigung", hint: "Beschimpfungen, Herabwürdigungen", icon: MessageSquare },
  { key: "bedrohung", hint: "Drohungen, Einschüchterung", icon: AlertTriangle },
  { key: "diskriminierung", hint: "Z. B. Herkunft, Geschlecht, Religion", icon: ShieldAlert },
  { key: "koerperlich", hint: "Schubsen, Schlagen, Festhalten", icon: HeartCrack },
  { key: "cybermobbing", hint: "Chats, Social Media, Nachrichten", icon: Smartphone },
  { key: "belaestigung", hint: "Grenzüberschreitendes Verhalten", icon: Ban },
  { key: "konflikt", hint: "Streit oder Auseinandersetzung", icon: MessagesSquare },
  { key: "anderes", hint: "Etwas, das hier nicht steht", icon: MoreHorizontal },
];

function VorfallPage() {
  const { draft, setDraft } = useIncidents();
  const navigate = useNavigate();
  const { modus } = Route.useSearch();

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Mir ist etwas passiert" subtitle="Du bestimmst, was du angibst." />
      <Stepper current={draft.kind ? 2 : 1} />

      <main className="mx-auto max-w-md px-5">
        {modus === "gemeinsam" ? (
          <section className="card-tile mt-5 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-info/30 bg-info-soft p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-info text-primary-foreground">
              <Users className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-extrabold">Gemeinsam dokumentieren</span>
              <span className="mt-1 block text-sm leading-snug">
                Achte darauf, dass die betroffene Person damit einverstanden ist, was gespeichert wird.
              </span>
            </span>
          </section>
        ) : null}

        <Link
          to="/vorfall/schnell"
          className="card-tile mt-5 flex items-center gap-3 border-warning/30 bg-warning-soft p-4"
        >
          <Zap className="h-5 w-5 shrink-0 text-warning" />
          <span className="min-w-0 text-sm font-bold">
            Wenig Zeit oder Kraft? Halte es zuerst in einem Satz fest.
          </span>
        </Link>

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
          <div className="grid grid-cols-2 gap-3">
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
                Uhrzeit <span className="font-semibold text-muted-foreground">(optional)</span>
              </span>
              <input
                type="time"
                value={draft.time}
                onChange={(e) => setDraft({ time: e.target.value })}
                className="field-input"
              />
            </label>
          </div>
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
              Beteiligte Personen <span className="font-semibold text-muted-foreground">(optional)</span>
            </span>
            <input
              type="text"
              value={draft.persons}
              onChange={(e) => setDraft({ persons: e.target.value })}
              placeholder="Nur für dich – z. B. Vorname oder Kürzel"
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
          <label className="grid gap-2">
            <span className="text-sm font-bold">
              Wie ging es dir danach?{" "}
              <span className="font-semibold text-muted-foreground">(optional)</span>
            </span>
            <textarea
              value={draft.impact}
              rows={3}
              maxLength={1000}
              onChange={(e) => setDraft({ impact: e.target.value })}
              placeholder="z. B. Angst vor dem nächsten Tag, schlecht geschlafen"
              className="field-input resize-none"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold">
              Eigene Notizen <span className="font-semibold text-muted-foreground">(optional)</span>
            </span>
            <textarea
              value={draft.notes}
              rows={3}
              maxLength={1000}
              onChange={(e) => setDraft({ notes: e.target.value })}
              placeholder="Gedanken, die du nur für dich festhalten möchtest"
              className="field-input resize-none"
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
