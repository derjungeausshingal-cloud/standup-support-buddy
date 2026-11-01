import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  DATA_CLEARED_EVENT,
  INCIDENTS_KEY,
  LEGACY_INCIDENTS_KEY,
  deleteAppData,
  type StorageProblem,
} from "./local-data";
import { useLocalData } from "./use-local-data";

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
  const kind =
    typeof r["kind"] === "string" && Object.hasOwn(kindLabels, r["kind"])
      ? (r["kind"] as IncidentKind)
      : null;
  const evidence = Array.isArray(r["evidence"])
    ? (r["evidence"] as unknown[]).flatMap((e) => {
        if (!e || typeof e !== "object") return [];
        const ev = e as Record<string, unknown>;
        const type =
          typeof ev["type"] === "string" && Object.hasOwn(evidenceLabels, ev["type"])
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
  saveDraft: () => Incident | null;
  addIncident: (partial: Partial<Draft>) => Incident | null;
  updateIncident: (id: string, patch: Partial<Incident>) => boolean;
  deleteIncident: (id: string) => boolean;
  undoDelete: () => void;
  recentlyDeleted: Incident | null;
  clearAll: () => boolean;
  storageProblem: StorageProblem | null;
  clearEvidence: () => void;
  lastSavedId: string | null;
};

const IncidentContext = createContext<Ctx | null>(null);
const incidentKeys = [INCIDENTS_KEY, LEGACY_INCIDENTS_KEY];
const noIncidents: Incident[] = [];

function decodeIncidents(raw: unknown): Incident[] {
  if (!Array.isArray(raw)) throw new Error("Invalid incident list");
  return raw.map((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item))
      throw new Error("Invalid incident");
    for (const key of [
      "id",
      "description",
      "date",
      "time",
      "place",
      "persons",
      "witnesses",
      "notes",
      "impact",
      "nextStep",
      "createdAt",
      "updatedAt",
    ]) {
      if (item[key] !== undefined && typeof item[key] !== "string")
        throw new Error("Invalid field");
    }
    if (
      item.evidence !== undefined &&
      (!Array.isArray(item.evidence) ||
        item.evidence.some((e: unknown) => !e || typeof e !== "object" || Array.isArray(e)))
    )
      throw new Error("Invalid evidence");
    const incident = normalizeIncident(item);
    if (!incident) throw new Error("Invalid incident");
    return incident;
  });
}

function newId() {
  return crypto.randomUUID();
}

export function IncidentProvider({ children }: { children: ReactNode }) {
  const {
    value: incidents,
    hydrated,
    problem: storageProblem,
    write,
  } = useLocalData(incidentKeys, noIncidents, decodeIncidents);
  const [draft, setDraftState] = useState<Draft>(emptyDraft);
  const [lastSavedId, setLastSavedId] = useState<string | null>(null);
  const [recentlyDeleted, setRecentlyDeleted] = useState<Incident | null>(null);

  useEffect(() => {
    const reset = () => {
      setDraftState(emptyDraft);
      setLastSavedId(null);
      setRecentlyDeleted(null);
    };
    window.addEventListener(DATA_CLEARED_EVENT, reset);
    return () => window.removeEventListener(DATA_CLEARED_EVENT, reset);
  }, []);

  const value = useMemo<Ctx>(() => {
    const create = (base: Draft): Incident => {
      const now = new Date().toISOString();
      return { ...base, id: newId(), createdAt: now, updatedAt: now };
    };
    const add = (base: Draft) => {
      const incident = create(base);
      if (!write((list) => [incident, ...list])) return null;
      setLastSavedId(incident.id);
      return incident;
    };
    return {
      incidents,
      hydrated,
      storageProblem,
      draft,
      lastSavedId,
      recentlyDeleted,
      setDraft: (patch) => setDraftState((d) => ({ ...d, ...patch })),
      resetDraft: () => setDraftState(emptyDraft),
      saveDraft: () => {
        const incident = add(draft);
        if (incident) setDraftState(emptyDraft);
        return incident;
      },
      addIncident: (partial) => add({ ...emptyDraft, ...partial }),
      updateIncident: (id, patch) =>
        write((list) =>
          list.map((i) =>
            i.id === id ? { ...i, ...patch, updatedAt: new Date().toISOString() } : i,
          ),
        ),
      deleteIncident: (id) => {
        const found = incidents.find((i) => i.id === id) ?? null;
        if (!write((list) => list.filter((i) => i.id !== id))) return false;
        setRecentlyDeleted(found);
        return true;
      },
      undoDelete: () => {
        if (recentlyDeleted && write((list) => [recentlyDeleted, ...list]))
          setRecentlyDeleted(null);
      },
      clearAll: () => {
        const success = deleteAppData(() => window.localStorage);
        window.dispatchEvent(new CustomEvent(DATA_CLEARED_EVENT, { detail: success }));
        return success;
      },
      clearEvidence: () => {
        write((list) => list.map((i) => ({ ...i, evidence: [] })));
      },
    };
  }, [incidents, hydrated, storageProblem, draft, lastSavedId, recentlyDeleted, write]);

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
