import { useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { useI18n } from "@/lib/i18n";

export function AppHeader({
  title,
  subtitle,
  back = true,
  right,
}: {
  title: string;
  subtitle?: ReactNode;
  back?: boolean;
  right?: ReactNode;
}) {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/90 px-5 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur">
      <div className="mx-auto grid max-w-md grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
        {back ? (
          <button
            type="button"
            aria-label={t("info.header.back")}
            onClick={() => router.history.back()}
            className="-ml-2 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-soft text-primary"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        ) : (
          <span className="h-11 w-0" />
        )}
        <h1 className="min-w-0 truncate text-center text-lg font-extrabold tracking-tight">{title}</h1>
        <span className="grid h-11 min-w-11 place-items-center">{right}</span>
      </div>
      {subtitle ? (
        <p className="mx-auto mt-1 max-w-md text-center text-sm text-muted-foreground">{subtitle}</p>
      ) : null}
    </header>
  );
}
