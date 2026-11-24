// =====================================================================
//  SERVERFUNKTION: Texte der Website veröffentlichen
//  Erreichbar unter /dashboard/api/veroeffentlichen (nur POST, nur mit
//  Dashboard-Passwort). Speichert die neue src/konfiguration.mjs als Commit
//  im GitHub-Repository. Ist Netlify mit dem Repository verbunden, baut es
//  die Website danach automatisch neu.
//
//  Umgebungsvariablen bei Netlify (siehe anleitungen/anleitung-website.md):
//    GITHUB_TOKEN    Zugangsschlüssel (fine-grained) mit Schreibrecht auf
//                    "Contents" – nur für dieses eine Repository
//    GITHUB_REPO     z. B. "benutzer/webseitenvorlage-mit-dashboard"
//    GITHUB_BRANCH   meist "main" (Standard)
//
//  Geschrieben wird ausschließlich die Datei src/konfiguration.mjs.
// =====================================================================
import { createHash, timingSafeEqual } from 'node:crypto';
import { Script } from 'node:vm';

const DATEI = 'src/konfiguration.mjs';
const MAX_GROESSE = 100_000;

function antwort(status, daten) {
  return new Response(JSON.stringify(daten), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
}

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

// Prüft, ob der Text gültiges JavaScript ist. vm.Script übersetzt den Text nur
// und führt ihn nicht aus (runInContext wird nie aufgerufen).
function syntaxFehler(code) {
  try {
    new Script(code.replace(/^\s*export\s+const\s+/m, 'const '), { filename: 'konfiguration.mjs' });
    return null;
  } catch (e) {
    return String(e.message || e);
  }
}

const normal = (t) => t.replace(/\r\n/g, '\n');

export default async (request) => {
  if (request.method !== 'POST') return antwort(405, { fehler: 'nur-post', meldung: 'Nur POST ist erlaubt.' });
  if (!passwortStimmt(request)) return antwort(401, { fehler: 'nicht-angemeldet', meldung: 'Bitte zuerst im Dashboard anmelden und den Editor von dort öffnen.' });

  // Nur Anfragen von der eigenen Website annehmen
  const herkunft = request.headers.get('origin');
  if (herkunft && herkunft !== new URL(request.url).origin) return antwort(403, { fehler: 'fremde-herkunft', meldung: 'Anfrage von einer fremden Seite.' });

  const token = (process.env.GITHUB_TOKEN || '').trim();
  const repo = (process.env.GITHUB_REPO || '').trim();
  const zweig = (process.env.GITHUB_BRANCH || 'main').trim();
  if (!token || !/^[\w.-]+\/[\w.-]+$/.test(repo)) {
    return antwort(503, { fehler: 'nicht-eingerichtet', meldung: 'Veröffentlichen ist noch nicht eingerichtet: GITHUB_TOKEN und GITHUB_REPO fehlen bei Netlify.' });
  }

  let daten;
  try { daten = await request.json(); } catch { return antwort(400, { fehler: 'ungueltig', meldung: 'Ungültige Anfrage.' }); }
  const inhalt = typeof daten?.inhalt === 'string' ? normal(daten.inhalt) : '';
  const basis = typeof daten?.basis === 'string' ? normal(daten.basis) : '';
  const nachricht = String(daten?.nachricht || 'Texte der Website über den Editor geändert').slice(0, 200);

  if (!inhalt || inhalt.length > MAX_GROESSE) return antwort(400, { fehler: 'ungueltig', meldung: 'Der Inhalt fehlt oder ist zu groß.' });
  if (!/export\s+const\s+konfiguration\s*=/.test(inhalt)) return antwort(400, { fehler: 'ungueltig', meldung: 'Das ist keine Konfigurationsdatei der Vorlage.' });
  const fehler = syntaxFehler(inhalt);
  if (fehler) return antwort(400, { fehler: 'syntax', meldung: `Die Datei enthält einen Fehler: ${fehler}` });

  const api = `https://api.github.com/repos/${repo}/contents/${DATEI}`;
  const koepfe = { authorization: `Bearer ${token}`, accept: 'application/vnd.github+json', 'x-github-api-version': '2022-11-28', 'user-agent': 'webseitenvorlage-editor' };

  try {
    // Aktuellen Stand holen: Wurde die Datei inzwischen anders geändert, nicht überschreiben
    const r = await fetch(`${api}?ref=${encodeURIComponent(zweig)}`, { headers: koepfe });
    const aktuell = await r.json();
    if (!r.ok) return antwort(502, { fehler: 'github', meldung: `GitHub antwortet mit ${r.status}: ${aktuell.message || 'unbekannter Fehler'}` });
    const aktuellerText = normal(Buffer.from(aktuell.content || '', 'base64').toString('utf8'));
    if (basis && aktuellerText !== basis) {
      return antwort(409, { fehler: 'konflikt', meldung: 'Die Datei wurde inzwischen an anderer Stelle geändert. Bitte die Seite neu laden und die Änderungen erneut eintragen.' });
    }
    if (aktuellerText === inhalt) return antwort(200, { ok: true, unveraendert: true, meldung: 'Keine Änderungen zu veröffentlichen.' });

    const w = await fetch(api, {
      method: 'PUT',
      headers: { ...koepfe, 'content-type': 'application/json' },
      body: JSON.stringify({ message: nachricht, content: Buffer.from(inhalt, 'utf8').toString('base64'), sha: aktuell.sha, branch: zweig }),
    });
    const ergebnis = await w.json();
    if (!w.ok) return antwort(502, { fehler: 'github', meldung: `Speichern bei GitHub fehlgeschlagen (${w.status}): ${ergebnis.message || 'unbekannter Fehler'}` });
    return antwort(200, { ok: true, commit: ergebnis.commit?.sha?.slice(0, 7), meldung: 'Gespeichert. Netlify baut die Website jetzt neu; das dauert meist 1–2 Minuten.' });
  } catch (e) {
    return antwort(502, { fehler: 'netzwerk', meldung: String(e.message || e) });
  }
};

export const config = { path: '/dashboard/api/veroeffentlichen' };
