import { createFileRoute } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { evidenceLabels, formatDate, kindLabels, useIncidents } from "@/lib/incidents";

export const Route = createFileRoute("/bericht")({
  head: () => ({
    meta: [
      { title: "Bericht erstellen – StandUp" },
      { name: "description", content: "Aus deinen dokumentierten Vorfällen eine übersichtliche Zusammenfassung erzeugen." },
      { property: "og:title", content: "Bericht erstellen – StandUp" },
      { property: "og:description", content: "Eine ruhige Zusammenfassung zum Ausdrucken oder Teilen." },
    ],
  }),
  component: BerichtPage,
});

function BerichtPage() {
  const { incidents } = useIncidents();
  const sorted = [...incidents].sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Bericht" subtitle="Zusammenfassung deiner Einträge." />

      <main className="mx-auto max-w-md px-5">
        {sorted.length === 0 ? (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Es gibt noch keine Einträge, aus denen ein Bericht entstehen kann.
          </p>
        ) : (
          <>
            <section className="card-tile mt-6 p-4">
              <h2 className="text-base font-extrabold">Überblick</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {sorted.length} dokumentierte {sorted.length === 1 ? "Situation" : "Situationen"} zwischen{" "}
                {formatDate(sorted[0].date || sorted[0].createdAt.slice(0, 10))} und{" "}
                {formatDate(
                  sorted[sorted.length - 1].date || sorted[sorted.length - 1].createdAt.slice(0, 10),
                )}
                .
              </p>
            </section>

            <ol className="mt-4 grid gap-3">
              {sorted.map((i, index) => (
                <li key={i.id} className="card-tile p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Eintrag {index + 1} · {formatDate(i.date || i.createdAt.slice(0, 10))}
                  </p>
                  <h3 className="mt-1 text-base font-extrabold">
                    {i.kind ? kindLabels[i.kind] : "Ohne Kategorie"}
                    {i.place ? ` · ${i.place}` : ""}
                  </h3>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                    {i.description || "Keine Beschreibung"}
                  </p>
                  {i.witnesses ? <p className="mt-1 text-sm">Zeugen: {i.witnesses}</p> : null}
                  {i.evidence.length ? (
                    <p className="mt-1 text-sm">
                      Beweise: {i.evidence.map((e) => `${e.name} (${evidenceLabels[e.type]})`).join(", ")}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>

            <button type="button" onClick={() => window.print()} className="btn-primary mt-6">
              <Printer className="h-5 w-5" />
              Bericht drucken oder als PDF sichern
            </button>
          </>
        )}

        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          Teile den Bericht nur mit Personen, denen du vertraust. Er enthält persönliche Angaben.
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
