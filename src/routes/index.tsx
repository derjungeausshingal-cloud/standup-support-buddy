import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  FileHeart,
  HandHeart,
  HelpCircle,
  Lock,
  Phone,
  Scale,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { OptionCard, QuickTile } from "@/components/OptionCard";
import { formatDate, incidentDate, sortByDateDesc, useIncidents } from "@/lib/incidents";
import { usePreferences } from "@/lib/preferences";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StandUp – Du bist nicht allein" },
      {
        name: "description",
        content:
          "StandUp unterstützt dich bei Mobbing, Diskriminierung, Beleidigung oder Bedrohung: dokumentieren, verstehen, Hilfe finden.",
      },
      { property: "og:title", content: "StandUp – Du bist nicht allein" },
      {
        property: "og:description",
        content: "Vorfälle in Ruhe dokumentieren und passende Unterstützung finden.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HomePage,
});

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return "Gute Nacht";
  if (h < 11) return "Guten Morgen";
  if (h < 18) return "Hallo";
  return "Guten Abend";
}

function HomePage() {
  const { incidents, hydrated } = useIncidents();
  const { prefs } = usePreferences();

  const sorted = sortByDateDesc(incidents);
  const latest = sorted[0];
  const openSteps = incidents.filter((i) => i.nextStep && !i.nextStepDone);
  const evidenceCount = incidents.reduce((sum, i) => sum + i.evidence.length, 0);

  return (
    <div className="min-h-screen pb-32">
      <header className="mx-auto max-w-md px-5 pt-[max(1.5rem,env(safe-area-inset-top))]">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <ShieldCheck className="h-7 w-7" />
          </span>
          <span className="text-2xl font-extrabold tracking-tight">StandUp</span>
        </div>
        <p className="mt-5 text-base font-semibold text-primary">{greeting()}. Du bist nicht allein.</p>
        <h1 className="mt-1 text-2xl font-extrabold leading-tight">Wie können wir dir helfen?</h1>
      </header>

      <main className="mx-auto max-w-md px-5">
        <div className="mt-5 grid gap-3">
          <OptionCard
            to="/vorfall"
            title="Mir ist etwas passiert"
            description="Vorfall dokumentieren und Hilfe bekommen"
            icon={FileHeart}
            tone="primary"
          />
          <OptionCard
            to="/helfen"
            title="Ich möchte jemandem helfen"
            description="Unterstützung für Freunde, Mitschüler, Kolleginnen und Kollegen"
            icon={HandHeart}
            tone="success"
          />
          <OptionCard
            to="/tagebuch"
            title="Meine Vorfälle"
            description="Bisher dokumentierte Vorfälle ansehen"
            icon={BookOpen}
            tone="info"
          />
        </div>

        {hydrated && incidents.length > 0 ? (
          <section className="card-tile mt-8 grid gap-3 p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-extrabold">Dein Überblick</h2>
              <Link to="/tagebuch" className="text-sm font-bold text-primary">
                Tagebuch
              </Link>
            </div>
            <dl className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-2xl bg-muted p-3">
                <dt className="text-xs font-bold text-muted-foreground">Einträge</dt>
                <dd className="mt-0.5 text-xl font-extrabold">{incidents.length}</dd>
              </div>
              <div className="rounded-2xl bg-muted p-3">
                <dt className="text-xs font-bold text-muted-foreground">Beweise</dt>
                <dd className="mt-0.5 text-xl font-extrabold">{evidenceCount}</dd>
              </div>
              <div className="rounded-2xl bg-muted p-3">
                <dt className="text-xs font-bold text-muted-foreground">Offen</dt>
                <dd className="mt-0.5 text-xl font-extrabold">{openSteps.length}</dd>
              </div>
            </dl>
            {latest && !prefs.discreet ? (
              <Link
                to="/tagebuch/$id"
                params={{ id: latest.id }}
                className="rounded-2xl bg-muted p-3 text-sm leading-snug"
              >
                <span className="block text-xs font-bold text-muted-foreground">
                  Zuletzt: {formatDate(incidentDate(latest))}
                </span>
                <span className="mt-1 line-clamp-2 block">
                  {latest.description || "Kein Beschreibungstext"}
                </span>
              </Link>
            ) : null}
            {openSteps.length > 0 ? (
              <Link
                to="/tagebuch/$id"
                params={{ id: openSteps[0]!.id }}
                className="flex items-center gap-2 rounded-2xl bg-warning-soft p-3 text-sm font-bold text-foreground"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-warning" />
                <span className="min-w-0 truncate">Nächster Schritt: {openSteps[0]!.nextStep}</span>
              </Link>
            ) : null}
          </section>
        ) : null}

        <h2 className="mt-8 text-lg font-extrabold">Schnellzugriffe</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <QuickTile to="/beratung" title="Beratung & Hilfe" icon={HelpCircle} tone="success" />
          <QuickTile to="/rechte" title="Rechte & Informationen" icon={Scale} tone="warning" />
          <QuickTile to="/ist-das-mobbing" title="Ist das Mobbing?" icon={AlertCircle} tone="primary" />
          <QuickTile to="/notfall" title="Notfall-Hilfe" icon={Phone} tone="info" />
        </div>

        <section className="card-tile mt-8 grid grid-cols-[auto_minmax(0,1fr)] gap-3 p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
            <Lock className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-extrabold">Deine Angaben gehören dir</p>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              Bitte geh mit persönlichen Informationen vertraulich um – auch mit denen anderer Menschen. In
              dieser Version werden deine Einträge nur lokal auf diesem Gerät gespeichert. Du entscheidest,
              was du aufschreibst und mit wem du es teilst.
            </p>
            <Link to="/einstellungen" className="mt-2 inline-block text-sm font-bold text-primary">
              Datenschutz-Einstellungen ansehen
            </Link>
          </div>
        </section>

        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          StandUp ersetzt keine professionelle psychologische oder rechtliche Beratung und trifft keine
          verbindlichen rechtlichen Entscheidungen.
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
