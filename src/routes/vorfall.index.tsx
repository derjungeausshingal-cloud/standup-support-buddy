import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Ban,
  Check,
  HeartCrack,
  MessageSquare,
  MessagesSquare,
  MoreHorizontal,
  ShieldAlert,
  Smartphone,
  Users,
  UserX,
  Zap,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { Stepper } from "@/components/Stepper";
import { useI18n } from "@/lib/i18n";
import { useIncidents, type IncidentKind } from "@/lib/incidents";

export const Route = createFileRoute("/vorfall/")({
  head: () => ({
    meta: [
      { title: "Vorfall dokumentieren – StandUp" },
      {
        name: "description",
        content: "Schritt 1 und 2: Art des Vorfalls wählen und in eigenen Worten beschreiben.",
      },
      { property: "og:title", content: "Vorfall dokumentieren – StandUp" },
      { property: "og:description", content: "Du entscheidest, was du teilst. Ruhig und in deinem Tempo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: VorfallPage,
});

const kinds: { key: IncidentKind; hintKey: string; icon: typeof Users }[] = [
  { key: "mobbing", hintKey: "incident.hint.mobbing", icon: Users },
  { key: "ausgrenzung", hintKey: "incident.hint.ausgrenzung", icon: UserX },
  { key: "beleidigung", hintKey: "incident.hint.beleidigung", icon: MessageSquare },
  { key: "bedrohung", hintKey: "incident.hint.bedrohung", icon: AlertTriangle },
  { key: "diskriminierung", hintKey: "incident.hint.diskriminierung", icon: ShieldAlert },
  { key: "koerperlich", hintKey: "incident.hint.koerperlich", icon: HeartCrack },
  { key: "cybermobbing", hintKey: "incident.hint.cybermobbing", icon: Smartphone },
  { key: "belaestigung", hintKey: "incident.hint.belaestigung", icon: Ban },
  { key: "konflikt", hintKey: "incident.hint.konflikt", icon: MessagesSquare },
  { key: "anderes", hintKey: "incident.hint.anderes", icon: MoreHorizontal },
];

function VorfallPage() {
  const { draft, setDraft } = useIncidents();
  const navigate = useNavigate();
  const { modus } = Route.useSearch();
  const { t } = useI18n();

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title={t("incident.page.title")} subtitle={t("incident.page.subtitle")} />
      <Stepper current={draft.kind ? 2 : 1} />

      <main className="mx-auto max-w-md px-5">
        {modus === "gemeinsam" ? (
          <section className="card-tile mt-5 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-info/30 bg-info-soft p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-info text-primary-foreground">
              <Users className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-extrabold">{t("incident.gemeinsam.title")}</span>
              <span className="mt-1 block text-sm leading-snug">{t("incident.gemeinsam.text")}</span>
            </span>
          </section>
        ) : null}

        <Link
          to="/vorfall/schnell"
          className="card-tile mt-5 flex items-center gap-3 border-warning/30 bg-warning-soft p-4"
        >
          <Zap className="h-5 w-5 shrink-0 text-warning" />
          <span className="min-w-0 text-sm font-bold">{t("incident.quick.text")}</span>
        </Link>

        <h2 className="mt-6 text-lg font-extrabold">{t("incident.step1.title")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t("incident.step1.desc")}</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {kinds.map((k) => {
            const active = draft.kind === k.key;
            return (
              <button
                key={k.key}
                type="button"
                aria-pressed={active}
                onClick={() => setDraft({ kind: active ? null : k.key })}
                className={`card-tile relative flex h-full flex-col items-start gap-3 p-4 text-left ${
                  active ? "border-primary bg-primary-soft" : ""
                }`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <k.icon className="h-5 w-5" />
                </span>
                {active && (
                  <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-4 w-4" />
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block text-base font-extrabold leading-tight">{t(`incident.kind.${k.key}`)}</span>
                  <span className="mt-1 block text-sm leading-snug text-muted-foreground">{t(k.hintKey)}</span>
                </span>
              </button>
            );
          })}
        </div>

        <h2 className="mt-8 text-lg font-extrabold">{t("incident.step2.title")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t("incident.step2.desc")}</p>
        <textarea
          value={draft.description}
          maxLength={2000}
          rows={7}
          onChange={(e) => setDraft({ description: e.target.value })}
          placeholder={t("incident.step2.placeholder")}
          className="field-input mt-3 resize-none"
        />
        <p className="mt-1 text-right text-xs text-muted-foreground">{draft.description.length} / 2000</p>

        <div className="mt-4 grid gap-4">
          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-2">
              <span className="text-sm font-bold">
                {t("incident.date.label")} <span className="font-semibold text-muted-foreground">{t("incident.optional")}</span>
              </span>
              <input
                type="date"
                value={draft.date}
                onChange={(e) => setDraft({ date: e.target.value })}
                className="field-input"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold">
                {t("incident.time.label")} <span className="font-semibold text-muted-foreground">{t("incident.optional")}</span>
              </span>
              <input
                type="time"
                value={draft.time}
                onChange={(e) => setDraft({ time: e.target.value })}
                className="field-input"
              />
            </label>
          </div>
          <label className="grid gap-2">
            <span className="text-sm font-bold">
              {t("incident.place.label")} <span className="font-semibold text-muted-foreground">{t("incident.optional")}</span>
            </span>
            <input
              type="text"
              value={draft.place}
              onChange={(e) => setDraft({ place: e.target.value })}
              placeholder={t("incident.place.placeholder")}
              className="field-input"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold">
              {t("incident.persons.label")} <span className="font-semibold text-muted-foreground">{t("incident.optional")}</span>
            </span>
            <input
              type="text"
              value={draft.persons}
              onChange={(e) => setDraft({ persons: e.target.value })}
              placeholder={t("incident.persons.placeholder")}
              className="field-input"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold">
              {t("incident.witnesses.label")} <span className="font-semibold text-muted-foreground">{t("incident.optional")}</span>
            </span>
            <input
              type="text"
              value={draft.witnesses}
              onChange={(e) => setDraft({ witnesses: e.target.value })}
              placeholder={t("incident.witnesses.placeholder")}
              className="field-input"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold">
              {t("incident.impact.label")}{" "}
              <span className="font-semibold text-muted-foreground">{t("incident.optional")}</span>
            </span>
            <textarea
              value={draft.impact}
              rows={3}
              maxLength={1000}
              onChange={(e) => setDraft({ impact: e.target.value })}
              placeholder={t("incident.impact.placeholder")}
              className="field-input resize-none"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold">
              {t("incident.notes.label")} <span className="font-semibold text-muted-foreground">{t("incident.optional")}</span>
            </span>
            <textarea
              value={draft.notes}
              rows={3}
              maxLength={1000}
              onChange={(e) => setDraft({ notes: e.target.value })}
              placeholder={t("incident.notes.placeholder")}
              className="field-input resize-none"
            />
          </label>
        </div>

        <button type="button" onClick={() => navigate({ to: "/vorfall/beweise" })} className="btn-primary mt-7">
          {t("incident.continueEvidence")}
          <ArrowRight className="h-5 w-5" />
        </button>
        <p className="mt-3 text-center text-xs text-muted-foreground">{t("incident.footnote")}</p>
      </main>

      <BottomNav />
    </div>
  );
}
