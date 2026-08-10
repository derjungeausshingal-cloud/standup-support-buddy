import { createFileRoute } from "@tanstack/react-router";
import { Ear, HandHeart, Heart, NotebookPen, Search, ShieldQuestion } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { OptionCard } from "@/components/OptionCard";

export const Route = createFileRoute("/helfen")({
  head: () => ({
    meta: [
      { title: "Jemandem helfen – StandUp" },
      { name: "description", content: "Wie du Freundinnen, Mitschüler oder Kollegen bei Mobbing und Diskriminierung unterstützen kannst." },
      { property: "og:title", content: "Jemandem helfen – StandUp" },
      { property: "og:description", content: "Zuhören, ernst nehmen, gemeinsam Schritte finden." },
    ],
  }),
  component: HelfenPage,
});

const tipps = [
  { icon: Ear, title: "Zuhören", text: "Lass die Person erzählen, ohne zu bewerten. Oft hilft es schon, gehört zu werden." },
  { icon: Heart, title: "Ernst nehmen", text: "Sätze wie „Ich glaube dir“ oder „Das tut mir leid“ geben Halt." },
  { icon: NotebookPen, title: "Gemeinsam dokumentieren", text: "Wenn die Person möchte, könnt ihr Vorfälle zusammen festhalten." },
  { icon: ShieldQuestion, title: "Nicht ohne Zustimmung handeln", text: "Frag nach, bevor du mit anderen sprichst. Die Person bestimmt das Tempo." },
  { icon: Search, title: "Passende Hilfe finden", text: "Ihr könnt gemeinsam nach Beratungsstellen oder Ansprechpersonen suchen." },
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
          {tipps.map((t) => (
            <article key={t.title} className="card-tile grid grid-cols-[auto_minmax(0,1fr)] gap-4 p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                <t.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h2 className="text-base font-extrabold leading-tight">{t.title}</h2>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">{t.text}</p>
              </div>
            </article>
          ))}
        </div>

        <h2 className="mt-8 text-lg font-extrabold">Das könnte weiterhelfen</h2>
        <div className="mt-3 grid gap-3">
          <OptionCard to="/beratung" title="Beratung & Hilfe finden" description="Anlaufstellen für euch beide" icon={Search} tone="success" />
          <OptionCard to="/infos" title="Infos zu Mobbing & Co." description="Verständlich erklärt" icon={ShieldQuestion} tone="info" />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
