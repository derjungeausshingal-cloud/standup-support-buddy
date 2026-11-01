import { useCallback, useEffect, useRef, useState } from "react";
import { DATA_CLEARED_EVENT, LocalDataStore, type StorageProblem } from "./local-data";

export function useLocalData<T>(keys: readonly string[], fallback: T, decode: (raw: unknown) => T) {
  const [value, setValue] = useState(fallback);
  const valueRef = useRef(fallback);
  const [hydrated, setHydrated] = useState(false);
  const [problem, setProblem] = useState<StorageProblem | null>(null);
  const [store] = useState(
    () => new LocalDataStore(() => window.localStorage, keys, fallback, decode),
  );

  useEffect(() => {
    const load = () => {
      const result = store.read();
      valueRef.current = result.value;
      setValue(result.value);
      setProblem(result.problem);
      setHydrated(true);
    };
    const onStorage = (event: StorageEvent) => {
      if (
        event.storageArea === window.localStorage &&
        (event.key === null || keys.includes(event.key))
      )
        load();
    };
    const onClear = (event: Event) => {
      const success = (event as CustomEvent<boolean>).detail;
      load();
      // Even if persistent deletion failed, remove sensitive values from this screen.
      valueRef.current = fallback;
      setValue(fallback);
      if (!success) {
        store.blockWrites();
        setProblem("delete");
      }
    };
    load();
    window.addEventListener("storage", onStorage);
    window.addEventListener(DATA_CLEARED_EVENT, onClear);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(DATA_CLEARED_EVENT, onClear);
    };
  }, [store, keys, fallback]);

  const write = useCallback(
    (update: T | ((current: T) => T)) => {
      const next =
        typeof update === "function" ? (update as (current: T) => T)(valueRef.current) : update;
      const error = store.write(next);
      setProblem(error);
      if (error) return false;
      valueRef.current = next;
      setValue(next);
      return true;
    },
    [store],
  );

  return { value, hydrated, problem, write };
}
