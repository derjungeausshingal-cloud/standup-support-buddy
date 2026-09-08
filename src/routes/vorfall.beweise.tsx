import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, FileText, Image as ImageIcon, MessageSquareText, Mic, Trash2 } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { Stepper } from "@/components/Stepper";
import { useI18n } from "@/lib/i18n";
import { formatDate, useIncidents, type EvidenceType } from "@/lib/incidents";

export const Route = createFileRoute("/vorfall/beweise")({
  head: () => ({
    meta: [
      { title: "Beweise hinzufügen – StandUp" },
      {
        name: "description",
        content: "Optional: Fotos, Chatverläufe, Dateien oder Sprachnotizen zu deinem Vorfall hinzufügen.",
      },
      { property: "og:title", content: "Beweise hinzufügen – StandUp" },
      { property: "og:description", content: "Beweise sind freiwillig. Auch ohne sie kannst du Hilfe bekommen." },
    ],
  }),
  component: BeweisePage,
});

const options: { type: EvidenceType; labelKey: string; icon: typeof ImageIcon; sample: string }[] = [
  { type: "foto", labelKey: "incident.evidence.add.foto", icon: ImageIcon, sample: "Screenshot.png" },
  { type: "chat", labelKey: "incident.evidence.add.chat", icon: MessageSquareText, sample: "Chatverlauf.txt" },
  { type: "datei", labelKey: "incident.evidence.add.datei", icon: FileText, sample: "Dokument.pdf" },
  { type: "sprachnotiz", labelKey: "incident.evidence.add.sprachnotiz", icon: Mic, sample: "Sprachnotiz.m4a" },
];

function BeweisePage() {
  const { draft, setDraft } = useIncidents();
  const navigate = useNavigate();
  const { t } = useI18n();
  const today = new Date().toISOString().slice(0, 10);

  const add = (type: EvidenceType, sample: string) => {
    const count = draft.evidence.filter((e) => e.type === type).length + 1;
    setDraft({
      evidence: [
        ...draft.evidence,
        {
          id: Math.random().toString(36).slice(2, 9),
          name: `${sample.split(".")[0]}_${count}.${sample.split(".")[1]}`,
          type,
          date: today,
        },
      ],
    });
  };

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title={t("incident.evidence.pageTitle")} subtitle={t("incident.evidence.pageSubtitle")} />
      <Stepper current={3} />

      <main className="mx-auto max-w-md px-5">
        <section className="card-tile mt-6 border-success/30 bg-success-soft p-4">
          <p className="text-sm font-bold text-success">{t("incident.evidence.voluntary.title")}</p>
          <p className="mt-1 text-sm leading-snug text-foreground/80">{t("incident.evidence.voluntary.text")}</p>
        </section>

        <div className="mt-5 grid gap-3">
          {options.map((o) => (
            <button
              key={o.type}
              type="button"
              onClick={() => add(o.type, o.sample)}
              className="card-tile grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-4 text-left"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                <o.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 text-base font-bold leading-tight">{t(o.labelKey)}</span>
              <span className="text-2xl font-bold leading-none text-primary">+</span>
            </button>
          ))}
        </div>

        <h2 className="mt-8 text-lg font-extrabold">{t("incident.evidence.added.title")}</h2>
        {draft.evidence.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">{t("incident.evidence.added.empty")}</p>
        ) : (
          <ul className="mt-3 grid gap-3">
            {draft.evidence.map((e) => (
              <li key={e.id} className="card-tile grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{e.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {t(`incident.evidence.${e.type}`)} · {formatDate(e.date)}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={t("incident.evidence.remove", { name: e.name })}
                  onClick={() => setDraft({ evidence: draft.evidence.filter((x) => x.id !== e.id) })}
                  className="grid h-10 w-10 place-items-center rounded-full bg-muted text-muted-foreground"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-7 grid gap-3">
          <button type="button" onClick={() => navigate({ to: "/vorfall/speichern" })} className="btn-primary">
            {t("incident.continueSave")}
            <ArrowRight className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => {
              setDraft({ evidence: [] });
              navigate({ to: "/vorfall/speichern" });
            }}
            className="btn-ghost"
          >
            {t("incident.continueNoEvidence")}
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
