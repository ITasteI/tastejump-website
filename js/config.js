/**
 * ============================================================
 *  ADMIN-KONFIGURATION
 * ============================================================
 * Diese Datei ist die zentrale Stelle, um Inhalte der Website
 * zu aktualisieren, OHNE den restlichen Code anfassen zu müssen.
 *
 * Ändere hier:
 *  - Download-Link, Version, Dateigröße, Datum
 *  - Spielerstatistiken (Platzhalter für spätere Live-Daten)
 *  - Serverstatus
 *  - News- / Changelog-Einträge
 *
 * Später kann GAME_CONFIG einfach durch einen Fetch von einer
 * echten API ersetzt werden (siehe loadLiveData() in script.js).
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
    icon: "assets/img/icon.jpg"
  },

  // ---------- Download ----------
  // Hinweis: "version" und "releaseDate" werden beim Laden der Seite
  // automatisch durch den neuesten GitHub-Tag überschrieben, sofern
  // die GitHub-API erreichbar ist (siehe github.repo unten sowie
  // syncChangelogFromGitHub() in script.js). Die Werte hier dienen
  // nur als Fallback, falls die API nicht erreichbar ist.
  download: {
    version: "1.7.0",
    fileName: "TasteJumpGame.exe",
    filePath: "downloads/TasteJumpGame.exe",
    fileSizeMB: 73,
    releaseDate: "2026-07-07",
    platform: "Windows 10/11 (64-bit)"
  },

  // ---------- GitHub-Anbindung: Changelog ----------
  // Wird genutzt, um den Changelog sowie die aktuelle Versionsnummer
  // automatisch mit den Tags/Releases des GitHub-Repos abzugleichen.
  github: {
    repo: "ITasteI/platformer3d",
    autoSyncChangelog: true
  },

  // ---------- GitHub-Anbindung: Live-Daten ----------
  // Spielerzahlen & Serverstatus werden aus live-data.json im
  // Website-Repo geladen (siehe syncLiveDataFromGitHub() in script.js).
  //
  // WICHTIG: Um Spielerzahlen oder Serverstatus zu ändern, musst du
  // NICHT die Website neu hochladen! Öffne stattdessen direkt im
  // Browser:
  //   https://github.com/ITasteI/tastejump-website/blob/main/live-data.json
  // Klicke auf das Stift-Symbol (Bearbeiten), ändere die Werte,
  // dann unten auf "Commit changes" klicken. Die Website zieht sich
  // die neuen Werte automatisch (spätestens alle 60 Sekunden, bei
  // jedem Seitenaufruf sowieso).
  liveData: {
    repo: "ITasteI/tastejump-website",
    branch: "main",
    path: "live-data.json",
    autoSync: true
  },

  // ---------- Spielerstatistiken (Platzhalter) ----------
  // FALLBACK, falls live-data.json nicht erreichbar ist.
  stats: {
    playersOnline: 0,
    playersToday: 0,
    playersTotal: 0,
    playersPeak: 0
  },

  // ---------- Serverstatus ----------
  // FALLBACK, falls live-data.json nicht erreichbar ist.
  server: {
    // mögliche Werte: "online", "offline", "maintenance"
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
  // von github.com/ITasteI/platformer3d ersetzt (siehe script.js).
  // Neueste Einträge zuerst.
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
    { src: "assets/screenshots/screenshot1.png", alt: "Spielszene aus TasteJump" }
    // Weitere Einträge einfach hier ergänzen:
    // { src: "assets/screenshots/screenshot2.jpg", alt: "Beschreibung" }
  ],

  // ---------- Footer / Kontakt ----------
  footer: {
    contactEmail: "kontakt@example.com",
    discordUrl: "#",
    social: {
      twitter: "#",
      youtube: "#",
      instagram: "#",
      tiktok: "#"
    },
    copyrightName: "TasteJump Studio"
  }

};
