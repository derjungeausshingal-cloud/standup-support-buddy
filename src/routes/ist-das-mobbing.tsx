import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, HeartHandshake, NotebookPen, RotateCcw, Users, X } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { OptionCard } from "@/components/OptionCard";

export const Route = createFileRoute("/ist-das-mobbing")({
  head: () => ({
    meta: [
      { title: "Ist das Mobbing? – StandUp" },
      { name: "description", content: "Sechs kurze Fragen helfen dir, deine Situation für dich selbst einzuordnen – ohne Diagnose und ohne Bewertung." },
      { property: "og:title", content: "Ist das Mobbing? – StandUp" },
      { property: "og:description", content: "Orientierung statt Diagnose: Du entscheidest, wie du es benennst." },
    ],
  }),
  component: IstDasMobbingPage,
});

const fragen = [
  "Passiert es öfter oder wiederholt sich die Situation?",
  "Geht es meistens von derselben Person oder Gruppe aus?",
  "Fällt es dir schwer, dich alleine dagegen zu wehren?",
  "Fühlst du dich dadurch ausgegrenzt, verletzt oder unter Druck gesetzt?",
  "Hast du das Gefühl, dass die Situation mit der Zeit schlimmer wird?",
  "Belastet dich die Situation auch außerhalb des konkreten Moments?",
];

type Antwort = "ja" | "unsicher" | "nein";

const optionen: { key: Antwort; label: string }[] = [
  { key: "ja", label: "Ja" },
  { key: "unsicher", label: "Unsicher" },
  { key: "nein", label: "Nein" },
];

function IstDasMobbingPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Antwort>>({});
  const total = fragen.length;
  const done = step >= total;
  const current = answers[step] ?? null;

  const ja = Object.values(answers).filter((a) => a === "ja").length;
  const unsicher = Object.values(answers).filter((a) => a === "unsicher").length;
  const progress = done ? 100 : Math.round((step / total) * 100);

  const answer = (a: Antwort) => {
    setAnswers((prev) => ({ ...prev, [step]: a }));
    window.setTimeout(() => setStep((s) => s + 1), 220);
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Ist das Mobbing?" subtitle="Zur Orientierung – keine Diagnose." />

      <main className="mx-auto max-w-md px-5">
        <div className="mt-5">
          <div className="flex items-center justify-between text-sm font-bold">
            <span className={done ? "text-success" : "text-primary"}>
              {done ? "Alle Fragen beantwortet" : `Frage ${step + 1} von ${total}`}
            </span>
            <span className="text-muted-foreground">{progress} %</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full transition-all duration-300 ${done ? "bg-success" : "bg-primary"}`}
              style={{ width: `${Math.max(progress, 4)}%` }}
            />
          </div>
        </div>

        {!done ? (
          <>
            <section className="card-tile mt-5 p-5">
              <p className="text-lg font-extrabold leading-snug">{fragen[step]}</p>
              <div className="mt-5 grid gap-2.5">
                {optionen.map((o) => {
                  const active = current === o.key;
                  return (
                    <button
                      key={o.key}
                      type="button"
                      aria-pressed={active}
                      onClick={() => answer(o.key)}
                      className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border px-4 py-4 text-left text-base font-bold transition ${
                        active
                          ? "border-primary bg-primary-soft text-primary"
                          : "border-border bg-card text-foreground"
                      }`}
                    >
                      <span>{o.label}</span>
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                          active ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {active ? <Check className="h-4 w-4" /> : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="btn-ghost disabled:opacity-40"
              >
                <ArrowLeft className="h-5 w-5" />
                Zurück
              </button>
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!current}
                className="btn-primary disabled:opacity-40"
              >
                {step === total - 1 ? "Auswerten" : "Weiter"}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Es gibt keine richtigen oder falschen Antworten. StandUp entscheidet nicht für dich, wie deine
              Situation heißt.
            </p>
          </>
        ) : (
          <>
            <section className="card-tile mt-5 border-primary/30 bg-primary-soft p-5">
              <h2 className="text-base font-extrabold text-primary">Eine vorsichtige Einordnung</h2>
              <p className="mt-2 text-sm leading-relaxed">
                {ja >= 4
                  ? "Einige Merkmale können zu Mobbing passen. Sicher sagen lässt sich das hier nicht – ein Gespräch mit einer Beratungsstelle kann helfen."
                  : ja + unsicher >= 3
                    ? "Manches klingt nach einem Muster, anderes ist noch offen. Ob es Mobbing ist, lässt sich hier nicht feststellen."
                    : "Aus deinen Antworten lässt sich nicht ableiten, ob es sich um Mobbing handelt."}
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                Wichtig ist vor allem: Wenn dich die Situation belastet, ist das Grund genug, dir Unterstützung
                zu holen.
              </p>
            </section>

            <ul className="mt-4 grid gap-2">
              {fragen.map((f, i) => {
                const a = answers[i];
                return (
                  <li key={f} className="card-tile grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3">
                    <span className="min-w-0 text-sm leading-snug">{f}</span>
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-extrabold ${
                        a === "ja"
                          ? "bg-primary text-primary-foreground"
                          : a === "unsicher"
                            ? "bg-warning-soft text-warning"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {a === "ja" ? <Check className="h-4 w-4" /> : a === "nein" ? <X className="h-4 w-4" /> : "?"}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 grid gap-3">
              <OptionCard to="/vorfall" title="Vorfall dokumentieren" description="Festhalten, was passiert ist" icon={NotebookPen} />
              <OptionCard
                to="/vertrauensperson"
                title="Mit einer Vertrauensperson sprechen"
                description="Jemanden einbeziehen, dem du vertraust"
                icon={Users}
                tone="info"
              />
              <OptionCard
                to="/beratung"
                title="Beratung & Hilfe finden"
                description="Anlaufstellen in deiner Nähe oder bundesweit"
                icon={HeartHandshake}
                tone="success"
              />
            </div>

            <button type="button" onClick={reset} className="btn-ghost mt-4">
              <RotateCcw className="h-5 w-5" />
              Fragen neu beantworten
            </button>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
