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
 * Um Studio-Infos, Launcher-Daten, die Spieleliste oder Kontakt-/
 * Social-Links zu ändern, editierst du NUR content.json direkt im
 * Browser auf GitHub (Stift-Symbol, ändern, "Commit changes") — die
 * Website lädt sich die neuen Werte automatisch, ganz ohne erneutes
 * Hochladen/Deploy.
 *
 * Um ein neues Spiel hinzuzufügen: einfach einen weiteren Eintrag
 * im "games"-Array von content.json ergänzen (siehe dortige Struktur).
 * Für ein Spiel mit eigener Detailseite (Stats/Changelog/Screenshots)
 * zusätzlich eine games/<id>-content.json + games/<id>.html analog zu
 * games/tastejump-content.json + games/tastejump.html anlegen.
 * ============================================================
 */

const STUDIO_CONFIG = {

  // ---------- Studio-Infos ----------
  studio: {
    name: "TasteGames",
    tagline: "One Launcher. Multiple Games.",
    description: "TasteGames ist ein Indie-Game-Studio, das mehrere Spiele entwickelt und diese über einen gemeinsamen Launcher bereitstellt. Ein Konto, eine App, eure ganze Spielebibliothek.",
    logo: "assets/img/icon.jpg"
  },

  // ---------- Launcher-Download ----------
  // Fallback, falls die Launcher-Release-API nicht erreichbar ist.
  // Wird automatisch durch das neueste Release von github.launcherRepo
  // überschrieben (siehe syncLauncherFromGitHub() in script.js).
  launcher: {
    version: "1.2.1",
    fileName: "TasteGames.Launcher.exe",
    filePath: "https://github.com/ITasteI/taste-launcher/releases/download/v1.2.1/TasteGames.Launcher.exe",
    fileSizeMB: 85,
    features: [
      { icon: "🎮", title: "Alle Spiele an einem Ort", text: "Deine komplette TasteGames-Bibliothek in einer einzigen App." },
      { icon: "🔄", title: "Automatische Updates", text: "Neue Versionen werden automatisch erkannt und installiert." },
      { icon: "⚡", title: "Einfache Installation", text: "Ein Klick genügt – kein manuelles Entpacken mehr nötig." },
      { icon: "🚀", title: "Schnelle Downloads", text: "Optimierte Downloads direkt von GitHub-Releases." },
      { icon: "📚", title: "Zentrale Spielebibliothek", text: "Übersicht über installierte, verfügbare und kommende Titel." },
      { icon: "🔮", title: "Zukunftssicher", text: "Neue TasteGames-Titel erscheinen automatisch in deiner Bibliothek." }
    ]
  },

  // ---------- Spieleübersicht ----------
  // FALLBACK, falls content.json nicht erreichbar ist. "githubRepo"
  // wird genutzt, um im News-Bereich automatisch die Releases dieses
  // Spiels mit anzuzeigen (null = noch kein Repo / kein Feed).
  games: [
    {
      id: "tastejump",
      name: "TasteJump",
      status: "available",
      tagline: "Spring, renn und entdecke eine Welt voller Farbe und Chaos.",
      shortDescription: "Ein schneller 3D-Plattformer mit fünf handgefertigten Welten, fairen Sprüngen und Koop-Multiplayer.",
      icon: "assets/img/icon.jpg",
      banner: "assets/screenshots/screenshot-worldgate.jpg",
      detailUrl: "games/tastejump.html",
      githubRepo: "ITasteI/platformer3d"
    },
    {
      id: "tasteshoot",
      name: "TasteShoot",
      status: "coming-soon",
      tagline: "Ein rasanter Shooter von TasteGames – bald verfügbar.",
      shortDescription: "Schnelle Runden, stilisierte Optik, Koop & Competitive – aktuell in Entwicklung.",
      icon: null,
      banner: null,
      detailUrl: "games/tasteshoot.html",
      githubRepo: null
    }
  ],

  // ---------- GitHub-Anbindung: Launcher & News ----------
  github: {
    launcherRepo: "ITasteI/taste-launcher"
  },

  // ---------- GitHub-Anbindung: Alle Live-Inhalte ----------
  // studio, launcher, games und footer werden aus content.json im
  // Website-Repo geladen (siehe syncContentFromGitHub() in script.js).
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
