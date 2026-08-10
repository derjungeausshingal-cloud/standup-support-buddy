import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Copy, Sparkles } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { formatDate, kindLabels, useIncidents } from "@/lib/incidents";

export const Route = createFileRoute("/nachricht")({
  head: () => ({
    meta: [
      { title: "Nachricht erstellen – StandUp" },
      { name: "description", content: "Aus deinen Angaben eine ruhige, sachliche Nachricht an eine Vertrauensperson oder Stelle formulieren." },
      { property: "og:title", content: "Nachricht erstellen – StandUp" },
      { property: "og:description", content: "Ein Textvorschlag, den du frei anpassen kannst." },
    ],
  }),
  component: NachrichtPage,
});

const empfaenger = [
  "Lehrkraft",
  "Schulsozialarbeit",
  "Arbeitgeber",
  "Vertrauensperson",
  "Beratungsstelle",
];

function NachrichtPage() {
  const { incidents } = useIncidents();
  const latest = [...incidents].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))[0];
  const [ziel, setZiel] = useState(empfaenger[0]);
  const [copied, setCopied] = useState(false);

  const text = useMemo(() => {
    const art = latest?.kind ? kindLabels[latest.kind].toLowerCase() : "eine belastende Situation";
    const wann = latest?.date ? ` am ${formatDate(latest.date)}` : "";
    const wo = latest?.place ? ` (${latest.place})` : "";
    return [
      `Guten Tag,`,
      ``,
      `ich möchte Sie über etwas informieren, das mich belastet. Es ging um ${art}${wann}${wo}.`,
      ``,
      latest?.description ? `Was passiert ist: ${latest.description}` : `Ich beschreibe die Situation gerne genauer, wenn wir sprechen.`,
      latest?.witnesses ? `Mögliche Zeuginnen oder Zeugen: ${latest.witnesses}.` : "",
      latest?.evidence.length ? `Ich habe dazu ${latest.evidence.length} Datei(en) festgehalten.` : "",
      ``,
      `Ich würde mich freuen, wenn wir dazu in Ruhe sprechen könnten.`,
      ``,
      `Vielen Dank und freundliche Grüße`,
    ]
      .filter((l) => l !== "")
      .join("\n")
      .replace(/\n(?=[A-ZÄÖÜ])/g, "\n\n");
  }, [latest]);

  const [draft, setDraft] = useState(text);

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Nachricht erstellen" subtitle="Ein Vorschlag – du entscheidest, was du schreibst." />

      <main className="mx-auto max-w-md px-5">
        <section className="card-tile mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-primary/30 bg-primary-soft p-4">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Sparkles className="h-6 w-6" />
          </span>
          <p className="min-w-0 text-sm leading-snug">
            In einer späteren Version kann dir KI beim Formulieren helfen. Hier siehst du bereits einen
            sachlichen Textvorschlag aus deinen Angaben.
          </p>
        </section>

        <h2 className="mt-6 text-sm font-bold">An wen möchtest du schreiben?</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {empfaenger.map((e) => (
            <button
              key={e}
              type="button"
              aria-pressed={ziel === e}
              onClick={() => setZiel(e)}
              className={`rounded-full px-3.5 py-2 text-sm font-bold ${
                ziel === e ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {e}
            </button>
          ))}
        </div>

        <label className="mt-5 grid gap-2">
          <span className="text-sm font-bold">Dein Text ({ziel})</span>
          <textarea
            rows={14}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="field-input resize-none leading-relaxed"
          />
        </label>

        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(draft);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            } catch {
              setCopied(false);
            }
          }}
          className="btn-primary mt-4"
        >
          <Copy className="h-5 w-5" />
          {copied ? "Kopiert" : "Text kopieren"}
        </button>
        <button type="button" onClick={() => setDraft(text)} className="btn-ghost mt-3">
          Vorschlag zurücksetzen
        </button>
      </main>

      <BottomNav />
    </div>
  );
}
