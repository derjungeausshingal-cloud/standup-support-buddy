import { createFileRoute, Link } from "@tanstack/react-router";
import { NotebookPen, Users, MapPin, Scale, Info } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { OptionCard } from "@/components/OptionCard";

export const Route = createFileRoute("/naechste-schritte")({
  head: () => ({
    meta: [
      { title: "Was kann ich jetzt tun? – standUp" },
      { name: "description", content: "Passende nächste Schritte: aufschreiben, Vertrauensperson einbeziehen, Rechte kennen." },
      { property: "og:title", content: "Was kann ich jetzt tun? – standUp" },
      { property: "og:description", content: "Kleine, machbare Schritte nach einer belastenden Situation." },
    ],
  }),
  component: SchrittePage,
});

function SchrittePage() {
  return (
    <div className="min-h-screen pb-28">
      <AppHeader back subtitle="Jede Situation ist anders. Wähle, was dir jetzt hilft." />

      <main className="mx-auto max-w-md px-5">
        <h1 className="mt-7 text-2xl font-extrabold">Was kann ich jetzt tun?</h1>

        <div className="mt-5 grid gap-4">
          <OptionCard
            to="/vorfall"
            icon={NotebookPen}
            title="Vorfall aufschreiben"
            description="Details festhalten, solange du sie erinnerst."
          />
          <OptionCard
            to="/hilfe"
            icon={Users}
            title="Vertrauensperson einbeziehen"
            description="Teile, was passiert ist, mit jemandem dem du vertraust."
          />
          <OptionCard
            to="/beratungsstellen"
            icon={MapPin}
            title="Beratung & Hilfe finden"
            description="Anlaufstellen in deiner Nähe – anonym und vertraulich."
          />
          <OptionCard
            to="/naechste-schritte"
            icon={Scale}
            title="Deine Rechte kennen"
            description="Was dir bei Mobbing und Diskriminierung zusteht."
          />
        </div>

        <div className="card-tile mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 p-4">
          <Info className="mt-0.5 h-6 w-6 shrink-0 text-muted-foreground" />
          <p className="min-w-0 text-base text-muted-foreground">
            <span className="font-bold text-foreground">Wichtiger Hinweis:</span> Wir geben keine rechtliche
            Beratung. Bei akuter Gefahr wähle bitte 112.
          </p>
        </div>

        <Link
          to="/hilfe"
          className="mt-6 flex items-center justify-center rounded-2xl bg-primary px-5 py-4 text-lg font-bold text-primary-foreground"
        >
          Jetzt Hilfe erreichen
        </Link>
      </main>

      <BottomNav />
    </div>
  );
}
