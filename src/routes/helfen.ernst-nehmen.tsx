import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Info } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { CopyText } from "@/components/CopyText";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/helfen/ernst-nehmen")({
  head: () => ({
    meta: [
      { title: "Ernst nehmen – jemandem helfen – StandUp" },
      {
        name: "description",
        content: "Formulierungen, die zeigen: Ich glaube dir und nehme dich ernst – ohne vorschnelle Bewertung.",
      },
      { property: "og:title", content: "Ernst nehmen – StandUp" },
      { property: "og:description", content: "Zeig der Person: Ich nehme dich ernst." },
    ],
  }),
  component: ErnstNehmenPage,
});

function ErnstNehmenPage() {
  const { t } = useI18n();
  const saetze = [t("help.ernst.s1"), t("help.ernst.s2"), t("help.ernst.s3"), t("help.ernst.s4"), t("help.ernst.s5")];

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title={t("help.ernst.title")} subtitle={t("help.ernst.subtitle")} />

      <main className="mx-auto max-w-md px-5">
        <h2 className="mt-6 text-xl font-extrabold leading-tight">{t("help.ernst.lead")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("help.ernst.text")}</p>

        <h3 className="mt-7 text-lg font-extrabold">{t("help.ernst.formTitle")}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{t("help.ernst.formHint")}</p>
        <div className="mt-3 grid gap-3">
          {saetze.map((s) => (
            <CopyText key={s} text={s} />
          ))}
        </div>

        <section className="card-tile mt-6 grid grid-cols-[auto_minmax(0,1fr)] gap-3 border-info/30 bg-info-soft p-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-info text-primary-foreground">
            <Info className="h-5 w-5" />
          </span>
          <p className="min-w-0 text-sm leading-snug">{t("help.ernst.info")}</p>
        </section>

        <Link to="/helfen/was-tun" className="btn-primary mt-7">
          {t("help.ernst.cta")}
          <ArrowRight className="h-5 w-5" />
        </Link>
      </main>

      <BottomNav />
    </div>
  );
}
