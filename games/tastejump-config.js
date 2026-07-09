/**
 * ============================================================
 *  ADMIN-KONFIGURATION — TasteJump-Detailseite
 * ============================================================
 * WICHTIG: Fast alle Inhalte hier sind nur noch ein FALLBACK,
 * der greift, falls GitHub mal nicht erreichbar ist. Der Normalfall
 * ist: die Seite lädt alle Inhalte live aus games/tastejump-content.json
 * im Website-Repo:
 *
 *   https://github.com/ITasteI/tastejump-website/blob/main/games/tastejump-content.json
 *
 * Footer/Marke kommen zusätzlich live aus der Studio-weiten
 * content.json im Repo-Wurzelverzeichnis.
 * ============================================================
 */

const GAME_CONFIG = {

  // ---------- Allgemeine Spielinformationen ----------
  game: {
    name: "TasteJump",
    tagline: "Spring, renn und entdecke eine Welt voller Farbe und Chaos.",
    description:
      "TasteJump ist ein schneller 3D-Plattformer, in dem Präzision, Timing und " +
      "Erkundungsdrang belohnt werden. Hüpfe durch handgefertigte Welten, sammle " +
      "Geheimnisse und meistere waghalsige Sprungpassagen – allein oder gemeinsam " +
      "mit Freunden im Koop-Modus.",
    icon: "../assets/img/icon.jpg"
  },

  // ---------- GitHub-Anbindung: Changelog ----------
  github: {
    repo: "ITasteI/platformer3d",
    autoSyncChangelog: true
  },

  // ---------- GitHub-Anbindung: Spiel-Live-Inhalte ----------
  // stats, server, about, screenshots werden aus
  // games/tastejump-content.json geladen.
  content: {
    repo: "ITasteI/tastejump-website",
    branch: "main",
    path: "games/tastejump-content.json",
    autoSync: true
  },

  // ---------- GitHub-Anbindung: Studio-Footer/Marke ----------
  // Footer-Kontaktdaten und Marke kommen aus der Studio-weiten
  // content.json im Repo-Wurzelverzeichnis (einheitlich über die
  // ganze Website hinweg).
  studioContent: {
    repo: "ITasteI/tastejump-website",
    branch: "main",
    path: "content.json",
    autoSync: true
  },

  // ---------- Spielerstatistiken (Platzhalter) ----------
  // FALLBACK, falls tastejump-content.json nicht erreichbar ist.
  stats: {
    playersOnline: 0,
    playersToday: 0,
    playersTotal: 0,
    playersPeak: 0
  },

  // ---------- Serverstatus ----------
  // FALLBACK, falls tastejump-content.json nicht erreichbar ist.
  server: {
    status: "online",
    lastChecked: "2026-07-07 13:00"
  },

  // ---------- Über das Spiel ----------
  about: {
    features: [
      { icon: "🏃", title: "Präzises Movement", text: "Reaktionsschnelle Steuerung mit Wandsprung, Dash und Doppelsprung." },
      { icon: "🌍", title: "Handgefertigte Welten", text: "Mehrere thematisch einzigartige Level voller Geheimnisse." },
      { icon: "👥", title: "Multiplayer", text: "Spiele kooperativ mit Freunden über Netcode-Unterstützung." },
      { icon: "🏆", title: "Sammelobjekte", text: "Finde versteckte Collectibles und schalte Bonusinhalte frei." },
      { icon: "🎨", title: "Einzigartiger Look", text: "Stilisierte Grafik mit modernem Beleuchtungssystem (URP)." },
      { icon: "🎵", title: "Dynamischer Soundtrack", text: "Musik, die sich an das Spielgeschehen anpasst." }
    ],
    playtime: "4–6 Stunden Hauptgeschichte",
    multiplayer: "Bis zu 4 Spieler (Koop)",
    worlds: [
      { name: "Grüne Ebenen", description: "Der Einstieg – sanfte Hügel und erste Sprungrätsel." },
      { name: "Stadt der Wolken", description: "Schwebende Plattformen hoch über einer Metropole." },
      { name: "Verlassene Ruinen", description: "Alte Tempelanlagen mit tückischen Fallen." }
    ]
  },

  // ---------- Changelog / Updates ----------
  // FALLBACK-Daten, nur falls die GitHub-API nicht erreichbar ist.
  // Im Normalfall wird dieser Bereich automatisch durch die Releases
  // von github.com/ITasteI/platformer3d ersetzt.
  changelog: [
    {
      version: "1.7.0",
      date: "2026-07-07",
      type: "feature",
      changes: [
        "Alter Turm erreichte nur ~240m – Eiswelt und Weltraumwelt waren dadurch nie erreichbar",
        "Plattformenzahl von 160 auf 550 erhöht – Turm ist jetzt ca. 2.5x so hoch (~600m)",
        "Jede der 5 Welten bekommt ein spürbares eigenes Stück Aufstieg",
        "Neu: schwebende Themen-Inseln pro Welt (Vulkangestein, Wolken-Puffs, Eiskristalle, Asteroiden)"
      ]
    },
    {
      version: "1.6.1",
      date: "2026-07-07",
      type: "fix",
      changes: [
        "Einfrieren nach \"Neu starten\" behoben – Lauf wird jetzt direkt zurückgesetzt statt die Szene neu zu laden"
      ]
    },
    {
      version: "1.6.0",
      date: "2026-07-07",
      type: "feature",
      changes: [
        "Berge sind jetzt gezackte Gebirgszüge mit Nebengipfeln und Schneekappen",
        "Nebel-Sichtweite deutlich erhöht – Berge verschwinden nicht mehr im grauen Dunst",
        "Neu: gewundener Fluss mit Wasserfall und Nebel-Partikeleffekt",
        "Plattformen bleiben bunt (Kenney-Farbpalette)"
      ]
    },
    {
      version: "1.5.0",
      date: "2026-07-07",
      type: "feature",
      changes: [
        "\"Neu starten\" nach dem Sieg lädt jetzt wirklich am Levelanfang",
        "Zerbrechende Plattformen werden nicht mehr wieder solide, während man draufsteht",
        "Timer pausiert jetzt im Menü/Tutorial/Sieges-Screen",
        "Bewegliche/schwebende/rotierende Plattformen nutzen eine gemeinsame Netzwerk-Uhr",
        "Flug-Fähigkeit (Q): Cooldown deutlich gesenkt",
        "Grafik- und Soundeinstellungen werden gespeichert und wiederhergestellt",
        "Neue Sounds: Sprungpad, Flug-Whoosh, Sieg"
      ]
    },
    {
      version: "1.4.1",
      date: "2026-07-07",
      type: "fix",
      changes: [
        "Namensfenster beim ersten Start war hakelig beim Tippen – behoben",
        "Nach \"Neu starten\" im Sieges-Screen blieb das Spiel eingefroren – behoben"
      ]
    },
    {
      version: "1.4.0",
      date: "2026-07-07",
      type: "feature",
      changes: [
        "Sprünge werden gegen die echte Sprungphysik geprüft – keine unmöglichen Sprünge mehr",
        "Checkpoints speichern Fortschritt automatisch (Position, Shards, Bestzeit)",
        "Live-Timer im HUD mit Bestzeit-Speicherung",
        "Neues Hauptmenü mit Fortsetzen / Neues Spiel / Einstellungen / Beenden",
        "Eigener Spielername, sichtbar für alle Mitspieler",
        "Multiplayer-Sync-Fixes für Bewegung, Rotation und Animationen"
      ]
    },
    {
      version: "1.3.0",
      date: "2026-07-07",
      type: "feature",
      changes: [
        "Echtes Unity-Terrain mit Perlin-Noise-Hügeln statt flachem Testboden",
        "Neuer Bergring am Horizont für mehr Tiefe",
        "Natur-Deko: Bäume, Felsen, Blumen und Pilze",
        "5 statt 3 Zonen mit eigener Nebel-/Himmel-/Lichtstimmung",
        "4 Weltportale passend zu den neuen Zonengrenzen"
      ]
    },
    {
      version: "1.2.1",
      date: "2026-07-07",
      type: "fix",
      changes: [
        "8-Bit-Jingles durch entspannte Lofi-Musik ersetzt"
      ]
    },
    {
      version: "1.2.0",
      date: "2026-07-07",
      type: "feature",
      changes: [
        "Sieg-Screen an der Zielflagge mit Partikel-Feedback",
        "Tutorial-Overlay und Zonen-Musik",
        "Welt-Tore zwischen 3 Zonen (Schrottplatz/Industrie/Orbit)",
        "Dash-Fähigkeit (Umschalt)",
        "Multiplayer Beitritts-/Trennungs-Hinweise mit Reconnect-Handling"
      ]
    },
    {
      version: "1.1.1",
      date: "2026-07-07",
      type: "fix",
      changes: [
        "Spieler spawnte im Boden – Höhen-Versatz behoben",
        "Neuer Lautstärke-Regler in den Einstellungen"
      ]
    },
    {
      version: "1.1.0",
      date: "2026-07-07",
      type: "feature",
      changes: [
        "Checkpoints statt Komplett-Neustart",
        "Faire, garantierte Sprungdistanzen",
        "Mehr Plattform- und Hindernis-Vielfalt je Höhenzone",
        "Soundeffekte für Sprung, Landung, Münze, Tod und Checkpoint",
        "Abschnitts-Fortschrittsanzeige und Performance-Optimierungen"
      ]
    },
    {
      version: "1.0.2",
      date: "2026-07-06",
      type: "feature",
      changes: [
        "Neues Hauptmenü (Spiel starten / Einstellungen / Beenden)",
        "Kamera von Spieler-Transform gelöst"
      ]
    },
    {
      version: "1.0.1",
      date: "2026-07-06",
      type: "fix",
      changes: [
        "Kamera clippt nicht mehr durch Plattformen/Wände in der Nähe"
      ]
    },
    {
      version: "1.0.0",
      date: "2026-07-06",
      type: "release",
      changes: [
        "Erster Release: Only-Up-Style Climbing-Platformer",
        "Multiplayer-Unterstützung, echte Modelle und Settings-Menü"
      ]
    }
  ],

  // ---------- Screenshots ----------
  screenshots: [
    { src: "../assets/screenshots/screenshot-worldgate.jpg", alt: "Weltentor bei Nacht in TasteJump" },
    { src: "../assets/screenshots/screenshot-meadow-night.jpg", alt: "Nächtliche Wiese mit leuchtenden Pilzen" },
    { src: "../assets/screenshots/screenshot-forest-path.jpg", alt: "Waldpfad bei Nacht in TasteJump" },
    { src: "../assets/screenshots/screenshot-character.jpg", alt: "Spielercharakter in TasteJump" },
    { src: "../assets/screenshots/screenshot-shop.jpg", alt: "Shop mit Skins und Effekten in TasteJump" }
  ],

  // ---------- Footer / Kontakt ----------
  // FALLBACK, falls die Studio-content.json nicht erreichbar ist.
  footer: {
    contactEmail: "kontakt@example.com",
    discordUrl: "#",
    social: {
      twitter: "#",
      youtube: "#",
      instagram: "#",
      tiktok: "#"
    },
    copyrightName: "TasteGames"
  }

};
