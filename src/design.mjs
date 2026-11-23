// =====================================================================
//  SCHRIFTEN DES DESIGN-SYSTEMS
//  Alle Schriften sind auf den Geräten schon vorhanden (Systemschriften).
//  Es wird nichts aus dem Internet nachgeladen: gut für Datenschutz und Tempo.
//  Ausgewählt werden sie in src/konfiguration.mjs unter "design".
// =====================================================================

export const SCHRIFTEN = {
  system: {
    name: 'System (neutral)',
    stapel: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  modern: {
    name: 'Modern (Helvetica-Stil)',
    stapel: '"Helvetica Neue", Helvetica, Arial, "Liberation Sans", sans-serif',
  },
  freundlich: {
    name: 'Freundlich (rund)',
    stapel: '"Avenir Next", Avenir, "Nunito", "Trebuchet MS", "Segoe UI", system-ui, sans-serif',
  },
  klassisch: {
    name: 'Klassisch (Serifen)',
    stapel: 'Charter, "Iowan Old Style", Georgia, Cambria, "Times New Roman", serif',
  },
};

export function schriftStapel(schluessel) {
  return (SCHRIFTEN[schluessel] ?? SCHRIFTEN.system).stapel;
}
