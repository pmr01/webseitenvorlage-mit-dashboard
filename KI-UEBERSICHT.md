# Übersicht für KI-Tools

Diese Datei erklärt einem KI-Tool (zum Beispiel Claude), wie die Vorlage aufgebaut ist und wo Änderungen hingehören. Lade das ganze Projekt hoch und bitte das KI-Tool, zuerst diese Datei zu lesen.

## Was ist das?

Eine Website-Vorlage mit Dashboard, gebaut mit Astro (statische Website) für das Hosting bei Netlify.

- **Website:** eine Startseite nach dem Storytelling Framework (12 Elemente in fester Reihenfolge), dazu Impressum und Datenschutz.
- **Dashboard** unter `/dashboard/`: sechs Reiter nach dem 6P-Prinzip. Performance ist die Startansicht. Bei Netlify durch ein Passwort geschützt.
- **Analytics:** Google Analytics (GA4) erfasst Besuche erst nach Einwilligung. Eine Serverfunktion liest die Kennzahlen für das Dashboard.

Alle Texte sind auf Deutsch. Bitte Änderungen ebenfalls auf Deutsch formulieren.

## Wo ändere ich was?

| Was | Datei |
|---|---|
| Firmenname, Logo, Farben, alle Texte der Startseite, Call-to-Action, Navigation, Kontakt, Analytics-Mess-ID | `src/konfiguration.mjs` |
| Bilder (Hauptbild, Foto, Logo) | `public/bilder/` und Pfad in `src/konfiguration.mjs` |
| Business Model Canvas (Reiter Produkt) | `src/inhalte/business-model-canvas.json` |
| Strategie-Pyramide (Reiter Positionierung) | `src/inhalte/strategie-pyramide.json` |
| Porter's 5 Kräfte (Reiter Positionierung) | `src/inhalte/porter-5-kraefte.json` |
| SWOT-Analyse (Reiter Positionierung) | `src/inhalte/swot-analyse.json` |
| Persona / Empathy Map (Reiter Positionierung) | `src/inhalte/persona-empathy-map.json` |
| Checkliste des Storytelling Frameworks (Reiter Promotion) | `src/inhalte/storytelling-checkliste.json` |
| Tool-Liste (Reiter Plattform) | `src/inhalte/plattform-tools.json` |
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
7. Farben nur über `konfiguration.farben` ändern; sie stehen überall als CSS-Variablen bereit (`--haupt`, `--akzent`, `--text`, `--hintergrund`, `--flaeche`).

## Aufbau der Dateien

```
src/
  konfiguration.mjs          zentrale Einstellungen und Texte
  inhalte/*.json             Inhalte der Dashboard-Modelle
  pages/index.astro          Startseite (Storytelling Framework)
  pages/impressum.astro, datenschutz.astro
  pages/dashboard/           index (Performance), produkt, positionierung,
                             promotion, prozess, plattform
  pages/dashboard/anleitungen/   zeigt die beiden Anleitungen aus anleitungen/
                             im Dashboard an (Text nur in den .md-Dateien ändern)
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

## Offene Punkte

- Der Reiter **Prozess** hat noch keinen festgelegten Inhalt (Platzhalter).
