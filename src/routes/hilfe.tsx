import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Heart, ShieldAlert } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/hilfe")({
  head: () => ({
    meta: [
      { title: "Ich brauche Hilfe – standUp" },
      { name: "description", content: "Soforthilfe, Notruf und anonyme Beratung – rund um die Uhr erreichbar." },
      { property: "og:title", content: "Ich brauche Hilfe – standUp" },
      { property: "og:description", content: "Telefonnummern und anonyme Beratung, wenn du jetzt Unterstützung brauchst." },
    ],
  }),
  component: HilfePage,
});

const kontakte = [
  { name: "Notruf", nummer: "112", hint: "Bei akuter Gefahr", tel: "112", icon: ShieldAlert },
  { name: "Telefonseelsorge", nummer: "0800 111 0 111", hint: "Kostenlos, anonym, 24/7", tel: "08001110111", icon: Heart },
  { name: "Nummer gegen Kummer", nummer: "116 111", hint: "Für Kinder & Jugendliche", tel: "116111", icon: MessageCircle },
  { name: "Hilfetelefon Gewalt", nummer: "116 016", hint: "Beratung in vielen Sprachen", tel: "116016", icon: Phone },
];

function HilfePage() {
  return (
    <div className="min-h-screen pb-28">
      <AppHeader back subtitle="Du musst das nicht alleine schaffen." />

      <main className="mx-auto max-w-md px-5">
        <h1 className="mt-7 text-2xl font-extrabold">Ich brauche Hilfe</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Diese Stellen sind für dich da – kostenlos und vertraulich.
        </p>

        <div className="mt-5 grid gap-4">
          {kontakte.map((k) => (
            <a
              key={k.name}
              href={`tel:${k.tel}`}
              className="card-tile grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 p-5"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                <k.icon className="h-6 w-6" />
              </span>
              <span className="min-w-0">
                <span className="block text-xl font-bold leading-tight">{k.name}</span>
                <span className="block text-lg font-semibold text-primary">{k.nummer}</span>
                <span className="block text-sm text-muted-foreground">{k.hint}</span>
              </span>
            </a>
          ))}
        </div>

        <Link
          to="/beratungsstellen"
          className="mt-6 flex items-center justify-center rounded-2xl bg-primary px-5 py-4 text-lg font-bold text-primary-foreground"
        >
          Beratungsstellen finden
        </Link>
      </main>

      <BottomNav />
    </div>
  );
}
