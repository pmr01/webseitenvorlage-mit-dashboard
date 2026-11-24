# Anleitung: Ihre Website mit dem Storytelling Framework

Diese Anleitung hat vier Teile:

1. [Aufbau der Startseite](#1-aufbau-der-startseite-nach-dem-storytelling-framework)
2. [Einrichten](#2-einrichten)
3. [Anpassen: Texte, Farben, Logo](#3-anpassen-texte-farben-logo)
4. [Veröffentlichen](#4-veröffentlichen)

Sie brauchen keine Programmierkenntnisse. Alles, was Sie ändern, steht in einer einzigen Datei: `src/konfiguration.mjs`. Wenn Sie mit einem KI-Tool arbeiten, finden Sie in Teil 3 fertige Anweisungen zum Kopieren.

---

## 1. Aufbau der Startseite nach dem Storytelling Framework

Die Startseite erzählt eine Geschichte. **Ihr Kunde ist der Held**, der ein Problem hat. **Sie sind der Wegweiser**, der ihm einen einfachen Plan zeigt. Deshalb ist die Reihenfolge fest: Stellen Sie die Abschnitte nicht um.

Bevor Sie Texte schreiben, klären Sie drei Voraussetzungen:

- **Persona:** Für wen ist die Seite? Die Persona bestimmt die Painpoints und den Ton. Sie erstellen sie mit dem 6P-Skill (im Dashboard unter Positionierung).
- **Impressum** und **Datenschutz:** rechtlich verpflichtend, bevor die Seite online geht.

Jeder Abschnitt beantwortet eine Frage des Besuchers:

| # | Element | Welche Frage beantwortet es? | In der Konfiguration | Hinweise |
|---|---|---|---|---|
| 1 | Logo | Bei wem bin ich? | `firma.logo` | Oben links. Quelle: AI-Logo-Tools, Canva |
| 2 | Navigation | Wo finde ich was? | `navigation` | 3 bis höchstens 7 Punkte |
| 3 | Hauptbild / Video | Fühle ich mich hier richtig? | `hero.bild`, `hero.video` | Etwas Emotionales, Verbindendes. Quelle: Bild- und Video-Datenbanken |
| 4 | Main Headline | Was bieten Sie wem an? | `hero.ueberschrift` | Knackig, in einer Zeile erfassbar |
| 5 | Einleitung | Was genau ist das Angebot? | `hero.einleitung` | 1 bis 3 Sätze |
| 6 | Painpoints | Verstehen Sie mein Problem? | `painpoints` | 3 bis 6, gemäß Persona, in den Worten des Kunden |
| 7 | Vorstellung | Warum gerade Sie? | `vorstellung` | Autorität und Verständnis zeigen |
| 8 | Plan | Wie einfach ist der Start? | `plan` | Genau 3 Schritte |
| 9 | Call-to-Action | Was soll ich jetzt tun? | `cta` | Steht automatisch an sechs Stellen, immer gleich |
| 10 | Auszeichnungen / Siegel | Kann ich Ihnen vertrauen? | `auszeichnungen` | Nur einsetzen, was es gibt. Leere Liste blendet den Abschnitt aus |
| 11 | Testimonials | Hat es anderen geholfen? | `testimonials` | Echte Kundenstimmen, am besten drei |
| 12 | Weitere Elemente und Footer | Wie erreiche ich Sie? | `kontakt` | Kontakt, Footer mit Impressum und Datenschutz |

Die gleiche Checkliste finden Sie im Dashboard unter **Promotion**. Dort können Sie jedes Element abhaken.

---

## 2. Einrichten

Sie brauchen einmalig:

- **Node.js** (Version 22 oder neuer) von https://nodejs.org
- ein **Konto bei GitHub** (für die Code-Ablage) und ein **Konto bei Netlify** (für das Hosting). Beide gibt es kostenlos.

So starten Sie die Vorschau auf Ihrem Rechner:

1. Entpacken Sie die ZIP-Datei in einen Ordner.
2. Öffnen Sie in diesem Ordner ein Terminal (Mac: Programm „Terminal“, Windows: „Eingabeaufforderung“).
3. Geben Sie ein: `npm install` (lädt Astro, einmalig, dauert etwa eine Minute)
4. Geben Sie ein: `npm run dev`
5. Öffnen Sie im Browser http://localhost:4321. Das Dashboard liegt unter http://localhost:4321/dashboard/.

Jede Änderung an einer Datei erscheint nach dem Speichern sofort in der Vorschau.

**Mit einem KI-Tool:** Laden Sie den ganzen Ordner hoch (ohne den Ordner `node_modules`, falls vorhanden) und schreiben Sie: *„Lies zuerst KI-UEBERSICHT.md. Dann hilf mir, die Vorlage für mein Unternehmen anzupassen.“*

---

## 3. Anpassen: Texte, Farben, Logo

**Am einfachsten mit dem Editor:** Öffnen Sie im Dashboard **Promotion → Webseite mit Storytelling Framework** und klicken Sie auf **Website bearbeiten** (oder rufen Sie Ihre Startseite mit `?bearbeiten` am Ende der Adresse auf). Texte anklicken, ändern, dann **Konfiguration herunterladen** und die Datei als `src/konfiguration.mjs` ins Projekt legen. Bilder, Farben und die Navigation-Ziele ändern Sie weiterhin in der Datei.

Von Hand: Öffnen Sie `src/konfiguration.mjs`. Die Datei ist in Abschnitte mit Nummern gegliedert, die zu den zwölf Elementen passen. Ändern Sie nur den Text zwischen den Anführungszeichen.

**Firmenname:** `firma.name`

**Design (Farben, Schriften, Ecken):** Am einfachsten im Dashboard unter **Promotion → Design-System**. Dort wählen Sie Farben, eine Schrift für Überschriften und Fließtext und die Rundung der Ecken, sehen sofort eine Vorschau und prüfen, ob alles gut lesbar ist. Mit **Code kopieren** erhalten Sie die fertigen Abschnitte `farben` und `design`; ersetzen Sie damit die gleichnamigen Abschnitte in `src/konfiguration.mjs`. Von Hand geht es auch: `farben.haupt` (Buttons, Akzente) und `farben.akzent` (Hervorhebungen) als Farbcode, zum Beispiel `'#2a6f97'`; Schriften `'system'`, `'modern'`, `'freundlich'` oder `'klassisch'`; `ecken` als Zahl von 0 bis 24.

**Logo:** Legen Sie Ihr Logo als SVG oder PNG in den Ordner `public/bilder/` und tragen Sie den Pfad ein, zum Beispiel `logo: '/bilder/mein-logo.png'`.

**Hauptbild:** Legen Sie ein Bild (am besten 1600 × 900 Pixel, JPG) in `public/bilder/` und tragen Sie es bei `hero.bild` ein. Für ein Video tragen Sie eine MP4-Datei bei `hero.video` ein.

**Texte:** Ersetzen Sie die Platzhaltertexte. Sie erklären selbst, was dort hingehört.

**Impressum und Datenschutz:** Ersetzen Sie in `src/pages/impressum.astro` und `src/pages/datenschutz.astro` alle gelb markierten Angaben in eckigen Klammern. Die Vorlage ist keine Rechtsberatung; lassen Sie den Text im Zweifel prüfen.

### Fertige Anweisungen für Ihr KI-Tool

Kopieren Sie eine Anweisung und ersetzen Sie die Angaben in eckigen Klammern:

- *„Ändere in src/konfiguration.mjs den Firmennamen in [Name] und die Hauptfarbe in [Farbcode].“*
- *„Mein Logo liegt unter public/bilder/[Dateiname]. Trage es in der Konfiguration ein.“*
- *„Schreibe die Texte der Startseite in src/konfiguration.mjs für mein Angebot: [ein bis zwei Sätze zu Angebot und Zielgruppe]. Halte dich an das Storytelling Framework: Main Headline beantwortet ‚Was bieten wir wem an?‘, 3 bis 6 Painpoints aus Sicht dieser Persona: [Persona], Plan in genau 3 Schritten. Stelle die Reihenfolge nicht um.“*
- *„Der Call-to-Action soll lauten: [Text]. Er soll zu [Ziel, z. B. #kontakt oder Link zum Buchungstool] führen.“*
- *„Fülle Impressum und Datenschutz mit diesen Angaben: [Angaben].“*

---

## 4. Veröffentlichen

Die Website läuft bei Netlify im kostenlosen Tarif. Prüfen Sie die aktuellen Grenzen des Tarifs auf https://www.netlify.com/pricing.

1. **Code zu GitHub:** Legen Sie auf https://github.com ein neues Repository an (privat genügt) und laden Sie den Projektordner hoch, ohne die Ordner `node_modules` und `dist`. Wer das Terminal nutzt, nimmt dafür Git; alternativ geht es mit „Add file → Upload files“ auf der GitHub-Seite.
2. **Netlify verbinden:** Melden Sie sich auf https://app.netlify.com an, wählen Sie „Add new project“ beziehungsweise „Import an existing project“ und dann Ihr GitHub-Repository. Die Einstellungen für den Build liest Netlify aus der Datei `netlify.toml`; Sie müssen nichts eintragen.
3. **Veröffentlichen:** Netlify baut die Seite und zeigt eine Adresse wie `ihr-name.netlify.app`. Jede Änderung, die Sie zu GitHub hochladen, wird automatisch neu veröffentlicht.
4. **Eigene Domain (optional):** In Netlify unter den Domain-Einstellungen des Projekts.

Die Bezeichnungen der Schaltflächen bei GitHub und Netlify können sich ändern. Wenn Sie etwas nicht finden, fragen Sie Ihr KI-Tool nach dem aktuellen Weg.

**Vor dem Veröffentlichen prüfen:**

- [ ] Alle zwölf Elemente haben eigene Inhalte, keine Platzhalter mehr
- [ ] Impressum und Datenschutz sind ausgefüllt
- [ ] Die Seite sieht auf Smartphone, Tablet und Computer gut aus
- [ ] In keiner Datei stehen Passwörter oder Schlüssel
