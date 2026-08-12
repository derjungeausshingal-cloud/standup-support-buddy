import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type IncidentKind =
  | "mobbing"
  | "ausgrenzung"
  | "beleidigung"
  | "bedrohung"
  | "diskriminierung"
  | "koerperlich"
  | "cybermobbing"
  | "belaestigung"
  | "konflikt"
  | "anderes";

export const kindLabels: Record<IncidentKind, string> = {
  mobbing: "Mobbing",
  ausgrenzung: "Ausgrenzung",
  beleidigung: "Beleidigung",
  bedrohung: "Bedrohung",
  diskriminierung: "Diskriminierung",
  koerperlich: "Körperlicher Vorfall",
  cybermobbing: "Cybermobbing",
  belaestigung: "Belästigung",
  konflikt: "Konflikt",
  anderes: "Etwas anderes",
};

export const kindOrder: IncidentKind[] = [
  "mobbing",
  "ausgrenzung",
  "beleidigung",
  "bedrohung",
  "diskriminierung",
  "koerperlich",
  "cybermobbing",
  "belaestigung",
  "konflikt",
  "anderes",
];

export type EvidenceType = "foto" | "chat" | "datei" | "sprachnotiz";

export const evidenceLabels: Record<EvidenceType, string> = {
  foto: "Foto / Screenshot",
  chat: "Chatverlauf",
  datei: "Datei",
  sprachnotiz: "Sprachnotiz",
};

export type Evidence = {
  id: string;
  /** Ursprünglicher Dateiname – wird nicht verändert. */
  name: string;
  type: EvidenceType;
  /** Datum, auf das sich der Beweis bezieht (ISO, YYYY-MM-DD). */
  date: string;
  /** Freiwillige eigene Beschreibung – klar getrennt von der Originaldatei. */
  note?: string;
  /** Dateigröße in Bytes, falls bekannt. */
  size?: number;
};

export type Incident = {
  id: string;
  kind: IncidentKind | null;
  description: string;
  /** ISO-Datum YYYY-MM-DD */
  date: string;
  /** Uhrzeit HH:MM */
  time: string;
  place: string;
  /** Beteiligte Personen – private Angabe der nutzenden Person. */
  persons: string;
  witnesses: string;
  /** Eigene Gedanken / Notizen */
  notes: string;
  /** Auswirkungen auf die nutzende Person */
  impact: string;
  /** Optionaler persönlicher nächster Schritt */
  nextStep: string;
  /** Ist der nächste Schritt erledigt? */
  nextStepDone: boolean;
  evidence: Evidence[];
  createdAt: string;
  updatedAt: string;
};

export type Draft = Omit<Incident, "id" | "createdAt" | "updatedAt">;

export const emptyDraft: Draft = {
  kind: null,
  description: "",
  date: "",
  time: "",
  place: "",
  persons: "",
  witnesses: "",
  notes: "",
  impact: "",
  nextStep: "",
  nextStepDone: false,
  evidence: [],
};

function normalizeIncident(raw: unknown): Incident | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const createdAt = str(r["createdAt"]) || new Date().toISOString();
  const kind = typeof r["kind"] === "string" && r["kind"] in kindLabels ? (r["kind"] as IncidentKind) : null;
  const evidence = Array.isArray(r["evidence"])
    ? (r["evidence"] as unknown[]).flatMap((e) => {
        if (!e || typeof e !== "object") return [];
        const ev = e as Record<string, unknown>;
        const type = typeof ev["type"] === "string" && ev["type"] in evidenceLabels
          ? (ev["type"] as EvidenceType)
          : "datei";
        const item: Evidence = {
          id: str(ev["id"]) || newId(),
          name: str(ev["name"]) || "Datei",
          type,
          date: str(ev["date"]),
        };
        if (str(ev["note"])) item.note = str(ev["note"]);
        if (typeof ev["size"] === "number") item.size = ev["size"];
        return [item];
      })
    : [];

  return {
    id: str(r["id"]) || newId(),
    kind,
    description: str(r["description"]),
    date: str(r["date"]),
    time: str(r["time"]),
    place: str(r["place"]),
    persons: str(r["persons"]),
    witnesses: str(r["witnesses"]),
    notes: str(r["notes"]),
    impact: str(r["impact"]),
    nextStep: str(r["nextStep"]),
    nextStepDone: r["nextStepDone"] === true,
    evidence,
    createdAt,
    updatedAt: str(r["updatedAt"]) || createdAt,
  };
}

type Ctx = {
  incidents: Incident[];
  hydrated: boolean;
  draft: Draft;
  setDraft: (updater: Partial<Draft>) => void;
  resetDraft: () => void;
  saveDraft: () => Incident;
  addIncident: (partial: Partial<Draft>) => Incident;
  updateIncident: (id: string, patch: Partial<Incident>) => void;
  deleteIncident: (id: string) => void;
  undoDelete: () => void;
  recentlyDeleted: Incident | null;
  clearAll: () => void;
  clearEvidence: () => void;
  lastSavedId: string | null;
};

const IncidentContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "standup.incidents.v2";
const LEGACY_KEY = "standup.incidents.v1";

function newId() {
  return Math.random().toString(36).slice(2, 10);
}

export function IncidentProvider({ children }: { children: ReactNode }) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [draft, setDraftState] = useState<Draft>(emptyDraft);
  const [lastSavedId, setLastSavedId] = useState<string | null>(null);
  const [recentlyDeleted, setRecentlyDeleted] = useState<Incident | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setIncidents(parsed.map(normalizeIncident).filter((i): i is Incident => i !== null));
        }
      }
    } catch {
      /* Beschädigte lokale Daten werden ignoriert, statt die App zu blockieren. */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents));
    } catch {
      /* Speichern nicht möglich (z. B. voller Speicher) – App bleibt nutzbar. */
    }
  }, [incidents, hydrated]);

  const value = useMemo<Ctx>(() => {
    const create = (base: Draft): Incident => {
      const now = new Date().toISOString();
      return { ...base, id: newId(), createdAt: now, updatedAt: now };
    };

    return {
      incidents,
      hydrated,
      draft,
      lastSavedId,
      recentlyDeleted,
      setDraft: (patch) => setDraftState((d) => ({ ...d, ...patch })),
      resetDraft: () => setDraftState(emptyDraft),
      saveDraft: () => {
        const incident = create(draft);
        setIncidents((list) => [incident, ...list]);
        setLastSavedId(incident.id);
        setDraftState(emptyDraft);
        return incident;
      },
      addIncident: (partial) => {
        const incident = create({ ...emptyDraft, ...partial });
        setIncidents((list) => [incident, ...list]);
        setLastSavedId(incident.id);
        return incident;
      },
      updateIncident: (id, patch) =>
        setIncidents((list) =>
          list.map((i) => (i.id === id ? { ...i, ...patch, updatedAt: new Date().toISOString() } : i)),
        ),
      deleteIncident: (id) =>
        setIncidents((list) => {
          const found = list.find((i) => i.id === id) ?? null;
          setRecentlyDeleted(found);
          return list.filter((i) => i.id !== id);
        }),
      undoDelete: () =>
        setRecentlyDeleted((deleted) => {
          if (deleted) setIncidents((list) => [deleted, ...list]);
          return null;
        }),
      clearAll: () => {
        setIncidents([]);
        setRecentlyDeleted(null);
      },
      clearEvidence: () => setIncidents((list) => list.map((i) => ({ ...i, evidence: [] }))),
    };
  }, [incidents, draft, lastSavedId, recentlyDeleted, hydrated]);

  return <IncidentContext.Provider value={value}>{children}</IncidentContext.Provider>;
}

export function useIncidents() {
  const ctx = useContext(IncidentContext);
  if (!ctx) throw new Error("useIncidents muss innerhalb von IncidentProvider verwendet werden");
  return ctx;
}

/** 12.08.2026 */
export function formatDate(value: string) {
  if (!value) return "Ohne Datum";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

/** 12. August 2026 */
export function formatDateLong(value: string) {
  if (!value) return "Ohne Datum";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
}

/** 14:35 Uhr */
export function formatTime(value: string) {
  if (!value) return "";
  return /^\d{2}:\d{2}$/.test(value) ? `${value} Uhr` : value;
}

/** Datum eines Eintrags (eigenes Datum, sonst Erstellungsdatum). */
export function incidentDate(i: Incident) {
  return i.date || i.createdAt.slice(0, 10);
}

export function sortByDateDesc(list: Incident[]) {
  return [...list].sort((a, b) => (incidentDate(a) < incidentDate(b) ? 1 : -1));
}
