import { createFileRoute } from "@tanstack/react-router";
import { Compass, Ear, HandHeart, Heart, NotebookPen, Search, ShieldQuestion } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { OptionCard } from "@/components/OptionCard";

export const Route = createFileRoute("/helfen/")({
  head: () => ({
    meta: [
      { title: "Jemandem helfen – StandUp" },
      {
        name: "description",
        content:
          "Wie du Freundinnen, Mitschüler oder Kolleginnen bei Mobbing und Diskriminierung unterstützen kannst – Zuhören, Ernst nehmen, gemeinsam Schritte finden.",
      },
      { property: "og:title", content: "Jemandem helfen – StandUp" },
      { property: "og:description", content: "Zuhören, ernst nehmen, gemeinsam Schritte finden." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HelfenPage,
});

const cards = [
  {
    to: "/helfen/zuhoeren",
    title: "Zuhören",
    description: "Finde Worte für ein ruhiges Gespräch und erfahre, wie du wirklich zuhören kannst.",
    icon: Ear,
    tone: "primary" as const,
  },
  {
    to: "/helfen/ernst-nehmen",
    title: "Ernst nehmen",
    description: "Zeige der Person, dass du ihr glaubst und ihre Gefühle respektierst.",
    icon: Heart,
    tone: "success" as const,
  },
  {
    to: "/helfen/dokumentieren",
    title: "Gemeinsam dokumentieren",
    description: "Wenn die Person möchte, könnt ihr gemeinsam festhalten, was passiert ist.",
    icon: NotebookPen,
    tone: "info" as const,
  },
  {
    to: "/helfen/zustimmung",
    title: "Nicht ohne Zustimmung handeln",
    description: "Unterstütze die Person, ohne ihr die Kontrolle über die Situation abzunehmen.",
    icon: ShieldQuestion,
    tone: "warning" as const,
  },
  {
    to: "/helfen/hilfe-finden",
    title: "Hilfe finden",
    description: "Findet gemeinsam eine passende Vertrauens- oder Beratungsstelle.",
    icon: Search,
    tone: "primary" as const,
  },
  {
    to: "/helfen/was-tun",
    title: "Was kann ich konkret tun?",
    description: "Beantworte ein paar kurze Fragen und erhalte passende nächste Schritte.",
    icon: Compass,
    tone: "info" as const,
  },
];

function HelfenPage() {
  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Ich möchte jemandem helfen" subtitle="Danke, dass du da bist." />

      <main className="mx-auto max-w-md px-5">
        <section className="card-tile mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-success/30 bg-success-soft p-4">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-success text-primary-foreground">
            <HandHeart className="h-6 w-6" />
          </span>
          <p className="min-w-0 text-sm leading-snug">
            Du musst nichts perfekt machen. Schon Zuhören und Dasein kann viel bewirken.
          </p>
        </section>

        <div className="mt-5 grid gap-3">
          {cards.map((c) => (
            <OptionCard key={c.to} {...c} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
