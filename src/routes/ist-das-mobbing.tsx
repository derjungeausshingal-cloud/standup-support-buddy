import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { OptionCard } from "@/components/OptionCard";
import { HeartHandshake, NotebookPen } from "lucide-react";

export const Route = createFileRoute("/ist-das-mobbing")({
  head: () => ({
    meta: [
      { title: "Ist das Mobbing? – StandUp" },
      { name: "description", content: "Fragen, die dir helfen können, deine Situation für dich selbst einzuordnen – ohne automatische Bewertung." },
      { property: "og:title", content: "Ist das Mobbing? – StandUp" },
      { property: "og:description", content: "Orientierung statt Diagnose: Du entscheidest, wie du es benennst." },
    ],
  }),
  component: IstDasMobbingPage,
});

const fragen = [
  "Passiert es immer wieder und nicht nur einmal?",
  "Geht es meistens von derselben Person oder Gruppe aus?",
  "Fällt es dir schwer, dich alleine dagegen zu wehren?",
  "Wirst du absichtlich ausgeschlossen oder bloßgestellt?",
  "Belastet es dich – zum Beispiel beim Einschlafen, in der Schule oder bei der Arbeit?",
];

function IstDasMobbingPage() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const yes = Object.values(answers).filter(Boolean).length;
  const answered = Object.keys(answers).length;

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Ist das Mobbing?" subtitle="Zur Orientierung – keine Diagnose." />

      <main className="mx-auto max-w-md px-5">
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Diese Fragen können dir beim Sortieren helfen. Es gibt keine richtigen oder falschen Antworten – und
          StandUp entscheidet nicht für dich, wie deine Situation heißt.
        </p>

        <ul className="mt-5 grid gap-3">
          {fragen.map((f, i) => (
            <li key={f} className="card-tile p-4">
              <p className="text-sm font-bold leading-snug">{f}</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  { label: "Eher ja", value: true },
                  { label: "Eher nein", value: false },
                ].map((o) => {
                  const active = answers[i] === o.value;
                  return (
                    <button
                      key={o.label}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setAnswers((a) => ({ ...a, [i]: o.value }))}
                      className={`rounded-xl py-3 text-sm font-bold ${
                        active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>

        {answered > 0 ? (
          <section className="card-tile mt-6 border-primary/30 bg-primary-soft p-4">
            <h2 className="text-base font-extrabold text-primary">Was das bedeuten kann</h2>
            <p className="mt-1 text-sm leading-relaxed">
              {yes >= 3
                ? "Mehrere deiner Antworten deuten auf Muster hin, die häufig bei Mobbing beschrieben werden. Ob es Mobbing ist, lässt sich hier nicht sicher sagen – ein Gespräch mit einer Beratungsstelle kann helfen."
                : "Aus diesen Angaben lässt sich nicht ableiten, ob es sich um Mobbing handelt. Wichtig ist: Wenn es dich belastet, ist das Grund genug, dir Unterstützung zu holen."}
            </p>
          </section>
        ) : null}

        <div className="mt-6 grid gap-3">
          <OptionCard to="/vorfall" title="Vorfall dokumentieren" description="Festhalten, was passiert ist" icon={NotebookPen} />
          <OptionCard to="/beratung" title="Beratung & Hilfe finden" description="Mit jemandem darüber sprechen" icon={HeartHandshake} tone="success" />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
