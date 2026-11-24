---
titel: Dashboard (Übersicht)
reihenfolge: 0
---
# Anleitung: Dashboard (Übersicht)

Die Übersicht ist die Startseite des Dashboards. Sie zeigt auf einen Blick, wo Ihr Unternehmen steht.

## Was Sie sehen

- **Kennzahlen:** Besucher, Anfragen, neue Kunden, Umsatz und Marketingbudget der letzten 30 Tage, jeweils mit Vergleich zum Vormonat. Daraus berechnet: **Anfragequote** (Anfragen je 100 Besucher) und **Kosten pro Anfrage** (Budget geteilt durch Anfragen).
- **Auswertung je Kennzahl:** Ein Klick auf eine Kennzahl zeigt darunter ihre Auswertung. Bei **Besucher** ist das ein Funnel: Traffic-Quellen → Einstiegsseiten → weitere Seiten → Ziele; die Linienstärke zeigt die Sitzungen, die Maus auf einer Karte hebt ihre Wege hervor. Die anderen Kennzahlen zeigen Balken, zum Beispiel Anfragen nach Kanal oder Umsatz der letzten sechs Monate.

## So pflegen Sie die Zahlen

1. Öffnen Sie `src/inhalte/dashboard-kennzahlen.json`.
2. Tragen Sie bei jeder Kennzahl den aktuellen Wert (`wert`) und den Vormonat (`vorher`) ein.
3. Setzen Sie `"beispiel": false`, sobald es Ihre echten Zahlen sind. Dann verschwindet der gelbe Hinweis.

Die Auswertungen sind Beispiele. Sie stehen in `src/inhalte/dashboard-kennzahlen.json` unter `auswertungen`: je Kennzahl entweder `"typ": "funnel"` (Quellen, Einstiegsseiten, weitere Seiten, Ziele und die Wege dazwischen) oder `"typ": "balken"` (Gruppen mit Reihen aus Name und Wert).

## Tipp

Schauen Sie einmal pro Woche auf die Übersicht. Steigt die Kosten pro Anfrage, lohnt ein Blick in **Promotion → Kanäle & Budget**. Sinkt die Anfragequote, prüfen Sie die Startseite unter **Promotion → Webseite mit Storytelling Framework**.

**Anweisung für Ihr KI-Tool:** *„Trage diese Zahlen für die letzten 30 Tage in src/inhalte/dashboard-kennzahlen.json ein: [Zahlen]. Setze beispiel auf false.“*
