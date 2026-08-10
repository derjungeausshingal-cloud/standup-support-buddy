import { Link } from "@tanstack/react-router";
import { ChevronRight, type LucideIcon } from "lucide-react";

export type Tone = "primary" | "success" | "warning" | "info";

const toneClass: Record<Tone, string> = {
  primary: "bg-primary-soft text-primary",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  info: "bg-info-soft text-info",
};

export function OptionCard({
  to,
  title,
  description,
  icon: Icon,
  tone = "primary",
}: {
  to: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  tone?: Tone;
}) {
  return (
    <Link
      to={to}
      className="card-tile grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-4"
    >
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${toneClass[tone]}`}>
        <Icon className="h-6 w-6" />
      </span>
      <span className="min-w-0">
        <span className="block text-base font-extrabold leading-tight">{title}</span>
        {description ? (
          <span className="mt-1 block text-sm leading-snug text-muted-foreground">{description}</span>
        ) : null}
      </span>
      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
    </Link>
  );
}

export function QuickTile({
  to,
  title,
  icon: Icon,
  tone = "primary",
}: {
  to: string;
  title: string;
  icon: LucideIcon;
  tone?: Tone;
}) {
  return (
    <Link to={to} className="card-tile flex min-h-24 flex-col justify-between gap-2 p-4">
      <span className={`grid h-10 w-10 place-items-center rounded-xl ${toneClass[tone]}`}>
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-sm font-bold leading-tight">{title}</span>
    </Link>
  );
}
