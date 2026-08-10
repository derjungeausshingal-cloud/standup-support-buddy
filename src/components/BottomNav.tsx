import { Link } from "@tanstack/react-router";
import { BookOpen, Home, Info, Plus, Settings } from "lucide-react";

const left = [
  { to: "/", label: "Start", icon: Home, exact: true },
  { to: "/tagebuch", label: "Tagebuch", icon: BookOpen, exact: false },
] as const;

const right = [
  { to: "/infos", label: "Infos", icon: Info, exact: false },
  { to: "/einstellungen", label: "Einstellungen", icon: Settings, exact: false },
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
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1 backdrop-blur">
      <ul className="mx-auto grid max-w-md grid-cols-5 items-end px-2">
        {left.map((item) => (
          <li key={item.to}>
            <NavItem {...item} />
          </li>
        ))}
        <li className="relative flex justify-center">
          <Link
            to="/vorfall"
            aria-label="Neuen Vorfall dokumentieren"
            className="-mt-8 grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-lift)] active:scale-95"
          >
            <Plus className="h-8 w-8" />
          </Link>
        </li>
        {right.map((item) => (
          <li key={item.to}>
            <NavItem {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
