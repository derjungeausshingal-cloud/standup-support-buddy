import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, FileBarChart, HeartHandshake, MessageSquarePlus, Scale, Users } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { OptionCard } from "@/components/OptionCard";
import { Stepper } from "@/components/Stepper";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/vorfall/hilfe")({
  head: () => ({
    meta: [
      { title: "Was kann ich jetzt tun? – StandUp" },
      {
        name: "description",
        content: "Passende nächste Schritte nach einem dokumentierten Vorfall: Nachricht, Vertrauensperson, Beratung, Bericht, Rechte.",
      },
      { property: "og:title", content: "Was kann ich jetzt tun? – StandUp" },
      { property: "og:description", content: "Ruhige, freiwillige nächste Schritte – du entscheidest." },
    ],
  }),
  component: HilfePage,
});

function HilfePage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen pb-32">
      <AppHeader title={t("incident.help.pageTitle")} />
      <Stepper current={5} />

      <main className="mx-auto max-w-md px-5">
        <section className="card-tile mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-success/30 bg-success-soft p-4">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-success text-primary-foreground">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="text-base font-extrabold text-success">{t("incident.help.saved.title")}</p>
            <p className="mt-0.5 text-sm text-foreground/80">{t("incident.help.saved.text")}</p>
          </div>
        </section>

        <h2 className="mt-7 text-lg font-extrabold">{t("incident.help.next.title")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t("incident.help.next.subtitle")}</p>

        <div className="mt-3 grid gap-3">
          <OptionCard
            to="/nachricht"
            title={t("incident.help.message.title")}
            description={t("incident.help.message.desc")}
            icon={MessageSquarePlus}
            tone="primary"
          />
          <OptionCard
            to="/vertrauensperson"
            title={t("incident.help.trust.title")}
            description={t("incident.help.trust.desc")}
            icon={Users}
            tone="info"
          />
          <OptionCard
            to="/beratung"
            title={t("incident.help.advice.title")}
            description={t("incident.help.advice.desc")}
            icon={HeartHandshake}
            tone="success"
          />
          <OptionCard
            to="/bericht"
            title={t("incident.help.report.title")}
            description={t("incident.help.report.desc")}
            icon={FileBarChart}
            tone="warning"
          />
          <OptionCard
            to="/rechte"
            title={t("incident.help.rights.title")}
            description={t("incident.help.rights.desc")}
            icon={Scale}
            tone="warning"
          />
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          {t("incident.help.disclaimer")}
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
