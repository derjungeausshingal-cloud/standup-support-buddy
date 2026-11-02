# StandUp: erster Schritt zur Pilotvorbereitung

Ergänzend gilt das aktuelle [Tresor-Schutzkonzept](vault-security.md).

Diese Version bleibt ein Prototyp für erfundene Beispieldaten. Sie ist keine
Freigabe für die Verarbeitung echter Fälle von Schülerinnen und Schülern.

## Verhalten

- Vorfälle werden erst nach einem erfolgreichen, überprüften Schreibvorgang
  bestätigt. Bei Fehlern bleiben neue Entwürfe bzw. Änderungen im Formular.
- Beim Laden wird nichts automatisch zurückgeschrieben. Unlesbare Daten
  blockieren Schreibvorgänge und bleiben für eine mögliche Wiederherstellung erhalten.
- Änderungen aus anderen Tabs sperren die Sitzung. Tresorschreibvorgänge werden
  mit Web Locks serialisiert; veraltete Ansichten dürfen nicht überschreiben.
- „Alle Daten löschen“ entfernt den Tresor und die drei alten StandUp-Speicherschlüssel:
  aktuelle und alte Vorfälle sowie Einstellungen. Entwurf, Rückgängig-Zustand und
  vorbereitete Nachrichten werden aus der geöffneten App entfernt. Andere geöffnete
  Tabs derselben Herkunft reagieren auf die Speicherereignisse.
- Fehlgeschlagene Löschversuche werden sichtbar gemeldet. Browserkopien, Backups,
  Zwischenablage, Druckausgaben und exportierte Kopien liegen außerhalb dieses Vorgangs.
- Die Beweisfunktion erzeugt nur Beispielnamen und speichert keine Originaldateien.
- Schriften werden vom Gerät verwendet. Die optionalen Lovable-Meldehooks werden
  aus dem Anwendungscode nicht mehr mit Fehlerdetails aufgerufen.

## Verbleibende Grenzen

Die Browserdaten werden nach Einrichtung verschlüsselt gespeichert und die
App besitzt eine Zugangssperre. Garantierte Aufbewahrung, automatische Sicherung
und sichere Dateiverwaltung fehlen weiterhin.
Hosting-Verbindungsdaten und mögliche zusätzliche Skripte der jeweiligen
Hosting-/Vorschauumgebung müssen vor einem echten Piloten separat geprüft werden.
Lokale Beratungstreffer sind weiterhin Vorlagen; der Fragebogen benötigt weitere
Korrekturen und fachliche Prüfung.

Vor echten Daten sind Schutzkonzept, verifizierte Hilfsangebote, schulische
Zuständigkeiten, Datenschutzprüfung und Tests auf echten Mobilgeräten erforderlich.

## Prüfen

Für die Speichertests Node.js 22.18+ oder 24 verwenden:

```sh
npm test
npx tsc --noEmit
GITHUB_PAGES_BASE=/standup-support-buddy/ npm run build
```

Die Tests verwenden ausschließlich erfundene Daten und einen simulierten Speicher.
Sie decken beschädigte Daten, gesperrten/vollen Speicher, Wiederholung nach Fehlern,
Konflikte zwischen Ansichten sowie vollständige und teilweise fehlgeschlagene
Löschvorgänge ab.
