import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { BookOpen, HelpCircle, LifeBuoy, Paperclip, PenLine, Search, X } from "lucide-react";

const actions = [
  {
    to: "/vorfall",
    title: "Vorfall dokumentieren",
    subtitle: "Halte fest, was passiert ist.",
    icon: PenLine,
    tone: "bg-primary-soft text-primary",
  },
  {
    to: "/vorfall/beweise",
    title: "Beweis hinzufügen",
    subtitle: "Speichere etwas zu einem Vorfall.",
    icon: Paperclip,
    tone: "bg-info-soft text-info",
  },

  {
    to: "/notfall",
    title: "Ich brauche gerade Hilfe",
    subtitle: "Finde einen passenden nächsten Schritt.",
    icon: LifeBuoy,
    tone: "bg-warning-soft text-warning",
  },
  {
    to: "/ist-das-mobbing",
    title: "Ist das Mobbing?",
    subtitle: "Ordne die Situation anhand einiger Fragen ein.",
    icon: HelpCircle,
    tone: "bg-primary-soft text-primary",
  },
  {
    to: "/beratung",
    title: "Beratung finden",
    subtitle: "Finde passende Unterstützung.",
    icon: Search,
    tone: "bg-success-soft text-success",
  },
] as const;

export function QuickActionSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
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
        aria-label="Menü schließen"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Schnellaktionen"
        className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-3xl border-t border-border bg-card px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 shadow-[var(--shadow-lift)]"
      >
        <div className="mx-auto max-w-md">
          <div className="mx-auto h-1.5 w-10 rounded-full bg-border" />
          <div className="mt-3 flex items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold">Was möchtest du tun?</h2>
            <button
              type="button"
              aria-label="Schließen"
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
                    <span className="block text-base font-extrabold leading-tight">{a.title}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">
                      {a.subtitle}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/tagebuch"
                onClick={onClose}
                className="btn-ghost mt-1"
              >
                <BookOpen className="h-5 w-5" />
                Tagebuch öffnen
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
