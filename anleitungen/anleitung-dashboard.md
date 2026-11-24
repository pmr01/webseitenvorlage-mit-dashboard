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

Die Einrichtung von Google Analytics hat eine eigene Anleitung: **Anleitungen → Google Analytics** (`/dashboard/anleitungen/google-analytics/`). Dort stehen alle Schritte, von der Mess-ID über die Verbindung zum Dashboard bis zu Google Ads und der Messung von Anfragen. Welche Schritte schon erledigt sind, zeigt der Reiter **Performance** oben in der Box „Einrichtung Google Analytics“.
