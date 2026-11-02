# Lokaler Datentresor: Schutz und Grenzen

Weiterhin nur erfundene Testdaten verwenden. Diese Änderung ist keine
Freigabe für echte Schülerdaten und wurde nicht unabhängig sicherheitsgeprüft.

## Verschlüsselung

- Web Crypto: AES-GCM-256, zufälliger 96-Bit-IV bei jedem Schreiben,
  zufälliges 128-Bit-Salt pro Tresor, PBKDF2-HMAC-SHA-256 mit 600.000 Durchläufen.
  Das Format ist versioniert und verwendet zusätzliche authentifizierte Formatdaten.
- Vorfälle, Altdaten und Einstellungen einschließlich möglicher Vertrauenskontakte
  werden gemeinsam in `standup.vault.v1` gespeichert.
- Passwort und Schlüssel werden niemals in localStorage, sessionStorage oder
  Cookies geschrieben. Der CryptoKey ist nicht exportierbar.
- HTTPS oder localhost, Web Crypto und Web Locks sind erforderlich.
  Es gibt keinen schwächeren Klartext-Ersatzmodus.

## Zugang und Sperren

Ein Passwort mit mindestens zwölf Zeichen ist erforderlich. Mehrere zufällige
Wörter und ein einzigartiges Passwort verwenden. Ohne das Passwort sind die Daten
nicht wiederherstellbar. Es gibt keinen Generalschlüssel oder Passwort-Reset.
Der Einrichtungshinweis muss ausdrücklich bestätigt werden.
Passwortwechsel und Tresor-Export/-Import sind derzeit nicht implementiert.

Private Provider und Routen werden erst nach erfolgreichem Entsperren angezeigt.
Beratung und Notfallhilfe bleiben öffentlich erreichbar.
Manuelles Sperren, fünf Minuten ohne Bedienung, Wechsel in den Hintergrund,
pagehide oder Speicheränderungen aus anderen Tabs sperren die Sitzung.
Dabei werden Schlüsselreferenz, entschlüsselte Daten, Entwürfe und vorbereitete
Nachrichten verworfen. Ungespeicherte Eingaben gehen verloren.
Eine garantierte Überschreibung des JavaScript-Arbeitsspeichers ist nicht möglich.

Web Locks serialisieren kooperierende Schreibvorgänge derselben Herkunft.
Zusätzliche Snapshot-Prüfungen verhindern das Überschreiben aus veralteten Ansichten.
Ein Sperren während eines laufenden Schreibvorgangs verhindert einen verspäteten Commit.

## Migration und Löschen

Vor der Einrichtung alte StandUp-Tabs schließen und nach einem Deployment die
App neu laden. Eine alte Anwendungsversion könnte sonst weiterhin Klartextdaten schreiben.

Vorhandene Daten werden verschlüsselt übernommen. Erst nach geprüfter
Verschlüsselung und Rückleseprüfung werden identische Klartextbestände entfernt.
Fehlgeschlagene Entfernung lässt den Tresor gesperrt und kann mit demselben
Passwort erneut versucht werden. Abweichende oder beschädigte Bestände werden
nicht still verworfen. Alte Klartextkopien in Browser-/Gerätesicherungen lassen
sich dadurch nicht rückwirkend entfernen.

„Alle Daten löschen“ entfernt Tresor und alle drei alten Speicherschlüssel.
Die Sitzung wird gesperrt. Fehler werden sichtbar gemeldet. Fremde Speicherschlüssel
bleiben bestehen. Gedruckte oder geteilte Kopien und die Zwischenablage liegen
außerhalb dieses Löschvorgangs.

## Grenzen vor einem Schulpiloten

Die Sperre schützt ruhende Daten vor beiläufigem Zugriff auf das Browserprofil.
Sie ist kein Serverkonto und schützt nicht vor Schadsoftware, kompromittierten
Erweiterungen oder bösartigen Skripten derselben Herkunft im entsperrten Zustand.
Die Länge des verschlüsselten Datensatzes bleibt sichtbar. Die Wartezeit nach
Passwortfehlern ist nur eine Bedienungssperre und verhindert kein Offline-Raten.

Der neue Sperrbildschirm ist zunächst Deutsch. Die aktualisierten
Datenschutzhinweise liegen in allen fünf App-Sprachen vor. Der Zugangsablauf muss
vor einem mehrsprachigen Piloten noch übersetzt und sprachlich geprüft werden.

Unabhängige Sicherheitsprüfung, Hosting-/Skriptkontrolle, verifizierte Hilfsangebote,
fachliche Prüfung des Fragebogens, schulisches Schutzkonzept und Datenschutzprüfung
bleiben erforderlich. Die Beweisfunktion bleibt eine Demo ohne Dateisicherung.

## Prüfung und Quellen

`npm test` verwendet echte Web-Crypto-Operationen mit erfundenen Daten und
simuliertem Speicher: Passwortfehler, Manipulation, frische IVs/Salts, Migration
und Fehler, blockierter/voller Speicher, Sperren während Schreibvorgängen,
veraltete Ansichten sowie vollständiges und fehlgeschlagenes Löschen.
Node.js 22.18+ oder 24 verwenden.

[OWASP Cryptographic Storage](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html),
[OWASP Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html),
[MDN AES-GCM](https://developer.mozilla.org/en-US/docs/Web/API/AesGcmParams).
