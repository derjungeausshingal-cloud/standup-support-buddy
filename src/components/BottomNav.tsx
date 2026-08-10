import { Link } from "@tanstack/react-router";
import { Home, LifeBuoy, ListChecks, MapPin } from "lucide-react";

const items = [
  { to: "/", label: "Start", icon: Home },
  { to: "/hilfe", label: "Hilfe", icon: LifeBuoy },
  { to: "/naechste-schritte", label: "Schritte", icon: ListChecks },
  { to: "/beratungsstellen", label: "Beratung", icon: MapPin },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur">
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="flex flex-col items-center gap-1 py-1 text-xs font-semibold"
            >
              <Icon className="h-6 w-6" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
