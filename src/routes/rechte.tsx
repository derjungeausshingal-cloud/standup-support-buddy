import { createFileRoute } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/rechte")({
  head: () => ({
    meta: [
      { title: "Deine Rechte kennen – StandUp" },
      { name: "description", content: "Verständliche Informationen zu Rechten und Handlungsmöglichkeiten bei Mobbing und Diskriminierung." },
      { property: "og:title", content: "Deine Rechte kennen – StandUp" },
      { property: "og:description", content: "Ein Überblick über mögliche Wege – ohne rechtliche Beratung zu ersetzen." },
    ],
  }),
  component: RechtePage,
});

const bereiche = [
  {
    title: "In der Schule",
    text: "Schulen haben eine Fürsorgepflicht. Du kannst dich an Lehrkräfte, Vertrauenslehrerinnen, Schulsozialarbeit oder die Schulleitung wenden. Auch deine Eltern oder eine Schulpsychologin können einbezogen werden – wenn du das möchtest.",
  },
  {
    title: "Am Arbeitsplatz",
    text: "Arbeitgeber müssen Beschäftigte vor Benachteiligung und Belästigung schützen. Mögliche Ansprechpartner sind Vorgesetzte, Personalabteilung, Betriebs- oder Personalrat sowie die Beschwerdestelle nach dem Allgemeinen Gleichbehandlungsgesetz (AGG).",
  },
  {
    title: "Diskriminierungsschutz (AGG)",
    text: "Das AGG schützt unter anderem vor Benachteiligung wegen Herkunft, Geschlecht, Religion, Behinderung, Alter oder sexueller Identität. Für Beschwerden gelten oft Fristen – eine Beratungsstelle kann dir sagen, was in deinem Fall gilt.",
  },
  {
    title: "Online und im Chat",
    text: "Plattformen bieten Melde- und Blockierfunktionen. Screenshots mit Datum können später hilfreich sein. Bei schweren Fällen ist eine Anzeige möglich.",
  },
  {
    title: "Strafrechtlich relevant",
    text: "Beleidigung, Bedrohung, Nötigung oder das Verbreiten von Bildern ohne Einwilligung können Straftaten sein. Eine Anzeige kannst du bei jeder Polizeidienststelle oder online stellen – freiwillig und in deinem Tempo.",
  },
];

function RechtePage() {
  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Deine Rechte" subtitle="Ein Überblick über mögliche Wege." />

      <main className="mx-auto max-w-md px-5">
        <section className="card-tile mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-warning/30 bg-warning-soft p-4">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-warning text-primary-foreground">
            <Scale className="h-6 w-6" />
          </span>
          <p className="min-w-0 text-sm leading-snug">
            Diese Informationen sind allgemein. Sie ersetzen keine rechtliche Beratung und treffen keine
            verbindlichen Entscheidungen.
          </p>
        </section>

        <div className="mt-5 grid gap-3">
          {bereiche.map((b) => (
            <article key={b.title} className="card-tile p-4">
              <h2 className="text-base font-extrabold">{b.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
            </article>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
