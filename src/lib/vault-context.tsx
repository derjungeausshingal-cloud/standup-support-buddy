import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { AUTO_LOCK_MS, Vault } from "./vault";
import { APP_DATA_KEYS } from "./local-data";

type Session = {
  vault: Vault;
  unlocked: boolean;
  revision: number;
  clearFailed: boolean;
  lock: () => void;
  open: (password: string, create: boolean) => Promise<void>;
  clear: () => Promise<boolean>;
};
const Context = createContext<Session | null>(null);
export function VaultProvider({ children }: { children: ReactNode }) {
  const [vault] = useState(
    () =>
      new Vault(
        () => window.localStorage,
        async <T,>(task: () => Promise<T>): Promise<T> => {
          if (!navigator.locks) throw new Error("unsupported");
          return await navigator.locks.request("standup-vault", task);
        },
      ),
  );
  const [unlocked, setUnlocked] = useState(false);
  const [revision, setRevision] = useState(0);
  const [clearFailed, setClearFailed] = useState(false);
  const generation = useRef(0);
  const lock = () => {
    generation.current++;
    vault.lock();
    setUnlocked(false);
  };
  useEffect(() => {
    let lastActivity = Date.now();
    const activity = (event: Event) => {
      if (!event.isTrusted) return;
      if (unlocked && Date.now() - lastActivity >= AUTO_LOCK_MS) lock();
      lastActivity = Date.now();
    };
    const visibility = () => {
      if (document.visibilityState !== "visible") lock();
    };
    const changed = (event: StorageEvent) => {
      if (
        event.storageArea === window.localStorage &&
        (event.key === null || APP_DATA_KEYS.some((key) => key === event.key))
      )
        lock();
    };
    const timer = unlocked
      ? window.setInterval(() => {
          if (unlocked && Date.now() - lastActivity >= AUTO_LOCK_MS) lock();
        }, 1000)
      : undefined;
    for (const name of ["pointerdown", "keydown", "touchstart", "scroll"])
      window.addEventListener(name, activity, { passive: true });
    window.addEventListener("pagehide", lock);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("storage", changed);
    return () => {
      if (timer !== undefined) clearInterval(timer);
      for (const name of ["pointerdown", "keydown", "touchstart", "scroll"])
        window.removeEventListener(name, activity);
      window.removeEventListener("pagehide", lock);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("storage", changed);
    };
    // Each unlock starts a fresh inactivity interval. lock itself only accesses refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vault, unlocked]);
  return (
    <Context.Provider
      value={{
        vault,
        unlocked,
        revision,
        clearFailed,
        lock,
        open: async (password, create) => {
          const token = generation.current;
          if (create) await vault.create(password);
          else await vault.unlock(password);
          if (token !== generation.current || document.visibilityState !== "visible") {
            vault.lock();
            throw new Error("locked");
          }
          setUnlocked(true);
        },
        clear: async () => {
          lock();
          const success = await vault.clear();
          setClearFailed(!success);
          setRevision((n) => n + 1);
          return success;
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useVault() {
  const session = useContext(Context);
  if (!session) throw new Error("VaultProvider missing");
  return session;
}
