import { createFileRoute, Link } from "@tanstack/react-router";
import { NotebookPen } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/helfen/dokumentieren")({
  head: () => ({
    meta: [
      { title: "Gemeinsam dokumentieren – StandUp" },
      {
        name: "description",
        content: "Checkliste, um gemeinsam festzuhalten, was passiert ist – die betroffene Person entscheidet.",
      },
      { property: "og:title", content: "Gemeinsam dokumentieren – StandUp" },
      { property: "og:description", content: "Gemeinsam festhalten, was passiert ist." },
    ],
  }),
  component: DokumentierenPage,
});

const checkliste = [
  "Was ist passiert?",
  "Wann ist es passiert?",
  "Wo ist es passiert?",
  "Wer war beteiligt?",
  "Gab es Zeugen?",
  "Gibt es Nachrichten, Screenshots, Fotos oder andere Unterlagen?",
];

function DokumentierenPage() {
  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Gemeinsam dokumentieren" subtitle="Die betroffene Person bestimmt." />

      <main className="mx-auto max-w-md px-5">
        <h2 className="mt-6 text-xl font-extrabold leading-tight">Gemeinsam festhalten, was passiert ist</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Eine Dokumentation kann dabei helfen, Ereignisse später nachvollziehbar zu beschreiben. Die betroffene
          Person entscheidet, was festgehalten wird.
        </p>

        <h3 className="mt-7 text-lg font-extrabold">Checkliste</h3>
        <ul className="mt-3 grid gap-2">
          {checkliste.map((c, i) => (
            <li key={c} className="card-tile grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 p-3.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-soft text-sm font-extrabold text-primary">
                {i + 1}
              </span>
              <span className="min-w-0 text-sm leading-snug">{c}</span>
            </li>
          ))}
        </ul>

        <Link to="/vorfall" search={{ modus: "gemeinsam" }} className="btn-primary mt-7">
          <NotebookPen className="h-5 w-5" />
          Vorfall gemeinsam dokumentieren
        </Link>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Alle Angaben sind freiwillig und können jederzeit pausiert werden.
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
