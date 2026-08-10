import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MapPin, Globe } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/beratungsstellen")({
  head: () => ({
    meta: [
      { title: "Beratungsstellen finden – standUp" },
      { name: "description", content: "Finde Beratungsstellen vor Ort und online – anonym, kostenlos und vertraulich." },
      { property: "og:title", content: "Beratungsstellen finden – standUp" },
      { property: "og:description", content: "Anlaufstellen in deiner Nähe und im Netz, übersichtlich aufgelistet." },
    ],
  }),
  component: BeratungPage,
});

const stellen = [
  { name: "Weißer Ring", ort: "Bundesweit · Beratungsstellen vor Ort", art: "Opferhilfe", online: false },
  { name: "Antidiskriminierungsstelle des Bundes", ort: "Online & telefonisch", art: "Diskriminierung", online: true },
  { name: "Schulpsychologischer Dienst", ort: "In deiner Stadt", art: "Schule & Mobbing", online: false },
  { name: "JugendNotmail", ort: "Online-Beratung, anonym", art: "Für Jugendliche", online: true },
  { name: "Pro Familia", ort: "Beratungsstellen bundesweit", art: "Vertrauliche Beratung", online: false },
];

function BeratungPage() {
  const [q, setQ] = useState("");
  const gefiltert = stellen.filter((s) =>
    (s.name + s.ort + s.art).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="min-h-screen pb-28">
      <AppHeader back subtitle="Anonym, kostenlos und vertraulich." />

      <main className="mx-auto max-w-md px-5">
        <h1 className="mt-7 text-2xl font-extrabold">Beratungsstellen finden</h1>

        <div className="card-tile mt-4 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 p-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ort oder Thema suchen"
            className="min-w-0 bg-transparent text-base outline-none"
          />
        </div>

        <div className="mt-4 grid gap-4">
          {gefiltert.map((s) => (
            <div key={s.name} className="card-tile grid grid-cols-[auto_minmax(0,1fr)] gap-4 p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                {s.online ? <Globe className="h-6 w-6" /> : <MapPin className="h-6 w-6" />}
              </span>
              <div className="min-w-0">
                <p className="text-lg font-bold leading-tight">{s.name}</p>
                <p className="text-base text-muted-foreground">{s.ort}</p>
                <span className="mt-2 inline-block rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-primary">
                  {s.art}
                </span>
              </div>
            </div>
          ))}
          {gefiltert.length === 0 && (
            <p className="text-base text-muted-foreground">Keine Treffer. Versuch es mit einem anderen Wort.</p>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
