import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { OptionCard } from "@/components/OptionCard";
import { AlertCircle, Scale } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/infos")({
  head: () => ({
    meta: [
      { title: "Infos zu Mobbing & Diskriminierung – StandUp" },
      { name: "description", content: "Verständliche Informationen zu Mobbing, Cybermobbing, Diskriminierung, Beleidigungen und Bedrohungen." },
      { property: "og:title", content: "Infos zu Mobbing & Diskriminierung – StandUp" },
      { property: "og:description", content: "Klar erklärt, ohne Diagnose und ohne Druck." },
    ],
  }),
  component: InfosPage,
});

const topics = [
  { key: "mobbing", titleKey: "info.infos.mobbing.title", textKey: "info.infos.mobbing.text" },
  { key: "cybermobbing", titleKey: "info.infos.cybermobbing.title", textKey: "info.infos.cybermobbing.text" },
  { key: "diskriminierung", titleKey: "info.infos.diskriminierung.title", textKey: "info.infos.diskriminierung.text" },
  { key: "beleidigungen", titleKey: "info.infos.beleidigungen.title", textKey: "info.infos.beleidigungen.text" },
  { key: "bedrohungen", titleKey: "info.infos.bedrohungen.title", textKey: "info.infos.bedrohungen.text" },
] as const;

function InfosPage() {
  const { t } = useI18n();
  const [open, setOpen] = useState<string | null>("mobbing");

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title={t("info.infos.title")} back={false} subtitle={t("info.infos.subtitle")} />

      <main className="mx-auto max-w-md px-5">
        <div className="mt-5 grid gap-3">
          {topics.map((topic) => {
            const isOpen = open === topic.key;
            return (
              <article key={topic.key} className="card-tile overflow-hidden">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : topic.key)}
                  className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 text-left"
                >
                  <h2 className="min-w-0 text-base font-extrabold">{t(topic.titleKey)}</h2>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen ? (
                  <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">{t(topic.textKey)}</p>
                ) : null}
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-3">
          <OptionCard to="/ist-das-mobbing" title={t("info.infos.card.mobbing.title")} description={t("info.infos.card.mobbing.desc")} icon={AlertCircle} />
          <OptionCard to="/rechte" title={t("info.infos.card.rechte.title")} description={t("info.infos.card.rechte.desc")} icon={Scale} tone="warning" />
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          {t("info.infos.footer")}
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
