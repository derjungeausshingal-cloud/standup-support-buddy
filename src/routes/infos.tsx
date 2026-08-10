import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { OptionCard } from "@/components/OptionCard";
import { AlertCircle, Scale } from "lucide-react";

export const Route = createFileRoute("/infos")({
  head: () => ({
    meta: [
      { title: "Infos zu Mobbing & Diskriminierung – StandUp" },
      { name: "description", content: "Verständliche Informationen zu Mobbing, Cybermobbing, Diskriminierung, Beleidigungen und Bedrohungen." },
      { property: "og:title", content: "Infos zu Mobbing & Diskriminierung – StandUp" },
      { property: "og:description", content: "Klar erklärt, ohne Diagnose und ohne Druck." },
    ],
  }),
  component: InfosPage,
});

const topics = [
  {
    title: "Mobbing",
    text: "Von Mobbing spricht man meist, wenn eine Person über längere Zeit immer wieder verletzt, ausgegrenzt oder herabgesetzt wird und sich schwer wehren kann. Ein einzelner Streit ist damit nicht gemeint – auch wenn er weh tun kann.",
  },
  {
    title: "Cybermobbing",
    text: "Cybermobbing passiert online: in Chats, sozialen Netzwerken oder Spielen. Typisch sind wiederholte Beleidigungen, das Verbreiten von Bildern oder Gerüchten oder das gezielte Ausschließen aus Gruppen. Screenshots können später hilfreich sein.",
  },
  {
    title: "Diskriminierung",
    text: "Diskriminierung bedeutet, dass jemand schlechter behandelt wird – zum Beispiel wegen Herkunft, Hautfarbe, Religion, Geschlecht, Behinderung, Alter oder sexueller Orientierung. Sie kann offen oder versteckt passieren.",
  },
  {
    title: "Beleidigungen",
    text: "Beleidigungen sind Äußerungen, die eine Person herabwürdigen. Sie können mündlich, schriftlich oder mit Bildern geschehen. Wie stark sie belasten, entscheidest nicht du allein an der Lautstärke – dein Empfinden zählt.",
  },
  {
    title: "Bedrohungen",
    text: "Bei Bedrohungen wird jemandem Schaden angekündigt. Wenn du dich unsicher fühlst, kannst du dir Unterstützung holen – etwa bei einer Vertrauensperson oder in einer akuten Situation beim Notruf 110.",
  },
];

function InfosPage() {
  const [open, setOpen] = useState<string | null>("Mobbing");

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Infos" back={false} subtitle="Verständlich erklärt – ohne Bewertung deiner Situation." />

      <main className="mx-auto max-w-md px-5">
        <div className="mt-5 grid gap-3">
          {topics.map((t) => {
            const isOpen = open === t.title;
            return (
              <article key={t.title} className="card-tile overflow-hidden">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : t.title)}
                  className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 text-left"
                >
                  <h2 className="min-w-0 text-base font-extrabold">{t.title}</h2>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen ? (
                  <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                ) : null}
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-3">
          <OptionCard to="/ist-das-mobbing" title="Ist das Mobbing?" description="Fragen, die dir beim Einordnen helfen können" icon={AlertCircle} />
          <OptionCard to="/rechte" title="Deine Rechte kennen" description="Handlungsmöglichkeiten im Überblick" icon={Scale} tone="warning" />
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          Diese Infos sind allgemein gehalten. StandUp stellt keine Diagnose und bewertet deine Situation nicht
          automatisch.
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
