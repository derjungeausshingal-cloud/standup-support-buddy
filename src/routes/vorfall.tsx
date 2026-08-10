import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, MessageSquare, ShieldAlert, Users, MoreHorizontal, ChevronRight, Check } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/vorfall")({
  head: () => ({
    meta: [
      { title: "Mir ist was passiert – standUp" },
      { name: "description", content: "Halte fest, was passiert ist: Art des Vorfalls, Beschreibung, Zeit und Ort." },
      { property: "og:title", content: "Mir ist was passiert – standUp" },
      { property: "og:description", content: "Dokumentiere einen Vorfall in Ruhe, privat und in deinem Tempo." },
    ],
  }),
  component: VorfallPage,
});

const arten = [
  { key: "mobbing", label: "Mobbing", hint: "Wiederholtes Schikanieren, Ausgrenzen", icon: Users },
  { key: "diskriminierung", label: "Diskriminierung", hint: "Wegen Herkunft, Aussehen, Geschlecht …", icon: ShieldAlert },
  { key: "beleidigung", label: "Beleidigung", hint: "Beschimpfungen, Demütigungen", icon: MessageSquare },
  { key: "bedrohung", label: "Bedrohung", hint: "Drohungen, Einschüchterung", icon: AlertTriangle },
  { key: "anderes", label: "Etwas anderes", hint: "Etwas, das hier nicht steht", icon: MoreHorizontal },
];

function VorfallPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [text, setText] = useState("");

  return (
    <div className="min-h-screen pb-28">
      <AppHeader back subtitle="Wir glauben dir. Du bist nicht alleine." />

      <main className="mx-auto max-w-md px-5">
        <h1 className="mt-7 text-2xl font-extrabold">Mir ist was passiert</h1>

        <h2 className="mt-6 text-lg font-bold">1. Was ist passiert?</h2>
        <p className="mt-1 text-sm text-muted-foreground">Wähle die Art des Vorfalls aus.</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {arten.map((a) => {
            const active = selected === a.key;
            return (
              <button
                key={a.key}
                type="button"
                onClick={() => setSelected(a.key)}
                aria-pressed={active}
                className={`card-tile relative flex h-full flex-col items-start gap-3 p-4 text-left ${
                  active ? "border-primary bg-primary-soft" : ""
                }`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <a.icon className="h-5 w-5" />
                </span>
                {active && (
                  <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-4 w-4" />
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block text-base font-bold leading-tight">{a.label}</span>
                  <span className="mt-1 block text-sm leading-snug text-muted-foreground">{a.hint}</span>
                </span>
              </button>
            );
          })}
        </div>


        <h2 className="mt-7 text-lg font-bold">2. Beschreibe, was passiert ist</h2>
        <p className="mt-1 text-sm text-muted-foreground">Du entscheidest, was du aufschreibst.</p>
        <textarea
          value={text}
          maxLength={2000}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="Was ist passiert? Wer war beteiligt?"
          className="card-tile mt-3 w-full resize-none p-4 text-base outline-none focus:border-primary"
        />
        <p className="mt-1 text-right text-sm text-muted-foreground">{text.length} / 2000</p>

        <h2 className="mt-6 text-lg font-bold">3. Wann und wo?</h2>
        <div className="mt-3 grid gap-3">
          <input type="date" className="card-tile w-full p-4 text-base outline-none focus:border-primary" />
          <input
            type="text"
            placeholder="Ort (z. B. Schule, Arbeitsplatz)"
            className="card-tile w-full p-4 text-base outline-none focus:border-primary"
          />
        </div>

        <Link
          to="/naechste-schritte"
          className="mt-7 flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-lg font-bold text-primary-foreground"
        >
          Weiter: Was kann ich jetzt tun?
          <ChevronRight className="h-5 w-5" />
        </Link>
      </main>

      <BottomNav />
    </div>
  );
}
