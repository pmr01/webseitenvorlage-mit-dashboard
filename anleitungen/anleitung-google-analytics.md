# Anleitung: Google Analytics einrichten

Mit Google Analytics sehen Sie im Dashboard echte Zahlen statt Beispieldaten: Besucher, Herkunft, Google-Ads-Kosten und vor allem, **über welchen Weg, Kanal und Button Anfragen hereinkommen**. Die Einrichtung dauert beim ersten Mal etwa 45 Minuten und ist kostenlos.

Welche Schritte schon erledigt sind, zeigt der Reiter **Performance** oben in der Box **„Einrichtung Google Analytics“**. Sie prüft das automatisch.

| Teil | Was Sie danach haben | Wo |
|---|---|---|
| [1. Besuche erfassen](#1-besuche-erfassen-mess-id) | Die Website meldet Besuche an Google Analytics | Google Analytics, `src/konfiguration.mjs` |
| [2. Kennzahlen ins Dashboard holen](#2-kennzahlen-ins-dashboard-holen-dienstkonto) | Performance und Dashboard zeigen echte Zahlen | Google Cloud, Google Analytics, Netlify |
| [3. Google Ads verknüpfen](#3-google-ads-verknüpfen-optional) | Kosten, Klicks und CPA je Monat in Performance | Google Analytics |
| [4. Anfragen messen](#4-anfragen-messen-weg-kanal-button) | Anfragen nach Weg, Kanal und Button | Google Analytics |
| [5. Kontaktformular einschalten](#5-kontaktformular-einschalten) | Formular-Nachrichten kommen an | Netlify |

Die Bezeichnungen in den Oberflächen von Google und Netlify ändern sich gelegentlich. Wenn ein Menüpunkt anders heißt, suchen Sie nach dem Begriff oder fragen Sie Ihr KI-Tool.

**Datenschutz vorab:** Google Analytics läuft auf der Website nur nach Zustimmung im Einwilligungsbanner. Sie brauchen mit Google einen Auftragsverarbeitungsvertrag (in Analytics unter Verwaltung → Kontodetails → Zusatz zur Datenverarbeitung akzeptieren) und den Absatz zu Analytics in der Datenschutzerklärung. Lassen Sie das im Zweifel prüfen.

## 1. Besuche erfassen (Mess-ID)

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

Ohne Zustimmung erfasst die Website nichts. Ergänzen Sie in der Datenschutzerklärung den Absatz zu Google Analytics (Abschnitt 4); er ist in der Vorlage vorbereitet.

## 2. Kennzahlen ins Dashboard holen (Dienstkonto)

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
Neue Besuche erscheinen dort nicht sofort: Google verarbeitet die Daten mit einigen Stunden Verzögerung, am ersten Tag kann das Dashboard noch leer sein. Für den Sofort-Test nutzen Sie den Echtzeit-Bericht in Google Analytics (Teil 1, Schritt 7).

## 3. Google Ads verknüpfen (optional)

Nur nötig, wenn Sie Google Ads schalten. Danach füllt Performance die Kanal-Auswertung nach Monaten für Google Ads automatisch (Impressionen, Klicks, Kosten, CTR, CPC, CPA), auch je Kampagne: Ein Klick auf „Google Ads“ klappt die Kampagnen auf.

1. In Google Analytics: **Verwaltung → Produktverknüpfungen → Google Ads-Verknüpfungen → Verknüpfen**.
2. Ihr Google-Ads-Konto auswählen (Sie brauchen dort Administratorrechte) und bestätigen. Automatische Tag-Kennzeichnung eingeschaltet lassen.
3. **Prüfen:** Nach etwa einem Tag zeigt Performance bei „Kanal-Auswertung nach Monaten“ den Google-Ads-Block mit der Marke **live**.

Andere Werbekanäle (zum Beispiel Meta Ads) tragen Sie in `src/inhalte/performance-kanaele.json` ein; die Zahlen finden Sie im jeweiligen Werbekonto.

## 4. Anfragen messen (Weg, Kanal, Button)

Die Website meldet jede Anfrage an Google Analytics, sobald eine Mess-ID eingetragen ist und der Besucher zugestimmt hat. Sie müssen in Analytics nur einmal drei Dinge einstellen.

**Was die Website sendet** (Datei `src/components/Messung.astro`):

| Ereignis | Wann | Parameter |
|---|---|---|
| `generate_lead` | Formular gesendet, Klick auf E-Mail-Adresse oder Telefonnummer | `lead_weg` (formular, email, telefon), `lead_position` (Abschnitt, z. B. kontakt), `letzte_cta` (zuletzt geklickter Button: kopf, hero, painpoints, vorstellung, plan, testimonials oder ohne) |
| `cta_klick` | Klick auf einen Call-to-Action-Button | `cta_position` (wo der Button steht) |

Von welchem Kanal jemand kam (Google, Facebook, direkt …), ergänzt Analytics selbst.

**Einrichten in Google Analytics** (Voraussetzung: Teil 1 ist erledigt; Bezeichnungen können sich ändern):

1. **Schlüsselereignis:** Verwaltung → Datenanzeige → Ereignisse (bzw. Schlüsselereignisse) → `generate_lead` als Schlüsselereignis markieren. Das Ereignis erscheint in der Liste, nachdem es einmal ausgelöst wurde; Sie können es auch vorab über „Neues Schlüsselereignis“ mit genau diesem Namen anlegen.
2. **Benutzerdefinierte Dimensionen:** Verwaltung → Datenanzeige → Benutzerdefinierte Definitionen → „Benutzerdefinierte Dimension erstellen“, jeweils Umfang **Ereignis**. Legen Sie vier an; Name und Ereignisparameter sind jeweils gleich: `lead_weg`, `lead_position`, `letzte_cta`, `cta_position`.
3. **Prüfen:** Website öffnen, im Banner zustimmen, einen Button klicken und das Formular senden. In Analytics unter Berichte → Echtzeit erscheint `generate_lead` nach wenigen Sekunden. In den normalen Berichten sind neue Dimensionen erst nach etwa einem Tag gefüllt.

**Im Dashboard:** Die Kennzahl **Anfragen** zeigt dann live die Anfragen der letzten 30 Tage nach Weg, letztem Button, Kanal und Quelle. Fehlen die Dimensionen aus Schritt 2 noch, erscheinen nur Kanal und Quelle und ein Hinweis.

**Grenzen:** Gezählt wird nur, wer dem Banner zugestimmt hat. Ein Klick auf E-Mail oder Telefon ist eine Absicht, noch keine Nachricht. Kampagnen-Links sollten UTM-Parameter tragen (z. B. `?utm_source=newsletter&utm_medium=email`), damit Analytics den Kanal richtig zuordnet.

## 5. Kontaktformular einschalten

Es läuft über Netlify Forms. Schalten Sie bei Netlify unter Forms einmal „Form detection“ ein und veröffentlichen Sie neu; danach landen Nachrichten bei Netlify (dort auch E-Mail-Benachrichtigung einrichten). Jede Nachricht enthält das Feld `gekommen_ueber` mit dem zuletzt geklickten Button, auch ohne Analytics. Ohne Formular: in `src/konfiguration.mjs` bei `kontakt` `formular: false` setzen.

1. In Netlify Ihr Projekt öffnen → **Forms** → **Enable form detection**.
2. Neu veröffentlichen (**Deploys → Trigger deploy**).
3. Unter **Forms → kontakt → Form notifications** eine E-Mail-Benachrichtigung einrichten.
4. **Prüfen:** Auf der Website eine Testnachricht senden; sie erscheint unter Forms.

## 6. Wenn es nicht klappt

Zeigt das Dashboard weiter „Beispieldaten“ mit einer roten Meldung, steht dort der Grund:

| Meldung enthält | Ursache | Lösung |
|---|---|---|
| „Anmeldung bei Google fehlgeschlagen“ | Schlüssel oder E-Mail falsch kopiert | Schritt 7 prüfen: `GA_PRIVATE_KEY` vollständig mit Anfangs- und Endzeile |
| „permission“ oder „Berechtigung“ | Dienstkonto hat keinen Zugriff | Schritt 6: E-Mail des Dienstkontos als Betrachter hinzufügen |
| „has not been used“ oder „disabled“ | Schnittstelle nicht eingeschaltet | Schritt 3 |
| „property“ | Property-ID falsch | Schritt 1: nur Ziffern, nicht die Mess-ID |
| „Dashboard-Passwort nötig“ | Browser hat das Passwort nicht mitgeschickt | Browser schließen, `/dashboard/` neu öffnen und Passwort eingeben |

Zeigt das Dashboard „Beispieldaten“ **ohne** rote Meldung, fehlen die Variablen bei Netlify oder die Seite wurde danach nicht neu veröffentlicht (Teil 2, Schritte 7 und 8).

In der lokalen Vorschau (`npm run dev`) zeigt Performance immer Beispieldaten, weil die Serverfunktion nur bei Netlify läuft.

## Wenn alles läuft

- **Performance** zeigt oben „Live“ und echte Zahlen; die Box „Einrichtung Google Analytics“ ist komplett grün.
- **Dashboard → Anfragen** zeigt die echten Anfragen nach Weg, Button, Kanal und Quelle.
- Für Kampagnen-Links (Newsletter, Social Media, Flyer mit QR-Code) hängen Sie UTM-Parameter an, zum Beispiel `?utm_source=newsletter&utm_medium=email&utm_campaign=fruehjahr`. Dann ordnet Analytics die Anfragen dem richtigen Kanal zu.

**Anweisung für Ihr KI-Tool:** *„Lies anleitungen/anleitung-google-analytics.md und führe mich Schritt für Schritt durch die Einrichtung. Frage nach jedem Schritt, ob er geklappt hat.“*
