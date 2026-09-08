import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, X } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { CopyText } from "@/components/CopyText";
import { useI18n } from "@/lib/i18n";

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

function ZuhoerenPage() {
  const { t } = useI18n();

  const openers = [t("help.zuhoeren.opener1"), t("help.zuhoeren.opener2"), t("help.zuhoeren.opener3"), t("help.zuhoeren.opener4")];
  const helps = [
    t("help.zuhoeren.help1"),
    t("help.zuhoeren.help2"),
    t("help.zuhoeren.help3"),
    t("help.zuhoeren.help4"),
    t("help.zuhoeren.help5"),
  ];
  const avoid = [
    t("help.zuhoeren.avoid1"),
    t("help.zuhoeren.avoid2"),
    t("help.zuhoeren.avoid3"),
    t("help.zuhoeren.avoid4"),
    t("help.zuhoeren.avoid5"),
  ];

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title={t("help.zuhoeren.title")} subtitle={t("help.zuhoeren.subtitle")} />

      <main className="mx-auto max-w-md px-5">
        <h2 className="mt-6 text-xl font-extrabold leading-tight">{t("help.zuhoeren.lead")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("help.zuhoeren.text")}</p>

        <h3 className="mt-7 text-lg font-extrabold">{t("help.zuhoeren.startTitle")}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{t("help.zuhoeren.startHint")}</p>
        <div className="mt-3 grid gap-3">
          {openers.map((o) => (
            <CopyText key={o} text={o} />
          ))}
        </div>

        <h3 className="mt-8 text-lg font-extrabold">{t("help.zuhoeren.helpsTitle")}</h3>
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

        <h3 className="mt-8 text-lg font-extrabold">{t("help.zuhoeren.avoidTitle")}</h3>
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
          <h4 className="text-sm font-extrabold">{t("help.zuhoeren.betterTitle")}</h4>
          <p className="mt-1 text-sm leading-snug">„{t("help.zuhoeren.betterText")}“</p>
        </section>
        <div className="mt-3">
          <CopyText text={t("help.zuhoeren.betterText")} tone="soft" />
        </div>

        <Link to="/helfen/was-tun" className="btn-primary mt-7">
          {t("help.zuhoeren.cta")}
          <ArrowRight className="h-5 w-5" />
        </Link>
      </main>

      <BottomNav />
    </div>
  );
}
