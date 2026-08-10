import { Link } from "@tanstack/react-router";
import { ChevronRight, type LucideIcon } from "lucide-react";

export function OptionCard({
  to,
  title,
  description,
  icon: Icon,
}: {
  to: string;
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Link to={to} className="card-tile grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-5">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
        <Icon className="h-6 w-6" />
      </span>
      <span className="min-w-0">
        <span className="block text-xl font-bold leading-tight">{title}</span>
        <span className="mt-1 block text-base text-muted-foreground">{description}</span>
      </span>
      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
    </Link>
  );
}
