import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Clock, Save, Zap } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { kindLabels, kindOrder, useIncidents, type IncidentKind } from "@/lib/incidents";

export const Route = createFileRoute("/vorfall/schnell")({
  head: () => ({
    meta: [
      { title: "Schnell dokumentieren – StandUp" },
      {
        name: "description",
        content:
          "Nur ein Satz und ein Datum: Halte einen Vorfall in wenigen Sekunden fest und ergänze später Details.",
      },
      { property: "og:title", content: "Schnell dokumentieren – StandUp" },
      { property: "og:description", content: "In wenigen Sekunden festhalten, was gerade passiert ist." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SchnellPage,
});

function nowParts() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
  };
}

function SchnellPage() {
  const { addIncident } = useIncidents();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [kind, setKind] = useState<IncidentKind | null>(null);
  const [stamp, setStamp] = useState(nowParts);
  const [savedId, setSavedId] = useState<string | null>(null);

  const save = () => {
    const incident = addIncident({
      kind,
      description: text.trim(),
      date: stamp.date,
      time: stamp.time,
    });
    setSavedId(incident.id);
    setText("");
    setKind(null);
  };

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Schnell festhalten" subtitle="Ein Satz genügt. Details kannst du später ergänzen." />

      <main className="mx-auto max-w-md px-5">
        <section className="card-tile mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-warning/30 bg-warning-soft p-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-warning text-primary-foreground">
            <Zap className="h-6 w-6" />
          </span>
          <p className="min-w-0 text-sm leading-snug">
            Für Momente, in denen es schnell gehen muss. Datum und Uhrzeit werden automatisch übernommen.
          </p>
        </section>

        {savedId ? (
          <section className="card-tile mt-4 grid gap-3 border-success/30 bg-success-soft p-4">
            <p className="flex items-center gap-2 text-sm font-extrabold">
              <Check className="h-5 w-5 text-success" />
              Gespeichert. Du hast es festgehalten.
            </p>
            <div className="grid gap-2">
              <Link to="/tagebuch/$id" params={{ id: savedId }} className="btn-primary">
                Eintrag öffnen und ergänzen
              </Link>
              <button type="button" onClick={() => setSavedId(null)} className="btn-ghost">
                Noch etwas festhalten
              </button>
            </div>
          </section>
        ) : null}

        <label className="mt-6 grid gap-2">
          <span className="text-sm font-bold">Was ist passiert?</span>
          <textarea
            value={text}
            rows={5}
            maxLength={1000}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ein Satz reicht völlig."
            className="field-input resize-none"
          />
        </label>

        <p className="mt-5 text-sm font-bold">Art (optional)</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {kindOrder.map((k) => {
            const active = kind === k;
            return (
              <button
                key={k}
                type="button"
                aria-pressed={active}
                onClick={() => setKind(active ? null : k)}
                className={`min-h-11 rounded-full border px-3.5 text-sm font-bold ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                {kindLabels[k]}
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <label className="grid gap-2">
            <span className="text-sm font-bold">Datum</span>
            <input
              type="date"
              value={stamp.date}
              onChange={(e) => setStamp((s) => ({ ...s, date: e.target.value }))}
              className="field-input"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold">Uhrzeit</span>
            <input
              type="time"
              value={stamp.time}
              onChange={(e) => setStamp((s) => ({ ...s, time: e.target.value }))}
              className="field-input"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={() => setStamp(nowParts())}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-primary"
        >
          <Clock className="h-4 w-4" />
          Jetzt übernehmen
        </button>

        <button
          type="button"
          disabled={!text.trim()}
          onClick={save}
          className="btn-primary mt-6 disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          Schnell speichern
        </button>
        <button type="button" onClick={() => navigate({ to: "/vorfall" })} className="btn-ghost mt-3">
          Ausführlich dokumentieren
        </button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Der Eintrag bleibt nur lokal auf diesem Gerät. Du kannst ihn später jederzeit ergänzen.
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
