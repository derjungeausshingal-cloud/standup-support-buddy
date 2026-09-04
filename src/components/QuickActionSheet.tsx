import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { BookOpen, HelpCircle, LifeBuoy, Paperclip, PenLine, Search, X } from "lucide-react";
import { useI18n, type TranslationKey } from "@/lib/i18n";

const actions = [
  {
    to: "/vorfall",
    titleKey: "qa.a1.t",
    subtitleKey: "qa.a1.s",
    icon: PenLine,
    tone: "bg-primary-soft text-primary",
  },
  {
    to: "/vorfall/beweise",
    titleKey: "qa.a2.t",
    subtitleKey: "qa.a2.s",
    icon: Paperclip,
    tone: "bg-info-soft text-info",
  },
  {
    to: "/notfall",
    titleKey: "qa.a3.t",
    subtitleKey: "qa.a3.s",
    icon: LifeBuoy,
    tone: "bg-warning-soft text-warning",
  },
  {
    to: "/ist-das-mobbing",
    titleKey: "qa.a4.t",
    subtitleKey: "qa.a4.s",
    icon: HelpCircle,
    tone: "bg-primary-soft text-primary",
  },
  {
    to: "/beratung",
    titleKey: "qa.a5.t",
    subtitleKey: "qa.a5.s",
    icon: Search,
    tone: "bg-success-soft text-success",
  },
] as const;

export function QuickActionSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label={t("qa.menuClose")}
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("qa.label")}
        className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-3xl border-t border-border bg-card px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 shadow-[var(--shadow-lift)]"
      >
        <div className="mx-auto max-w-md">
          <div className="mx-auto h-1.5 w-10 rounded-full bg-border" />
          <div className="mt-3 flex items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold">{t("qa.title")}</h2>
            <button
              type="button"
              aria-label={t("qa.close")}
              onClick={onClose}
              className="grid h-11 w-11 place-items-center rounded-full bg-muted text-muted-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <ul className="mt-3 grid gap-2.5">
            {actions.map((a) => (
              <li key={a.to}>
                <Link
                  to={a.to}
                  onClick={onClose}
                  className="card-tile grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3.5 p-4"
                >
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${a.tone}`}>
                    <a.icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-base font-extrabold leading-tight">
                      {t(a.titleKey as TranslationKey)}
                    </span>
                    <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">
                      {t(a.subtitleKey as TranslationKey)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link to="/tagebuch" onClick={onClose} className="btn-ghost mt-1">
                <BookOpen className="h-5 w-5" />
                {t("qa.diary")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
