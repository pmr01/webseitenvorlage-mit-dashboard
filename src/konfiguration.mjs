// =====================================================================
//  ZENTRALE KONFIGURATIONSDATEI
//  Hier ändern Sie Firmenname, Farben, Logo, alle Texte der Startseite
//  und die Analytics-Kennung. Alles andere passt sich automatisch an.
//  Bilder liegen im Ordner public/bilder/.
// =====================================================================

export const konfiguration = {
  // --- Firma ----------------------------------------------------------
  firma: {
    name: 'Musterfirma',
    // Pfad zum Logo im Ordner public/ (SVG oder PNG)
    logo: '/bilder/logo.svg',
    beschreibung: 'Vorlage für eine Website nach dem Storytelling Framework.',
  },

  // --- Design-System -----------------------------------------------------
  // Ausprobieren und fertigen Code erzeugen: Dashboard → Promotion → Design-System.
  // Farben (als CSS-Variablen auf allen Seiten verfügbar)
  farben: {
    haupt: '#1f4e5f', // Hauptfarbe: Buttons, Überschriften-Akzente
    akzent: '#e0a458', // Akzentfarbe: Hervorhebungen
    text: '#1c2126',
    hintergrund: '#ffffff',
    flaeche: '#f3f5f6', // helle Fläche für abgesetzte Abschnitte
  },
  // Schriften: 'system', 'modern', 'freundlich' oder 'klassisch' (siehe src/design.mjs)
  // Ecken: Rundung von Buttons und Kästen in Pixeln (0 = eckig, 24 = sehr rund)
  design: {
    schriftText: 'system',
    schriftUeberschrift: 'system',
    ecken: 10,
  },

  // --- Analytics --------------------------------------------------------
  // Mess-ID aus Google Analytics, Form "G-XXXXXXXXXX".
  // Leer lassen = keine Erfassung und kein Einwilligungsbanner.
  analytics: {
    messId: '',
  },

  // --- (9) Call-to-Action: überall derselbe Text, dasselbe Ziel ----------
  cta: {
    text: 'Kostenloses Erstgespräch vereinbaren',
    ziel: '#kontakt',
  },

  // --- (2) Navigation: 3 bis höchstens 7 Punkte -------------------------
  navigation: [
    { text: 'Angebot', ziel: '#painpoints' },
    { text: 'Über uns', ziel: '#vorstellung' },
    { text: 'So geht es', ziel: '#plan' },
    { text: 'Stimmen', ziel: '#testimonials' },
    { text: 'Kontakt', ziel: '#kontakt' },
  ],

  // --- (3) Hauptbild / Video, (4) Hauptüberschrift, (5) Einleitung ------
  hero: {
    ueberschrift: 'Was bieten Sie wem an? In einem Satz.',
    einleitung:
      'Hier erklären Sie Ihr Angebot in ein bis drei Sätzen: Für wen ist es, welches Problem löst es, und was hat der Kunde am Ende davon?',
    bild: '/bilder/heroshot.svg',
    bildAlt: 'Platzhalter für das Hauptbild: etwas Emotionales, Verbindendes',
    // Optional: Pfad zu einem Video (MP4) im Ordner public/. Leer = Bild.
    video: '',
  },

  // --- (6) Painpoints: 3 bis 6 Schmerzpunkte gemäß Persona --------------
  painpoints: {
    ueberschrift: 'Kennen Sie das?',
    punkte: [
      { titel: 'Painpoint 1', text: 'Ein typisches Problem Ihrer Zielgruppe, in ihren eigenen Worten.' },
      { titel: 'Painpoint 2', text: 'Was kostet dieses Problem Ihre Kunden heute: Zeit, Geld, Nerven?' },
      { titel: 'Painpoint 3', text: 'Welche Lösung haben Ihre Kunden schon versucht, und warum hat sie nicht gereicht?' },
      { titel: 'Painpoint 4', text: 'Was befürchten Ihre Kunden, wenn sich nichts ändert?' },
      { titel: 'Painpoint 5', text: 'Welche Frage stellen Ihnen Kunden im Erstgespräch am häufigsten?' },
      { titel: 'Painpoint 6', text: 'Was hält Ihre Kunden bisher davon ab, das Problem anzugehen?' },
    ],
  },

  // --- (7) Vorstellung: Autorität zeigen, warum wir ----------------------
  vorstellung: {
    ueberschrift: 'Warum Musterfirma?',
    text: [
      'Hier stellen Sie sich vor: Wer sind Sie, was haben Sie schon erreicht, und warum sind gerade Sie der richtige Partner?',
      'Zeigen Sie Verständnis für das Problem Ihrer Kunden und belegen Sie Ihre Kompetenz, zum Beispiel mit Jahren an Erfahrung, Zahl der Kunden oder einer Ausbildung.',
    ],
    bild: '/bilder/vorstellung.svg',
    bildAlt: 'Platzhalter für ein Foto von Ihnen oder Ihrem Team',
  },

  // --- (8) Plan: So einfach geht es, in 3 Schritten ----------------------
  plan: {
    ueberschrift: 'So einfach geht es',
    schritte: [
      { titel: 'Schritt 1', text: 'Der erste, leichte Schritt, zum Beispiel: Termin online buchen.' },
      { titel: 'Schritt 2', text: 'Was dann passiert, zum Beispiel: Wir besprechen Ihre Situation.' },
      { titel: 'Schritt 3', text: 'Das Ergebnis, zum Beispiel: Sie erhalten Ihren persönlichen Plan.' },
    ],
  },

  // --- (10) Auszeichnungen, Logos, Siegel (soweit vorhanden) -------------
  auszeichnungen: {
    ueberschrift: 'Bekannt aus und ausgezeichnet von',
    // Leere Liste = Abschnitt wird ausgeblendet
    eintraege: ['Siegel 1', 'Auszeichnung 2', 'Partnerlogo 3', 'Presse 4'],
  },

  // --- (11) Testimonials: bisherige Kundenstimmen ------------------------
  testimonials: {
    ueberschrift: 'Das sagen unsere Kunden',
    stimmen: [
      { zitat: 'Ein Satz, wie Ihr Kunde die Zusammenarbeit erlebt hat.', name: 'Vorname N.', rolle: 'Rolle, Ort' },
      { zitat: 'Welches Ergebnis hat Ihr Kunde erreicht? Möglichst konkret.', name: 'Vorname N.', rolle: 'Rolle, Ort' },
      { zitat: 'Was würde Ihr Kunde anderen empfehlen?', name: 'Vorname N.', rolle: 'Rolle, Ort' },
    ],
  },

  // --- (12) Weitere Elemente: Kontakt ------------------------------------
  kontakt: {
    ueberschrift: 'Kontakt',
    text: 'Schreiben Sie uns oder rufen Sie an. Wir melden uns innerhalb eines Werktags.',
    email: 'kontakt@example.com',
    telefon: '+49 000 0000000',
    adresse: 'Musterstraße 1, 00000 Musterstadt',
  },
};
