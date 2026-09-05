import { createFileRoute } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/rechte")({
  head: () => ({
    meta: [
      { title: "Deine Rechte kennen – StandUp" },
      { name: "description", content: "Verständliche Informationen zu Rechten und Handlungsmöglichkeiten bei Mobbing und Diskriminierung." },
      { property: "og:title", content: "Deine Rechte kennen – StandUp" },
      { property: "og:description", content: "Ein Überblick über mögliche Wege – ohne rechtliche Beratung zu ersetzen." },
    ],
  }),
  component: RechtePage,
});

const bereiche = [
  { key: "schule", titleKey: "info.rechte.schule.title", textKey: "info.rechte.schule.text" },
  { key: "arbeitsplatz", titleKey: "info.rechte.arbeitsplatz.title", textKey: "info.rechte.arbeitsplatz.text" },
  { key: "agg", titleKey: "info.rechte.agg.title", textKey: "info.rechte.agg.text" },
  { key: "online", titleKey: "info.rechte.online.title", textKey: "info.rechte.online.text" },
  { key: "strafrecht", titleKey: "info.rechte.strafrecht.title", textKey: "info.rechte.strafrecht.text" },
] as const;

function RechtePage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title={t("info.rechte.title")} subtitle={t("info.rechte.subtitle")} />

      <main className="mx-auto max-w-md px-5">
        <section className="card-tile mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-warning/30 bg-warning-soft p-4">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-warning text-primary-foreground">
            <Scale className="h-6 w-6" />
          </span>
          <p className="min-w-0 text-sm leading-snug">
            {t("info.rechte.hinweis")}
          </p>
        </section>

        <div className="mt-5 grid gap-3">
          {bereiche.map((b) => (
            <article key={b.key} className="card-tile p-4">
              <h2 className="text-base font-extrabold">{t(b.titleKey)}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(b.textKey)}</p>
            </article>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
