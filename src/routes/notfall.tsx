import { createFileRoute } from "@tanstack/react-router";
import { Phone, ShieldAlert } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/notfall")({
  head: () => ({
    meta: [
      { title: "Notfall-Hilfe – StandUp" },
      { name: "description", content: "Wichtige Nummern, wenn du dich akut unsicher fühlst oder schnelle Unterstützung brauchst." },
      { property: "og:title", content: "Notfall-Hilfe – StandUp" },
      { property: "og:description", content: "Schnelle Hilfe: Notruf, Telefonseelsorge und weitere Nummern." },
    ],
  }),
  component: NotfallPage,
});

const nummern = [
  { name: "Polizei-Notruf", tel: "110", infoKey: "adv.emergency.police.info" },
  { name: "Rettungsdienst", tel: "112", infoKey: "adv.emergency.rescue.info" },
  { name: "Telefonseelsorge", tel: "0800 111 0 111", infoKey: "adv.emergency.telefonseelsorge.info" },
  { name: "Nummer gegen Kummer", tel: "116 111", infoKey: "adv.emergency.kummer.info" },
] as const;

function NotfallPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen pb-32">
      <AppHeader title={t("adv.emergency.title")} subtitle={t("adv.emergency.subtitle")} />

      <main className="mx-auto max-w-md px-5">
        <section className="card-tile mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-info/30 bg-info-soft p-4">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-info text-primary-foreground">
            <ShieldAlert className="h-6 w-6" />
          </span>
          <p className="min-w-0 text-sm leading-snug">
            {t("adv.emergency.notice")}
          </p>
        </section>

        <ul className="mt-5 grid gap-3">
          {nummern.map((n) => (
            <li key={n.tel} className="card-tile p-4">
              <h2 className="text-base font-extrabold">{n.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t(n.infoKey)}</p>
              <a href={`tel:${n.tel.replace(/\s/g, "")}`} className="btn-primary mt-3">
                <Phone className="h-5 w-5" />
                {t("adv.card.call", { tel: n.tel })}
              </a>
            </li>
          ))}
        </ul>
      </main>

      <BottomNav />
    </div>
  );
}
