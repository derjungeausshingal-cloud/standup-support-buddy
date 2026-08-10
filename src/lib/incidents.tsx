import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type IncidentKind = "mobbing" | "diskriminierung" | "beleidigung" | "bedrohung" | "anderes";

export const kindLabels: Record<IncidentKind, string> = {
  mobbing: "Mobbing",
  diskriminierung: "Diskriminierung",
  beleidigung: "Beleidigung",
  bedrohung: "Bedrohung",
  anderes: "Etwas anderes",
};

export type EvidenceType = "foto" | "chat" | "datei" | "sprachnotiz";

export const evidenceLabels: Record<EvidenceType, string> = {
  foto: "Foto / Screenshot",
  chat: "Chatverlauf",
  datei: "Datei",
  sprachnotiz: "Sprachnotiz",
};

export type Evidence = {
  id: string;
  name: string;
  type: EvidenceType;
  date: string;
};

export type Incident = {
  id: string;
  kind: IncidentKind | null;
  description: string;
  date: string;
  place: string;
  witnesses: string;
  evidence: Evidence[];
  createdAt: string;
};

export type Draft = Omit<Incident, "id" | "createdAt">;

export const emptyDraft: Draft = {
  kind: null,
  description: "",
  date: "",
  place: "",
  witnesses: "",
  evidence: [],
};

const demoIncidents: Incident[] = [
  {
    id: "demo-1",
    kind: "mobbing",
    description:
      "In der Pause wurde ich wieder von derselben Gruppe ausgelacht. Meine Tasche wurde versteckt, bis es geklingelt hat.",
    date: "2026-07-14",
    place: "Schulhof",
    witnesses: "Lena (Sitznachbarin)",
    evidence: [{ id: "e1", name: "Screenshot_Chat.png", type: "foto", date: "2026-07-14" }],
    createdAt: "2026-07-14T12:20:00.000Z",
  },
  {
    id: "demo-2",
    kind: "beleidigung",
    description: "In der Klassengruppe wurden abfällige Nachrichten über mich geschrieben.",
    date: "2026-07-28",
    place: "Klassenchat",
    witnesses: "",
    evidence: [{ id: "e2", name: "Chatverlauf_28-07.txt", type: "chat", date: "2026-07-28" }],
    createdAt: "2026-07-28T19:05:00.000Z",
  },
];

type Ctx = {
  incidents: Incident[];
  draft: Draft;
  setDraft: (updater: Partial<Draft>) => void;
  resetDraft: () => void;
  saveDraft: () => Incident;
  updateIncident: (id: string, patch: Partial<Incident>) => void;
  deleteIncident: (id: string) => void;
  clearAll: () => void;
  lastSavedId: string | null;
};

const IncidentContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "standup.incidents.v1";

function newId() {
  return Math.random().toString(36).slice(2, 10);
}

export function IncidentProvider({ children }: { children: ReactNode }) {
  const [incidents, setIncidents] = useState<Incident[]>(demoIncidents);
  const [draft, setDraftState] = useState<Draft>(emptyDraft);
  const [lastSavedId, setLastSavedId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setIncidents(JSON.parse(raw) as Incident[]);
    } catch {
      /* Testdaten behalten */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents));
    } catch {
      /* Speichern nicht möglich */
    }
  }, [incidents, hydrated]);

  const value = useMemo<Ctx>(
    () => ({
      incidents,
      draft,
      lastSavedId,
      setDraft: (patch) => setDraftState((d) => ({ ...d, ...patch })),
      resetDraft: () => setDraftState(emptyDraft),
      saveDraft: () => {
        const incident: Incident = {
          ...draft,
          id: newId(),
          createdAt: new Date().toISOString(),
        };
        setIncidents((list) => [incident, ...list]);
        setLastSavedId(incident.id);
        setDraftState(emptyDraft);
        return incident;
      },
      updateIncident: (id, patch) =>
        setIncidents((list) => list.map((i) => (i.id === id ? { ...i, ...patch } : i))),
      deleteIncident: (id) => setIncidents((list) => list.filter((i) => i.id !== id)),
      clearAll: () => setIncidents([]),
    }),
    [incidents, draft, lastSavedId],
  );

  return <IncidentContext.Provider value={value}>{children}</IncidentContext.Provider>;
}

export function useIncidents() {
  const ctx = useContext(IncidentContext);
  if (!ctx) throw new Error("useIncidents muss innerhalb von IncidentProvider verwendet werden");
  return ctx;
}

export function formatDate(value: string) {
  if (!value) return "Ohne Datum";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
}
