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
//  Geschrieben werden ausschließlich src/konfiguration.mjs und neue Bilder in
//  public/bilder/ (höchstens 3 je Anfrage, nur Bilder, die die neue Konfiguration
//  auch verwendet). Alles landet in einem einzigen Commit.
// =====================================================================
import { createHash, timingSafeEqual } from 'node:crypto';
import { Script } from 'node:vm';

const DATEI = 'src/konfiguration.mjs';
const MAX_GROESSE = 100_000;
const MAX_BILDER = 3;
const MAX_BILD = 2_500_000;      // Bytes je Bild
const MAX_BILDER_GESAMT = 4_000_000;
const BILD_PFAD = /^public\/bilder\/[a-z0-9][a-z0-9-]{0,60}\.(png|jpg|jpeg|webp|gif|svg)$/;

// Prüft, ob der Inhalt wirklich zum Dateityp passt (erste Bytes) und SVGs nichts Ausführbares enthalten
function bildFehler(pfad, bytes) {
  const endung = pfad.split('.').pop();
  const kopf = bytes.subarray(0, 12);
  const beginnt = (...b) => b.every((x, i) => kopf[i] === x);
  if (endung === 'png') return beginnt(0x89, 0x50, 0x4e, 0x47) ? null : 'keine PNG-Datei';
  if (endung === 'jpg' || endung === 'jpeg') return beginnt(0xff, 0xd8, 0xff) ? null : 'keine JPG-Datei';
  if (endung === 'gif') return beginnt(0x47, 0x49, 0x46, 0x38) ? null : 'keine GIF-Datei';
  if (endung === 'webp') return beginnt(0x52, 0x49, 0x46, 0x46) && String.fromCharCode(...bytes.subarray(8, 12)) === 'WEBP' ? null : 'keine WebP-Datei';
  if (endung === 'svg') {
    const text = bytes.toString('utf8');
    if (!/<svg[\s>]/i.test(text)) return 'keine SVG-Datei';
    if (/<script|<foreignobject|<iframe|<embed|<object|javascript:|\son[a-z]+\s*=|<!entity|href\s*=\s*["']?\s*data:(?!image\/(png|jpe?g|gif|webp))/i.test(text)) return 'SVG enthält Skripte oder eingebettete Inhalte';
    return null;
  }
  return 'Dateityp nicht erlaubt';
}

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

  // Neue Bilder prüfen
  const roh = Array.isArray(daten?.bilder) ? daten.bilder : [];
  if (roh.length > MAX_BILDER) return antwort(400, { fehler: 'bilder', meldung: `Höchstens ${MAX_BILDER} neue Bilder auf einmal.` });
  const bilder = [];
  let gesamt = 0;
  for (const b of roh) {
    const pfad = typeof b?.pfad === 'string' ? b.pfad : '';
    if (!BILD_PFAD.test(pfad)) return antwort(400, { fehler: 'bilder', meldung: 'Ungültiger Bildname.' });
    if (bilder.some((x) => x.pfad === pfad)) return antwort(400, { fehler: 'bilder', meldung: 'Ein Bild ist doppelt.' });
    if (!inhalt.includes(`'/${pfad.slice('public/'.length)}'`)) return antwort(400, { fehler: 'bilder', meldung: `Das Bild ${pfad} wird in der Konfiguration nicht verwendet.` });
    const bytes = Buffer.from(typeof b?.inhalt === 'string' ? b.inhalt : '', 'base64');
    if (!bytes.length || bytes.length > MAX_BILD) return antwort(400, { fehler: 'bilder', meldung: `Das Bild ${pfad} fehlt oder ist zu groß (höchstens 2,5 MB).` });
    gesamt += bytes.length;
    const f = bildFehler(pfad, bytes);
    if (f) return antwort(400, { fehler: 'bilder', meldung: `Das Bild ${pfad} wurde abgelehnt: ${f}.` });
    bilder.push({ pfad, bytes });
  }
  if (gesamt > MAX_BILDER_GESAMT) return antwort(400, { fehler: 'bilder', meldung: 'Die Bilder sind zusammen zu groß (höchstens 4 MB).' });

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
    if (aktuellerText === inhalt && !bilder.length) return antwort(200, { ok: true, unveraendert: true, meldung: 'Keine Änderungen zu veröffentlichen.' });

    if (bilder.length) {
      // Konfiguration und Bilder als ein Commit: Blobs → Baum → Commit → Zweig vorrücken
      const git = `https://api.github.com/repos/${repo}/git`;
      const gh = async (pfad, methode = 'GET', inhaltJson) => {
        const r = await fetch(`${git}${pfad}`, { method: methode, headers: { ...koepfe, 'content-type': 'application/json' }, body: inhaltJson ? JSON.stringify(inhaltJson) : undefined });
        const j = await r.json();
        if (!r.ok) { const e = new Error(`GitHub (${r.status}): ${j.message || 'unbekannter Fehler'}`); e.status = r.status; throw e; }
        return j;
      };
      const ref = await gh(`/ref/heads/${encodeURIComponent(zweig)}`);
      const basisCommit = await gh(`/commits/${ref.object.sha}`);
      // Genau auf diesem Stand nochmals prüfen, dass die Konfiguration unverändert ist
      const r2 = await fetch(`${api}?ref=${ref.object.sha}`, { headers: koepfe });
      const stand = await r2.json();
      if (!r2.ok) return antwort(502, { fehler: 'github', meldung: `GitHub antwortet mit ${r2.status}: ${stand.message || 'unbekannter Fehler'}` });
      if (basis && normal(Buffer.from(stand.content || '', 'base64').toString('utf8')) !== basis) {
        return antwort(409, { fehler: 'konflikt', meldung: 'Die Datei wurde inzwischen an anderer Stelle geändert. Bitte die Seite neu laden und die Änderungen erneut eintragen.' });
      }
      const eintraege = [];
      for (const b of bilder) {
        const blob = await gh('/blobs', 'POST', { content: b.bytes.toString('base64'), encoding: 'base64' });
        eintraege.push({ path: b.pfad, mode: '100644', type: 'blob', sha: blob.sha });
      }
      if (aktuellerText !== inhalt) {
        const blob = await gh('/blobs', 'POST', { content: inhalt, encoding: 'utf-8' });
        eintraege.push({ path: DATEI, mode: '100644', type: 'blob', sha: blob.sha });
      }
      const baum = await gh('/trees', 'POST', { base_tree: basisCommit.tree.sha, tree: eintraege });
      const commit = await gh('/commits', 'POST', { message: nachricht, tree: baum.sha, parents: [ref.object.sha] });
      try {
        await gh(`/refs/heads/${encodeURIComponent(zweig)}`, 'PATCH', { sha: commit.sha, force: false });
      } catch (e) {
        if (e.status === 422) return antwort(409, { fehler: 'konflikt', meldung: 'Inzwischen wurde etwas anderes veröffentlicht. Bitte die Seite neu laden und erneut veröffentlichen.' });
        throw e;
      }
      return antwort(200, { ok: true, commit: commit.sha.slice(0, 7), meldung: `Gespeichert, mit ${bilder.length === 1 ? 'einem Bild' : `${bilder.length} Bildern`}. Netlify baut die Website jetzt neu; das dauert meist 1–2 Minuten.` });
    }

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
