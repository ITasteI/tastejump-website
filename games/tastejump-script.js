/**
 * ============================================================
 *  TasteJump — Detailseiten-Logik
 * ============================================================
 * Liest alle Inhalte aus GAME_CONFIG (games/tastejump-config.js,
 * Fallback) und rendert sie in die entsprechenden DOM-Elemente.
 * Live-Daten kommen aus:
 *  - games/tastejump-content.json (Spiel: Stats/Server/About/Screenshots)
 *  - content.json im Repo-Wurzelverzeichnis (Footer/Marke, Studio-weit)
 *  - GitHub-Releases von platformer3d (Changelog & Version)
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  renderHero();
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
  syncContentFromGitHub();
  syncStudioFooterFromGitHub();

  const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
  setInterval(syncChangelogFromGitHub, TWO_HOURS_MS);

  const ONE_MINUTE_MS = 60 * 1000;
  setInterval(syncContentFromGitHub, ONE_MINUTE_MS);
  setInterval(syncStudioFooterFromGitHub, ONE_MINUTE_MS);
});

/* ---------------------------------------------------------
 * Hero
 * ------------------------------------------------------- */
function renderHero() {
  const { game } = GAME_CONFIG;
  document.title = `${game.name} – Ein Spiel von TasteGames | 3D-Plattformer`;
  setText('heroTagline', game.tagline);
  setText('heroVersion', (GAME_CONFIG.changelog[0] && GAME_CONFIG.changelog[0].version) || '–');
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
    <div class="gallery-item reveal reveal-${Math.min(i + 1, 6)}" data-index="${i}">
      <img src="${shot.src}" alt="${escapeHtml(shot.alt || 'Screenshot')}" loading="lazy" />
    </div>
  `).join('');

  if (window.reinitScrollReveal) window.reinitScrollReveal();
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
    featureGrid.innerHTML = about.features.map((f, i) => `
      <div class="feature-card reveal reveal-${Math.min(i + 1, 6)}">
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

  if (window.reinitScrollReveal) window.reinitScrollReveal();
}

/* ---------------------------------------------------------
 * Spielerstatistiken
 * ------------------------------------------------------- */
function renderStats() {
  const { stats } = GAME_CONFIG;
  const animate = typeof window.animateCountUp === 'function';
  if (animate) {
    window.animateCountUp(document.getElementById('statOnline'), stats.playersOnline);
    window.animateCountUp(document.getElementById('statToday'), stats.playersToday);
    window.animateCountUp(document.getElementById('statTotal'), stats.playersTotal);
    window.animateCountUp(document.getElementById('statPeak'), stats.playersPeak);
  } else {
    setText('statOnline', formatNumber(stats.playersOnline));
    setText('statToday', formatNumber(stats.playersToday));
    setText('statTotal', formatNumber(stats.playersTotal));
    setText('statPeak', formatNumber(stats.playersPeak));
  }
}

/* ---------------------------------------------------------
 * Serverstatus
 * ------------------------------------------------------- */
function renderServerStatus() {
  const { server } = GAME_CONFIG;
  const dot = document.getElementById('serverStatusDot');

  const statusMap = {
    online: 'Server Online',
    offline: 'Server Offline',
    maintenance: 'Wartungsarbeiten'
  };

  if (dot) dot.className = `status-dot ${server.status}`;
  setText('serverStatusLabel', statusMap[server.status] || 'Status unbekannt');
  const checked = document.getElementById('serverStatusChecked');
  if (checked) checked.textContent = `Zuletzt geprüft: ${server.lastChecked}`;
}

/* ---------------------------------------------------------
 * Changelog
 * ------------------------------------------------------- */
function renderChangelog() {
  const list = document.getElementById('changelogList');
  if (!list) return;

  const badgeLabels = { release: 'Release', feature: 'Neu', fix: 'Bugfix' };

  list.innerHTML = GAME_CONFIG.changelog.map((entry, i) => `
    <div class="changelog-entry reveal reveal-${Math.min(i + 1, 6)}">
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

  if (window.reinitScrollReveal) window.reinitScrollReveal();
}

/* ---------------------------------------------------------
 * Footer (Marke/Kontakt kommen Studio-weit aus content.json)
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

function renderBrand(studio) {
  if (!studio) return;
  setText('brandName', studio.name);
  setText('footerBrandName', studio.name);
  const brandIcon = document.getElementById('brandIcon');
  const footerIcon = document.getElementById('footerBrandIcon');
  if (studio.logo) {
    if (brandIcon) brandIcon.src = `../${studio.logo}`;
    if (footerIcon) footerIcon.src = `../${studio.logo}`;
  }
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
 * GitHub-Sync: Changelog & Versionsnummer
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

    renderChangelog();
    renderHero();
  } catch (err) {
    console.warn('GitHub-Changelog-Sync fehlgeschlagen, nutze Fallback-Daten:', err);
  }
}

function parseSemver(tagName) {
  const raw = tagName.replace(/^v/i, '');
  const [major = 0, minor = 0, patch = 0] = raw.split('.').map(n => parseInt(n, 10) || 0);
  return { raw, major, minor, patch };
}

function classifyRelease(current, previous) {
  if (!previous) return 'release';
  if (current.major > previous.major) return 'release';
  if (current.minor > previous.minor) return 'feature';
  return 'fix';
}

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
 * Spiel-Live-Inhalte (Stats, Server, About, Screenshots) aus
 * games/tastejump-content.json laden.
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
    if (data.stats) GAME_CONFIG.stats = data.stats;
    if (data.server) GAME_CONFIG.server = data.server;
    if (data.about) GAME_CONFIG.about = data.about;
    if (data.screenshots) GAME_CONFIG.screenshots = data.screenshots;

    renderHero();
    renderGallery();
    renderAbout();
    renderStats();
    renderServerStatus();
  } catch (err) {
    console.warn('Content-Sync fehlgeschlagen, nutze Fallback-Daten:', err);
  }
}

/* ---------------------------------------------------------
 * Studio-weite Marke & Footer (Kontakt/Discord/Social) aus der
 * Studio-content.json im Repo-Wurzelverzeichnis laden — so bleibt
 * der Footer auf allen Seiten identisch, ohne ihn doppelt pflegen
 * zu müssen.
 * ------------------------------------------------------- */
async function syncStudioFooterFromGitHub() {
  const { studioContent } = GAME_CONFIG;
  if (!studioContent || !studioContent.autoSync || !studioContent.repo) return;

  try {
    const url = `https://raw.githubusercontent.com/${studioContent.repo}/${studioContent.branch}/${studioContent.path}?t=${Date.now()}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`GitHub antwortete mit ${res.status}`);

    const data = await res.json();
    if (data.footer) GAME_CONFIG.footer = data.footer;

    renderFooter();
    renderBrand(data.studio);
  } catch (err) {
    console.warn('Studio-Footer-Sync fehlgeschlagen, nutze Fallback-Daten:', err);
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
