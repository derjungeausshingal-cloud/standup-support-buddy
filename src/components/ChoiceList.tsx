import { Check } from "lucide-react";

export function ChoiceList({
  options,
  value,
  onSelect,
}: {
  options: { key: string; label: string }[];
  value: string | null;
  onSelect: (key: string) => void;
}) {
  return (
    <div className="mt-4 grid gap-3">
      {options.map((o) => {
        const active = value === o.key;
        return (
          <button
            key={o.key}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(o.key)}
            className={`card-tile grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 text-left ${
              active ? "border-primary bg-primary-soft" : ""
            }`}
          >
            <span className="min-w-0 text-base font-bold leading-snug">{o.label}</span>
            <span
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                active ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              {active ? <Check className="h-4 w-4" /> : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
