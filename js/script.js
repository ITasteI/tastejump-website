/**
 * ============================================================
 *  TasteGames — Startseiten-Logik
 * ============================================================
 * Liest alle Inhalte aus STUDIO_CONFIG und rendert sie in die
 * entsprechenden DOM-Elemente. STUDIO_CONFIG kommt zunächst aus
 * config.js (Fallback) und wird dann per syncContentFromGitHub()
 * live durch content.json aus dem Website-Repo überschrieben.
 *
 * Mehrsprachige Felder (Taglines, Beschreibungen, Feature-Texte)
 * werden über I18N.pick() ausgelesen (siehe js/i18n.js). Bei
 * Sprachwechsel ("i18n:change") wird alles neu gerendert.
 *
 * TasteJump wird ausschließlich über Steam vertrieben — Download-
 * CTAs verlinken direkt auf die jeweilige Steam-Seite, mit Text,
 * der sich automatisch am Release-Datum orientiert ("Wishlist"
 * davor, "Get it on Steam" danach).
 *
 * Für die Spiele-Detailseiten (z.B. games/tastejump.html) gibt es
 * eigene Skripte (siehe games/*.js) — diese Datei ist nur für die
 * Studio-Startseite zuständig.
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  renderAll();

  initHeaderScroll();
  initMobileNav();

  syncContentFromGitHub();
  syncNewsFromGitHub();

  window.addEventListener('i18n:change', renderAll);

  // Zusätzliche automatische Prüfung, falls die Seite lange geöffnet
  // bleibt (z.B. ein Browser-Tab, der nicht neu geladen wird).
  const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
  setInterval(syncNewsFromGitHub, TWO_HOURS_MS);

  const ONE_MINUTE_MS = 60 * 1000;
  setInterval(syncContentFromGitHub, ONE_MINUTE_MS);
});

function renderAll() {
  renderBrand();
  renderHero();
  renderGamesGrid();
  renderAbout();
  renderFooter();
}

/* ---------------------------------------------------------
 * Marke (Logo/Name im Header & Footer)
 * ------------------------------------------------------- */
function renderBrand() {
  const { studio } = STUDIO_CONFIG;
  setText('brandName', studio.name);
  setText('footerBrandName', studio.name);
  const brandIcon = document.getElementById('brandIcon');
  const footerIcon = document.getElementById('footerBrandIcon');
  if (brandIcon) brandIcon.src = studio.logo;
  if (footerIcon) footerIcon.src = studio.logo;
}

/* ---------------------------------------------------------
 * Hero — Primärer CTA verlinkt auf die Steam-Seite des
 * Vorzeige-Spiels (aktuell TasteJump).
 * ------------------------------------------------------- */
function renderHero() {
  const { studio, games } = STUDIO_CONFIG;
  document.title = `${studio.name} – ${studio.tagline}`;
  setText('heroBrandName', studio.name);
  setText('heroTagline', studio.tagline);

  const featured = (games || []).find(g => g.steamUrl) || null;
  const btn = document.getElementById('heroSteamBtn');
  const label = document.getElementById('heroSteamLabel');
  if (featured && btn) {
    btn.href = featured.steamUrl;
    if (label) label.textContent = steamCtaLabel(featured.releaseDate);
  } else if (btn) {
    btn.style.display = 'none';
  }
}

/* ---------------------------------------------------------
 * Games-Übersicht
 * ------------------------------------------------------- */
function renderGamesGrid() {
  const grid = document.getElementById('gamesGrid');
  if (!grid) return;

  const games = STUDIO_CONFIG.games || [];

  grid.innerHTML = games.map((game, i) => {
    const hasSteam = !!game.steamUrl;
    const banner = game.banner
      ? `<img src="${game.banner}" alt="${escapeHtml(game.name)}" />`
      : `<div class="game-card-banner-placeholder">${escapeHtml(game.name)}</div>`;

    let badge, ctas;
    if (hasSteam) {
      const releasedYet = isReleased(game.releaseDate);
      badge = `<span class="game-status-badge ${releasedYet ? 'available' : 'wishlist'}">${releasedYet ? I18N.t('games.badgeAvailable') : I18N.t('games.badgeWishlist')}</span>`;
      ctas = `
        <a href="${game.detailUrl || '#'}" class="btn btn-ghost" data-goatcounter-click="game-${escapeHtml(game.id)}">${I18N.t('games.ctaLearnMore')}</a>
        <a href="${game.steamUrl}" class="btn btn-steam" target="_blank" rel="noopener" data-goatcounter-click="steam-${escapeHtml(game.id)}">${steamCtaLabel(game.releaseDate)}</a>
      `;
    } else {
      badge = `<span class="game-status-badge coming-soon">${I18N.t('games.badgeComingSoon')}</span>`;
      ctas = `<a href="${game.detailUrl || '#'}" class="btn btn-ghost" aria-disabled="true" data-goatcounter-click="game-${escapeHtml(game.id)}">${I18N.t('games.ctaComingSoon')}</a>`;
    }

    const staggerClass = `reveal reveal-${Math.min(i + 1, 6)}`;

    return `
      <div class="game-card ${staggerClass}">
        <div class="game-card-banner">${banner}${badge}</div>
        <div class="game-card-body">
          <h3>${escapeHtml(game.name)}</h3>
          <p class="game-card-tagline">${escapeHtml(I18N.pick(game.tagline))}</p>
          <p class="game-card-desc">${escapeHtml(I18N.pick(game.shortDescription) || '')}</p>
          <div class="game-card-ctas">${ctas}</div>
        </div>
      </div>
    `;
  }).join('');

  if (window.reinitScrollReveal) window.reinitScrollReveal();
}

/* ---------------------------------------------------------
 * About
 * ------------------------------------------------------- */
function renderAbout() {
  setText('aboutDescription', I18N.pick(STUDIO_CONFIG.studio.description));
}

/* ---------------------------------------------------------
 * Footer
 * ------------------------------------------------------- */
function renderFooter() {
  const { footer } = STUDIO_CONFIG;

  const emailEl = document.getElementById('footerEmail');
  if (emailEl) {
    emailEl.textContent = footer.contactEmail;
    emailEl.href = `mailto:${footer.contactEmail}`;
  }

  const discordEl = document.getElementById('footerDiscord');
  if (discordEl) discordEl.href = footer.discordUrl;

  if (footer.social) {
    const socialIds = { twitter: 'socialTwitter', youtube: 'socialYoutube', instagram: 'socialInstagram', tiktok: 'socialTiktok' };
    for (const [key, id] of Object.entries(socialIds)) {
      const el = document.getElementById(id);
      if (el && footer.social[key]) el.href = footer.social[key];
    }
  }

  setText('footerCopyrightName', footer.copyrightName);
  setText('footerYear', new Date().getFullYear());
}

/* ---------------------------------------------------------
 * Header: Hintergrund beim Scrollen
 * ------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------------------------------------------------------
 * Mobile Navigation
 * ------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------------------------------------------------------
 * News: Releases aus allen Spiele-Repos laden, zusammenführen
 * und nach Datum sortiert anzeigen.
 * ------------------------------------------------------- */
async function syncNewsFromGitHub() {
  const sources = [];
  for (const game of STUDIO_CONFIG.games || []) {
    if (game.githubRepo) sources.push({ repo: game.githubRepo, label: game.name });
  }
  if (sources.length === 0) return;

  try {
    const results = await Promise.all(sources.map(async (src) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${src.repo}/releases?per_page=10`, {
          headers: { Accept: 'application/vnd.github+json' }
        });
        if (!res.ok) return [];
        const releases = await res.json();
        return releases
          .filter(r => !r.draft)
          .map(r => ({ ...r, _label: src.label }));
      } catch {
        return [];
      }
    }));

    // Badge-Typ (Release/Neu/Bugfix) je Quelle einzeln berechnen —
    // jede Quelle hat ihre eigene Versionszählung.
    const entriesBySource = results.flatMap(releases => {
      const sorted = [...releases].sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
      const versions = sorted.map(r => parseSemver(r.tag_name));
      return sorted.map((release, i) => ({
        label: release._label,
        version: versions[i].raw,
        date: release.published_at ? release.published_at.slice(0, 10) : '',
        type: classifyRelease(versions[i], versions[i + 1]),
        changes: parseReleaseBody(release.body),
        _publishedAt: release.published_at
      }));
    });

    const entries = entriesBySource
      .sort((a, b) => new Date(b._publishedAt) - new Date(a._publishedAt))
      .slice(0, 12);

    if (entries.length === 0) return;

    window._lastNewsEntries = entries;
    renderNews(entries);
  } catch (err) {
    console.warn('News-Sync fehlgeschlagen:', err);
  }
}

function renderNews(entries) {
  const list = document.getElementById('newsList');
  if (!list) return;

  const badgeLabels = { release: I18N.t('changelog.badgeRelease'), feature: I18N.t('changelog.badgeFeature'), fix: I18N.t('changelog.badgeFix') };

  list.innerHTML = entries.map((entry, i) => `
    <div class="changelog-entry reveal reveal-${Math.min(i + 1, 6)}">
      <div class="changelog-version">
        <span class="news-source">${escapeHtml(entry.label)}</span>
        <span class="v">v${escapeHtml(entry.version)}</span>
        <span class="d">${formatDate(entry.date)}</span>
        <span class="changelog-badge ${entry.type}">${badgeLabels[entry.type] || entry.type}</span>
      </div>
      <ul class="changelog-changes">
        ${entry.changes.map(c => typeof c === 'object'
          ? `<li class="changelog-section-title">${escapeHtml(c.text)}</li>`
          : `<li>${escapeHtml(c)}</li>`
        ).join('')}
      </ul>
    </div>
  `).join('');

  if (window.reinitScrollReveal) window.reinitScrollReveal();
}

// News neu rendern bei Sprachwechsel (Badge-Labels/Datumsformat), ohne
// erneut bei GitHub abzufragen — nutzt die zuletzt geladenen Einträge.
window.addEventListener('i18n:change', () => {
  if (window._lastNewsEntries) renderNews(window._lastNewsEntries);
});

/* ---------------------------------------------------------
 * Alle übrigen Inhalte (Studio, Spieleliste, Footer) aus
 * content.json im Website-Repo laden — dort direkt auf
 * github.com bearbeitbar, ganz ohne Website neu hochzuladen.
 * ------------------------------------------------------- */
async function syncContentFromGitHub() {
  const { content } = STUDIO_CONFIG;
  if (!content || !content.autoSync || !content.repo) return;

  try {
    const url = `https://raw.githubusercontent.com/${content.repo}/${content.branch}/${content.path}?t=${Date.now()}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`GitHub antwortete mit ${res.status}`);

    const data = await res.json();
    if (data.studio) STUDIO_CONFIG.studio = data.studio;
    if (data.games) STUDIO_CONFIG.games = data.games;
    if (data.footer) STUDIO_CONFIG.footer = data.footer;

    renderAll();
  } catch (err) {
    // Fallback-Daten aus config.js bleiben unverändert sichtbar.
    console.warn('Content-Sync fehlgeschlagen, nutze Fallback-Daten:', err);
  }
}

/** Zerlegt einen Tag-Namen wie "v1.4.1" in vergleichbare Zahlen. */
function parseSemver(tagName) {
  const raw = tagName.replace(/^v/i, '');
  const [major = 0, minor = 0, patch = 0] = raw.split('.').map(n => parseInt(n, 10) || 0);
  return { raw, major, minor, patch };
}

/** Leitet aus dem Versionssprung zum Vorgänger einen Badge-Typ ab. */
function classifyRelease(current, previous) {
  if (!previous) return 'release';
  if (current.major > previous.major) return 'release';
  if (current.minor > previous.minor) return 'feature';
  return 'fix';
}

/** Wandelt den Markdown-Release-Text in eine flache Liste von Änderungen um. */
function parseReleaseBody(body) {
  if (!body) return [I18N.t('changelog.noDetails')];

  const lines = body.split('\n').map(l => l.trim()).filter(Boolean);
  const changes = [];

  for (const line of lines) {
    if (line.startsWith('#')) {
      changes.push({ text: line.replace(/^#+\s*/, ''), heading: true });
    } else if (line.startsWith('-') || line.startsWith('*')) {
      changes.push(line.replace(/^[-*]\s*/, ''));
    } else {
      changes.push(line);
    }
  }

  return changes.length ? changes : [I18N.t('changelog.noDetails')];
}

/* ---------------------------------------------------------
 * Hilfsfunktionen
 * ------------------------------------------------------- */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function formatNumber(n) {
  return new Intl.NumberFormat(I18N.locale()).format(n);
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return new Intl.DateTimeFormat(I18N.locale(), { day: '2-digit', month: 'long', year: 'numeric' }).format(d);
}

/** Ist das Release-Datum bereits erreicht (oder kein Datum bekannt = ja)? */
function isReleased(releaseDate) {
  if (!releaseDate) return true;
  return new Date() >= new Date(releaseDate);
}

/** "Wishlist on Steam" vor Release, "Get it on Steam" danach — automatisch anhand des echten Datums. */
function steamCtaLabel(releaseDate) {
  return isReleased(releaseDate) ? I18N.t('steam.getOnSteam') : I18N.t('steam.wishlist');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
