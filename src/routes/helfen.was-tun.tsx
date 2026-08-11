import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Ear,
  MessageSquarePlus,
  NotebookPen,
  RotateCcw,
  Search,
  Users,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { ChoiceList } from "@/components/ChoiceList";
import { OptionCard, type Tone } from "@/components/OptionCard";

export const Route = createFileRoute("/helfen/was-tun")({
  head: () => ({
    meta: [
      { title: "Was kann ich konkret tun? – StandUp" },
      {
        name: "description",
        content: "Zwei kurze Fragen und ihr seht mögliche nächste Überlegungen – ohne automatische Bewertung.",
      },
      { property: "og:title", content: "Was kann ich konkret tun? – StandUp" },
      { property: "og:description", content: "Passende Ideen für den nächsten Schritt." },
    ],
  }),
  component: WasTunPage,
});

const situationen = [
  { key: "reden", label: "Die Person möchte gerade nur reden." },
  { key: "wiederholt", label: "Die Situation passiert immer wieder." },
  { key: "online", label: "Es passiert online." },
  { key: "angst", label: "Die Person hat Angst vor einer bestimmten Person." },
  { key: "melden", label: "Die Person möchte etwas melden." },
  { key: "unklar", label: "Die Person weiß nicht, was sie tun soll." },
  { key: "selbstunklar", label: "Ich weiß es selbst nicht." },
];

const wuensche = [
  { key: "reden", label: "Nur darüber sprechen" },
  { key: "doku", label: "Den Vorfall festhalten" },
  { key: "vertrauen", label: "Mit einer Vertrauensperson sprechen" },
  { key: "profi", label: "Professionelle Hilfe suchen" },
  { key: "nachricht", label: "Eine Nachricht formulieren" },
  { key: "weissnicht", label: "Weiß ich nicht" },
];

type Card = { to: string; title: string; description: string; icon: typeof Ear; tone: Tone };

const cards: Record<string, Card> = {
  zuhoeren: {
    to: "/helfen/zuhoeren",
    title: "Zuhören",
    description: "Nimm dir Zeit und lass die Person bestimmen, wie viel sie erzählen möchte.",
    icon: Ear,
    tone: "primary",
  },
  doku: {
    to: "/helfen/dokumentieren",
    title: "Dokumentieren",
    description: "Gemeinsam dokumentieren – wenn die Person damit einverstanden ist.",
    icon: NotebookPen,
    tone: "info",
  },
  vertrauen: {
    to: "/helfen/vertrauensperson",
    title: "Vertrauensperson",
    description: "Mögliche Vertrauensperson auswählen und ein Gespräch vorbereiten.",
    icon: Users,
    tone: "success",
  },
  hilfe: {
    to: "/helfen/hilfe-finden",
    title: "Hilfe finden",
    description: "Unterstützung suchen, die zur Situation passen könnte.",
    icon: Search,
    tone: "primary",
  },
  nachricht: {
    to: "/nachricht",
    title: "Nachricht formulieren",
    description: "Wenn Schreiben gerade leichter fällt als Sprechen.",
    icon: MessageSquarePlus,
    tone: "info",
  },
  infos: {
    to: "/infos",
    title: "Infos ansehen",
    description: "Verständlich erklärt, welche Möglichkeiten es geben kann.",
    icon: BookOpen,
    tone: "warning",
  },
};

function build(situation: string, wunsch: string): Card[] {
  const keys: string[] = ["zuhoeren"];
  const add = (k: string) => {
    if (!keys.includes(k)) keys.push(k);
  };

  if (wunsch === "doku") add("doku");
  if (wunsch === "vertrauen") add("vertrauen");
  if (wunsch === "profi") add("hilfe");
  if (wunsch === "nachricht") add("nachricht");
  if (wunsch === "weissnicht") add("infos");

  if (situation === "wiederholt" || situation === "online" || situation === "melden") add("doku");
  if (situation === "angst") add("hilfe");
  if (situation === "unklar" || situation === "selbstunklar") add("infos");
  add("vertrauen");

  return keys.slice(0, 4).map((k) => cards[k]!);
}

function WasTunPage() {
  const [step, setStep] = useState(1);
  const [situation, setSituation] = useState<string | null>(null);
  const [wunsch, setWunsch] = useState<string | null>(null);

  const results = situation && wunsch ? build(situation, wunsch) : [];

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Was kann ich konkret tun?" subtitle="Ideen, keine Bewertung der Situation." />

      <main className="mx-auto max-w-md px-5">
        <p className="mt-5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {step <= 2 ? `Frage ${step} von 2` : "Vorschläge"}
        </p>

        {step === 1 ? (
          <>
            <h2 className="mt-1 text-xl font-extrabold leading-tight">Was beschreibt die Situation am besten?</h2>
            <ChoiceList
              options={situationen}
              value={situation}
              onSelect={(k) => {
                setSituation(k);
                setStep(2);
              }}
            />
          </>
        ) : null}

        {step === 2 ? (
          <>
            <h2 className="mt-1 text-xl font-extrabold leading-tight">Was möchte die Person im Moment?</h2>
            <ChoiceList
              options={wuensche}
              value={wunsch}
              onSelect={(k) => {
                setWunsch(k);
                setStep(3);
              }}
            />
            <button type="button" onClick={() => setStep(1)} className="btn-ghost mt-5">
              <ArrowLeft className="h-5 w-5" />
              Eine Frage zurück
            </button>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <h2 className="mt-1 text-xl font-extrabold leading-tight">Das könntet ihr als Nächstes überlegen</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Diese Vorschläge sind unverbindlich. Ob sie passen, entscheidet die betroffene Person.
            </p>
            <div className="mt-4 grid gap-3">
              {results.map((r) => (
                <OptionCard key={r.to} {...r} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setSituation(null);
                setWunsch(null);
                setStep(1);
              }}
              className="btn-ghost mt-5"
            >
              <RotateCcw className="h-5 w-5" />
              Fragen neu beantworten
            </button>
            <Link to="/helfen" className="btn-primary mt-3">
              Zurück zur Übersicht
              <ArrowRight className="h-5 w-5" />
            </Link>
          </>
        ) : null}
      </main>

      <BottomNav />
    </div>
  );
}
