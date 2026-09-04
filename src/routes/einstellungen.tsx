import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Accessibility, Database, Globe, Info, Lock, Trash2 } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { useIncidents } from "@/lib/incidents";
import { usePreferences } from "@/lib/preferences";
import { languageLabel, supportedLanguages, useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/einstellungen")({
  head: () => ({
    meta: [
      { title: "Einstellungen – StandUp" },
      { name: "description", content: "Datenschutz, gespeicherte Daten, Daten löschen, Barrierefreiheit, Sprache und Infos über StandUp." },
      { property: "og:title", content: "Einstellungen – StandUp" },
      { property: "og:description", content: "Deine Daten, deine Entscheidungen." },
    ],
  }),
  component: EinstellungenPage,
});

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Lock;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card-tile grid grid-cols-[auto_minmax(0,1fr)] gap-4 p-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <h2 className="text-base font-extrabold leading-tight">{title}</h2>
        <div className="mt-1 text-sm leading-snug text-muted-foreground">{children}</div>
      </div>
    </section>
  );
}

function EinstellungenPage() {
  const { incidents, clearAll } = useIncidents();
  const { prefs, setPrefs } = usePreferences();
  const { t, lang } = useI18n();
  const [confirm, setConfirm] = useState(false);
  const evidenceCount = incidents.reduce((n, i) => n + i.evidence.length, 0);

  const languages = useMemo(
    () =>
      supportedLanguages
        .map((code) => ({ code, label: languageLabel(code, lang) }))
        .sort((a, b) => a.label.localeCompare(b.label, lang)),
    [lang],
  );

  const entriesText =
    incidents.length === 1 ? t("set.entriesOne") : t("set.entriesMany", { n: incidents.length });
  const evidenceText =
    evidenceCount === 1 ? t("set.evidenceOne") : t("set.evidenceMany", { n: evidenceCount });

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title={t("set.title")} back={false} />

      <main className="mx-auto max-w-md grid gap-3 px-5 pt-5">
        <Section icon={Lock} title={t("set.privacy.t")}>
          {t("set.privacy.d")}
        </Section>

        <Section icon={Database} title={t("set.data.t")}>
          {t("set.data.d", { entries: entriesText, evidence: evidenceText })}
        </Section>

        <Section icon={Trash2} title={t("set.delete.t")}>
          {t("set.delete.d")}
          {confirm ? (
            <div className="mt-3 grid gap-2">
              <button
                type="button"
                onClick={() => {
                  clearAll();
                  setConfirm(false);
                }}
                className="btn-primary bg-destructive"
              >
                {t("set.delete.yes")}
              </button>
              <button type="button" onClick={() => setConfirm(false)} className="btn-ghost">
                {t("set.delete.cancel")}
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => setConfirm(true)} className="btn-ghost mt-3 text-destructive">
              {t("set.delete.btn")}
            </button>
          )}
        </Section>

        <Section icon={Accessibility} title={t("set.a11y.t")}>
          {t("set.a11y.d")}
        </Section>

        <Section icon={Globe} title={t("set.lang.t")}>
          {t("set.lang.d")}
          <select
            aria-label={t("set.lang.aria")}
            value={prefs.language}
            onChange={(e) => setPrefs({ language: e.target.value })}
            className="mt-3 h-12 w-full rounded-2xl border border-border bg-card px-3 text-base font-bold text-foreground"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </Section>

        <Section icon={Info} title={t("set.about.t")}>
          <p>{t("set.about.p1")}</p>
          <p className="mt-2">{t("set.about.p2")}</p>
          <p className="mt-2">{t("set.about.p3")}</p>
          <p className="mt-2">{t("set.about.p4")}</p>
          <p className="mt-2 font-bold text-foreground">{t("set.about.p5")}</p>
          <p className="mt-2">{t("set.about.version")}</p>
        </Section>
      </main>

      <BottomNav />
    </div>
  );
}
