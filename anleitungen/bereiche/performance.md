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

Alle Schritte mit Bildschirm-Bezeichnungen und einer Fehlertabelle stehen in der **Anleitung „Google Analytics“**. Welche Schritte erledigt sind, zeigt die Box **„Einrichtung Google Analytics“** oben im Reiter Performance.

## Die Zahlen lesen

- **Besucher** zeigt die Reichweite; **Seitenaufrufe je Besucher** zeigen, wie interessant die Seite ist.
- **Meistbesuchte Seiten:** Landen Besucher auf Impressum oder Datenschutz statt auf der Startseite, stimmt oft etwas mit der Navigation nicht.
- **Herkunft:** Woher kommen Ihre Besucher (Google, direkt, Instagram …)? Vergleichen Sie das mit Ihrem Budget unter Promotion.

Neue Besuche erscheinen erst nach einigen Stunden. Für den Sofort-Test nutzen Sie den Echtzeit-Bericht in Google Analytics.

## Kanal-Auswertung nach Monaten

Unter den Analytics-Zahlen steht eine Tabelle für die bezahlten Kanäle: **Gesamt** und je Kanal (zum Beispiel Google Ads und Meta Ads), eine Spalte je Monat plus Summe. Sie tragen nur vier Werte je Kanal und Monat ein: **Impressionen, Klicks, Kosten, Abschlüsse**. Den Rest rechnet die Seite aus:

- **CTR** = Klicks ÷ Impressionen, **CVR** = Abschlüsse ÷ Klicks
- **CPM** = Kosten je 1.000 Impressionen, **CPC** = Kosten je Klick, **CPA** = Kosten je Abschluss

**Kampagnen:** Ein Klick auf einen Kanal (zum Beispiel Google Ads) klappt darunter dieselben Kennzahlen je Kampagne auf. In der Datei stehen Kampagnen je Kanal unter `"kampagnen"` mit denselben vier Werten. Bei verknüpftem Google Ads kommen die Google-Ads-Kampagnen automatisch aus Analytics.

Die Zahlen stehen in `src/inhalte/performance-kanaele.json`. Weitere Kanäle oder Monate ergänzen Sie dort; jede Zahlenreihe braucht so viele Werte wie `monate`. Setzen Sie `"beispiel": false`, wenn Ihre eigenen Zahlen drinstehen. 

**Google Ads kommt automatisch aus Google Analytics**, wenn zwei Dinge erfüllt sind:

1. Google Analytics ist mit dem Dashboard verbunden (Anleitung „Google Analytics“, Teil 2).
2. In Google Analytics ist das Google-Ads-Konto verknüpft: Verwaltung → Produktverknüpfungen → Google Ads-Verknüpfungen.

Dann ersetzt die Seite die Zahlen des Kanals mit `"quelle": "google-ads"` durch die echten Werte der letzten sechs Monate und kennzeichnet ihn mit „live“. Abschlüsse sind die Schlüsselereignisse (Key Events) aus Sitzungen mit Quelle/Medium „google / cpc“; legen Sie in Analytics fest, was als Schlüsselereignis zählt, zum Beispiel das gesendete Kontaktformular. Alle anderen Kanäle (zum Beispiel Meta Ads) pflegen Sie weiter in der Datei; die Werte finden Sie im jeweiligen Werbekonto.

**Anweisung für Ihr KI-Tool:** *„Trage in src/inhalte/performance-kanaele.json für [Monat] diese Werte ein: Google Ads [Impressionen, Klicks, Kosten, Abschlüsse], Meta Ads [...].“*
