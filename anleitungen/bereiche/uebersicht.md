---
titel: Dashboard (Übersicht)
reihenfolge: 0
---
# Anleitung: Dashboard (Übersicht)

Die Übersicht ist die Startseite des Dashboards. Sie zeigt auf einen Blick, wo Ihr Unternehmen steht.

## Was Sie sehen

- **Kennzahlen:** Besucher, Anfragen, neue Kunden, Umsatz und Marketingbudget der letzten 30 Tage, jeweils mit Vergleich zum Vormonat. Daraus berechnet: **Anfragequote** (Anfragen je 100 Besucher) und **Kosten pro Anfrage** (Budget geteilt durch Anfragen).
- **Stand der sechs Bereiche:** je eine Karte für Produkt, Positionierung, Promotion, Prozess, Plattform und Performance. Ein Klick führt in den Bereich.

## So pflegen Sie die Zahlen

1. Öffnen Sie `src/inhalte/dashboard-kennzahlen.json`.
2. Tragen Sie bei jeder Kennzahl den aktuellen Wert (`wert`) und den Vormonat (`vorher`) ein.
3. Setzen Sie `"beispiel": false`, sobald es Ihre echten Zahlen sind. Dann verschwindet der gelbe Hinweis.

Die Karten zum Stand der Bereiche füllen sich von selbst aus dem, was Sie in den anderen Reitern pflegen, zum Beispiel offene Aufgaben, laufende Kampagnen oder Abo-Kosten.

## Tipp

Schauen Sie einmal pro Woche auf die Übersicht. Steigt die Kosten pro Anfrage, lohnt ein Blick in **Promotion → Kanäle & Budget**. Sinkt die Anfragequote, prüfen Sie die Startseite unter **Promotion → Webseite mit Storytelling Framework**.

**Anweisung für Ihr KI-Tool:** *„Trage diese Zahlen für die letzten 30 Tage in src/inhalte/dashboard-kennzahlen.json ein: [Zahlen]. Setze beispiel auf false.“*
