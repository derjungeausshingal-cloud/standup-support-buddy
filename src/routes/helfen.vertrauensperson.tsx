import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/helfen/vertrauensperson")({
  head: () => ({
    meta: [
      { title: "Vertrauensperson einbeziehen – jemandem helfen – StandUp" },
      {
        name: "description",
        content: "Wen könnte die Person einbeziehen? Auswahl treffen und mit einer Vorlage das Gespräch vorbereiten.",
      },
      { property: "og:title", content: "Vertrauensperson – StandUp" },
      { property: "og:description", content: "Gespräch in Ruhe vorbereiten." },
    ],
  }),
  component: HelfenVertrauenspersonPage,
});

const personen = [
  "Eltern/Familie",
  "Freund/in",
  "Lehrer/in",
  "Schulsozialarbeit",
  "Vertrauenslehrer/in",
  "Vorgesetzte Person",
  "Betriebsrat/Personalvertretung",
  "Beratungsstelle",
  "Andere Person",
];

const vorlage =
  "Ich möchte mit dir über etwas sprechen, das mich beschäftigt. [kurze Beschreibung]. Ich wünsche mir von dir [Unterstützung].";

function HelfenVertrauenspersonPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [text, setText] = useState(vorlage);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* Kopieren nicht möglich */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Vertrauensperson" subtitle="Die Person entscheidet, wen sie einbezieht." />

      <main className="mx-auto max-w-md px-5">
        <h2 className="mt-6 text-xl font-extrabold leading-tight">Wen könnte die Person einbeziehen?</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Ihr könnt gemeinsam überlegen, wer passen könnte. Nichts davon muss sofort passieren.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {personen.map((p) => {
            const active = selected === p;
            return (
              <button
                key={p}
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(active ? null : p)}
                className={`card-tile relative flex h-full items-center p-4 text-left text-sm font-bold leading-snug ${
                  active ? "border-primary bg-primary-soft" : ""
                }`}
              >
                {p}
                {active ? (
                  <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {selected ? (
          <section className="mt-6">
            <h3 className="text-lg font-extrabold">Gespräch vorbereiten</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Vorlage für ein Gespräch mit: <span className="font-bold text-foreground">{selected}</span>. Du kannst
              den Text anpassen.
            </p>
            <textarea
              value={text}
              rows={6}
              maxLength={1500}
              onChange={(e) => setText(e.target.value)}
              className="field-input mt-3 resize-none"
            />
            <button type="button" onClick={copy} className="btn-primary mt-3">
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              {copied ? "Kopiert" : "Text kopieren"}
            </button>
            <button type="button" onClick={() => setText(vorlage)} className="btn-ghost mt-3">
              Vorlage zurücksetzen
            </button>
          </section>
        ) : null}

        <Link to="/helfen/hilfe-finden" className="btn-ghost mt-7">
          Weitere Unterstützung suchen
          <ArrowRight className="h-5 w-5" />
        </Link>
      </main>

      <BottomNav />
    </div>
  );
}
