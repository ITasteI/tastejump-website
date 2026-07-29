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
 *
 * WICHTIG: TasteJump wird ausschließlich über Steam vertrieben
 * (Release 05.08.2026). Alle Download-/Play-CTAs verlinken auf
 * steam.url.
 * ============================================================
 */

const GAME_CONFIG = {

  // ---------- Allgemeine Spielinformationen ----------
  game: {
    name: "TasteJump",
    tagline: {
      en: "Jump, run and discover a world full of color and chaos.",
      de: "Spring, renn und entdecke eine Welt voller Farbe und Chaos."
    },
    description: {
      en: "TasteJump is a fast-paced 3D platformer that rewards precision, timing and a thirst for exploration. Jump through handcrafted worlds, collect secrets and master daring platforming sequences — alone or together with friends in co-op.",
      de: "TasteJump ist ein schneller 3D-Plattformer, in dem Präzision, Timing und Erkundungsdrang belohnt werden. Hüpfe durch handgefertigte Welten, sammle Geheimnisse und meistere waghalsige Sprungpassagen – allein oder gemeinsam mit Freunden im Koop-Modus."
    },
    icon: "../assets/img/icon.jpg"
  },

  // ---------- GitHub-Anbindung: Changelog ----------
  github: {
    repo: "ITasteI/platformer3d",
    autoSyncChangelog: true
  },

  // ---------- GitHub-Anbindung: Spiel-Live-Inhalte ----------
  // steam, trailer, about, screenshots werden aus
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

  // ---------- Steam ----------
  // FALLBACK, falls tastejump-content.json nicht erreichbar ist.
  steam: {
    url: "https://store.steampowered.com/app/4962090/TasteJump/",
    releaseDate: "2026-08-05"
  },

  // ---------- Trailer ----------
  // FALLBACK, falls tastejump-content.json nicht erreichbar ist.
  trailer: {
    url: "https://github.com/ITasteI/tastejump-website/releases/download/media-v1/TasteJump.Trailer.mp4",
    poster: "../assets/screenshots/screenshot-sky-platforms.jpg"
  },

  // ---------- Über das Spiel ----------
  about: {
    features: [
      { icon: "🎯", title: { en: "Four game modes", de: "Vier Spielmodi" }, text: { en: "Classic, Time Trial, Hardcore and Endless — each with its own path to the top.", de: "Klassisch, Zeitrennen, Hardcore und Endlos – jeder mit seinem eigenen Weg nach oben." } },
      { icon: "🏃", title: { en: "Precise movement", de: "Präzises Movement" }, text: { en: "Responsive controls with wall jump, dash, glide and double jump.", de: "Reaktionsschnelle Steuerung mit Wandsprung, Dash, Gleiten und Doppelsprung." } },
      { icon: "🌍", title: { en: "Five handcrafted worlds", de: "Fünf handgefertigte Welten" }, text: { en: "From cozy meadows to volcanic fields and starlit peaks, each with its own identity.", de: "Von gemütlichen Wiesen über Vulkanfelder bis zu sternenklaren Gipfeln – jede mit eigenem Charakter." } },
      { icon: "👥", title: { en: "Multiplayer", de: "Multiplayer" }, text: { en: "Play cooperatively with friends over LAN.", de: "Spiele kooperativ mit Freunden über LAN." } },
      { icon: "🏆", title: { en: "Collectibles & cosmetics", de: "Sammelobjekte & Kosmetik" }, text: { en: "Earn coins, unlock skins and effects with their own rarity tiers.", de: "Verdiene Münzen und schalte Skins und Effekte mit eigenen Seltenheitsstufen frei." } },
      { icon: "🎵", title: { en: "Dynamic soundtrack", de: "Dynamischer Soundtrack" }, text: { en: "Music that adapts to what's happening in the game.", de: "Musik, die sich an das Spielgeschehen anpasst." } }
    ],
    playtime: { en: "4–6 hours main story, endless in Endless mode", de: "4–6 Stunden Hauptgeschichte, unbegrenzt im Endlos-Modus" },
    multiplayer: { en: "Co-op via LAN", de: "Koop über LAN" },
    worlds: [
      { name: { en: "Meadowlands", de: "Wiesenland" }, description: { en: "The starting area — cozy hills, fireflies and the first jump puzzles.", de: "Der Einstieg – gemütliche Hügel, Glühwürmchen und erste Sprungrätsel." } },
      { name: { en: "Volcanic Fields", de: "Vulkanfeld" }, description: { en: "Cracked rock, embers and rising heat the higher you climb.", de: "Rissiges Gestein, Glut und steigende Hitze, je höher du kommst." } },
      { name: { en: "Cloud Realm", de: "Wolkenreich" }, description: { en: "Floating platforms high above the world below.", de: "Schwebende Plattformen hoch über der Welt darunter." } },
      { name: { en: "Ice Crystal", de: "Eiskristall" }, description: { en: "Glowing crystal formations across slick, frozen ground.", de: "Leuchtende Kristallformationen auf glattem, gefrorenem Boden." } },
      { name: { en: "Star Crown", de: "Sternenkrone" }, description: { en: "The final ascent, among asteroids and starlight.", de: "Der letzte Aufstieg, zwischen Asteroiden und Sternenlicht." } }
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
    { src: "../assets/screenshots/screenshot-meadowlands-night.jpg", alt: { en: "Meadowlands at night in TasteJump", de: "Wiesenland bei Nacht in TasteJump" } },
    { src: "../assets/screenshots/screenshot-platforms-ascent.jpg", alt: { en: "Climbing the platform ascent in TasteJump", de: "Aufstieg über die Plattformen in TasteJump" } },
    { src: "../assets/screenshots/screenshot-sky-platforms.jpg", alt: { en: "High above the world on floating platforms", de: "Hoch über der Welt auf schwebenden Plattformen" } },
    { src: "../assets/screenshots/screenshot-volcanic-fields.jpg", alt: { en: "Exploring the Volcanic Fields at night", de: "Die Vulkanfelder bei Nacht erkunden" } }
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
