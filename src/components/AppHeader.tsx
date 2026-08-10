import { Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export function AppHeader({
  subtitle,
  back = false,
  title = "standUp",
}: {
  subtitle?: ReactNode;
  back?: boolean;
  title?: string;
}) {
  const router = useRouter();

  return (
    <header className="bg-primary px-5 pb-8 pt-[max(1.5rem,env(safe-area-inset-top))] text-primary-foreground rounded-b-[2rem]">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2">
        {back ? (
          <button
            type="button"
            aria-label="Zurück"
            onClick={() => router.history.back()}
            className="-ml-2 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-foreground/15"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        ) : (
          <span className="h-10 w-0" />
        )}
        <Link to="/" className="min-w-0 truncate text-2xl font-extrabold tracking-tight">
          {title}
        </Link>
      </div>
      {subtitle ? (
        <p className="mt-3 text-lg font-medium text-primary-foreground/90">{subtitle}</p>
      ) : null}
    </header>
  );
}
