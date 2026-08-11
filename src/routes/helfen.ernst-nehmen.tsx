import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Info } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { CopyText } from "@/components/CopyText";

export const Route = createFileRoute("/helfen/ernst-nehmen")({
  head: () => ({
    meta: [
      { title: "Ernst nehmen – jemandem helfen – StandUp" },
      {
        name: "description",
        content: "Formulierungen, die zeigen: Ich glaube dir und nehme dich ernst – ohne vorschnelle Bewertung.",
      },
      { property: "og:title", content: "Ernst nehmen – StandUp" },
      { property: "og:description", content: "Zeig der Person: Ich nehme dich ernst." },
    ],
  }),
  component: ErnstNehmenPage,
});

const saetze = [
  "Danke, dass du mir das anvertraust.",
  "Ich nehme das ernst.",
  "Das klingt belastend.",
  "Wie kann ich dich unterstützen?",
  "Du entscheidest, was wir als Nächstes machen.",
];

function ErnstNehmenPage() {
  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Ernst nehmen" subtitle="Glauben statt bewerten." />

      <main className="mx-auto max-w-md px-5">
        <h2 className="mt-6 text-xl font-extrabold leading-tight">Zeig der Person: Ich nehme dich ernst.</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Menschen erzählen schwierige Erfahrungen manchmal erst nach längerer Zeit. Versuche nicht sofort zu
          beurteilen, was passiert ist. Höre zunächst zu.
        </p>

        <h3 className="mt-7 text-lg font-extrabold">Hilfreiche Formulierungen</h3>
        <p className="mt-1 text-sm text-muted-foreground">Tippe auf einen Satz, um ihn zu kopieren.</p>
        <div className="mt-3 grid gap-3">
          {saetze.map((s) => (
            <CopyText key={s} text={s} />
          ))}
        </div>

        <section className="card-tile mt-6 grid grid-cols-[auto_minmax(0,1fr)] gap-3 border-info/30 bg-info-soft p-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-info text-primary-foreground">
            <Info className="h-5 w-5" />
          </span>
          <p className="min-w-0 text-sm leading-snug">
            StandUp stellt nicht fest, ob es sich um Mobbing, Diskriminierung oder eine Straftat handelt. Das kann
            nur gemeinsam mit fachkundigen Personen eingeschätzt werden.
          </p>
        </section>

        <Link to="/helfen/was-tun" className="btn-primary mt-7">
          Gemeinsam nächsten Schritt finden
          <ArrowRight className="h-5 w-5" />
        </Link>
      </main>

      <BottomNav />
    </div>
  );
}
