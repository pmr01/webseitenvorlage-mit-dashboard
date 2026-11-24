// =====================================================================
//  SERVERFUNKTION: Kennzahlen aus Google Analytics (GA4)
//  Erreichbar unter /dashboard/api/kennzahlen?tage=30
//  und /dashboard/api/kennzahlen?bericht=kanaele&monate=6 (Google Ads je Monat)
//  und /dashboard/api/kennzahlen?bericht=leads&tage=30 (Anfragen nach Weg, Kanal, Button)
//  Sie verlangt dasselbe Passwort wie das Dashboard (DASHBOARD_PASSWORT).
//
//  Die Zugangsdaten stehen NICHT im Code, sondern als Umgebungsvariablen
//  in den Einstellungen von Netlify (siehe anleitungen/anleitung-dashboard.md):
//    GA_PROPERTY_ID   Property-ID aus Google Analytics (nur Ziffern)
//    GA_CLIENT_EMAIL  E-Mail-Adresse des Dienstkontos
//    GA_PRIVATE_KEY   privater Schlüssel des Dienstkontos (aus der JSON-Datei)
//
//  Sind die Variablen nicht gesetzt, antwortet die Funktion mit
//  "nicht-eingerichtet" und das Dashboard zeigt Beispieldaten.
// =====================================================================
import { createSign, createHash, timingSafeEqual } from 'node:crypto';

// Gleicher Passwortschutz wie das Dashboard: Der Browser schickt das
// Passwort, das er für /dashboard/ eingegeben hat, automatisch mit.
function passwortStimmt(request) {
  const passwort = process.env.DASHBOARD_PASSWORT || '';
  if (!passwort) return false;
  const kopf = request.headers.get('authorization') || '';
  if (!kopf.startsWith('Basic ')) return false;
  const text = Buffer.from(kopf.slice(6).trim(), 'base64').toString('utf8');
  const trenner = text.indexOf(':');
  if (trenner === -1) return false;
  const a = createHash('sha256').update(text.slice(trenner + 1)).digest();
  const b = createHash('sha256').update(passwort).digest();
  return timingSafeEqual(a, b);
}

const ERLAUBTE_TAGE = [7, 30, 90];

function antwort(status, daten) {
  return new Response(JSON.stringify(daten), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // Nur im eigenen Browser kurz zwischenspeichern, nie auf fremden Servern
      'cache-control': status === 200 ? 'private, max-age=300' : 'no-store',
    },
  });
}

function base64url(eingabe) {
  return Buffer.from(eingabe).toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
}

// Holt mit dem Dienstkonto ein Zugriffstoken (nur Leserechte auf Analytics).
async function zugriffstoken(email, schluessel) {
  const jetzt = Math.floor(Date.now() / 1000);
  const kopf = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const inhalt = base64url(JSON.stringify({
    iss: email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: jetzt,
    exp: jetzt + 3600,
  }));
  const signierer = createSign('RSA-SHA256');
  signierer.update(`${kopf}.${inhalt}`);
  const signatur = signierer.sign(schluessel).toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');

  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${kopf}.${inhalt}.${signatur}`,
    }),
  });
  const json = await r.json();
  if (!r.ok) throw new Error(`Anmeldung bei Google fehlgeschlagen (${json.error_description || json.error || r.status})`);
  return json.access_token;
}

const zahl = (zeile, i = 0) => Number(zeile?.metricValues?.[i]?.value ?? 0);
const text = (zeile, i = 0) => zeile?.dimensionValues?.[i]?.value ?? '';

// ---------- Bericht "kanaele": Google Ads je Monat ----------
// Voraussetzung in Google Analytics: Das Google-Ads-Konto ist mit der Property verknüpft.
// Abschlüsse = Schlüsselereignisse (Key Events) aus Sitzungen mit Quelle/Medium "google / cpc".
const ERLAUBTE_MONATE = [3, 6, 12];

async function kanalBericht(token, propertyId, monate) {
  const heute = new Date();
  const start = new Date(Date.UTC(heute.getUTCFullYear(), heute.getUTCMonth() - (monate - 1), 1));
  const liste = Array.from({ length: monate }, (_, i) => {
    const d = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + i, 1));
    return `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
  });
  const zeitraum = [{ startDate: start.toISOString().slice(0, 10), endDate: 'today' }];
  const r = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(propertyId)}:batchRunReports`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      requests: [
        { dateRanges: zeitraum, dimensions: [{ name: 'yearMonth' }], metrics: [{ name: 'advertiserAdImpressions' }, { name: 'advertiserAdClicks' }, { name: 'advertiserAdCost' }] },
        {
          dateRanges: zeitraum, dimensions: [{ name: 'yearMonth' }], metrics: [{ name: 'keyEvents' }],
          dimensionFilter: { filter: { fieldName: 'sessionSourceMedium', stringFilter: { matchType: 'EXACT', value: 'google / cpc' } } },
        },
      ],
    }),
  });
  const json = await r.json();
  if (!r.ok) throw new Error(json.error?.message || `Google Analytics antwortet mit Status ${r.status}`);
  const [anzeigen, ereignisse] = json.reports || [];
  const je = (bericht, i) => { const m = Object.fromEntries((bericht?.rows || []).map((z) => [text(z), zahl(z, i)])); return liste.map((ym) => m[ym] ?? 0); };
  const impressionen = je(anzeigen, 0);
  return {
    quelle: 'analytics',
    monate: liste.map((ym) => `${ym.slice(0, 4)}|${ym.slice(4)}`),
    waehrung: anzeigen?.metadata?.currencyCode || 'EUR',
    googleAds: { impressionen, klicks: je(anzeigen, 1), kosten: je(anzeigen, 2).map((x) => Math.round(x * 100) / 100), abschluesse: je(ereignisse, 0).map(Math.round) },
    // Keine einzige Impression: Google Ads ist vermutlich nicht mit Analytics verknüpft
    leer: impressionen.every((x) => !x),
  };
}

// ---------- Bericht "leads": Anfragen (Ereignis generate_lead) ----------
// Kanal und Quelle kennt Analytics von selbst. Weg, Button und Abschnitt sind eigene Parameter
// der Website (src/components/Messung.astro); dafür müssen in Analytics die benutzerdefinierten
// Dimensionen lead_weg, letzte_cta und lead_position angelegt sein. Fehlen sie, kommt der erste
// Teil trotzdem und "dimensionenFehlen" ist true.
async function leadBericht(token, propertyId, tage) {
  const zeitraum = [{ startDate: `${tage}daysAgo`, endDate: 'today' }];
  const nurLeads = { filter: { fieldName: 'eventName', stringFilter: { matchType: 'EXACT', value: 'generate_lead' } } };
  const nach = (dimension) => ({
    dateRanges: zeitraum, dimensions: [{ name: dimension }], metrics: [{ name: 'eventCount' }], dimensionFilter: nurLeads,
    orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }], limit: 10,
  });
  const abruf = async (requests) => {
    const r = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(propertyId)}:batchRunReports`, {
      method: 'POST', headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' }, body: JSON.stringify({ requests }),
    });
    const json = await r.json();
    if (!r.ok) throw new Error(json.error?.message || `Google Analytics antwortet mit Status ${r.status}`);
    return json.reports || [];
  };
  const liste = (bericht) => (bericht?.rows || []).map((z) => ({ name: text(z) || '(nicht gesetzt)', wert: zahl(z) }));

  const [summe, kanal, quelle] = await abruf([
    { dateRanges: zeitraum, metrics: [{ name: 'eventCount' }], dimensionFilter: nurLeads },
    nach('sessionDefaultChannelGroup'),
    nach('sessionSource'),
  ]);
  const ergebnis = { quelle: 'analytics', tage, gesamt: zahl(summe?.rows?.[0]), kanal: liste(kanal), herkunft: liste(quelle), weg: [], cta: [], position: [], dimensionenFehlen: false };
  try {
    const [weg, cta, position] = await abruf([nach('customEvent:lead_weg'), nach('customEvent:letzte_cta'), nach('customEvent:lead_position')]);
    Object.assign(ergebnis, { weg: liste(weg), cta: liste(cta), position: liste(position) });
  } catch {
    ergebnis.dimensionenFehlen = true;
  }
  return ergebnis;
}

export default async (request) => {
  if (!passwortStimmt(request)) {
    return antwort(401, { fehler: 'nicht-angemeldet', meldung: 'Für die Kennzahlen ist das Dashboard-Passwort nötig.' });
  }

  const propertyId = (process.env.GA_PROPERTY_ID || '').trim();
  const email = (process.env.GA_CLIENT_EMAIL || '').trim();
  // Netlify speichert Zeilenumbrüche im Schlüssel oft als "\n": zurückwandeln
  const schluessel = (process.env.GA_PRIVATE_KEY || '').replace(/\\n/g, '\n').trim();

  if (!propertyId || !email || !schluessel) {
    return antwort(503, { fehler: 'nicht-eingerichtet', meldung: 'Die Umgebungsvariablen für Google Analytics fehlen.' });
  }

  const parameter = new URL(request.url).searchParams;
  if (parameter.get('bericht') === 'kanaele') {
    const m = Number(parameter.get('monate'));
    try {
      return antwort(200, await kanalBericht(await zugriffstoken(email, schluessel), propertyId, ERLAUBTE_MONATE.includes(m) ? m : 6));
    } catch (fehler) {
      return antwort(502, { fehler: 'abruf-fehlgeschlagen', meldung: String(fehler.message || fehler) });
    }
  }

  if (parameter.get('bericht') === 'leads') {
    const t = Number(parameter.get('tage'));
    try {
      return antwort(200, await leadBericht(await zugriffstoken(email, schluessel), propertyId, ERLAUBTE_TAGE.includes(t) ? t : 30));
    } catch (fehler) {
      return antwort(502, { fehler: 'abruf-fehlgeschlagen', meldung: String(fehler.message || fehler) });
    }
  }

  const gewuenscht = Number(parameter.get('tage'));
  const tage = ERLAUBTE_TAGE.includes(gewuenscht) ? gewuenscht : 30;
  const zeitraum = [{ startDate: `${tage}daysAgo`, endDate: 'today' }];

  try {
    const token = await zugriffstoken(email, schluessel);
    const r = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(propertyId)}:batchRunReports`, {
      method: 'POST',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        requests: [
          // 1. Summen im Zeitraum
          { dateRanges: zeitraum, metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }] },
          // 2. Besucher pro Tag
          {
            dateRanges: zeitraum,
            dimensions: [{ name: 'date' }],
            metrics: [{ name: 'activeUsers' }],
            orderBys: [{ dimension: { dimensionName: 'date' } }],
            keepEmptyRows: true,
          },
          // 3. Meistbesuchte Seiten
          {
            dateRanges: zeitraum,
            dimensions: [{ name: 'pagePath' }],
            metrics: [{ name: 'screenPageViews' }],
            orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
            limit: 10,
          },
          // 4. Herkunft der Besucher
          {
            dateRanges: zeitraum,
            dimensions: [{ name: 'sessionSource' }],
            metrics: [{ name: 'activeUsers' }],
            orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
            limit: 10,
          },
        ],
      }),
    });
    const json = await r.json();
    if (!r.ok) throw new Error(json.error?.message || `Google Analytics antwortet mit Status ${r.status}`);

    const [summen, tageweise, seiten, herkunft] = json.reports || [];
    return antwort(200, {
      quelle: 'analytics',
      tage,
      besucher: zahl(summen?.rows?.[0], 0),
      seitenaufrufe: zahl(summen?.rows?.[0], 1),
      verlauf: (tageweise?.rows || []).map((z) => {
        const d = text(z); // Format JJJJMMTT
        return { datum: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`, besucher: zahl(z) };
      }),
      seiten: (seiten?.rows || []).map((z) => ({ pfad: text(z), aufrufe: zahl(z) })),
      herkunft: (herkunft?.rows || []).map((z) => ({ quelle: text(z), besucher: zahl(z) })),
    });
  } catch (fehler) {
    return antwort(502, { fehler: 'abruf-fehlgeschlagen', meldung: String(fehler.message || fehler) });
  }
};

// Die Funktion liegt unterhalb von /dashboard/, damit der Browser das Passwort mitschickt
export const config = { path: '/dashboard/api/kennzahlen' };
