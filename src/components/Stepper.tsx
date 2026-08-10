import { Check } from "lucide-react";

const steps = ["Art", "Details", "Beweise", "Speichern", "Hilfe"] as const;

export function Stepper({ current }: { current: number }) {
  return (
    <div className="mx-auto max-w-md px-5 pt-4">
      <div className="flex items-center justify-between gap-1">
        {steps.map((label, i) => {
          const index = i + 1;
          const done = index < current;
          const active = index === current;
          return (
            <div key={label} className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <div className="flex w-full items-center gap-1">
                <span className={`h-1 flex-1 rounded-full ${i === 0 ? "bg-transparent" : done || active ? "bg-primary" : "bg-border"}`} />
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-extrabold ${
                    done
                      ? "bg-primary text-primary-foreground"
                      : active
                        ? "bg-primary-soft text-primary ring-2 ring-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {done ? <Check className="h-4 w-4" /> : index}
                </span>
                <span className={`h-1 flex-1 rounded-full ${i === steps.length - 1 ? "bg-transparent" : done ? "bg-primary" : "bg-border"}`} />
              </div>
              <span
                className={`truncate text-[0.68rem] font-bold ${active ? "text-primary" : "text-muted-foreground"}`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
