// =====================================================================
//  PASSWORTSCHUTZ FÜR DAS DASHBOARD
//  Läuft bei Netlify vor jedem Aufruf von /dashboard/ und fragt nach
//  einem Passwort. Der Benutzername ist beliebig.
//
//  Das Passwort steht NICHT im Code, sondern als Umgebungsvariable
//  DASHBOARD_PASSWORT in den Einstellungen von Netlify
//  (siehe anleitungen/anleitung-dashboard.md).
//
//  Ist kein Passwort hinterlegt, bleibt das Dashboard gesperrt.
//  In der lokalen Vorschau (npm run dev) läuft dieser Schutz nicht.
// =====================================================================

const BEREICH = 'Dashboard';

async function hash(text) {
  const daten = new TextEncoder().encode(text);
  return new Uint8Array(await crypto.subtle.digest('SHA-256', daten));
}

// Vergleicht über Prüfsummen, damit die Antwortzeit nichts über das Passwort verrät
async function gleich(a, b) {
  const [x, y] = await Promise.all([hash(a), hash(b)]);
  let unterschied = 0;
  for (let i = 0; i < x.length; i++) unterschied |= x[i] ^ y[i];
  return unterschied === 0;
}

function passwortAusAnfrage(request) {
  const kopf = request.headers.get('authorization') || '';
  if (!kopf.startsWith('Basic ')) return null;
  try {
    const bytes = Uint8Array.from(atob(kopf.slice(6).trim()), (z) => z.charCodeAt(0));
    const text = new TextDecoder().decode(bytes);
    const trenner = text.indexOf(':');
    return trenner === -1 ? null : text.slice(trenner + 1);
  } catch {
    return null;
  }
}

function seite(titel, text, status, extraKoepfe = {}) {
  const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${titel}</title>
<style>body{font-family:system-ui,sans-serif;max-width:560px;margin:15vh auto;padding:0 16px;color:#1c2126;line-height:1.6}h1{font-size:1.5rem}code{background:#f3f5f6;padding:0 .3em;border-radius:4px}</style></head>
<body><h1>${titel}</h1><p>${text}</p><p><a href="/">Zur Website</a></p></body></html>`;
  return new Response(html, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', ...extraKoepfe },
  });
}

// Vereinheitlicht die Adresse, damit Schreibvarianten wie /DASHBOARD/,
// /%64ashboard/ oder //dashboard/ den Schutz nicht umgehen
function istDashboard(url) {
  let pfad = new URL(url).pathname;
  for (let i = 0; i < 3; i++) {
    try {
      const entschluesselt = decodeURIComponent(pfad);
      if (entschluesselt === pfad) break;
      pfad = entschluesselt;
    } catch {
      break;
    }
  }
  pfad = pfad.toLowerCase().replace(/\\/g, '/').replace(/\/{2,}/g, '/');
  return pfad === '/dashboard' || pfad.startsWith('/dashboard/') || pfad.startsWith('/dashboard.');
}

export default async (request, context) => {
  if (!istDashboard(request.url)) return; // alles andere ungeprüft weiterreichen

  const passwort = Netlify.env.get('DASHBOARD_PASSWORT') || '';

  if (!passwort) {
    return seite(
      'Dashboard gesperrt',
      'Für das Dashboard ist noch kein Passwort hinterlegt. Legen Sie bei Netlify die Umgebungsvariable <code>DASHBOARD_PASSWORT</code> an und veröffentlichen Sie die Website neu.',
      503,
    );
  }

  const eingabe = passwortAusAnfrage(request);
  if (eingabe !== null && (await gleich(eingabe, passwort))) {
    const antwort = await context.next();
    antwort.headers.set('cache-control', 'private, no-store');
    return antwort;
  }

  return seite(
    'Anmeldung erforderlich',
    'Das Dashboard ist durch ein Passwort geschützt. Laden Sie die Seite neu, um es einzugeben. Den Benutzernamen können Sie frei wählen.',
    401,
    { 'www-authenticate': `Basic realm="${BEREICH}", charset="UTF-8"` },
  );
};

// Läuft für alle Adressen und entscheidet selbst, was zum Dashboard gehört.
// Gestaltungsdateien und Bilder sind ausgenommen, sie enthalten keine Daten.
export const config = { path: '/*', excludedPath: ['/_astro/*', '/bilder/*', '/favicon.svg'] };
