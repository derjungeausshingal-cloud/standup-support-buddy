import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Save } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { Stepper } from "@/components/Stepper";
import { useI18n } from "@/lib/i18n";
import { formatDate, useIncidents } from "@/lib/incidents";

export const Route = createFileRoute("/vorfall/speichern")({
  head: () => ({
    meta: [
      { title: "Vorfall speichern – StandUp" },
      { name: "description", content: "Überprüfe deine Angaben und speichere den Vorfall in deinem Tagebuch." },
      { property: "og:title", content: "Vorfall speichern – StandUp" },
      { property: "og:description", content: "Deine Angaben in Ruhe prüfen und im Tagebuch sichern." },
    ],
  }),
  component: SpeichernPage,
});

function Row({ label, value }: { label: string; value: string }) {
  const { t } = useI18n();
  return (
    <div className="grid gap-0.5 border-b border-border py-3 last:border-0">
      <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className="whitespace-pre-wrap text-sm">{value || t("incident.save.noValue")}</span>
    </div>
  );
}

function SpeichernPage() {
  const { draft, saveDraft } = useIncidents();
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title={t("incident.save.pageTitle")} subtitle={t("incident.save.pageSubtitle")} />
      <Stepper current={4} />

      <main className="mx-auto max-w-md px-5">
        <section className="card-tile mt-6 px-4 py-1">
          <Row label={t("incident.save.row.kind")} value={draft.kind ? t(`incident.kind.${draft.kind}`) : ""} />
          <Row label={t("incident.save.row.description")} value={draft.description} />
          <Row label={t("incident.save.row.date")} value={draft.date ? formatDate(draft.date) : ""} />
          <Row label={t("incident.save.row.place")} value={draft.place} />
          <Row label={t("incident.save.row.witnesses")} value={draft.witnesses} />
          <Row
            label={t("incident.save.row.evidence")}
            value={
              draft.evidence.length
                ? draft.evidence.map((e) => `${e.name} (${t(`incident.evidence.${e.type}`)})`).join("\n")
                : t("incident.save.noEvidence")
            }
          />
        </section>

        <p className="mt-4 text-sm leading-snug text-muted-foreground">{t("incident.save.localNotice")}</p>

        <button
          type="button"
          onClick={() => {
            saveDraft();
            navigate({ to: "/vorfall/hilfe" });
          }}
          className="btn-primary mt-6"
        >
          <Save className="h-5 w-5" />
          {t("incident.save.submit")}
        </button>
        <button type="button" onClick={() => navigate({ to: "/vorfall" })} className="btn-ghost mt-3">
          {t("incident.save.back")}
        </button>
      </main>

      <BottomNav />
    </div>
  );
}
