import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, X } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { CopyText } from "@/components/CopyText";

export const Route = createFileRoute("/helfen/zuhoeren")({
  head: () => ({
    meta: [
      { title: "Zuhören – jemandem helfen – StandUp" },
      {
        name: "description",
        content: "Ruhig zuhören: Einstiegssätze zum Kopieren, hilfreiche Haltungen und Sätze, die eher belasten.",
      },
      { property: "og:title", content: "Zuhören – StandUp" },
      { property: "og:description", content: "Einfach da sein kann schon helfen." },
    ],
  }),
  component: ZuhoerenPage,
});

const openers = [
  "Ich bin für dich da. Möchtest du mir erzählen, was passiert ist?",
  "Du musst mir nichts erzählen, was du nicht erzählen möchtest.",
  "Möchtest du, dass ich einfach zuhöre oder sollen wir gemeinsam überlegen, was dir helfen könnte?",
  "Was brauchst du gerade von mir?",
];

const helps = [
  "Nicht unterbrechen.",
  "Keine Schuldzuweisungen.",
  "Nicht sofort nach einer Lösung suchen.",
  "Gefühle ernst nehmen.",
  "Nachfragen, bevor man etwas weitererzählt.",
];

const avoid = [
  "Ignorier es einfach.",
  "Das war bestimmt nicht so gemeint.",
  "Du musst dich einfach wehren.",
  "Warum hast du nichts dagegen gemacht?",
  "So schlimm ist das doch nicht.",
];

function ZuhoerenPage() {
  return (
    <div className="min-h-screen pb-32">
      <AppHeader title="Zuhören" subtitle="In Ruhe und ohne Druck." />

      <main className="mx-auto max-w-md px-5">
        <h2 className="mt-6 text-xl font-extrabold leading-tight">Einfach da sein kann schon helfen.</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Du musst keine perfekte Antwort haben. Gib der Person Zeit und lass sie selbst entscheiden, was sie
          erzählen möchte.
        </p>

        <h3 className="mt-7 text-lg font-extrabold">So kannst du anfangen</h3>
        <p className="mt-1 text-sm text-muted-foreground">Tippe auf einen Satz, um ihn zu kopieren.</p>
        <div className="mt-3 grid gap-3">
          {openers.map((t) => (
            <CopyText key={t} text={t} />
          ))}
        </div>

        <h3 className="mt-8 text-lg font-extrabold">Das kann helfen</h3>
        <ul className="mt-3 grid gap-2">
          {helps.map((h) => (
            <li key={h} className="card-tile grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 p-3.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-success-soft text-success">
                <Check className="h-4 w-4" />
              </span>
              <span className="min-w-0 text-sm leading-snug">{h}</span>
            </li>
          ))}
        </ul>

        <h3 className="mt-8 text-lg font-extrabold">Diese Sätze lieber vermeiden</h3>
        <ul className="mt-3 grid gap-2">
          {avoid.map((a) => (
            <li
              key={a}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-border/70 bg-muted/50 p-3.5"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-background text-muted-foreground">
                <X className="h-4 w-4" />
              </span>
              <span className="min-w-0 text-sm leading-snug text-muted-foreground">„{a}“</span>
            </li>
          ))}
        </ul>

        <section className="card-tile mt-4 border-success/30 bg-success-soft p-4">
          <h4 className="text-sm font-extrabold">Besser:</h4>
          <p className="mt-1 text-sm leading-snug">
            „Danke, dass du mir das erzählst. Was würde dir jetzt helfen?“
          </p>
        </section>
        <div className="mt-3">
          <CopyText text="Danke, dass du mir das erzählst. Was würde dir jetzt helfen?" tone="soft" />
        </div>

        <Link to="/helfen/was-tun" className="btn-primary mt-7">
          Weiter: Gemeinsam überlegen
          <ArrowRight className="h-5 w-5" />
        </Link>
      </main>

      <BottomNav />
    </div>
  );
}
