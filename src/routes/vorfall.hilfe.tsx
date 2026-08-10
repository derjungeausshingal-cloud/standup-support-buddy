import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, FileBarChart, HeartHandshake, MessageSquarePlus, Scale, Users } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { OptionCard } from "@/components/OptionCard";
import { Stepper } from "@/components/Stepper";

export const Route = createFileRoute("/vorfall/hilfe")({
  head: () => ({
    meta: [
      { title: "Was kann ich jetzt tun? – StandUp" },
      {
        name: "description",
        content: "Passende nächste Schritte nach einem dokumentierten Vorfall: Nachricht, Vertrauensperson, Beratung, Bericht, Rechte.",
      },
      { property: "og:title", content: "Was kann ich jetzt tun? – StandUp" },
      { property: "og:description", content: "Ruhige, freiwillige nächste Schritte – du entscheidest." },
    ],
  }),
  component: HilfePage,
});

function HilfePage() {
  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Was kann ich jetzt tun?" />
      <Stepper current={5} />

      <main className="mx-auto max-w-md px-5">
        <section className="card-tile mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-success/30 bg-success-soft p-4">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-success text-primary-foreground">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="text-base font-extrabold text-success">Dein Vorfall wurde gespeichert.</p>
            <p className="mt-0.5 text-sm text-foreground/80">Du findest ihn jederzeit in deinem Tagebuch.</p>
          </div>
        </section>

        <h2 className="mt-7 text-lg font-extrabold">Passende nächste Schritte für dich</h2>
        <p className="mt-1 text-sm text-muted-foreground">Alles freiwillig – such dir aus, was sich richtig anfühlt.</p>

        <div className="mt-3 grid gap-3">
          <OptionCard
            to="/nachricht"
            title="Nachricht erstellen"
            description="Eine ruhige, sachliche Nachricht an eine Person deines Vertrauens formulieren"
            icon={MessageSquarePlus}
            tone="primary"
          />
          <OptionCard
            to="/vertrauensperson"
            title="Vertrauensperson einbeziehen"
            description="Überlegen, mit wem du sprechen könntest"
            icon={Users}
            tone="info"
          />
          <OptionCard
            to="/beratung"
            title="Beratung & Hilfe finden"
            description="Professionelle Beratungsstellen und Anlaufstellen"
            icon={HeartHandshake}
            tone="success"
          />
          <OptionCard
            to="/bericht"
            title="Bericht erstellen"
            description="Eine übersichtliche Zusammenfassung deiner Einträge"
            icon={FileBarChart}
            tone="warning"
          />
          <OptionCard
            to="/rechte"
            title="Deine Rechte kennen"
            description="Verständliche Informationen zu möglichen Handlungsmöglichkeiten"
            icon={Scale}
            tone="warning"
          />
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          StandUp ersetzt keine professionelle psychologische oder rechtliche Beratung und trifft keine
          verbindlichen rechtlichen Entscheidungen.
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
