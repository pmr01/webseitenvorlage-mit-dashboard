# Anleitung: Ihr Dashboard nach dem 6P-Prinzip

Diese Anleitung hat drei Teile:

1. [Die sechs Bereiche](#1-die-sechs-bereiche)
2. [Modelle mit dem 6P-Skill füllen](#2-modelle-mit-dem-6p-skill-füllen)
3. [Performance mit Google Analytics verbinden](#3-performance-mit-google-analytics-verbinden)

Das Dashboard liegt unter `/dashboard/` Ihrer Website, zum Beispiel `ihr-name.netlify.app/dashboard/`. Es steht nicht in der Navigation der Website und ist für Suchmaschinen gesperrt. Beide Anleitungen finden Sie auch im Dashboard oben rechts unter **Anleitungen**.

## Zuerst: Passwort für das Dashboard festlegen

Das Dashboard ist durch ein Passwort geschützt. Solange Sie keines festgelegt haben, zeigt es nach dem Veröffentlichen nur die Meldung „Dashboard gesperrt“.

1. In Netlify Ihr Projekt öffnen, dann **Project configuration** (bzw. „Site configuration“) **→ Environment variables → Add a variable**.
2. Name: `DASHBOARD_PASSWORT`, Wert: ein Passwort Ihrer Wahl, am besten mindestens 12 Zeichen. Bei den Bereichen („Scopes“) muss **Functions** dabei sein; die Voreinstellung „All scopes“ passt.
3. Neu veröffentlichen: **Deploys → Trigger deploy → Deploy site**.
4. Öffnen Sie `/dashboard/`. Der Browser fragt nach Benutzername und Passwort. **Den Benutzernamen können Sie frei wählen**, nur das Passwort zählt.

Gut zu wissen:

- Der Browser merkt sich das Passwort, bis Sie ihn ganz schließen. Abmelden geht nur durch Schließen des Browsers.
- Zum Ändern des Passworts den Wert bei Netlify ändern und neu veröffentlichen.
- Der Schutz gilt auch für die Kennzahlen aus Google Analytics: Ohne Passwort liefert die Website keine Zahlen heraus.
- In der lokalen Vorschau (`npm run dev`) gibt es keine Passwortabfrage. Der Schutz läuft nur bei Netlify.

---

## 1. Die sechs Bereiche

Das Dashboard öffnet mit einer **Übersicht** und hat danach sechs Reiter nach dem 6P-Prinzip. Bereiche mit mehreren Teilen haben Unterseiten oder Reiter direkt unter der Überschrift.

| Reiter | Was Sie dort sehen | Wozu |
|---|---|---|
| **Dashboard** (Startansicht) | Kennzahlen mit Beispielzahlen (Besucher, Anfragen, Kunden, Umsatz, Budget, Anfragequote, Kosten pro Anfrage) und der Stand aller sechs Bereiche | Auf einen Blick sehen, wo Sie stehen |
| **1 Produkt** | Business Model Canvas mit neun Feldern | Wie Ihr Unternehmen Werte schafft und Geld verdient |
| **2 Positionierung** | Reiter: Strategie-Pyramide, Porter's 5 Kräfte, SWOT-Analyse, Persona / Empathy Map | Wofür Sie stehen, wie Ihr Markt aussieht, für wen Sie da sind |
| **3 Promotion** | Unterseiten: Webseite mit Storytelling Framework (Wireframe und Checkliste), Design-System (Farben, Schriften, Ecken), Kanäle & Budget (Suche, Social Media, Affiliate-Netzwerke, Budgetplanung) | Website aufbauen, Aussehen festlegen, Kanäle und Budget planen |
| **4 Prozess** | Unterseiten: Projekte (Wasserfall oder agil, Eisenhower-Matrix), Kampagnenplanung, Updates | Wer macht was bis wann, was ist wichtig, und was muss regelmäßig gepflegt werden? |
| **5 Plattform** | Unterseiten: Tools (mit Logo, Datenschutzerklärung und AVV), Abos & Domains (Kosten und Verlängerungen) | Überblick, womit Sie arbeiten und was es kostet |
| **6 Performance** | Echte Zahlen aus Google Analytics: Besucher, Seitenaufrufe, Verlauf, meistbesuchte Seiten, Herkunft; Zeitraum 7, 30 oder 90 Tage | Sehen, ob die Website wirkt |

Solange Google Analytics nicht verbunden ist, zeigt Performance **Beispieldaten** mit gelbem Hinweis. Die Beispielzahlen der Übersicht stehen in `src/inhalte/dashboard-kennzahlen.json`. Die Modelle zeigen Beispielinhalte einer fiktiven Firma mit dem Hinweis „Beispiel“.

---

## 2. Modelle mit dem 6P-Skill füllen

Jedes Modell liest seine Inhalte aus einer eigenen Datei im Ordner `src/inhalte/`:

| Modell | Datei | Umfang |
|---|---|---|
| Business Model Canvas | `business-model-canvas.json` | 9 Felder, höchstens 4 Punkte je Feld |
| Strategie-Pyramide | `strategie-pyramide.json` | Purpose und Werte, Vision und Mission, Strategien |
| Porter's 5 Kräfte | `porter-5-kraefte.json` | 5 Kräfte, höchstens 4 Punkte je Kraft |
| SWOT-Analyse | `swot-analyse.json` | 4 Felder, höchstens 5 Punkte je Feld |
| Persona / Empathy Map | `persona-empathy-map.json` | 8 Dimensionen |
| Storytelling-Checkliste | `storytelling-checkliste.json` | 12 Elemente und 3 Voraussetzungen |
| Tool-Liste | `plattform-tools.json` | beliebig viele Tools |

So gehen Sie vor:

1. Erstellen Sie mit dem **6P-Skill** in Claude die Analyse für Ihr Unternehmen. Der Skill liefert alle fünf Modelle in einer Datei.
2. Laden Sie die Analyse zusammen mit dem Projekt in Ihr KI-Tool und schreiben Sie zum Beispiel:
   *„Übertrage meine 6P-Analyse in die Dateien im Ordner src/inhalte/. Behalte die Struktur der JSON-Dateien bei und setze "beispiel" auf false.“*
3. Prüfen Sie das Ergebnis in der Vorschau (`npm run dev`, dann `/dashboard/produkt/` und `/dashboard/positionierung/`).

Ohne KI-Tool ändern Sie die Dateien direkt: Ersetzen Sie nur den Text zwischen den Anführungszeichen. Achten Sie darauf, Kommas und Klammern nicht zu löschen. Wenn die Vorschau danach einen Fehler zeigt, fehlt meist ein Komma oder ein Anführungszeichen.

### Projekte, Kampagnen und Updates im Reiter Prozess

**Projekte:** Ein Klick auf ein Projekt öffnet es oben mit seinen eigenen Ansichten; jedes Projekt merkt sich die zuletzt gewählte Ansicht. Im Projektformular wählen Sie das Vorgehen:

- **Wasserfall** für Projekte mit festem Ziel, Umfang und Termin. Fünf Phasen nacheinander: Projektdefinition, Planung, Umsetzung, Controlling, Abschluss. Wichtige Termine markieren Sie als **Meilenstein** (◆). Ansichten: Phasen, Zeitplan, Eisenhower, Liste.
- **Agil** für Projekte, deren bestes Ergebnis sich erst beim Ausprobieren zeigt. Ideen sammeln sich im **Backlog**, die Arbeit läuft in **Sprints** von 1 bis 4 Wochen. Ansichten: Board (mit Sprint-Filter), Sprints, Eisenhower, Liste.
- **Eisenhower-Matrix:** ordnet offene Aufgaben nach Wichtigkeit und Dringlichkeit in vier Felder: sofort erledigen, einplanen, delegieren, streichen oder später. Aufgaben ziehen Sie mit der Maus in ein anderes Feld oder setzen „wichtig“ und „dringend“ im Aufgabenformular. Ohne Projektauswahl zeigt die Übersicht die Matrix für alle Projekte.

**Kampagnenplanung:** Kampagnen mit Ziel, Zielgruppe, Kernbotschaft, Kanälen, Zeitraum, Budget und einer Kennzahl (Ziel und Ist), als Zeitplan oder Karten.

**Updates:** erinnert an wiederkehrende Aufgaben wie das Astro-Update (monatlich), Paket- und Sicherheitsprüfungen, Node.js, Netlify, Rechtstexte und Verträge. Für Astro wird die neueste Version automatisch abgefragt und mit der installierten verglichen. Mit „Heute erledigt“ startet die Erinnerung neu.

**Wichtig:** Projekte, Kampagnen, Abos, Budgetplanung und Haken speichert nur der Browser auf diesem Gerät. Andere Personen sehen sie nicht, und beim Löschen der Browserdaten sind sie weg. Sichern Sie deshalb regelmäßig über **Als Datei sichern** und laden Sie die Datei bei Bedarf über **Datei laden** wieder. Die Startdaten (Beispielprojekte) stehen in `src/inhalte/projekte.json`.

**Für den echten Einsatz im Team: Neon einrichten.** Das Projektmanagement in der Vorlage ist ein Beispiel ohne Datenbank. Damit alle im Team dieselben Projekte und Aufgaben sehen, legen Sie auf https://neon.tech ein kostenloses Konto und eine Datenbank an. Den Verbindungs-Schlüssel hinterlegen Sie wie das Dashboard-Passwort als Umgebungsvariable bei Netlify, nie in einer Datei. Den Umbau übernimmt Ihr KI-Tool, zum Beispiel mit: *„Speichere Projekte und Aufgaben im Reiter Prozess in meiner Neon-Datenbank. Die Schnittstelle soll unter /dashboard/api/ liegen, damit der Passwortschutz greift.“*

Ein weiteres Tool für den Reiter Plattform ergänzen Sie so:

```json
{
  "name": "Mailchimp", "logo": "", "zweck": "Newsletter versenden", "link": "https://mailchimp.com", "bedarf": true,
  "datenschutz": "https://…/privacy",
  "avv": { "noetig": "ja", "url": "https://…/dpa", "hinweis": "Verarbeitet E-Mail-Adressen der Abonnenten." }
}
```

`"bedarf": true` sortiert das Tool unter „Bei Bedarf“ ein. Bei `"avv"` ist `"noetig"` entweder `"ja"`, `"nein"` oder `"abhaengig"`. Ohne Logo zeigt die Liste den Anfangsbuchstaben; eigene Logos legen Sie als SVG in `public/logos/`.

---

## 3. Performance mit Google Analytics verbinden

Die Verbindung hat zwei Teile:

- **Teil A – Besuche erfassen:** Die Website meldet Besuche an Google Analytics. Dafür brauchen Sie die **Mess-ID**.
- **Teil B – Kennzahlen ins Dashboard holen:** Eine kleine Serverfunktion bei Netlify liest die Zahlen aus Google Analytics. Dafür brauchen Sie die **Property-ID** und ein **Dienstkonto** bei Google.

Die Bezeichnungen in den Oberflächen von Google und Netlify ändern sich gelegentlich. Wenn ein Menüpunkt anders heißt, suchen Sie nach dem Begriff in Anführungszeichen oder fragen Sie Ihr KI-Tool.

### Teil A: Besuche erfassen

1. Öffnen Sie https://analytics.google.com und melden Sie sich mit Ihrem Google-Konto an.
2. Legen Sie über **Verwaltung → Erstellen → Property** eine neue Property an: Name der Website, Zeitzone Deutschland, Währung Euro.
3. Wählen Sie als Plattform **Web** und tragen Sie die Adresse Ihrer Website ein (zum Beispiel `https://ihr-name.netlify.app`).
4. Google zeigt die **Mess-ID**, sie beginnt mit `G-`. Kopieren Sie sie.
5. Tragen Sie die Mess-ID in `src/konfiguration.mjs` ein:
   ```js
   analytics: {
     messId: 'G-XXXXXXXXXX',
   },
   ```
6. Veröffentlichen Sie die Änderung (zu GitHub hochladen, Netlify veröffentlicht automatisch).
7. **Prüfen:** Öffnen Sie Ihre Website. Unten erscheint das Einwilligungsbanner. Klicken Sie auf **Zustimmen**. In Google Analytics sehen Sie Ihren Besuch nach kurzer Zeit unter **Berichte → Echtzeit**.

Ohne Zustimmung erfasst die Website nichts. Ergänzen Sie in der Datenschutzerklärung den Absatz zu Google Analytics (Abschnitt 4).

### Teil B: Kennzahlen ins Dashboard holen

**Schritt 1 – Property-ID notieren.**
In Google Analytics unter **Verwaltung → Property-Details** (oder „Property-Einstellungen“) steht die **Property-ID**. Sie besteht nur aus Ziffern, zum Beispiel `412345678`. Das ist nicht die Mess-ID mit `G-`.

**Schritt 2 – Projekt bei Google Cloud anlegen.**
Öffnen Sie https://console.cloud.google.com mit demselben Google-Konto. Legen Sie über die Projektauswahl oben ein **neues Projekt** an, zum Beispiel „Dashboard Website“. Das ist kostenlos.

**Schritt 3 – Schnittstelle einschalten.**
Im Projekt unter **APIs & Dienste → Bibliothek** nach **„Google Analytics Data API“** suchen und **Aktivieren** klicken.

**Schritt 4 – Dienstkonto anlegen.**
Unter **IAM & Verwaltung → Dienstkonten → Dienstkonto erstellen**. Name zum Beispiel `dashboard-leser`. Rollen müssen Sie hier keine vergeben. Fertig klicken.

**Schritt 5 – Schlüssel herunterladen.**
Öffnen Sie das neue Dienstkonto, Reiter **Schlüssel → Schlüssel hinzufügen → Neuen Schlüssel erstellen → JSON**. Ihr Browser lädt eine JSON-Datei herunter.
⚠️ Diese Datei ist ein Passwort. Legen Sie sie **nicht** in den Projektordner und laden Sie sie nirgends hoch. Sie brauchen daraus gleich zwei Angaben: `client_email` und `private_key`.
Lässt Google das Erstellen eines Schlüssels nicht zu, ist das in Ihrem Konto oder Ihrer Organisation per Richtlinie gesperrt. Dann muss die Person mit Administratorrechten es freigeben.

**Schritt 6 – Dienstkonto in Google Analytics berechtigen.**
Zurück in Google Analytics: **Verwaltung → Property-Zugriffsverwaltung → „+“ → Nutzer hinzufügen**. Tragen Sie die `client_email` aus der JSON-Datei ein (endet auf `iam.gserviceaccount.com`), Rolle **Betrachter**, ohne Benachrichtigung per E-Mail. Hinzufügen.

**Schritt 7 – Angaben bei Netlify hinterlegen.**
In Netlify Ihr Projekt öffnen, dann **Project configuration** (bzw. „Site configuration“) **→ Environment variables → Add a variable**. Legen Sie drei Variablen an:

| Name | Wert |
|---|---|
| `GA_PROPERTY_ID` | die Property-ID aus Schritt 1 (nur Ziffern) |
| `GA_CLIENT_EMAIL` | der Wert von `client_email` aus der JSON-Datei |
| `GA_PRIVATE_KEY` | der Wert von `private_key` aus der JSON-Datei, vollständig von `-----BEGIN PRIVATE KEY-----` bis `-----END PRIVATE KEY-----` |

Wenn Netlify anbietet, eine Variable als geheim („secret“) zu markieren, tun Sie das für `GA_PRIVATE_KEY`.

**Schritt 8 – Neu veröffentlichen.**
Die Variablen gelten erst nach der nächsten Veröffentlichung: In Netlify unter **Deploys → Trigger deploy → Deploy site**.

**Schritt 9 – Prüfen, ob Daten ankommen.**
Öffnen Sie im Dashboard den Reiter **Performance** (`/dashboard/performance/`). Oben steht jetzt **„Live – Daten aus Google Analytics“**. Wechseln Sie den Zeitraum zwischen 7, 30 und 90 Tagen; die Werte ändern sich mit.
Neue Besuche erscheinen dort nicht sofort: Google verarbeitet die Daten mit einigen Stunden Verzögerung, am ersten Tag kann das Dashboard noch leer sein. Für den Sofort-Test nutzen Sie den Echtzeit-Bericht in Google Analytics (Teil A, Schritt 7).

### Wenn es nicht klappt

Zeigt das Dashboard weiter „Beispieldaten“ mit einer roten Meldung, steht dort der Grund:

| Meldung enthält | Ursache | Lösung |
|---|---|---|
| „Anmeldung bei Google fehlgeschlagen“ | Schlüssel oder E-Mail falsch kopiert | Schritt 7 prüfen: `GA_PRIVATE_KEY` vollständig mit Anfangs- und Endzeile |
| „permission“ oder „Berechtigung“ | Dienstkonto hat keinen Zugriff | Schritt 6: E-Mail des Dienstkontos als Betrachter hinzufügen |
| „has not been used“ oder „disabled“ | Schnittstelle nicht eingeschaltet | Schritt 3 |
| „property“ | Property-ID falsch | Schritt 1: nur Ziffern, nicht die Mess-ID |

| „Dashboard-Passwort nötig“ | Browser hat das Passwort nicht mitgeschickt | Browser schließen, `/dashboard/` neu öffnen und Passwort eingeben |

Zeigt das Dashboard „Beispieldaten“ **ohne** rote Meldung, fehlen die Variablen bei Netlify oder die Seite wurde danach nicht neu veröffentlicht (Schritte 7 und 8).

In der lokalen Vorschau (`npm run dev`) zeigt Performance immer Beispieldaten, weil die Serverfunktion nur bei Netlify läuft.

---

## Anfragen messen: über welchen Weg, Kanal und Button kommen Leads?

Die Website meldet jede Anfrage an Google Analytics, sobald eine Mess-ID eingetragen ist und der Besucher zugestimmt hat. Sie müssen in Analytics nur einmal drei Dinge einstellen.

**Was die Website sendet** (Datei `src/components/Messung.astro`):

| Ereignis | Wann | Parameter |
|---|---|---|
| `generate_lead` | Formular gesendet, Klick auf E-Mail-Adresse oder Telefonnummer | `lead_weg` (formular, email, telefon), `lead_position` (Abschnitt, z. B. kontakt), `letzte_cta` (zuletzt geklickter Button: kopf, hero, painpoints, vorstellung, plan, testimonials oder ohne) |
| `cta_klick` | Klick auf einen Call-to-Action-Button | `cta_position` (wo der Button steht) |

Von welchem Kanal jemand kam (Google, Facebook, direkt …), ergänzt Analytics selbst.

**Einrichten in Google Analytics** (Bezeichnungen können sich ändern):

1. **Schlüsselereignis:** Verwaltung → Datenanzeige → Ereignisse (bzw. Schlüsselereignisse) → `generate_lead` als Schlüsselereignis markieren. Das Ereignis erscheint in der Liste, nachdem es einmal ausgelöst wurde; Sie können es auch vorab über „Neues Schlüsselereignis“ mit genau diesem Namen anlegen.
2. **Benutzerdefinierte Dimensionen:** Verwaltung → Datenanzeige → Benutzerdefinierte Definitionen → „Benutzerdefinierte Dimension erstellen“, jeweils Umfang **Ereignis**. Legen Sie vier an; Name und Ereignisparameter sind jeweils gleich: `lead_weg`, `lead_position`, `letzte_cta`, `cta_position`.
3. **Prüfen:** Website öffnen, im Banner zustimmen, einen Button klicken und das Formular senden. In Analytics unter Berichte → Echtzeit erscheint `generate_lead` nach wenigen Sekunden. In den normalen Berichten sind neue Dimensionen erst nach etwa einem Tag gefüllt.

**Kontaktformular:** Es läuft über Netlify Forms. Schalten Sie bei Netlify unter Forms einmal „Form detection“ ein und veröffentlichen Sie neu; danach landen Nachrichten bei Netlify (dort auch E-Mail-Benachrichtigung einrichten). Jede Nachricht enthält das Feld `gekommen_ueber` mit dem zuletzt geklickten Button, auch ohne Analytics. Ohne Formular: in `src/konfiguration.mjs` bei `kontakt` `formular: false` setzen.

**Im Dashboard:** Die Kennzahl **Anfragen** zeigt dann live die Anfragen der letzten 30 Tage nach Weg, letztem Button, Kanal und Quelle. Fehlen die Dimensionen aus Schritt 2 noch, erscheinen nur Kanal und Quelle und ein Hinweis.

**Grenzen:** Gezählt wird nur, wer dem Banner zugestimmt hat. Ein Klick auf E-Mail oder Telefon ist eine Absicht, noch keine Nachricht. Kampagnen-Links sollten UTM-Parameter tragen (z. B. `?utm_source=newsletter&utm_medium=email`), damit Analytics den Kanal richtig zuordnet.
