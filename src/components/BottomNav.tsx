import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Home, Info, Plus, Settings } from "lucide-react";
import { QuickActionSheet } from "@/components/QuickActionSheet";
import { useI18n, type TranslationKey } from "@/lib/i18n";

const left = [
  { to: "/", labelKey: "nav.start", icon: Home, exact: true },
  { to: "/tagebuch", labelKey: "nav.diary", icon: BookOpen, exact: false },
] as const;

const right = [
  { to: "/infos", labelKey: "nav.info", icon: Info, exact: false },
  { to: "/einstellungen", labelKey: "nav.settings", icon: Settings, exact: false },
] as const;

function NavItem({
  to,
  label,
  icon: Icon,
  exact,
}: {
  to: string;
  label: string;
  icon: typeof Home;
  exact: boolean;
}) {
  return (
    <Link
      to={to}
      activeOptions={{ exact }}
      activeProps={{ className: "text-primary" }}
      inactiveProps={{ className: "text-muted-foreground" }}
      className="flex min-h-14 flex-col items-center justify-center gap-1 text-[0.7rem] font-bold"
    >
      <Icon className="h-6 w-6" />
      <span className="truncate">{label}</span>
    </Link>
  );
}

export function BottomNav() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1 backdrop-blur">
        <ul className="mx-auto grid max-w-md grid-cols-5 items-center px-2">
          {left.map((item) => (
            <li key={item.to}>
              <NavItem
                to={item.to}
                icon={item.icon}
                exact={item.exact}
                label={t(item.labelKey as TranslationKey)}
              />
            </li>
          ))}
          <li className="flex justify-center pb-1">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("nav.quickOpen")}
              aria-haspopup="dialog"
              aria-expanded={open}
              className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-lift)] active:scale-95"
            >
              <Plus className="h-7 w-7" />
            </button>
          </li>
          {right.map((item) => (
            <li key={item.to}>
              <NavItem
                to={item.to}
                icon={item.icon}
                exact={item.exact}
                label={t(item.labelKey as TranslationKey)}
              />
            </li>
          ))}
        </ul>
      </nav>
      <QuickActionSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}
