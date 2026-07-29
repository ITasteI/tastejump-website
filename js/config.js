/**
 * ============================================================
 *  ADMIN-KONFIGURATION — TasteGames Studio-Startseite
 * ============================================================
 * WICHTIG: Fast alle Inhalte hier sind nur noch ein FALLBACK,
 * der greift, falls GitHub mal nicht erreichbar ist. Der Normalfall
 * ist: die Seite lädt alle Inhalte live aus content.json im
 * Website-Repo, siehe:
 *
 *   https://github.com/ITasteI/tastejump-website/blob/main/content.json
 *
 * Um Studio-Infos, die Spieleliste oder Kontakt-/Social-Links zu
 * ändern, editierst du NUR content.json direkt im Browser auf GitHub
 * (Stift-Symbol, ändern, "Commit changes") — die Website lädt sich
 * die neuen Werte automatisch, ganz ohne erneutes Hochladen/Deploy.
 *
 * Mehrsprachige Textfelder (Taglines, Beschreibungen, Feature-Texte)
 * stehen als { "en": "...", "de": "..." } da — siehe js/i18n.js für
 * das Übersetzungssystem. Eigennamen wie "TasteGames"/"TasteJump"
 * bleiben einfache Strings, die brauchen keine Übersetzung.
 *
 * Um ein neues Spiel hinzuzufügen: einfach einen weiteren Eintrag
 * im "games"-Array von content.json ergänzen (siehe dortige Struktur).
 * Für ein Spiel mit eigener Detailseite (Changelog/Screenshots/Trailer)
 * zusätzlich eine games/<id>-content.json + games/<id>.html anlegen,
 * analog zu games/tastejump-content.json + games/tastejump.html.
 *
 * WICHTIG: TasteJump wird ausschließlich über Steam vertrieben (Release
 * 05.08.2026, siehe games[].steamUrl/releaseDate). Der frühere
 * eigenständige Launcher wurde eingestellt.
 * ============================================================
 */

const STUDIO_CONFIG = {

  // ---------- Studio-Infos ----------
  studio: {
    name: "TasteGames",
    tagline: "Indie games, built with passion.",
    description: {
      en: "TasteGames is an indie game studio crafting handmade worlds worth getting lost in. Small team, big love for the genre.",
      de: "TasteGames ist ein Indie-Game-Studio, das handgemachte Welten erschafft, in denen man sich gerne verliert. Kleines Team, große Liebe zum Genre."
    },
    logo: "assets/img/icon.jpg"
  },

  // ---------- Spieleübersicht ----------
  // FALLBACK, falls content.json nicht erreichbar ist. "githubRepo"
  // wird genutzt, um im News-Bereich automatisch die Releases dieses
  // Spiels mit anzuzeigen (null = noch kein Repo / kein Feed).
  // status: "available" (grünes Badge, im Handel) | "wishlist"
  // (vor Release, verlinkt auf Steam-Wishlist) | "coming-soon"
  // (noch keine Store-Seite).
  games: [
    {
      id: "tastejump",
      name: "TasteJump",
      status: "wishlist",
      tagline: { en: "Jump, run and discover a world full of color and chaos.", de: "Spring, renn und entdecke eine Welt voller Farbe und Chaos." },
      shortDescription: { en: "A fast-paced 3D platformer with five handcrafted worlds, fair jumps and co-op multiplayer. Coming to Steam August 5.", de: "Ein schneller 3D-Plattformer mit fünf handgefertigten Welten, fairen Sprüngen und Koop-Multiplayer. Ab 5. August auf Steam." },
      icon: "assets/img/icon.jpg",
      banner: "assets/screenshots/screenshot-meadowlands-night.jpg",
      detailUrl: "games/tastejump.html",
      githubRepo: "ITasteI/platformer3d",
      steamUrl: "https://store.steampowered.com/app/4962090/TasteJump/",
      releaseDate: "2026-08-05"
    },
    {
      id: "tasteshoot",
      name: "TasteShoot",
      status: "coming-soon",
      tagline: { en: "A fast-paced shooter from TasteGames — coming soon.", de: "Ein rasanter Shooter von TasteGames – bald verfügbar." },
      shortDescription: { en: "Quick rounds, stylized visuals, co-op & competitive — currently in development.", de: "Schnelle Runden, stilisierte Optik, Koop & Competitive – aktuell in Entwicklung." },
      icon: null,
      banner: null,
      detailUrl: "games/tasteshoot.html",
      githubRepo: null,
      steamUrl: null,
      releaseDate: null
    }
  ],

  // ---------- GitHub-Anbindung: News ----------
  github: {},

  // ---------- GitHub-Anbindung: Alle Live-Inhalte ----------
  // studio, games und footer werden aus content.json im Website-Repo
  // geladen (siehe syncContentFromGitHub() in script.js).
  content: {
    repo: "ITasteI/tastejump-website",
    branch: "main",
    path: "content.json",
    autoSync: true
  },

  // ---------- Footer / Kontakt ----------
  // FALLBACK, falls content.json nicht erreichbar ist.
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
