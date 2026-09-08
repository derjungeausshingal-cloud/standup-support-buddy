import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/helfen/zustimmung")({
  head: () => ({
    meta: [
      { title: "Nicht ohne Zustimmung handeln – StandUp" },
      {
        name: "description",
        content: "Unterstützen, ohne über den Kopf der betroffenen Person hinweg zu entscheiden – mit Beispielen.",
      },
      { property: "og:title", content: "Nicht ohne Zustimmung handeln – StandUp" },
      { property: "og:description", content: "Unterstützen, ohne die Kontrolle zu übernehmen." },
    ],
  }),
  component: ZustimmungPage,
});

function ZustimmungPage() {
  const { t } = useI18n();
  const beispiele = [
    { statt: t("help.zustimmung.ex1.statt"), besser: t("help.zustimmung.ex1.besser") },
    { statt: t("help.zustimmung.ex2.statt"), besser: t("help.zustimmung.ex2.besser") },
    { statt: t("help.zustimmung.ex3.statt"), besser: t("help.zustimmung.ex3.besser") },
  ];

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title={t("help.zustimmung.title")} subtitle={t("help.zustimmung.subtitle")} />

      <main className="mx-auto max-w-md px-5">
        <h2 className="mt-6 text-xl font-extrabold leading-tight">{t("help.zustimmung.lead")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("help.zustimmung.text")}</p>

        <div className="mt-6 grid gap-3">
          {beispiele.map((b) => (
            <article key={b.statt} className="card-tile p-4">
              <p className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                {t("help.zustimmung.statt")}
              </p>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">„{b.statt}“</p>
              <p className="mt-3 text-xs font-extrabold uppercase tracking-wide text-success">
                {t("help.zustimmung.besser")}
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug">„{b.besser}“</p>
            </article>
          ))}
        </div>

        <section className="mt-6 rounded-2xl border-2 border-warning/40 bg-warning-soft p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
            <h3 className="text-base font-extrabold">{t("help.zustimmung.dangerTitle")}</h3>
          </div>
          <p className="mt-2 text-sm leading-snug">{t("help.zustimmung.dangerText")}</p>
          <Link to="/notfall" className="btn-ghost mt-3">
            {t("help.zustimmung.dangerCta")}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </section>

        <Link to="/helfen/hilfe-finden" className="btn-primary mt-7">
          {t("help.zustimmung.cta")}
          <ArrowRight className="h-5 w-5" />
        </Link>
      </main>

      <BottomNav />
    </div>
  );
}
