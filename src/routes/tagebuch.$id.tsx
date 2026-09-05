import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { formatDate, useIncidents } from "@/lib/incidents";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/tagebuch/$id")({
  head: () => ({
    meta: [
      { title: "Eintrag ansehen – StandUp" },
      { name: "description", content: "Details eines dokumentierten Vorfalls: Art, Datum, Ort, Beschreibung, Zeugen und Beweise." },
      { property: "og:title", content: "Eintrag ansehen – StandUp" },
      { property: "og:description", content: "Deinen Tagebucheintrag ansehen, bearbeiten oder löschen." },
    ],
  }),
  component: EintragPage,
});

function EintragPage() {
  const { t } = useI18n();
  const { id } = useParams({ from: "/tagebuch/$id" });
  const { incidents, updateIncident, deleteIncident } = useIncidents();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const incident = incidents.find((i) => i.id === id);

  if (!incident) {
    return (
      <div className="min-h-screen pb-32">
        <AppHeader title={t("diary.entryPage.title")} />
        <main className="mx-auto max-w-md px-5 pt-10 text-center">
          <p className="text-base font-bold">{t("diary.entryPage.gone")}</p>
          <Link to="/tagebuch" className="btn-ghost mt-4">
            {t("diary.entryPage.backToDiary")}
          </Link>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      <AppHeader
        title={incident.kind ? t(`diary.kind.${incident.kind}`) : t("diary.entryPage.title")}
        subtitle={formatDate(incident.date || incident.createdAt.slice(0, 10))}
        right={
          <button
            type="button"
            aria-label={edit ? t("diary.entryPage.stopEdit") : t("diary.entryPage.edit")}
            onClick={() => setEdit((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full bg-primary-soft text-primary"
          >
            <Pencil className="h-5 w-5" />
          </button>
        }
      />

      <main className="mx-auto max-w-md px-5">
        {edit ? (
          <div className="mt-6 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-bold">{t("diary.entryPage.description")}</span>
              <textarea
                rows={6}
                value={incident.description}
                onChange={(e) => updateIncident(incident.id, { description: e.target.value })}
                className="field-input resize-none"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold">{t("diary.entryPage.date")}</span>
              <input
                type="date"
                value={incident.date}
                onChange={(e) => updateIncident(incident.id, { date: e.target.value })}
                className="field-input"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold">
                {t("diary.entryPage.place")}{" "}
                <span className="font-semibold text-muted-foreground">{t("diary.entryPage.optional")}</span>
              </span>
              <input
                type="text"
                value={incident.place}
                onChange={(e) => updateIncident(incident.id, { place: e.target.value })}
                className="field-input"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold">
                {t("diary.entryPage.witnesses")}{" "}
                <span className="font-semibold text-muted-foreground">{t("diary.entryPage.optional")}</span>
              </span>
              <input
                type="text"
                value={incident.witnesses}
                onChange={(e) => updateIncident(incident.id, { witnesses: e.target.value })}
                className="field-input"
              />
            </label>
            <button type="button" onClick={() => setEdit(false)} className="btn-primary">
              {t("diary.entryPage.applyChanges")}
            </button>
          </div>
        ) : (
          <>
            <section className="card-tile mt-6 p-4">
              <p className="whitespace-pre-wrap text-base leading-relaxed">
                {incident.description || t("diary.noDescription")}
              </p>
            </section>

            <dl className="card-tile mt-4 px-4 py-1">
              {[
                [t("diary.entryPage.fieldKind"), incident.kind ? t(`diary.kind.${incident.kind}`) : t("diary.noCategoryShort")],
                [t("diary.entryPage.fieldDate"), incident.date ? formatDate(incident.date) : t("diary.noCategoryShort")],
                [t("diary.entryPage.fieldPlace"), incident.place || t("diary.noCategoryShort")],
                [t("diary.entryPage.fieldWitnesses"), incident.witnesses || t("diary.noCategoryShort")],
              ].map(([label, value]) => (
                <div key={label} className="grid gap-0.5 border-b border-border py-3 last:border-0">
                  <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</dt>
                  <dd className="text-sm">{value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-6 text-lg font-extrabold">{t("diary.entryPage.evidenceTitle")}</h2>
            {incident.evidence.length === 0 ? (
              <p className="mt-1 text-sm text-muted-foreground">{t("diary.entryPage.noEvidence")}</p>
            ) : (
              <ul className="mt-3 grid gap-3">
                {incident.evidence.map((e) => (
                  <li key={e.id} className="card-tile p-4">
                    <p className="truncate text-sm font-bold">{e.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {t(`diary.evidenceType.${e.type}`)} · {formatDate(e.date)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        <button
          type="button"
          onClick={() => {
            deleteIncident(incident.id);
            navigate({ to: "/tagebuch" });
          }}
          className="btn-ghost mt-7 text-destructive"
        >
          <Trash2 className="h-5 w-5" />
          {t("diary.entryPage.delete")}
        </button>
      </main>

      <BottomNav />
    </div>
  );
}
