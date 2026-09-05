import { createFileRoute } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { formatDate, useIncidents } from "@/lib/incidents";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/bericht")({
  head: () => ({
    meta: [
      { title: "Bericht erstellen – StandUp" },
      { name: "description", content: "Aus deinen dokumentierten Vorfällen eine übersichtliche Zusammenfassung erzeugen." },
      { property: "og:title", content: "Bericht erstellen – StandUp" },
      { property: "og:description", content: "Eine ruhige Zusammenfassung zum Ausdrucken oder Teilen." },
    ],
  }),
  component: BerichtPage,
});

function BerichtPage() {
  const { t } = useI18n();
  const { incidents } = useIncidents();
  const sorted = [...incidents].sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));

  return (
    <div className="min-h-screen pb-32">
      <AppHeader title={t("diary.report.title")} subtitle={t("diary.report.subtitle")} />

      <main className="mx-auto max-w-md px-5">
        {sorted.length === 0 ? (
          <p className="mt-8 text-center text-sm text-muted-foreground">{t("diary.report.empty")}</p>
        ) : (
          <>
            <section className="card-tile mt-6 p-4">
              <h2 className="text-base font-extrabold">{t("diary.report.overview")}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {t("diary.report.summary", {
                  count: sorted.length,
                  label: t(sorted.length === 1 ? "diary.report.situation.one" : "diary.report.situation.other"),
                  start: formatDate(sorted[0]?.date || sorted[0]?.createdAt.slice(0, 10) || ""),
                  end: formatDate(
                    sorted[sorted.length - 1]?.date ||
                      sorted[sorted.length - 1]?.createdAt.slice(0, 10) ||
                      "",
                  ),
                })}
              </p>
            </section>

            <ol className="mt-4 grid gap-3">
              {sorted.map((i, index) => (
                <li key={i.id} className="card-tile p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {t("diary.report.entryLabel", {
                      n: index + 1,
                      date: formatDate(i.date || i.createdAt.slice(0, 10)),
                    })}
                  </p>
                  <h3 className="mt-1 text-base font-extrabold">
                    {i.kind ? t(`diary.kind.${i.kind}`) : t("diary.noCategory")}
                    {i.place ? ` · ${i.place}` : ""}
                  </h3>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                    {i.description || t("diary.noDescription")}
                  </p>
                  {i.witnesses ? (
                    <p className="mt-1 text-sm">{t("diary.report.witnesses", { value: i.witnesses })}</p>
                  ) : null}
                  {i.evidence.length ? (
                    <p className="mt-1 text-sm">
                      {t("diary.report.evidence", {
                        value: i.evidence.map((e) => `${e.name} (${t(`diary.evidenceType.${e.type}`)})`).join(", "),
                      })}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>

            <button type="button" onClick={() => window.print()} className="btn-primary mt-6">
              <Printer className="h-5 w-5" />
              {t("diary.report.print")}
            </button>
          </>
        )}

        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          {t("diary.report.footer")}
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
