import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Briefcase, GraduationCap, Heart, MessageSquarePlus, Users } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { OptionCard } from "@/components/OptionCard";

export const Route = createFileRoute("/vertrauensperson")({
  head: () => ({
    meta: [
      { title: "Vertrauensperson einbeziehen – StandUp" },
      { name: "description", content: "Überlegen, mit wem du sprechen könntest: Familie, Freundinnen, Schule oder Arbeit." },
      { property: "og:title", content: "Vertrauensperson einbeziehen – StandUp" },
      { property: "og:description", content: "Du bestimmst, wen du einbeziehst und wann." },
    ],
  }),
  component: VertrauenspersonPage,
});

const personen = [
  { key: "familie", label: "Familie", hint: "Eltern, Geschwister, Großeltern", icon: Heart },
  { key: "freunde", label: "Freundinnen & Freunde", hint: "Jemand, dem du vertraust", icon: Users },
  { key: "schule", label: "Schule", hint: "Vertrauenslehrkraft, Schulsozialarbeit", icon: GraduationCap },
  { key: "arbeit", label: "Arbeit", hint: "Vorgesetzte, Betriebsrat, Personalabteilung", icon: Briefcase },
];

function VertrauenspersonPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Vertrauensperson" subtitle="Wenn du möchtest, musst du das nicht allein tragen." />

      <main className="mx-auto max-w-md px-5">
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Eine Möglichkeit wäre, mit einer Person zu sprechen, bei der du dich sicher fühlst. Du entscheidest,
          wie viel du erzählst.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {personen.map((p) => {
            const active = selected === p.key;
            return (
              <button
                key={p.key}
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(active ? null : p.key)}
                className={`card-tile flex h-full flex-col items-start gap-3 p-4 text-left ${
                  active ? "border-info bg-info-soft" : ""
                }`}
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-info-soft text-info">
                  <p.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-base font-extrabold leading-tight">{p.label}</span>
                  <span className="mt-1 block text-sm leading-snug text-muted-foreground">{p.hint}</span>
                </span>
              </button>
            );
          })}
        </div>

        {selected ? (
          <section className="card-tile mt-5 p-4">
            <h2 className="text-base font-extrabold">Ein möglicher Einstieg</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              „Ich möchte dir gerne etwas erzählen, das mich seit einiger Zeit belastet. Hast du kurz Zeit? Es
              wäre schön, wenn du erst einmal nur zuhörst.“
            </p>
          </section>
        ) : null}

        <div className="mt-6 grid gap-3">
          <OptionCard
            to="/nachricht"
            title="Nachricht erstellen"
            description="Wenn dir Schreiben leichter fällt als Sprechen"
            icon={MessageSquarePlus}
          />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
