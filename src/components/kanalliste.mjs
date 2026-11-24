// Eine gemeinsame Kanalliste für Promotion (Kanäle & Budget) und Prozess (Kampagnenplanung).
// Quelle: src/inhalte/kanaele.json. ziel = Reiter auf der Seite Kanäle & Budget.
import daten from '../inhalte/kanaele.json';

const kennung = (name) => name.toLowerCase().replace(/\s+/g, '-');

export const KANALLISTE = [
  ...daten.kategorien.flatMap((k) => k.kanaele.map((kanal) => ({ name: kanal.name, logo: kanal.logo || '', kategorie: k.name, ziel: kennung(k.name) }))),
  ...daten.affiliate.netzwerke.map((n) => ({ name: n.name, logo: n.logo || '', kategorie: 'Affiliate', ziel: 'affiliate' })),
];

// Ältere Kanalnamen aus gespeicherten Kampagnen auf die gemeinsame Liste abbilden
export const KANAL_ALIAS = {
  'Google Ads': 'Google',
  'Microsoft Advertising': 'Bing',
  'Website / SEO': 'Website & Blog',
  'Print / Offline': 'Print & Offline',
  Affiliate: 'Awin',
};
