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
    'nav.trailer': 'Trailer',
    'nav.news': 'News',
    'nav.about': 'About',
    'nav.download': 'Steam',
    'nav.play': 'Steam',
    'nav.screenshots': 'Screenshots',
    'nav.aboutGame': 'About',
    'nav.changelog': 'Changelog',
    'lang.label': 'Language',
    'lang.en': 'English',
    'lang.de': 'Deutsch',

    'home.tagPill': '🎮 TasteJump — Wishlist now',
    'home.heroExploreBtn': 'Explore games',
    'home.windows': 'Windows 10/11',

    'ticker.tastejumpLive': 'TasteJump',
    'ticker.tasteshootSoon': 'TasteShoot – Coming Soon',
    'ticker.releaseDate': 'Out August 5, 2026',
    'ticker.wishlistNow': 'Wishlist now on Steam',

    'games.kicker': 'Games',
    'games.heading': 'Our Games',
    'games.sub': 'Every TasteGames title — today and in the future.',
    'games.badgeAvailable': 'Available',
    'games.badgeWishlist': 'Wishlist',
    'games.badgeComingSoon': 'Coming Soon',
    'games.ctaLearnMore': 'Learn more',
    'games.ctaComingSoon': 'Coming soon',

    'steam.kicker': 'Steam',
    'steam.heading': 'Available on Steam',
    'steam.sub': 'TasteJump releases on Steam — wishlist now so you don\'t miss it.',
    'steam.releaseLabel': 'Release date',
    'steam.platformLabel': 'Platform',
    'steam.platformValue': 'Windows 10/11 (64-bit)',
    'steam.wishlist': 'Wishlist on Steam',
    'steam.getOnSteam': 'Get it on Steam',
    'steam.hint': 'Sold and delivered exclusively through Steam',

    'trailer.kicker': 'Trailer',
    'trailer.heading': 'Watch the Trailer',
    'trailer.sub': 'A first look at TasteJump in motion.',
    'trailer.playBtn': 'Play trailer',

    'news.kicker': 'News',
    'news.heading': 'Updates & Patch Notes',
    'news.sub': 'Updates from every game, loaded automatically from GitHub.',

    'about.kicker': 'About',
    'about.heading': 'About TasteGames',

    'footer.brandTagline': 'An indie game studio crafting handmade worlds worth getting lost in.',
    'footer.tastejumpTagline': 'TasteJump is one of the games from TasteGames — built out of a love for the genre.',
    'footer.contact': 'Contact',
    'footer.discord': 'Discord',
    'footer.discordText': 'Join the community, share feedback and find teammates.',
    'footer.discordBtn': 'Join Discord',
    'footer.socialMedia': 'Social Media',
    'footer.rightsReserved': 'All rights reserved.',

    'game.tagPill': '🎮 A TasteGames Title',
    'game.learnMore': 'Learn more',
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

    'changelog.kicker': 'Updates',
    'changelog.heading': 'Changelog',
    'changelog.sub': 'Every version, bugfix and new feature at a glance.',
    'changelog.badgeRelease': 'Release',
    'changelog.badgeFeature': 'New',
    'changelog.badgeFix': 'Fix',
    'changelog.noDetails': 'No details provided.',

    'tasteshoot.badge': 'Coming Soon',
    'tasteshoot.description': 'A fast-paced shooter from TasteGames — quick rounds, stylized visuals, co-op & competitive. Currently in development.',
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
    'nav.trailer': 'Trailer',
    'nav.news': 'News',
    'nav.about': 'About',
    'nav.download': 'Steam',
    'nav.play': 'Steam',
    'nav.screenshots': 'Screenshots',
    'nav.aboutGame': 'Über das Spiel',
    'nav.changelog': 'Changelog',
    'lang.label': 'Sprache',
    'lang.en': 'English',
    'lang.de': 'Deutsch',

    'home.tagPill': '🎮 TasteJump — jetzt wunschlisten',
    'home.heroExploreBtn': 'Spiele entdecken',
    'home.windows': 'Windows 10/11',

    'ticker.tastejumpLive': 'TasteJump',
    'ticker.tasteshootSoon': 'TasteShoot – Coming Soon',
    'ticker.releaseDate': 'Erscheint am 5. August 2026',
    'ticker.wishlistNow': 'Jetzt auf Steam wunschlisten',

    'games.kicker': 'Games',
    'games.heading': 'Unsere Spiele',
    'games.sub': 'Alle TasteGames-Titel – heute und in Zukunft.',
    'games.badgeAvailable': 'Verfügbar',
    'games.badgeWishlist': 'Wunschliste',
    'games.badgeComingSoon': 'Coming Soon',
    'games.ctaLearnMore': 'Mehr erfahren',
    'games.ctaComingSoon': 'Bald verfügbar',

    'steam.kicker': 'Steam',
    'steam.heading': 'Erhältlich auf Steam',
    'steam.sub': 'TasteJump erscheint auf Steam – jetzt wunschlisten, damit du es nicht verpasst.',
    'steam.releaseLabel': 'Erscheinungsdatum',
    'steam.platformLabel': 'Plattform',
    'steam.platformValue': 'Windows 10/11 (64-bit)',
    'steam.wishlist': 'Auf Steam wunschlisten',
    'steam.getOnSteam': 'Jetzt auf Steam',
    'steam.hint': 'Verkauf und Vertrieb ausschließlich über Steam',

    'trailer.kicker': 'Trailer',
    'trailer.heading': 'Trailer ansehen',
    'trailer.sub': 'Ein erster Blick auf TasteJump in Bewegung.',
    'trailer.playBtn': 'Trailer abspielen',

    'news.kicker': 'News',
    'news.heading': 'Updates & Patch Notes',
    'news.sub': 'Neuigkeiten aus allen Spielen, automatisch von GitHub geladen.',

    'about.kicker': 'About',
    'about.heading': 'Über TasteGames',

    'footer.brandTagline': 'Ein Indie-Game-Studio, das handgemachte Welten erschafft, in denen man sich gerne verliert.',
    'footer.tastejumpTagline': 'TasteJump ist eines der Spiele von TasteGames – gebaut aus Leidenschaft am Genre.',
    'footer.contact': 'Kontakt',
    'footer.discord': 'Discord',
    'footer.discordText': 'Tritt der Community bei, teile Feedback und finde Mitspieler.',
    'footer.discordBtn': 'Discord beitreten',
    'footer.socialMedia': 'Social Media',
    'footer.rightsReserved': 'Alle Rechte vorbehalten.',

    'game.tagPill': '🎮 Ein Spiel von TasteGames',
    'game.learnMore': 'Mehr erfahren',
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

    'changelog.kicker': 'Updates',
    'changelog.heading': 'Changelog',
    'changelog.sub': 'Alle Versionen, Bugfixes und neuen Inhalte im Überblick.',
    'changelog.badgeRelease': 'Release',
    'changelog.badgeFeature': 'Neu',
    'changelog.badgeFix': 'Bugfix',
    'changelog.noDetails': 'Keine Details angegeben.',

    'tasteshoot.badge': 'Coming Soon',
    'tasteshoot.description': 'Ein rasanter Shooter von TasteGames – schnelle Runden, stilisierte Optik, Koop & Competitive. Aktuell in Entwicklung.',
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
