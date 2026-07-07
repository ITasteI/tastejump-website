/**
 * ============================================================
 *  TasteJump — Website Logik
 * ============================================================
 * Liest alle Inhalte aus GAME_CONFIG und rendert sie in die
 * entsprechenden DOM-Elemente. GAME_CONFIG kommt zunächst aus
 * config.js (Fallback) und wird dann per syncContentFromGitHub()
 * live durch content.json aus dem Website-Repo überschrieben.
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  renderHero();
  renderDownload();
  renderLauncherDownload();
  renderGallery();
  renderAbout();
  renderStats();
  renderServerStatus();
  renderChangelog();
  renderFooter();

  initHeaderScroll();
  initMobileNav();
  initLightbox();

  syncChangelogFromGitHub();
  syncLauncherFromGitHub();
  syncContentFromGitHub();

  // Zusätzliche automatische Prüfung, falls die Seite lange geöffnet
  // bleibt (z.B. ein Browser-Tab, der nicht neu geladen wird): alle
  // 2 Stunden erneut bei GitHub nachsehen, ob es neue Releases gibt.
  const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
  setInterval(syncChangelogFromGitHub, TWO_HOURS_MS);
  setInterval(syncLauncherFromGitHub, TWO_HOURS_MS);

  // Alle übrigen Inhalte (Spielerzahlen, Serverstatus, Texte, ...)
  // sollen sich "live" anfühlen -> öfter prüfen.
  const ONE_MINUTE_MS = 60 * 1000;
  setInterval(syncContentFromGitHub, ONE_MINUTE_MS);
});

/* ---------------------------------------------------------
 * Hero
 * ------------------------------------------------------- */
function renderHero() {
  const { game, download } = GAME_CONFIG;
  document.title = `${game.name} – Offizielle Spielseite | 3D-Plattformer`;
  setText('heroTagline', game.tagline);
  setText('heroVersion', download.version);
  setText('heroPlatform', download.platform);
}

/* ---------------------------------------------------------
 * Download-Bereich (direkter Download ohne Launcher)
 * ------------------------------------------------------- */
function renderDownload() {
  const { download } = GAME_CONFIG;

  setText('downloadFileName', download.fileName);
  setText('downloadVersion', download.version);
  setText('downloadSize', `${download.fileSizeMB} MB`);
  setText('downloadDate', formatDate(download.releaseDate));
  setText('downloadPlatform', download.platform);

  const dlBtn = document.getElementById('downloadBtn');
  if (dlBtn) dlBtn.href = download.filePath;
}

/* ---------------------------------------------------------
 * Launcher-Download (empfohlener Weg)
 * ------------------------------------------------------- */
function renderLauncherDownload() {
  const { launcher } = GAME_CONFIG;
  if (!launcher) return;

  setText('launcherVersion', launcher.version);
  setText('launcherSize', `${launcher.fileSizeMB} MB`);

  const btn = document.getElementById('launcherBtn');
  if (btn) btn.href = launcher.filePath;
}

/* ---------------------------------------------------------
 * Screenshot-Galerie
 * ------------------------------------------------------- */
function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  const shots = GAME_CONFIG.screenshots || [];

  if (shots.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-low)">Noch keine Screenshots hinterlegt.</p>';
    return;
  }

  grid.innerHTML = shots.map((shot, i) => `
    <div class="gallery-item" data-index="${i}">
      <img src="${shot.src}" alt="${escapeHtml(shot.alt || 'Screenshot')}" loading="lazy" />
    </div>
  `).join('');
}

/* ---------------------------------------------------------
 * Lightbox für Screenshots
 * ------------------------------------------------------- */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  if (!lightbox || !lightboxImg) return;

  document.getElementById('galleryGrid')?.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    const index = Number(item.dataset.index);
    const shot = GAME_CONFIG.screenshots[index];
    if (!shot) return;
    lightboxImg.src = shot.src;
    lightboxImg.alt = shot.alt || '';
    lightbox.classList.add('active');
  });

  const close = () => lightbox.classList.remove('active');
  closeBtn?.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

/* ---------------------------------------------------------
 * Über das Spiel
 * ------------------------------------------------------- */
function renderAbout() {
  const { about, game } = GAME_CONFIG;

  setText('aboutDescription', game.description);
  setText('aboutPlaytime', about.playtime);
  setText('aboutMultiplayer', about.multiplayer);

  const featureGrid = document.getElementById('featureGrid');
  if (featureGrid) {
    featureGrid.innerHTML = about.features.map(f => `
      <div class="feature-card">
        <span class="f-icon">${f.icon}</span>
        <h3>${escapeHtml(f.title)}</h3>
        <p>${escapeHtml(f.text)}</p>
      </div>
    `).join('');
  }

  const worldsList = document.getElementById('aboutWorlds');
  if (worldsList) {
    worldsList.innerHTML = about.worlds.map(w => `
      <li><strong>${escapeHtml(w.name)}</strong> — ${escapeHtml(w.description)}</li>
    `).join('');
  }
}

/* ---------------------------------------------------------
 * Spielerstatistiken
 * ------------------------------------------------------- */
function renderStats() {
  const { stats } = GAME_CONFIG;
  setText('statOnline', formatNumber(stats.playersOnline));
  setText('statToday', formatNumber(stats.playersToday));
  setText('statTotal', formatNumber(stats.playersTotal));
  setText('statPeak', formatNumber(stats.playersPeak));
}

/* ---------------------------------------------------------
 * Serverstatus
 * ------------------------------------------------------- */
function renderServerStatus() {
  const { server } = GAME_CONFIG;
  const dot = document.getElementById('serverStatusDot');
  const label = document.getElementById('serverStatusLabel');
  const checked = document.getElementById('serverStatusChecked');

  const statusMap = {
    online: 'Server Online',
    offline: 'Server Offline',
    maintenance: 'Wartungsarbeiten'
  };

  if (dot) dot.className = `status-dot ${server.status}`;
  setText('serverStatusLabel', statusMap[server.status] || 'Status unbekannt');
  if (checked) checked.textContent = `Zuletzt geprüft: ${server.lastChecked}`;
}

/* ---------------------------------------------------------
 * Changelog
 * ------------------------------------------------------- */
function renderChangelog() {
  const list = document.getElementById('changelogList');
  if (!list) return;

  const badgeLabels = { release: 'Release', feature: 'Neu', fix: 'Bugfix' };

  list.innerHTML = GAME_CONFIG.changelog.map(entry => `
    <div class="changelog-entry">
      <div class="changelog-version">
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
}

/* ---------------------------------------------------------
 * Footer
 * ------------------------------------------------------- */
function renderFooter() {
  const { footer } = GAME_CONFIG;

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
 * GitHub-Sync: Changelog & Versionsnummer automatisch von
 * github.com/<repo>/tags bzw. /releases übernehmen.
 * ------------------------------------------------------- *
 * Läuft bei jedem Seitenaufruf im Browser. Schlägt der Abruf
 * fehl (offline, API-Limit, CORS), bleiben die Fallback-Daten
 * aus config.js sichtbar – die Seite bricht nie.
 * ------------------------------------------------------- */
async function syncChangelogFromGitHub() {
  const { github } = GAME_CONFIG;
  if (!github || !github.autoSyncChangelog || !github.repo) return;

  try {
    const res = await fetch(`https://api.github.com/repos/${github.repo}/releases?per_page=30`, {
      headers: { Accept: 'application/vnd.github+json' }
    });
    if (!res.ok) throw new Error(`GitHub API antwortete mit ${res.status}`);

    const releases = await res.json();
    if (!Array.isArray(releases) || releases.length === 0) return;

    // Nur veröffentlichte, nicht-Draft-Releases verwenden, neueste zuerst.
    const published = releases
      .filter(r => !r.draft)
      .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
    if (published.length === 0) return;

    const versions = published.map(r => parseSemver(r.tag_name));

    GAME_CONFIG.changelog = published.map((release, i) => ({
      version: versions[i].raw,
      date: release.published_at ? release.published_at.slice(0, 10) : '',
      type: classifyRelease(versions[i], versions[i + 1]),
      changes: parseReleaseBody(release.body)
    }));

    // Aktuelle Version an der neuesten Release ausrichten.
    const latest = versions[0];
    GAME_CONFIG.download.version = latest.raw;
    GAME_CONFIG.download.releaseDate = GAME_CONFIG.changelog[0].date || GAME_CONFIG.download.releaseDate;

    // Download-Datei direkt vom GitHub-Release-Asset übernehmen (kein
    // manuelles Hochladen/Aktualisieren mehr nötig — die Website zeigt
    // automatisch immer die neueste, vom Spiel-Repo veröffentlichte Datei).
    const latestRelease = published[0];
    const asset = latestRelease.assets && latestRelease.assets.find(a => a.name.endsWith('.zip'))
      || (latestRelease.assets && latestRelease.assets[0]);
    if (asset) {
      GAME_CONFIG.download.fileName = asset.name;
      GAME_CONFIG.download.filePath = asset.browser_download_url;
      GAME_CONFIG.download.fileSizeMB = Math.round(asset.size / (1024 * 1024));
    }

    renderChangelog();
    renderHero();
    renderDownload();
  } catch (err) {
    // Fallback-Daten aus config.js bleiben unverändert sichtbar.
    console.warn('GitHub-Changelog-Sync fehlgeschlagen, nutze Fallback-Daten:', err);
  }
}

/** Zerlegt einen Tag-Namen wie "v1.4.1" in vergleichbare Zahlen. */
function parseSemver(tagName) {
  const raw = tagName.replace(/^v/i, '');
  const [major = 0, minor = 0, patch = 0] = raw.split('.').map(n => parseInt(n, 10) || 0);
  return { raw, major, minor, patch };
}

/** Leitet aus dem Versionssprung zum Vorgänger einen Changelog-Badge-Typ ab. */
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
 * Launcher-Download automatisch vom neuesten Release des
 * Launcher-Repos übernehmen (Version, Dateiname, Größe, Link).
 * ------------------------------------------------------- */
async function syncLauncherFromGitHub() {
  const { github } = GAME_CONFIG;
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

    GAME_CONFIG.launcher = {
      version: parseSemver(latest.tag_name).raw,
      fileName: asset.name,
      filePath: asset.browser_download_url,
      fileSizeMB: Math.round(asset.size / (1024 * 1024))
    };

    renderLauncherDownload();
  } catch (err) {
    console.warn('Launcher-Sync fehlgeschlagen, nutze Fallback-Daten:', err);
  }
}

/* ---------------------------------------------------------
 * Alle übrigen Inhalte (Spielinfos, Screenshots, Footer, ...)
 * aus content.json im Website-Repo laden — dort direkt auf
 * github.com bearbeitbar, ganz ohne Website neu hochzuladen.
 * ------------------------------------------------------- */
async function syncContentFromGitHub() {
  const { content } = GAME_CONFIG;
  if (!content || !content.autoSync || !content.repo) return;

  try {
    const url = `https://raw.githubusercontent.com/${content.repo}/${content.branch}/${content.path}?t=${Date.now()}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`GitHub antwortete mit ${res.status}`);

    const data = await res.json();
    if (data.game) GAME_CONFIG.game = data.game;
    if (data.download) GAME_CONFIG.download = data.download;
    if (data.stats) GAME_CONFIG.stats = data.stats;
    if (data.server) GAME_CONFIG.server = data.server;
    if (data.about) GAME_CONFIG.about = data.about;
    if (data.screenshots) GAME_CONFIG.screenshots = data.screenshots;
    if (data.footer) GAME_CONFIG.footer = data.footer;

    renderHero();
    renderDownload();
    renderGallery();
    renderAbout();
    renderStats();
    renderServerStatus();
    renderFooter();
  } catch (err) {
    // Fallback-Daten aus config.js bleiben unverändert sichtbar.
    console.warn('Content-Sync fehlgeschlagen, nutze Fallback-Daten:', err);
  }
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
