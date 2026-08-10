import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ChevronRight, FileBarChart, Paperclip, Plus } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { formatDate, kindLabels, useIncidents } from "@/lib/incidents";

export const Route = createFileRoute("/tagebuch/")({
  head: () => ({
    meta: [
      { title: "Mein Tagebuch – StandUp" },
      { name: "description", content: "Chronologische Übersicht deiner dokumentierten Vorfälle mit Datum, Art und Beschreibung." },
      { property: "og:title", content: "Mein Tagebuch – StandUp" },
      { property: "og:description", content: "Deine dokumentierten Vorfälle an einem ruhigen Ort." },
    ],
  }),
  component: TagebuchPage,
});

function TagebuchPage() {
  const { incidents } = useIncidents();
  const sorted = [...incidents].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Mein Tagebuch" back={false} subtitle="Alles, was du bisher festgehalten hast." />

      <main className="mx-auto max-w-md px-5">
        {sorted.length > 1 ? (
          <Link to="/bericht" className="card-tile mt-5 flex items-center gap-3 border-warning/30 bg-warning-soft p-4">
            <FileBarChart className="h-5 w-5 shrink-0 text-warning" />
            <span className="min-w-0 text-sm font-bold">
              Du hast mehrere Einträge – du kannst daraus eine Zusammenfassung erstellen.
            </span>
          </Link>
        ) : null}

        {sorted.length === 0 ? (
          <section className="card-tile mt-6 grid justify-items-center gap-3 p-8 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
              <BookOpen className="h-7 w-7" />
            </span>
            <p className="text-base font-extrabold">Noch keine Einträge</p>
            <p className="text-sm text-muted-foreground">
              Wenn du möchtest, kannst du einen Vorfall dokumentieren. Du entscheidest, was du festhältst.
            </p>
            <Link to="/vorfall" className="btn-primary mt-2">
              <Plus className="h-5 w-5" />
              Vorfall dokumentieren
            </Link>
          </section>
        ) : (
          <ul className="mt-5 grid gap-3">
            {sorted.map((i) => (
              <li key={i.id}>
                <Link
                  to="/tagebuch/$id"
                  params={{ id: i.id }}
                  className="card-tile grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-extrabold text-primary">
                        {i.kind ? kindLabels[i.kind] : "Ohne Kategorie"}
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {formatDate(i.date || i.createdAt.slice(0, 10))}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-snug text-foreground/85">
                      {i.description || "Keine Beschreibung"}
                    </p>
                    {i.evidence.length > 0 ? (
                      <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                        <Paperclip className="h-3.5 w-3.5" />
                        {i.evidence.length} {i.evidence.length === 1 ? "Beweis" : "Beweise"}
                      </p>
                    ) : null}
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
