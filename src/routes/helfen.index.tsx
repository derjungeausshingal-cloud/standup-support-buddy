import { createFileRoute } from "@tanstack/react-router";
import { Compass, Ear, HandHeart, Heart, NotebookPen, Search, ShieldQuestion } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { OptionCard } from "@/components/OptionCard";
import { useI18n } from "@/lib/i18n";

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

function HelfenPage() {
  const { t } = useI18n();

  const cards = [
    { to: "/helfen/zuhoeren", title: t("help.index.c1.t"), description: t("help.index.c1.d"), icon: Ear, tone: "primary" as const },
    { to: "/helfen/ernst-nehmen", title: t("help.index.c2.t"), description: t("help.index.c2.d"), icon: Heart, tone: "success" as const },
    { to: "/helfen/dokumentieren", title: t("help.index.c3.t"), description: t("help.index.c3.d"), icon: NotebookPen, tone: "info" as const },
    { to: "/helfen/zustimmung", title: t("help.index.c4.t"), description: t("help.index.c4.d"), icon: ShieldQuestion, tone: "warning" as const },
    { to: "/helfen/hilfe-finden", title: t("help.index.c5.t"), description: t("help.index.c5.d"), icon: Search, tone: "primary" as const },
    { to: "/helfen/was-tun", title: t("help.index.c6.t"), description: t("help.index.c6.d"), icon: Compass, tone: "info" as const },
  ];

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title={t("help.index.title")} subtitle={t("help.index.subtitle")} />

      <main className="mx-auto max-w-md px-5">
        <section className="card-tile mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-success/30 bg-success-soft p-4">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-success text-primary-foreground">
            <HandHeart className="h-6 w-6" />
          </span>
          <p className="min-w-0 text-sm leading-snug">{t("help.index.banner")}</p>
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
