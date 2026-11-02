import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useVault } from "@/lib/vault-context";
import { VaultError } from "@/lib/vault";

/** Only public guidance can mount without decrypting private providers. */
export function VaultGate({ children }: { children: ReactNode }) {
  const session = useVault();
  const { pathname } = useLocation();
  const [ready, setReady] = useState(false);
  const [exists, setExists] = useState(false);
  const [unsupported, setUnsupported] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [understood, setUnderstood] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const guard = useRef(false);
  const attempts = useRef(0);
  const nextTry = useRef(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    setPassword("");
    setConfirmation("");
    setUnderstood(false);
    try {
      setUnsupported(!window.isSecureContext || !crypto.subtle || !navigator.locks);
      setExists(session.vault.exists());
      setReady(true);
    } catch {
      setError(
        "Der Browserspeicher ist nicht verfügbar. Es werden keine unverschlüsselten Daten neu gespeichert.",
      );
      setUnsupported(true);
      setReady(true);
    }
  }, [session.vault, session.unlocked, session.revision]);
  useEffect(() => {
    const timer = setInterval(
      () => setSeconds(Math.max(0, Math.ceil((nextTry.current - Date.now()) / 1000))),
      500,
    );
    return () => clearInterval(timer);
  }, []);
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const route = base && pathname.startsWith(base + "/") ? pathname.slice(base.length) : pathname;
  const publicPage =
    ["/beratung", "/notfall", "/infos", "/rechte", "/ist-das-mobbing"].includes(route) ||
    route === "/helfen" ||
    route.startsWith("/helfen/");
  if (session.unlocked || publicPage)
    return (
      <div key={session.unlocked ? "private" : "public"}>
        <div className="mx-auto flex max-w-md items-center justify-between gap-3 px-5 pt-3 text-sm">
          {session.unlocked ? (
            <button className="btn-ghost" type="button" onClick={session.lock}>
              Jetzt sperren
            </button>
          ) : (
            <Link className="btn-ghost" to="/tagebuch">
              Private Daten entsperren
            </Link>
          )}
        </div>
        {children}
      </div>
    );
  return (
    <main className="mx-auto max-w-md px-5 py-8">
      <h1 className="text-2xl font-extrabold">StandUp: geschütztes Tagebuch</h1>
      <p className="mt-3 leading-relaxed">
        Nach der Einrichtung liegen Vorfälle und Einstellungen verschlüsselt in diesem Browser. Nach
        fünf Minuten ohne Bedienung oder beim Wechsel in den Hintergrund wird die App gesperrt.
        Ungespeicherte Eingaben werden beim Sperren verworfen.
      </p>
      <p className="mt-3 rounded-2xl bg-warning-soft p-4 font-bold">
        Weiterhin Testversion: Bitte nur erfundene Beispiele verwenden.
      </p>
      {session.clearFailed ? (
        <p role="alert" className="mt-3 rounded-2xl border border-destructive p-4">
          Die Daten konnten nicht vollständig gelöscht werden. Entferne bei Bedarf die Website-Daten
          in den Browsereinstellungen. Der Tresor bleibt gesperrt.
        </p>
      ) : null}
      {!ready ? (
        <p role="status" className="mt-5">
          Speicher wird geprüft …
        </p>
      ) : unsupported ? (
        <p role="alert" className="mt-5">
          Diese Umgebung unterstützt den sicheren Tresor nicht. Nutze einen aktuellen Browser über
          HTTPS oder localhost. Es gibt keinen unverschlüsselten Ersatzmodus.
        </p>
      ) : (
        <form
          className="mt-6 grid gap-4"
          onSubmit={async (event) => {
            event.preventDefault();
            if (guard.current || Date.now() < nextTry.current) return;
            if (!exists && (password !== confirmation || !understood)) {
              setError("Bitte bestätige das Passwort und den Hinweis.");
              return;
            }
            guard.current = true;
            setBusy(true);
            setError("");
            try {
              await session.open(password, !exists);
              setPassword("");
              setConfirmation("");
            } catch (cause) {
              const code = cause instanceof VaultError ? cause.code : "";
              setError(
                code === "migration"
                  ? "Die Übernahme ist noch nicht abgeschlossen. Alte Daten konnten nicht sicher übernommen oder entfernt werden. Sie werden nicht überschrieben. Mit demselben Passwort erneut versuchen; bei weiterem Fehler technische Hilfe holen."
                  : code === "conflict"
                    ? "Der Speicher wurde in einer anderen Ansicht geändert. Bitte erneut versuchen."
                    : exists
                      ? "Entsperren fehlgeschlagen. Das Passwort ist falsch, der Speicher nicht verfügbar oder die Datei beschädigt. Vorhandene Daten bleiben erhalten."
                      : "Einrichten fehlgeschlagen. Prüfe den Browserspeicher. Falls der Tresor schon angelegt wurde, entsperre ihn mit demselben Passwort. Alte Daten bleiben bei Fehlern erhalten.",
              );
              try {
                setExists(session.vault.exists());
              } catch {
                /* Keep the error visible. */
              }
              attempts.current++;
              nextTry.current =
                Date.now() + Math.min(30_000, 1000 * 2 ** Math.min(attempts.current, 5));
              setPassword("");
              setConfirmation("");
            } finally {
              guard.current = false;
              setBusy(false);
            }
          }}
        >
          <h2 className="text-lg font-bold">
            {exists ? "Tresor entsperren" : "Verschlüsselung einrichten"}
          </h2>
          {!exists ? (
            <p>
              Schließe vor der Einrichtung andere StandUp-Tabs. Vorhandene lokale Daten werden
              übernommen. Die alten Klartextdaten werden erst nach geprüfter Verschlüsselung
              entfernt. Wähle ein eigenes langes Passwort mit mindestens zwölf Zeichen, zum Beispiel
              mehrere zufällige Wörter.
            </p>
          ) : null}
          <label className="grid gap-2">
            <span>Passwort</span>
            <input
              type="password"
              autoComplete={exists ? "current-password" : "new-password"}
              minLength={exists ? 1 : 12}
              maxLength={1024}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field-input"
              disabled={busy}
            />
          </label>
          {!exists ? (
            <>
              <label className="grid gap-2">
                <span>Passwort wiederholen</span>
                <input
                  type="password"
                  autoComplete="new-password"
                  minLength={12}
                  maxLength={1024}
                  required
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  className="field-input"
                  disabled={busy}
                />
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={understood}
                  required
                  onChange={(e) => setUnderstood(e.target.checked)}
                  className="mt-1 h-5 w-5 shrink-0"
                />
                <span>
                  Ich habe verstanden: Ohne dieses Passwort lassen sich die Daten nicht
                  wiederherstellen. Ich bewahre es getrennt an einem sicheren Ort auf.
                </span>
              </label>
            </>
          ) : null}
          {error ? (
            <p role="alert" className="rounded-2xl border border-destructive p-3">
              {error}
            </p>
          ) : null}
          <button className="btn-primary" disabled={busy || seconds > 0} type="submit">
            {busy
              ? "Bitte warten …"
              : seconds > 0
                ? `Erneut versuchen in ${seconds} Sekunden`
                : exists
                  ? "Entsperren"
                  : "Tresor einrichten"}
          </button>
        </form>
      )}
      <details className="mt-6">
        <summary className="cursor-pointer font-bold">Passwort vergessen?</summary>
        <p className="mt-2">
          Es gibt keine Wiederherstellung und keinen Generalschlüssel. Browserdaten zu löschen
          entfernt auch den Tresor unwiderruflich. Die Schule und die Entwicklung können das
          Passwort nicht zurücksetzen.
        </p>
      </details>
      <p className="mt-6 text-sm leading-relaxed">
        Die Sperre schützt gespeicherte Daten. Sie schützt nicht vor Schadsoftware oder bösartigen
        Skripten während einer entsperrten Sitzung. Browserkopien und bereits geteilte Inhalte
        können weiter bestehen.
      </p>
      <div className="mt-6 grid gap-3">
        <Link className="btn-ghost" to="/notfall">
          Notfallhilfe ohne Entsperren
        </Link>
        <Link className="btn-ghost" to="/beratung">
          Beratung ohne Entsperren
        </Link>
      </div>
    </main>
  );
}
