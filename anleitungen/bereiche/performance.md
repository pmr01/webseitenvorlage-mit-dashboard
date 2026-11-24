---
titel: 6 Performance
reihenfolge: 6
---
# Anleitung: Performance

Performance zeigt die echten Zahlen Ihrer Website aus Google Analytics: Besucher, Seitenaufrufe, Verlauf pro Tag, meistbesuchte Seiten und Herkunft der Besucher. Den Zeitraum wählen Sie oben (7, 30 oder 90 Tage).

## Bevor es echte Zahlen gibt

Solange Google Analytics nicht verbunden ist, zeigt der Reiter **Beispieldaten** mit gelbem Hinweis. Die Verbindung hat zwei Teile:

1. **Besuche erfassen:** In Google Analytics eine Property anlegen, die **Mess-ID** (beginnt mit `G-`) kopieren und in `src/konfiguration.mjs` bei `analytics.messId` eintragen. Danach erscheint auf der Website das Einwilligungsbanner; erfasst wird nur nach Zustimmung.
2. **Zahlen ins Dashboard holen:** Ein Dienstkonto bei Google Cloud anlegen, es in Google Analytics als Betrachter berechtigen und die Zugangsdaten als Umgebungsvariablen bei Netlify hinterlegen.

Alle Schritte mit Bildschirm-Bezeichnungen und einer Fehlertabelle stehen in der **Anleitung „Dashboard und Google Analytics“**, Teil 3.

## Die Zahlen lesen

- **Besucher** zeigt die Reichweite; **Seitenaufrufe je Besucher** zeigen, wie interessant die Seite ist.
- **Meistbesuchte Seiten:** Landen Besucher auf Impressum oder Datenschutz statt auf der Startseite, stimmt oft etwas mit der Navigation nicht.
- **Herkunft:** Woher kommen Ihre Besucher (Google, direkt, Instagram …)? Vergleichen Sie das mit Ihrem Budget unter Promotion.

Neue Besuche erscheinen erst nach einigen Stunden. Für den Sofort-Test nutzen Sie den Echtzeit-Bericht in Google Analytics.

## Kanal-Auswertung nach Monaten

Unter den Analytics-Zahlen steht eine Tabelle für die bezahlten Kanäle: **Gesamt** und je Kanal (zum Beispiel Google Ads und Meta Ads), eine Spalte je Monat plus Summe. Sie tragen nur vier Werte je Kanal und Monat ein: **Impressionen, Klicks, Kosten, Abschlüsse**. Den Rest rechnet die Seite aus:

- **CTR** = Klicks ÷ Impressionen, **CVR** = Abschlüsse ÷ Klicks
- **CPM** = Kosten je 1.000 Impressionen, **CPC** = Kosten je Klick, **CPA** = Kosten je Abschluss

Die Zahlen stehen in `src/inhalte/performance-kanaele.json`. Weitere Kanäle oder Monate ergänzen Sie dort; jede Zahlenreihe braucht so viele Werte wie `monate`. Setzen Sie `"beispiel": false`, wenn Ihre eigenen Zahlen drinstehen. Woher die Werte kommen: aus dem jeweiligen Werbekonto oder aus Google Analytics, wenn Google Ads verknüpft ist und Sie die Kosten anderer Kanäle dort importieren.

**Anweisung für Ihr KI-Tool:** *„Trage in src/inhalte/performance-kanaele.json für [Monat] diese Werte ein: Google Ads [Impressionen, Klicks, Kosten, Abschlüsse], Meta Ads [...].“*
