import { createFileRoute, Link } from "@tanstack/react-router";
import { NotebookPen } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/helfen/dokumentieren")({
  head: () => ({
    meta: [
      { title: "Gemeinsam dokumentieren – StandUp" },
      {
        name: "description",
        content: "Checkliste, um gemeinsam festzuhalten, was passiert ist – die betroffene Person entscheidet.",
      },
      { property: "og:title", content: "Gemeinsam dokumentieren – StandUp" },
      { property: "og:description", content: "Gemeinsam festhalten, was passiert ist." },
    ],
  }),
  component: DokumentierenPage,
});

function DokumentierenPage() {
  const { t } = useI18n();
  const checkliste = [
    t("help.doku.c1"),
    t("help.doku.c2"),
    t("help.doku.c3"),
    t("help.doku.c4"),
    t("help.doku.c5"),
    t("help.doku.c6"),
  ];

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title={t("help.doku.title")} subtitle={t("help.doku.subtitle")} />

      <main className="mx-auto max-w-md px-5">
        <h2 className="mt-6 text-xl font-extrabold leading-tight">{t("help.doku.lead")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("help.doku.text")}</p>

        <h3 className="mt-7 text-lg font-extrabold">{t("help.doku.checklistTitle")}</h3>
        <ul className="mt-3 grid gap-2">
          {checkliste.map((c, i) => (
            <li key={c} className="card-tile grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 p-3.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-soft text-sm font-extrabold text-primary">
                {i + 1}
              </span>
              <span className="min-w-0 text-sm leading-snug">{c}</span>
            </li>
          ))}
        </ul>

        <Link to="/vorfall" search={{ modus: "gemeinsam" }} className="btn-primary mt-7">
          <NotebookPen className="h-5 w-5" />
          {t("help.doku.cta")}
        </Link>
        <p className="mt-3 text-center text-xs text-muted-foreground">{t("help.doku.note")}</p>
      </main>

      <BottomNav />
    </div>
  );
}
