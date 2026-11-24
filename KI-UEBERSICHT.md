# Übersicht für KI-Tools

Diese Datei erklärt einem KI-Tool (zum Beispiel Claude), wie die Vorlage aufgebaut ist und wo Änderungen hingehören. Lade das ganze Projekt hoch und bitte das KI-Tool, zuerst diese Datei zu lesen.

## Was ist das?

Eine Website-Vorlage mit Dashboard, gebaut mit Astro (statische Website) für das Hosting bei Netlify.

- **Website:** eine Startseite nach dem Storytelling Framework (12 Elemente in fester Reihenfolge), dazu Impressum und Datenschutz.
- **Dashboard** unter `/dashboard/`: Übersicht mit Beispielzahlen, dann sechs Reiter nach dem 6P-Prinzip (Produkt, Positionierung, Promotion, Prozess, Plattform, Performance). Bei Netlify durch ein Passwort geschützt.
- **Analytics:** Google Analytics (GA4) erfasst Besuche erst nach Einwilligung. Eine Serverfunktion liest die Kennzahlen für das Dashboard.

Alle Texte sind auf Deutsch. Bitte Änderungen ebenfalls auf Deutsch formulieren.

## Wo ändere ich was?

| Was | Datei |
|---|---|
| Firmenname, Logo, Farben, alle Texte der Startseite, Call-to-Action, Navigation, Kontakt, Analytics-Mess-ID | `src/konfiguration.mjs` |
| Design-System: Farben (`farben`), Schriften und Ecken (`design`) | `src/konfiguration.mjs`; verfügbare Schriften in `src/design.mjs`; Editor mit Vorschau unter `/dashboard/promotion/design/` |
| Bilder (Hauptbild, Foto, Logo) | `public/bilder/` und Pfad in `src/konfiguration.mjs` |
| Business Model Canvas (Reiter Produkt) | `src/inhalte/business-model-canvas.json` |
| Strategie-Pyramide (Reiter Positionierung) | `src/inhalte/strategie-pyramide.json` |
| Porter's 5 Kräfte (Reiter Positionierung) | `src/inhalte/porter-5-kraefte.json` |
| SWOT-Analyse (Reiter Positionierung) | `src/inhalte/swot-analyse.json` |
| Persona / Empathy Map (Reiter Positionierung) | `src/inhalte/persona-empathy-map.json` |
| Checkliste des Storytelling Frameworks (Reiter Promotion) | `src/inhalte/storytelling-checkliste.json` |
| Tool-Liste mit Datenschutz- und AVV-Links (Plattform → Tools) | `src/inhalte/plattform-tools.json`, Logos in `public/logos/` |
| Beispiel-Abos und -Domains (Plattform → Abos & Domains) | `src/inhalte/abos.json` |
| Beispielzahlen der Übersicht (Reiter Dashboard) | `src/inhalte/dashboard-kennzahlen.json` |
| Kanäle und Affiliate-Netzwerke (Promotion → Kanäle & Budget) | `src/inhalte/kanaele.json` |
| Beispielprojekte und Phasen (Prozess → Projekte) | `src/inhalte/projekte.json` |
| Beispielkampagnen (Prozess → Kampagnenplanung) | `src/inhalte/kampagnen.json` |
| Wiederkehrende Updates und Prüfungen (Prozess → Updates) | `src/inhalte/updates.json` |
| Redaktionsplan (Promotion → Content) | `src/inhalte/content.json` |
| Skills (Plattform → Skills) | `src/inhalte/skills.json` |
| Anleitung je Bereich (Link oben rechts in jedem Reiter) | `anleitungen/bereiche/*.md` |
| Platzhalter der Vorlage für die Prüfansicht (nicht ändern) | `src/inhalte/vorlage-platzhalter.json` |
| Impressum, Datenschutz | `src/pages/impressum.astro`, `src/pages/datenschutz.astro` |
| Beispieldaten für Performance | `public/daten/beispieldaten.json` |

In den JSON-Dateien zeigt `"beispiel": true` einen gelben Hinweis „Beispiel“ an. Auf `false` setzen, sobald eigene Inhalte drinstehen.

## Regeln für Änderungen

1. **Reihenfolge der Startseite nicht umstellen.** Die zwölf Elemente sind die Geschichte: (1) Logo, (2) Navigation, (3) Hauptbild/Video, (4) Main Headline, (5) Einleitung, (6) Painpoints, (7) Vorstellung, (8) Plan in 3 Schritten, (9) Call-to-Action, (10) Auszeichnungen/Siegel, (11) Testimonials, (12) weitere Elemente und Footer. Der Kunde ist der Held, das Unternehmen der Wegweiser.
2. **Ein Call-to-Action, immer gleich.** Text und Ziel stehen einmal in `konfiguration.cta` und erscheinen automatisch an allen Stellen.
3. **Navigation:** 3 bis höchstens 7 Punkte. **Painpoints:** 3 bis 6. **Plan:** genau 3 Schritte.
4. **Modelle im Dashboard** folgen dem 6P-Skill: Business Model Canvas höchstens 4 Punkte je Feld, SWOT höchstens 5 Punkte je Feld, Porter höchstens 4 Punkte je Kraft, Persona mit 8 Dimensionen, Strategie-Pyramide mit 3 Ebenen.
5. **Keine Zugangsdaten in Dateien.** Schlüssel für Google Analytics und das Dashboard-Passwort gehören nur in die Umgebungsvariablen bei Netlify (`DASHBOARD_PASSWORT`, `GA_PROPERTY_ID`, `GA_CLIENT_EMAIL`, `GA_PRIVATE_KEY`).
8. **Passwortschutz nicht umgehen.** Alles unter `/dashboard/` (Seiten und die Kennzahlen-Schnittstelle `/dashboard/api/kennzahlen`) schützt die Edge Function `netlify/edge-functions/dashboard-schutz.js`. Neue Dashboard-Seiten und Schnittstellen gehören deshalb unter `/dashboard/`.
6. **Keine externen Schriften oder Skripte** ohne Einwilligung einbinden (Datenschutz). Die Vorlage nutzt Systemschriften.
7. Design nur über `konfiguration.farben` und `konfiguration.design` ändern; es steht überall als CSS-Variablen bereit (`--haupt`, `--akzent`, `--text`, `--hintergrund`, `--flaeche`, `--schrift-text`, `--schrift-titel`, `--ecken`). Neue Bausteine nutzen diese Variablen statt fester Werte. Nur Systemschriften verwenden, keine Schriften aus dem Internet nachladen.

## Aufbau der Dateien

```
src/
  konfiguration.mjs          zentrale Einstellungen und Texte
  inhalte/*.json             Inhalte der Dashboard-Modelle
  pages/index.astro          Startseite (Storytelling Framework)
  pages/impressum.astro, datenschutz.astro
  pages/dashboard/index.astro        Übersicht (Startansicht) mit Beispielzahlen
  pages/dashboard/produkt.astro      Business Model Canvas
  pages/dashboard/positionierung.astro   vier Modelle als Reiter
  pages/dashboard/promotion/         index = Webseite mit Storytelling Framework,
                                     design = Design-System, kanaele = Kanäle & Budget
  pages/dashboard/prozess/           index = Projekte (Wasserfall, agil, Eisenhower),
                                     kampagnen, updates
  pages/dashboard/plattform/         index = Tools, abos = Abos & Domains
  pages/dashboard/performance.astro  Kennzahlen aus Google Analytics
  pages/dashboard/anleitungen/       zeigt die beiden Anleitungen aus anleitungen/
  components/Reiter.astro            Reiter innerhalb einer Seite
  components/Unterseiten.astro       Navigation zwischen Unterseiten eines Reiters
  styles/pm.css                      gemeinsame Bausteine für Prozess
  layouts/Website.astro      Kopfzeile, Fußbereich, Einwilligungsbanner
  layouts/Dashboard.astro    Reiter-Navigation des Dashboards
  components/                CTA, Einwilligungsbanner, Hinweise
  styles/global.css          Grundgestaltung
netlify/functions/kennzahlen.mjs   Serverfunktion für Google Analytics
                             (Adresse /dashboard/api/kennzahlen)
netlify/edge-functions/dashboard-schutz.js   Passwortschutz für /dashboard/
netlify.toml                 Einstellungen für Netlify
public/                      Bilder, Favicon, Beispieldaten
anleitungen/                 Anleitungen für Menschen
```

## Befehle

- `npm install` – einmalig, lädt Astro
- `npm run dev` – Vorschau unter http://localhost:4321
- `npm run build` – erzeugt die fertige Website im Ordner `dist/`

## Website-Editor

`src/components/Bearbeiten.astro` steckt auf der Startseite und ist nur mit Parameter aktiv: `/?bearbeiten` macht alle Elemente mit `data-k="pfad.in.konfiguration"` bearbeitbar und erzeugt eine neue `konfiguration.mjs`, indem es nur die Text-Literale im Quelltext ersetzt. `/?markieren` zeigt die Nummern 1–12 und markiert Texte, die noch den Werten in `vorlage-platzhalter.json` entsprechen (genutzt in Promotion → Webseite). Neue Texte auf der Startseite bekommen deshalb ein `data-k`-Attribut mit ihrem Pfad. **Veröffentlichen** schickt die neue Datei an `netlify/functions/veroeffentlichen.mjs` (`/dashboard/api/veroeffentlichen`, nur POST, Dashboard-Passwort): Die Funktion prüft Syntax und Basisstand und schreibt per GitHub-API nur `src/konfiguration.mjs` (Variablen `GITHUB_TOKEN`, `GITHUB_REPO`, `GITHUB_BRANCH` bei Netlify).

## Daten im Browser

Projekte, Kampagnen, Abos, Budgetplanung, Haken der Checklisten, Updates und der Design-Entwurf werden im `localStorage` des Browsers gespeichert (Schlüssel z. B. `prozess-projektmanagement-v2`, `prozess-kampagnen`, `plattform-abos`, `kanaele-budget`, `prozess-updates`). Startdaten kommen aus `src/inhalte/`. Export und Import als Datei gibt es jeweils auf der Seite. Für gemeinsames Arbeiten im Team wäre eine Datenbank nötig (z. B. Neon) mit einer Serverfunktion unter `/dashboard/api/`, damit der Passwortschutz greift.
