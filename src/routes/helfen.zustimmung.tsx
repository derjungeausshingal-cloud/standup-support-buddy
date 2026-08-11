import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/helfen/zustimmung")({
  head: () => ({
    meta: [
      { title: "Nicht ohne Zustimmung handeln – StandUp" },
      {
        name: "description",
        content: "Unterstützen, ohne über den Kopf der betroffenen Person hinweg zu entscheiden – mit Beispielen.",
      },
      { property: "og:title", content: "Nicht ohne Zustimmung handeln – StandUp" },
      { property: "og:description", content: "Unterstützen, ohne die Kontrolle zu übernehmen." },
    ],
  }),
  component: ZustimmungPage,
});

const beispiele = [
  {
    statt: "Ich gehe morgen zu deinem Lehrer.",
    besser: "Möchtest du, dass wir gemeinsam mit deinem Lehrer sprechen?",
  },
  {
    statt: "Ich erzähle das deinen Eltern.",
    besser: "Gibt es jemanden, dem du vertraust und den du gerne einbeziehen möchtest?",
  },
  {
    statt: "Ich kümmere mich darum.",
    besser: "Was wäre für dich ein guter nächster Schritt?",
  },
];

function ZustimmungPage() {
  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Nicht ohne Zustimmung" subtitle="Die Person behält die Kontrolle." />

      <main className="mx-auto max-w-md px-5">
        <h2 className="mt-6 text-xl font-extrabold leading-tight">Unterstützen, ohne die Kontrolle zu übernehmen</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Gut gemeinte Hilfe kann sich unangenehm anfühlen, wenn über den Kopf der betroffenen Person hinweg
          entschieden wird. Frage deshalb nach Möglichkeit zuerst, was sie möchte.
        </p>

        <div className="mt-6 grid gap-3">
          {beispiele.map((b) => (
            <article key={b.statt} className="card-tile p-4">
              <p className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">Statt</p>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">„{b.statt}“</p>
              <p className="mt-3 text-xs font-extrabold uppercase tracking-wide text-success">Besser</p>
              <p className="mt-1 text-sm font-semibold leading-snug">„{b.besser}“</p>
            </article>
          ))}
        </div>

        <section className="mt-6 rounded-2xl border-2 border-warning/40 bg-warning-soft p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
            <h3 className="text-base font-extrabold">Bei unmittelbarer Gefahr</h3>
          </div>
          <p className="mt-2 text-sm leading-snug">
            Wenn jemand unmittelbar in Gefahr ist, kann schnelle professionelle Hilfe notwendig sein.
          </p>
          <Link to="/notfall" className="btn-ghost mt-3">
            Notfall-Seite öffnen
            <ArrowRight className="h-5 w-5" />
          </Link>
        </section>

        <Link to="/helfen/hilfe-finden" className="btn-primary mt-7">
          Gemeinsam Unterstützung suchen
          <ArrowRight className="h-5 w-5" />
        </Link>
      </main>

      <BottomNav />
    </div>
  );
}
