import { useCallback, useRef, useState } from "react";
import { useVault } from "./vault-context";
import { VaultError } from "./vault";
import type { StorageProblem } from "./local-data";

/** Providers mount anew after unlocking; no private data is ever read from plaintext storage here. */
export function useLocalData<T>(keys: readonly string[], fallback: T, decode: (raw: unknown) => T) {
  const session = useVault();
  const [initial] = useState(() => {
    if (!session.unlocked) return { value: fallback, problem: null };
    try {
      const raw = session.vault.get(keys);
      return { value: raw === null ? fallback : decode(JSON.parse(raw)), problem: null };
    } catch {
      return { value: fallback, problem: "load" as StorageProblem };
    }
  });
  const [value, setValue] = useState(initial.value);
  const [problem, setProblem] = useState<StorageProblem | null>(initial.problem);
  const valueRef = useRef(initial.value);
  const snapshot = useRef(session.unlocked ? session.vault.get([keys[0]!]) : null);
  const writing = useRef(false);
  const write = useCallback(
    async (update: T | ((current: T) => T)) => {
      if (!session.unlocked || initial.problem) {
        setProblem("load");
        return false;
      }
      if (writing.current) {
        setProblem("save");
        return false;
      }
      writing.current = true;
      try {
        const next =
          typeof update === "function" ? (update as (current: T) => T)(valueRef.current) : update;
        const raw = JSON.stringify(next);
        await session.vault.write(keys[0]!, raw, snapshot.current);
        snapshot.current = raw;
        valueRef.current = next;
        setValue(next);
        setProblem(null);
        return true;
      } catch (error) {
        setProblem(error instanceof VaultError && error.code === "conflict" ? "conflict" : "save");
        return false;
      } finally {
        writing.current = false;
      }
    },
    [session, keys, initial.problem],
  );
  return { value, hydrated: true, problem, write };
}
