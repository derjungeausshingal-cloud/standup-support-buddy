import { createFileRoute, Link } from "@tanstack/react-router";
import { Hand, LifeBuoy, ListChecks, MapPin, Lock, Phone, Scale, Search, MessageCircle } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { OptionCard } from "@/components/OptionCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "standUp – Du bist nicht alleine" },
      {
        name: "description",
        content:
          "standUp begleitet dich nach einer belastenden Situation: Vorfall festhalten, Hilfe finden, nächste Schritte gehen.",
      },
      { property: "og:title", content: "standUp – Du bist nicht alleine" },
      {
        property: "og:description",
        content: "Ruhige Unterstützung nach belastenden Situationen: Hilfe, Orientierung und Beratungsstellen.",
      },
    ],
  }),
  component: Index,
});

const quick = [
  { to: "/hilfe", label: "Anonyme Beratung", icon: MessageCircle },
  { to: "/naechste-schritte", label: "Deine Rechte", icon: Scale },
  { to: "/beratungsstellen", label: "Stelle suchen", icon: Search },
  { to: "/hilfe", label: "Notfall Hilfe", icon: Phone },
];

function Index() {
  return (
    <div className="min-h-screen pb-28">
      <AppHeader subtitle="Du bist nicht alleine" />

      <main className="mx-auto max-w-md px-5">
        <h1 className="mt-7 text-2xl font-extrabold leading-tight">Wie können wir dir helfen?</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Wähle aus, was gerade auf dich zutrifft. Du bestimmst das Tempo.
        </p>

        <div className="mt-5 grid gap-4">
          <OptionCard
            to="/vorfall"
            icon={Hand}
            title="Mir ist was passiert"
            description="Halte den Vorfall in Ruhe fest – privat und sicher."
          />
          <OptionCard
            to="/hilfe"
            icon={LifeBuoy}
            title="Ich brauche Hilfe"
            description="Sofort jemanden erreichen, auch anonym."
          />
          <OptionCard
            to="/naechste-schritte"
            icon={ListChecks}
            title="Was kann ich jetzt tun?"
            description="Kleine, machbare Schritte für die nächste Zeit."
          />
          <OptionCard
            to="/beratungsstellen"
            icon={MapPin}
            title="Beratungsstellen finden"
            description="Anlaufstellen in deiner Nähe und online."
          />
        </div>

        <h2 className="mt-8 text-xl font-bold">Schnelle Hilfe</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {quick.map((q) => (
            <Link
              key={q.label}
              to={q.to}
              className="card-tile flex flex-col items-center gap-2 px-3 py-5 text-center"
            >
              <q.icon className="h-7 w-7 text-primary" />
              <span className="text-base font-semibold leading-tight">{q.label}</span>
            </Link>
          ))}
        </div>

        <div className="card-tile mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 bg-primary-soft p-4">
          <Lock className="h-6 w-6 shrink-0 text-primary" />
          <p className="min-w-0 text-base">
            <span className="font-bold">Deine Daten bleiben bei dir.</span>{" "}
            <span className="text-muted-foreground">Alles, was du hier festhältst, bleibt privat.</span>
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
