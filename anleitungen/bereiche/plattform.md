---
titel: 5 Plattform
reihenfolge: 5
---
# Anleitung: Plattform

Plattform beantwortet: Mit welchen Tools und Skills arbeiten Sie, was kosten sie, und ist der Datenschutz geregelt? Drei Unterseiten:

## Tools

Eine Liste aller Tools mit Logo, Zweck, Link zur **Datenschutzerklärung** und der Angabe, ob ein **Auftragsverarbeitungsvertrag (AVV, englisch DPA)** nötig ist, samt Link.

- **AVV nötig:** Das Tool verarbeitet personenbezogene Daten in Ihrem Auftrag, zum Beispiel Netlify (IP-Adressen beim Hosting) oder Google Analytics. Schließen Sie den AVV ab, bevor Sie das Tool nutzen; meist geht das in den Einstellungen des Tools.
- **Je nach Nutzung:** etwa bei Google Ads oder Meta Ads; hängt davon ab, welche Funktionen Sie einsetzen.
- **Nicht nötig:** etwa bei Astro, das nur Ihre Website erzeugt.

Neue Tools tragen Sie in `src/inhalte/plattform-tools.json` ein; jedes neue Tool gehört auch in Ihre Datenschutzerklärung. Eigene Logos legen Sie als SVG in `public/logos/`.

## Skills

Skills sind gespeicherte Arbeitsanleitungen für Ihr KI-Tool, zum Beispiel der 6P-Skill für die Modelle in Produkt und Positionierung oder der Storytelling-Skill für die Startseite. Jede Karte zeigt, wofür der Skill da ist, in welchem Reiter er hilft, und eine Beispiel-Anweisung zum Kopieren. Die Liste pflegen Sie in `src/inhalte/skills.json`.

## Abos & Domains

Tragen Sie jedes Abo und jede Domain mit Preis, Abrechnung (monatlich oder jährlich), nächster Zahlung und Status ein. Oben sehen Sie die Kosten pro Monat und Jahr und welche Verlängerungen in den nächsten 14 Tagen anstehen. Gekündigte Abos und Testphasen zählen nicht mit.

**Tipp:** Einmal im Jahr alle Tools und Abos durchgehen (die Erinnerung dafür steht unter Prozess → Updates).
