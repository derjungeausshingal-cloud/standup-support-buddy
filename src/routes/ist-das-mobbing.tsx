import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, HeartHandshake, NotebookPen, RotateCcw, Users, X } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { OptionCard } from "@/components/OptionCard";
import { useI18n } from "@/lib/i18n";

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

const fragenKeys: readonly string[] = [
  "info.mobbing.q1",
  "info.mobbing.q2",
  "info.mobbing.q3",
  "info.mobbing.q4",
  "info.mobbing.q5",
  "info.mobbing.q6",
] as const;

type Antwort = "ja" | "unsicher" | "nein";

const optionen: { key: Antwort; labelKey: string }[] = [
  { key: "ja", labelKey: "info.mobbing.opt.ja" },
  { key: "unsicher", labelKey: "info.mobbing.opt.unsicher" },
  { key: "nein", labelKey: "info.mobbing.opt.nein" },
];

function IstDasMobbingPage() {
  const { t } = useI18n();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Antwort>>({});
  const total = fragenKeys.length;
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
      <AppHeader title={t("info.mobbing.title")} subtitle={t("info.mobbing.subtitle")} />

      <main className="mx-auto max-w-md px-5">
        <div className="mt-5">
          <div className="flex items-center justify-between text-sm font-bold">
            <span className={done ? "text-success" : "text-primary"}>
              {done ? t("info.mobbing.progress.done") : t("info.mobbing.progress.step", { n: step + 1, total })}
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
              <p className="text-lg font-extrabold leading-snug">{t(fragenKeys[step]!)}</p>
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
                      <span>{t(o.labelKey)}</span>
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
                {t("info.mobbing.back")}
              </button>
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!current}
                className="btn-primary disabled:opacity-40"
              >
                {step === total - 1 ? t("info.mobbing.auswerten") : t("info.mobbing.weiter")}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t("info.mobbing.hinweis")}
            </p>
          </>
        ) : (
          <>
            <section className="card-tile mt-5 border-primary/30 bg-primary-soft p-5">
              <h2 className="text-base font-extrabold text-primary">{t("info.mobbing.result.title")}</h2>
              <p className="mt-2 text-sm leading-relaxed">
                {ja >= 4
                  ? t("info.mobbing.result.hoch")
                  : ja + unsicher >= 3
                    ? t("info.mobbing.result.mittel")
                    : t("info.mobbing.result.niedrig")}
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                {t("info.mobbing.result.hinweis")}
              </p>
            </section>

            <ul className="mt-4 grid gap-2">
              {fragenKeys.map((fKey, i) => {
                const a = answers[i];
                return (
                  <li key={fKey} className="card-tile grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3">
                    <span className="min-w-0 text-sm leading-snug">{t(fKey)}</span>
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
              <OptionCard to="/vorfall" title={t("info.mobbing.card.vorfall.title")} description={t("info.mobbing.card.vorfall.desc")} icon={NotebookPen} />
              <OptionCard
                to="/vertrauensperson"
                title={t("info.mobbing.card.vertrauensperson.title")}
                description={t("info.mobbing.card.vertrauensperson.desc")}
                icon={Users}
                tone="info"
              />
              <OptionCard
                to="/beratung"
                title={t("info.mobbing.card.beratung.title")}
                description={t("info.mobbing.card.beratung.desc")}
                icon={HeartHandshake}
                tone="success"
              />
            </div>

            <button type="button" onClick={reset} className="btn-ghost mt-4">
              <RotateCcw className="h-5 w-5" />
              {t("info.mobbing.reset")}
            </button>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
