import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { ChoiceList } from "@/components/ChoiceList";
import { OptionCard, type Tone } from "@/components/OptionCard";
import { BookOpen, MessageSquarePlus, NotebookPen, Scale, Search, Users } from "lucide-react";

export const Route = createFileRoute("/helfen/hilfe-finden")({
  head: () => ({
    meta: [
      { title: "Hilfe finden – jemandem helfen – StandUp" },
      {
        name: "description",
        content: "Ein paar kurze Fragen und ihr seht mögliche nächste Schritte – ohne Bewertung der Situation.",
      },
      { property: "og:title", content: "Hilfe finden – StandUp" },
      { property: "og:description", content: "Findet gemeinsam eine passende Anlaufstelle." },
    ],
  }),
  component: HilfeFindenPage,
});

const q1 = [
  { key: "schueler", label: "Schüler/in" },
  { key: "student", label: "Student/in" },
  { key: "arbeit", label: "Arbeitnehmer/in" },
  { key: "nah", label: "Freund/in oder Familienmitglied" },
  { key: "andere", label: "Andere Person" },
];

const q2 = [
  { key: "mobbing", label: "Mobbing" },
  { key: "cyber", label: "Cybermobbing" },
  { key: "diskriminierung", label: "Diskriminierung" },
  { key: "beleidigung", label: "Beleidigungen" },
  { key: "bedrohung", label: "Bedrohungen" },
  { key: "unsicher", label: "Ich bin mir nicht sicher" },
  { key: "anderes", label: "Etwas anderes" },
];

const q3 = [
  { key: "reden", label: "Erst einmal mit jemandem reden" },
  { key: "beratung", label: "Beratungsstelle finden" },
  { key: "doku", label: "Vorfall dokumentieren" },
  { key: "vertrauen", label: "Vertrauensperson einbeziehen" },
  { key: "nachricht", label: "Nachricht formulieren" },
  { key: "infos", label: "Informationen über Möglichkeiten erhalten" },
];

type Step = { to: string; title: string; description: string; icon: typeof Search; tone: Tone };

const steps: Record<string, Step> = {
  reden: {
    to: "/helfen/zuhoeren",
    title: "Erst einmal zuhören",
    description: "Sätze für ein ruhiges Gespräch, wenn die Person einfach reden möchte.",
    icon: Users,
    tone: "primary",
  },
  beratung: {
    to: "/beratung",
    title: "Beratung & Hilfe finden",
    description: "Anlaufstellen, die in der App hinterlegt sind – ihr entscheidet, ob ihr Kontakt aufnehmt.",
    icon: Search,
    tone: "success",
  },
  doku: {
    to: "/helfen/dokumentieren",
    title: "Gemeinsam dokumentieren",
    description: "Festhalten, was passiert ist – nur, wenn die betroffene Person einverstanden ist.",
    icon: NotebookPen,
    tone: "info",
  },
  vertrauen: {
    to: "/helfen/vertrauensperson",
    title: "Vertrauensperson überlegen",
    description: "Wen könnte die Person einbeziehen? Und wie lässt sich das Gespräch vorbereiten?",
    icon: Users,
    tone: "info",
  },
  nachricht: {
    to: "/nachricht",
    title: "Nachricht formulieren",
    description: "Wenn Schreiben leichter fällt als Sprechen.",
    icon: MessageSquarePlus,
    tone: "primary",
  },
  infos: {
    to: "/infos",
    title: "Infos zu Mobbing & Co.",
    description: "Verständlich erklärt, welche Möglichkeiten es geben kann.",
    icon: BookOpen,
    tone: "warning",
  },
  rechte: {
    to: "/rechte",
    title: "Rechte & Möglichkeiten",
    description: "Allgemeine Orientierung – keine Rechtsberatung.",
    icon: Scale,
    tone: "warning",
  },
};

function buildResults(a1: string, a2: string, a3: string): Step[] {
  const keys: string[] = [a3];
  if (a2 === "cyber" && !keys.includes("doku")) keys.push("doku");
  if (a2 === "bedrohung" && !keys.includes("beratung")) keys.push("beratung");
  if (a2 === "diskriminierung" && !keys.includes("rechte")) keys.push("rechte");
  if (a2 === "unsicher" && !keys.includes("infos")) keys.push("infos");
  if ((a1 === "schueler" || a1 === "student" || a1 === "arbeit") && !keys.includes("vertrauen"))
    keys.push("vertrauen");
  if (!keys.includes("reden")) keys.push("reden");
  return keys.slice(0, 4).map((k) => steps[k]!);
}

function HilfeFindenPage() {
  const [step, setStep] = useState(1);
  const [a1, setA1] = useState<string | null>(null);
  const [a2, setA2] = useState<string | null>(null);
  const [a3, setA3] = useState<string | null>(null);

  const reset = () => {
    setA1(null);
    setA2(null);
    setA3(null);
    setStep(1);
  };

  const results = a1 && a2 && a3 ? buildResults(a1, a2, a3) : [];

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Hilfe finden" subtitle="Drei kurze Fragen – ihr entscheidet danach selbst." />

      <main className="mx-auto max-w-md px-5">
        <p className="mt-5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {step <= 3 ? `Frage ${step} von 3` : "Ergebnis"}
        </p>

        {step === 1 ? (
          <>
            <h2 className="mt-1 text-xl font-extrabold leading-tight">Für wen suchst du Unterstützung?</h2>
            <ChoiceList
              options={q1}
              value={a1}
              onSelect={(k) => {
                setA1(k);
                setStep(2);
              }}
            />
          </>
        ) : null}

        {step === 2 ? (
          <>
            <h2 className="mt-1 text-xl font-extrabold leading-tight">Worum geht es ungefähr?</h2>
            <ChoiceList
              options={q2}
              value={a2}
              onSelect={(k) => {
                setA2(k);
                setStep(3);
              }}
            />
          </>
        ) : null}

        {step === 3 ? (
          <>
            <h2 className="mt-1 text-xl font-extrabold leading-tight">Welche Unterstützung wird gesucht?</h2>
            <ChoiceList
              options={q3}
              value={a3}
              onSelect={(k) => {
                setA3(k);
                setStep(4);
              }}
            />
          </>
        ) : null}

        {step === 4 ? (
          <>
            <h2 className="mt-1 text-xl font-extrabold leading-tight">Das könnten passende nächste Schritte sein</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Das sind Vorschläge, keine Bewertung der Situation. Ihr entscheidet, was davon passt.
            </p>
            <div className="mt-4 grid gap-3">
              {results.map((r) => (
                <OptionCard key={r.to} {...r} />
              ))}
            </div>
            <button type="button" onClick={reset} className="btn-ghost mt-5">
              <RotateCcw className="h-5 w-5" />
              Fragen neu beantworten
            </button>
            <Link to="/helfen" className="btn-primary mt-3">
              Zurück zur Übersicht
              <ArrowRight className="h-5 w-5" />
            </Link>
          </>
        ) : null}

        {step > 1 && step <= 3 ? (
          <button type="button" onClick={() => setStep(step - 1)} className="btn-ghost mt-5">
            <ArrowLeft className="h-5 w-5" />
            Eine Frage zurück
          </button>
        ) : null}
      </main>

      <BottomNav />
    </div>
  );
}
