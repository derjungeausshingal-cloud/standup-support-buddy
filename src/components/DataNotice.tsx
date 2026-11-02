import { useEffect, useState, type ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import { useIncidents } from "@/lib/incidents";
import { usePreferences } from "@/lib/preferences";
import { DATA_CLEARED_EVENT } from "@/lib/local-data";

/** Remount route-local drafts too, including a prepared message in another tab. */
export function DataSession({ children }: { children: ReactNode }) {
  const [generation, setGeneration] = useState(0);
  useEffect(() => {
    const reset = () => setGeneration((n) => n + 1);
    window.addEventListener(DATA_CLEARED_EVENT, reset);
    return () => {
      window.removeEventListener(DATA_CLEARED_EVENT, reset);
    };
  }, []);
  return <div key={generation}>{children}</div>;
}

export function DataNotice() {
  const { t } = useI18n();
  const { storageProblem: incidentProblem } = useIncidents();
  const { storageProblem: preferenceProblem } = usePreferences();
  const [deleted, setDeleted] = useState(false);
  const problem = incidentProblem ?? preferenceProblem;
  useEffect(() => {
    const onClear = (event: Event) => setDeleted((event as CustomEvent<boolean>).detail);
    window.addEventListener(DATA_CLEARED_EVENT, onClear);
    return () => window.removeEventListener(DATA_CLEARED_EVENT, onClear);
  }, []);
  return (
    <aside className="mx-auto max-w-md px-5 pt-3 text-sm leading-relaxed">
      <p className="rounded-2xl border border-warning/30 bg-warning-soft p-3 font-bold">
        {t("privacy.pilot")}
      </p>
      {problem ? (
        <p
          role="alert"
          className="fixed inset-x-3 top-3 z-50 mx-auto max-w-md rounded-2xl border border-destructive bg-card p-3 font-bold shadow-lg"
        >
          {t(`privacy.storage.${problem}`)}
        </p>
      ) : null}
      {deleted ? (
        <p role="status" className="mt-2 p-3">
          {t("privacy.deleted")}
        </p>
      ) : null}
    </aside>
  );
}
