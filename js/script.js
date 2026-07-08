/**
 * ============================================================
 *  TasteGames — Startseiten-Logik
 * ============================================================
 * Liest alle Inhalte aus STUDIO_CONFIG und rendert sie in die
 * entsprechenden DOM-Elemente. STUDIO_CONFIG kommt zunächst aus
 * config.js (Fallback) und wird dann per syncContentFromGitHub()
 * live durch content.json aus dem Website-Repo überschrieben.
 *
 * Für die Spiele-Detailseiten (z.B. games/tastejump.html) gibt es
 * eigene Skripte (siehe games/*.js) — diese Datei ist nur für die
 * Studio-Startseite zuständig.
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  renderBrand();
  renderHero();
  renderGamesGrid();
  renderLauncherFeatures();
  renderLauncherDownload();
  renderAbout();
  renderFooter();

  initHeaderScroll();
  initMobileNav();

  syncLauncherFromGitHub();
  syncContentFromGitHub();
  syncNewsFromGitHub();

  // Zusätzliche automatische Prüfung, falls die Seite lange geöffnet
  // bleibt (z.B. ein Browser-Tab, der nicht neu geladen wird).
  const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
  setInterval(syncLauncherFromGitHub, TWO_HOURS_MS);
  setInterval(syncNewsFromGitHub, TWO_HOURS_MS);

  const ONE_MINUTE_MS = 60 * 1000;
  setInterval(syncContentFromGitHub, ONE_MINUTE_MS);
});

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
 * Hero
 * ------------------------------------------------------- */
function renderHero() {
  const { studio } = STUDIO_CONFIG;
  document.title = `${studio.name} – ${studio.tagline}`;
  setText('heroBrandName', studio.name);
  setText('heroTagline', studio.tagline);
}

/* ---------------------------------------------------------
 * Games-Übersicht
 * ------------------------------------------------------- */
function renderGamesGrid() {
  const grid = document.getElementById('gamesGrid');
  if (!grid) return;

  const games = STUDIO_CONFIG.games || [];

  grid.innerHTML = games.map((game, i) => {
    const isAvailable = game.status === 'available';
    const banner = game.banner
      ? `<img src="${game.banner}" alt="${escapeHtml(game.name)}" loading="lazy" />`
      : `<div class="game-card-banner-placeholder">${escapeHtml(game.name)}</div>`;
    const badge = isAvailable
      ? '<span class="game-status-badge available">Verfügbar</span>'
      : '<span class="game-status-badge coming-soon">Coming Soon</span>';
    const ctaHref = game.detailUrl || '#';
    const ctaLabel = isAvailable ? 'Mehr erfahren' : 'Bald verfügbar';
    const ctaClass = isAvailable ? 'btn btn-primary' : 'btn btn-ghost';
    const ctaAttrs = isAvailable ? '' : 'aria-disabled="true"';
    const staggerClass = `reveal reveal-${Math.min(i + 1, 6)}`;

    return `
      <div class="game-card ${staggerClass}">
        <div class="game-card-banner">${banner}${badge}</div>
        <div class="game-card-body">
          <h3>${escapeHtml(game.name)}</h3>
          <p class="game-card-tagline">${escapeHtml(game.tagline)}</p>
          <p class="game-card-desc">${escapeHtml(game.shortDescription || '')}</p>
          <a href="${ctaHref}" class="${ctaClass}" ${ctaAttrs} data-goatcounter-click="game-${escapeHtml(game.id)}">${ctaLabel}</a>
        </div>
      </div>
    `;
  }).join('');

  if (window.reinitScrollReveal) window.reinitScrollReveal();
}

/* ---------------------------------------------------------
 * Launcher: Feature-Grid
 * ------------------------------------------------------- */
function renderLauncherFeatures() {
  const grid = document.getElementById('launcherFeatureGrid');
  if (!grid) return;

  const features = STUDIO_CONFIG.launcher.features || [];
  grid.innerHTML = features.map((f, i) => `
    <div class="feature-card reveal reveal-${Math.min(i + 1, 6)}">
      <span class="f-icon">${f.icon}</span>
      <h3>${escapeHtml(f.title)}</h3>
      <p>${escapeHtml(f.text)}</p>
    </div>
  `).join('');

  if (window.reinitScrollReveal) window.reinitScrollReveal();
}

/* ---------------------------------------------------------
 * Launcher-Download
 * ------------------------------------------------------- */
function renderLauncherDownload() {
  const { launcher } = STUDIO_CONFIG;
  if (!launcher) return;

  setText('launcherVersion', launcher.version);
  setText('launcherSize', `${launcher.fileSizeMB} MB`);
  setText('heroLauncherVersion', launcher.version);

  const btn = document.getElementById('launcherBtn');
  if (btn) btn.href = launcher.filePath;
}

/* ---------------------------------------------------------
 * About
 * ------------------------------------------------------- */
function renderAbout() {
  setText('aboutDescription', STUDIO_CONFIG.studio.description);
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
 * Launcher-Download automatisch vom neuesten Release des
 * Launcher-Repos übernehmen (Version, Dateiname, Größe, Link).
 * ------------------------------------------------------- */
async function syncLauncherFromGitHub() {
  const { github } = STUDIO_CONFIG;
  if (!github || !github.launcherRepo) return;

  try {
    const res = await fetch(`https://api.github.com/repos/${github.launcherRepo}/releases?per_page=5`, {
      headers: { Accept: 'application/vnd.github+json' }
    });
    if (!res.ok) throw new Error(`GitHub API antwortete mit ${res.status}`);

    const releases = await res.json();
    const published = releases
      .filter(r => !r.draft)
      .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
    if (published.length === 0) return;

    const latest = published[0];
    const asset = latest.assets && latest.assets.find(a => a.name.endsWith('.exe'))
      || (latest.assets && latest.assets[0]);
    if (!asset) return;

    STUDIO_CONFIG.launcher.version = parseSemver(latest.tag_name).raw;
    STUDIO_CONFIG.launcher.fileName = asset.name;
    STUDIO_CONFIG.launcher.filePath = asset.browser_download_url;
    STUDIO_CONFIG.launcher.fileSizeMB = Math.round(asset.size / (1024 * 1024));

    renderLauncherDownload();
  } catch (err) {
    console.warn('Launcher-Sync fehlgeschlagen, nutze Fallback-Daten:', err);
  }
}

/* ---------------------------------------------------------
 * News: Releases aus allen Spiele-Repos + Launcher-Repo laden,
 * zusammenführen und nach Datum sortiert anzeigen.
 * ------------------------------------------------------- */
async function syncNewsFromGitHub() {
  const sources = [];
  if (STUDIO_CONFIG.github && STUDIO_CONFIG.github.launcherRepo) {
    sources.push({ repo: STUDIO_CONFIG.github.launcherRepo, label: 'Launcher' });
  }
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
    // jede Quelle hat ihre eigene Versionszählung, ein Vergleich über
    // Quellen hinweg (z.B. TasteJump v1.6.0 gegen Launcher v1.2.1)
    // ergäbe keinen sinnvollen Versionssprung.
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

    renderNews(entries);
  } catch (err) {
    console.warn('News-Sync fehlgeschlagen:', err);
  }
}

function renderNews(entries) {
  const list = document.getElementById('newsList');
  if (!list) return;

  const badgeLabels = { release: 'Release', feature: 'Neu', fix: 'Bugfix' };

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

/* ---------------------------------------------------------
 * Alle übrigen Inhalte (Studio, Launcher, Spieleliste, Footer)
 * aus content.json im Website-Repo laden — dort direkt auf
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
    // Launcher-Basisdaten aus content.json übernehmen, aber Live-Werte
    // von syncLauncherFromGitHub() (Version/Größe/Link) nicht verlieren.
    // Nur bekannte Felder übernehmen und dabei bereits live von GitHub
    // synchronisierte Werte (version/fileName/filePath/fileSizeMB aus
    // syncLauncherFromGitHub) nicht mit älteren content.json-Werten
    // überschreiben. Fehlt ein Feld (z.B. "features") in content.json,
    // bleibt der bisherige Wert erhalten statt zu verschwinden.
    if (data.launcher) {
      Object.assign(STUDIO_CONFIG.launcher, data.launcher, pickDefined(STUDIO_CONFIG.launcher, ['version', 'fileName', 'filePath', 'fileSizeMB']));
    }

    renderBrand();
    renderHero();
    renderGamesGrid();
    renderLauncherFeatures();
    renderLauncherDownload();
    renderAbout();
    renderFooter();
  } catch (err) {
    // Fallback-Daten aus config.js bleiben unverändert sichtbar.
    console.warn('Content-Sync fehlgeschlagen, nutze Fallback-Daten:', err);
  }
}

/** Übernimmt aus `source` nur die angegebenen Keys (für Merge-Zwecke). */
function pickDefined(source, keys) {
  const out = {};
  for (const k of keys) if (source && source[k] !== undefined) out[k] = source[k];
  return out;
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
  if (!body) return ['Keine Details angegeben.'];

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

  return changes.length ? changes : ['Keine Details angegeben.'];
}

/* ---------------------------------------------------------
 * Hilfsfunktionen
 * ------------------------------------------------------- */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function formatNumber(n) {
  return new Intl.NumberFormat('de-DE').format(n);
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }).format(d);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
