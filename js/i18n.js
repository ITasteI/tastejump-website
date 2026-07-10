/**
 * ============================================================
 *  TasteGames — Internationalisierung (i18n)
 * ============================================================
 * Wird als ERSTES Skript auf jeder Seite eingebunden (vor config.js
 * und script.js), da andere Skripte I18N.t() / I18N.pick() nutzen.
 *
 * Sprache:
 *  - Standard ist Englisch ("en"), unabhängig davon, was der
 *    Browser meldet — TasteGames richtet sich international aus.
 *  - Nutzer können über das Sprachmenü oben rechts auf Deutsch
 *    wechseln; die Wahl wird in localStorage gemerkt.
 *
 * Zwei Arten von Text:
 *  1. Statischer UI-Text (Nav, Buttons, Überschriften, Labels)
 *     -> steckt in STRINGS unten, wird per data-i18n="key" im
 *     HTML markiert und von applyStaticStrings() eingesetzt.
 *  2. Inhalte aus content.json / *-content.json (Taglines,
 *     Beschreibungen, Feature-Texte, Welten, Screenshots-Alt-Texte)
 *     -> liegen dort als { "en": "...", "de": "..." } vor und werden
 *     von den jeweiligen render*()-Funktionen per I18N.pick(feld)
 *     ausgelesen. Bei Sprachwechsel feuert ein "i18n:change"-Event,
 *     auf das jede Seite reagiert und neu rendert.
 *
 * Hinweis: Die News/Changelog-Einträge selbst (Release-Notes von
 * GitHub) werden NICHT automatisch übersetzt — das sind externe,
 * frei geschriebene Texte des Entwicklers, keine UI-Strings.
 * ============================================================
 */

const I18N_STRINGS = {
  en: {
    'nav.menuToggle': 'Toggle menu',
    'nav.home': 'Home',
    'nav.games': 'Games',
    'nav.allGames': 'All Games',
    'nav.launcher': 'Launcher',
    'nav.news': 'News',
    'nav.about': 'About',
    'nav.download': 'Download',
    'nav.play': 'Play',
    'nav.screenshots': 'Screenshots',
    'nav.aboutGame': 'About',
    'nav.stats': 'Stats',
    'nav.changelog': 'Changelog',
    'lang.label': 'Language',
    'lang.en': 'English',
    'lang.de': 'Deutsch',

    'home.tagPill': '🎮 TasteJump is live',
    'home.heroDownloadBtn': 'Download Launcher',
    'home.heroExploreBtn': 'Explore games',
    'home.launcherLabel': 'Launcher',
    'home.windows': 'Windows 10/11',

    'ticker.tastejumpLive': 'TasteJump available',
    'ticker.tasteshootSoon': 'TasteShoot – Coming Soon',
    'ticker.oneLauncher': 'One launcher for every game',
    'ticker.autoUpdates': 'Automatic updates',

    'games.kicker': 'Games',
    'games.heading': 'Our Games',
    'games.sub': 'Every TasteGames title — today and in the future, all playable through the Launcher.',
    'games.badgeAvailable': 'Available',
    'games.badgeComingSoon': 'Coming Soon',
    'games.ctaLearnMore': 'Learn more',
    'games.ctaComingSoon': 'Coming soon',

    'launcher.kicker': 'Launcher',
    'launcher.heading': 'The TasteGames Launcher',
    'launcher.sub': 'One app for every TasteGames title — install, play, stay up to date.',
    'launcher.fileBadge': 'Setup',
    'launcher.cardTitle': 'TasteGames Launcher',
    'launcher.labelVersion': 'Version',
    'launcher.labelSize': 'File size',
    'launcher.labelPlatform': 'Platform',
    'launcher.platformValue': 'Windows 10/11 (64-bit)',
    'launcher.downloadBtn': 'Download Setup',
    'launcher.downloadHint': 'Installs & updates every TasteGames title automatically',

    'news.kicker': 'News',
    'news.heading': 'Updates & Patch Notes',
    'news.sub': 'Updates from every game and the Launcher, loaded automatically from GitHub.',

    'about.kicker': 'About',
    'about.heading': 'About TasteGames',

    'footer.brandTagline': 'An indie game studio building multiple games, delivered through one shared launcher.',
    'footer.tastejumpTagline': 'TasteJump is one of the games from TasteGames — built out of a love for the genre.',
    'footer.contact': 'Contact',
    'footer.discord': 'Discord',
    'footer.discordText': 'Join the community, share feedback and find teammates.',
    'footer.discordBtn': 'Join Discord',
    'footer.socialMedia': 'Social Media',
    'footer.rightsReserved': 'All rights reserved.',

    'game.tagPill': '🎮 A TasteGames Title',
    'game.playViaLauncher': 'Play via Launcher',
    'game.learnMore': 'Learn more',
    'game.versionLabel': 'Version',
    'game.pageTitleSuffix': 'A TasteGames Title | 3D Platformer',

    'screenshots.kicker': 'Gallery',
    'screenshots.heading': 'Screenshots',
    'screenshots.sub': 'A look into the worlds of TasteJump.',
    'screenshots.empty': 'No screenshots available yet.',
    'lightbox.close': 'Close',

    'aboutGame.kicker': 'About the Game',
    'aboutGame.heading': 'What is TasteJump?',
    'aboutGame.playtime': 'Playtime',
    'aboutGame.multiplayer': 'Multiplayer',
    'aboutGame.worldOverview': 'World Overview',

    'stats.kicker': 'Live',
    'stats.heading': 'Player Statistics',
    'stats.sub': 'Current stats for TasteJump.',
    'stats.online': 'Players online',
    'stats.today': 'Players today',
    'stats.total': 'Total players',
    'stats.peak': 'All-time peak',
    'stats.serverLoading': 'Loading server status…',
    'stats.lastChecked': 'Last checked:',

    'server.online': 'Server Online',
    'server.offline': 'Server Offline',
    'server.maintenance': 'Under Maintenance',
    'server.unknown': 'Status unknown',

    'changelog.kicker': 'Updates',
    'changelog.heading': 'Changelog',
    'changelog.sub': 'Every version, bugfix and new feature at a glance.',
    'changelog.badgeRelease': 'Release',
    'changelog.badgeFeature': 'New',
    'changelog.badgeFix': 'Fix',
    'changelog.noDetails': 'No details provided.',

    'tasteshoot.badge': 'Coming Soon',
    'tasteshoot.description': 'A fast-paced shooter from TasteGames — quick rounds, stylized visuals, co-op & competitive. Currently in development, coming soon through the TasteGames Launcher.',
    'tasteshoot.backBtn': 'Back to all games',

    '404.title': 'Page not found – TasteGames',
    '404.text': "This page doesn't exist — maybe it jumped into another zone of the tower.",
    '404.backBtn': 'Back to homepage'
  },

  de: {
    'nav.menuToggle': 'Menü öffnen',
    'nav.home': 'Home',
    'nav.games': 'Games',
    'nav.allGames': 'Alle Spiele',
    'nav.launcher': 'Launcher',
    'nav.news': 'News',
    'nav.about': 'About',
    'nav.download': 'Download',
    'nav.play': 'Spielen',
    'nav.screenshots': 'Screenshots',
    'nav.aboutGame': 'Über das Spiel',
    'nav.stats': 'Statistiken',
    'nav.changelog': 'Changelog',
    'lang.label': 'Sprache',
    'lang.en': 'English',
    'lang.de': 'Deutsch',

    'home.tagPill': '🎮 TasteJump jetzt verfügbar',
    'home.heroDownloadBtn': 'Launcher herunterladen',
    'home.heroExploreBtn': 'Spiele entdecken',
    'home.launcherLabel': 'Launcher',
    'home.windows': 'Windows 10/11',

    'ticker.tastejumpLive': 'TasteJump verfügbar',
    'ticker.tasteshootSoon': 'TasteShoot – Coming Soon',
    'ticker.oneLauncher': 'Ein Launcher für alle Spiele',
    'ticker.autoUpdates': 'Automatische Updates',

    'games.kicker': 'Games',
    'games.heading': 'Unsere Spiele',
    'games.sub': 'Alle TasteGames-Titel – heute und in Zukunft, allesamt über den Launcher spielbar.',
    'games.badgeAvailable': 'Verfügbar',
    'games.badgeComingSoon': 'Coming Soon',
    'games.ctaLearnMore': 'Mehr erfahren',
    'games.ctaComingSoon': 'Bald verfügbar',

    'launcher.kicker': 'Launcher',
    'launcher.heading': 'Der TasteGames Launcher',
    'launcher.sub': 'Eine App für alle TasteGames-Titel – installieren, spielen, aktuell halten.',
    'launcher.fileBadge': 'Setup',
    'launcher.cardTitle': 'TasteGames Launcher',
    'launcher.labelVersion': 'Version',
    'launcher.labelSize': 'Dateigröße',
    'launcher.labelPlatform': 'Plattform',
    'launcher.platformValue': 'Windows 10/11 (64-bit)',
    'launcher.downloadBtn': 'Setup herunterladen',
    'launcher.downloadHint': 'Installiert & aktualisiert alle TasteGames-Titel automatisch',

    'news.kicker': 'News',
    'news.heading': 'Updates & Patch Notes',
    'news.sub': 'Neuigkeiten aus allen Spielen und dem Launcher, automatisch von GitHub geladen.',

    'about.kicker': 'About',
    'about.heading': 'Über TasteGames',

    'footer.brandTagline': 'Ein Indie-Game-Studio, das mehrere Spiele über einen gemeinsamen Launcher bereitstellt.',
    'footer.tastejumpTagline': 'TasteJump ist eines der Spiele von TasteGames – gebaut aus Leidenschaft am Genre.',
    'footer.contact': 'Kontakt',
    'footer.discord': 'Discord',
    'footer.discordText': 'Tritt der Community bei, teile Feedback und finde Mitspieler.',
    'footer.discordBtn': 'Discord beitreten',
    'footer.socialMedia': 'Social Media',
    'footer.rightsReserved': 'Alle Rechte vorbehalten.',

    'game.tagPill': '🎮 Ein Spiel von TasteGames',
    'game.playViaLauncher': 'Über den Launcher spielen',
    'game.learnMore': 'Mehr erfahren',
    'game.versionLabel': 'Version',
    'game.pageTitleSuffix': 'Ein Spiel von TasteGames | 3D-Plattformer',

    'screenshots.kicker': 'Galerie',
    'screenshots.heading': 'Screenshots',
    'screenshots.sub': 'Ein Blick in die Welten von TasteJump.',
    'screenshots.empty': 'Noch keine Screenshots hinterlegt.',
    'lightbox.close': 'Schließen',

    'aboutGame.kicker': 'Über das Spiel',
    'aboutGame.heading': 'Was ist TasteJump?',
    'aboutGame.playtime': 'Spielzeit',
    'aboutGame.multiplayer': 'Multiplayer',
    'aboutGame.worldOverview': 'Weltenübersicht',

    'stats.kicker': 'Live',
    'stats.heading': 'Spielerstatistiken',
    'stats.sub': 'Aktuelle Werte für TasteJump.',
    'stats.online': 'Spieler online',
    'stats.today': 'Spieler heute',
    'stats.total': 'Gesamtspieler',
    'stats.peak': 'Rekordspielerzahl',
    'stats.serverLoading': 'Serverstatus wird geladen…',
    'stats.lastChecked': 'Zuletzt geprüft:',

    'server.online': 'Server Online',
    'server.offline': 'Server Offline',
    'server.maintenance': 'Wartungsarbeiten',
    'server.unknown': 'Status unbekannt',

    'changelog.kicker': 'Updates',
    'changelog.heading': 'Changelog',
    'changelog.sub': 'Alle Versionen, Bugfixes und neuen Inhalte im Überblick.',
    'changelog.badgeRelease': 'Release',
    'changelog.badgeFeature': 'Neu',
    'changelog.badgeFix': 'Bugfix',
    'changelog.noDetails': 'Keine Details angegeben.',

    'tasteshoot.badge': 'Coming Soon',
    'tasteshoot.description': 'Ein rasanter Shooter von TasteGames – schnelle Runden, stilisierte Optik, Koop & Competitive. Aktuell in Entwicklung, folgt bald über den TasteGames Launcher.',
    'tasteshoot.backBtn': 'Zurück zu allen Spielen',

    '404.title': 'Seite nicht gefunden – TasteGames',
    '404.text': 'Diese Seite gibt es nicht – vielleicht ist sie in eine andere Zone des Turms gesprungen.',
    '404.backBtn': 'Zurück zur Startseite'
  }
};

const I18N = {
  STORAGE_KEY: 'tastegames_lang',
  DEFAULT: 'en',
  SUPPORTED: ['en', 'de'],

  /** Aktuell aktive Sprache — Standard ist Englisch, außer der Nutzer hat bewusst gewechselt. */
  current() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return this.SUPPORTED.includes(saved) ? saved : this.DEFAULT;
  },

  /** Übersetzt einen statischen UI-Text-Schlüssel. */
  t(key) {
    const lang = this.current();
    return (I18N_STRINGS[lang] && I18N_STRINGS[lang][key]) || I18N_STRINGS.en[key] || key;
  },

  /**
   * Liest ein mehrsprachiges Inhaltsfeld aus content.json o.ä. aus.
   * Akzeptiert sowohl { en, de }-Objekte als auch einfache Strings
   * (z.B. Eigennamen wie "TasteJump", die keine Übersetzung brauchen).
   */
  pick(field) {
    if (field === null || field === undefined) return field;
    if (typeof field === 'string') return field;
    const lang = this.current();
    return field[lang] ?? field.en ?? Object.values(field)[0];
  },

  /** Locale-String für Intl.NumberFormat/DateTimeFormat passend zur aktuellen Sprache. */
  locale() {
    return this.current() === 'de' ? 'de-DE' : 'en-US';
  },

  setLang(lang) {
    if (!this.SUPPORTED.includes(lang) || lang === this.current()) return;
    localStorage.setItem(this.STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    this.applyStaticStrings();
    this.updateSwitcherUI();
    window.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang } }));
  },

  /** Setzt textContent für alle Elemente mit data-i18n="key". */
  applyStaticStrings(root = document) {
    root.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = this.t(el.getAttribute('data-i18n'));
    });
    root.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.getAttribute('data-i18n-attr').split('|').forEach(pair => {
        const [attr, key] = pair.split(':');
        if (attr && key) el.setAttribute(attr, this.t(key));
      });
    });
  },

  /** Baut das Sprachmenü oben rechts in der Navigation auf. */
  initSwitcher() {
    const navLinks = document.getElementById('navLinks');
    if (!navLinks || document.getElementById('langSwitcher')) return;

    const li = document.createElement('li');
    li.className = 'lang-switcher';
    li.id = 'langSwitcher';
    li.innerHTML = `
      <button class="lang-switcher-btn" id="langSwitcherBtn" aria-haspopup="true" aria-expanded="false">
        <span id="langSwitcherCurrent">${this.current().toUpperCase()}</span>
        <span class="lang-caret">▾</span>
      </button>
      <ul class="lang-dropdown" id="langDropdown">
        <li><button type="button" data-lang="en">${this.t('lang.en')}</button></li>
        <li><button type="button" data-lang="de">${this.t('lang.de')}</button></li>
      </ul>
    `;
    navLinks.appendChild(li);

    const btn = document.getElementById('langSwitcherBtn');
    const dropdown = document.getElementById('langDropdown');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });

    dropdown.querySelectorAll('button[data-lang]').forEach(optBtn => {
      optBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.setLang(optBtn.getAttribute('data-lang'));
        dropdown.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });

    this.updateSwitcherUI();
  },

  updateSwitcherUI() {
    const current = document.getElementById('langSwitcherCurrent');
    if (current) current.textContent = this.current().toUpperCase();
    document.querySelectorAll('#langDropdown button[data-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === this.current());
    });
  },

  init() {
    document.documentElement.lang = this.current();
    this.initSwitcher();
    this.applyStaticStrings();
  }
};

document.addEventListener('DOMContentLoaded', () => I18N.init());
