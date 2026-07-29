/**
 * ============================================================
 *  TasteJump — Detailseiten-Logik
 * ============================================================
 * Liest alle Inhalte aus GAME_CONFIG (games/tastejump-config.js,
 * Fallback) und rendert sie in die entsprechenden DOM-Elemente.
 * Live-Daten kommen aus:
 *  - games/tastejump-content.json (Spiel: Steam/Trailer/About/Screenshots)
 *  - content.json im Repo-Wurzelverzeichnis (Footer/Marke, Studio-weit)
 *  - GitHub-Releases von platformer3d (Changelog)
 *
 * TasteJump wird ausschließlich über Steam vertrieben — alle
 * Download-/Play-CTAs verlinken auf GAME_CONFIG.steam.url, mit einem
 * Text, der sich automatisch am Release-Datum orientiert.
 *
 * Mehrsprachige Felder werden über I18N.pick() ausgelesen (siehe
 * js/i18n.js). Bei Sprachwechsel ("i18n:change") wird alles neu
 * gerendert. Die Changelog-Einträge selbst (Release-Notes von
 * GitHub) bleiben unübersetzt — das sind externe Freitexte.
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  renderAll();

  initHeaderScroll();
  initMobileNav();
  initLightbox();
  initTrailerLazyLoad();

  syncChangelogFromGitHub();
  syncContentFromGitHub();
  syncStudioFooterFromGitHub();

  window.addEventListener('i18n:change', renderAll);

  const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
  setInterval(syncChangelogFromGitHub, TWO_HOURS_MS);

  const ONE_MINUTE_MS = 60 * 1000;
  setInterval(syncContentFromGitHub, ONE_MINUTE_MS);
  setInterval(syncStudioFooterFromGitHub, ONE_MINUTE_MS);
});

function renderAll() {
  renderHero();
  renderSteam();
  renderTrailer();
  renderGallery();
  renderAbout();
  renderChangelog();
  renderFooter();
}

/* ---------------------------------------------------------
 * Hero
 * ------------------------------------------------------- */
function renderHero() {
  const { game } = GAME_CONFIG;
  document.title = `${game.name} – ${I18N.t('game.pageTitleSuffix')}`;
  setText('heroTagline', I18N.pick(game.tagline));
}

/* ---------------------------------------------------------
 * Steam: CTA-Buttons (Nav, Hero, Steam-Sektion) + Release-Datum.
 * Text schaltet automatisch von "Wishlist" auf "Get it on Steam"
 * um, sobald das echte Release-Datum erreicht ist.
 * ------------------------------------------------------- */
function renderSteam() {
  const { steam } = GAME_CONFIG;
  if (!steam) return;

  const label = steamCtaLabel(steam.releaseDate);
  const dateText = formatDate(steam.releaseDate);

  const navBtn = document.getElementById('navSteamBtn');
  const heroBtn = document.getElementById('heroSteamBtn');
  const heroLabel = document.getElementById('heroSteamLabel');
  const steamBtn = document.getElementById('steamBtn');
  const steamBtnLabel = document.getElementById('steamBtnLabel');

  if (navBtn) navBtn.href = steam.url;
  if (heroBtn) heroBtn.href = steam.url;
  if (heroLabel) heroLabel.textContent = label;
  if (steamBtn) steamBtn.href = steam.url;
  if (steamBtnLabel) steamBtnLabel.textContent = label;

  setText('heroReleaseDate', dateText);
  setText('steamReleaseDate', dateText);
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

/* ---------------------------------------------------------
 * Trailer: Video erst laden, wenn der Nutzer tatsächlich auf
 * Play klickt (Datei ist groß, kein Autoplay/Preload).
 * ------------------------------------------------------- */
function renderTrailer() {
  const { trailer } = GAME_CONFIG;
  const video = document.getElementById('trailerVideo');
  if (!trailer || !video) return;

  video.dataset.src = trailer.url;
  if (trailer.poster) video.poster = trailer.poster;
}

function initTrailerLazyLoad() {
  const video = document.getElementById('trailerVideo');
  if (!video) return;

  const loadSource = () => {
    if (video.src || !video.dataset.src) return;
    const source = document.createElement('source');
    source.src = video.dataset.src;
    source.type = 'video/mp4';
    video.appendChild(source);
    video.load();
  };

  // Sobald der Nutzer auf das Poster-Bild/Play-Icon klickt, wird
  // die Datei erst dann tatsächlich angefragt (preload="none").
  video.addEventListener('play', loadSource, { once: true });
  video.addEventListener('click', loadSource, { once: true });
}

/* ---------------------------------------------------------
 * Screenshot-Galerie
 * ------------------------------------------------------- */
function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  const shots = GAME_CONFIG.screenshots || [];

  if (shots.length === 0) {
    grid.innerHTML = `<p style="color:var(--text-low)">${I18N.t('screenshots.empty')}</p>`;
    return;
  }

  grid.innerHTML = shots.map((shot, i) => `
    <div class="gallery-item reveal reveal-${Math.min(i + 1, 6)}" data-index="${i}">
      <img src="${shot.src}" alt="${escapeHtml(I18N.pick(shot.alt) || 'Screenshot')}" />
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
    lightboxImg.alt = I18N.pick(shot.alt) || '';
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

  setText('aboutDescription', I18N.pick(game.description));
  setText('aboutPlaytime', I18N.pick(about.playtime));
  setText('aboutMultiplayer', I18N.pick(about.multiplayer));

  const featureGrid = document.getElementById('featureGrid');
  if (featureGrid) {
    featureGrid.innerHTML = about.features.map((f, i) => `
      <div class="feature-card reveal reveal-${Math.min(i + 1, 6)}">
        <span class="f-icon">${f.icon}</span>
        <h3>${escapeHtml(I18N.pick(f.title))}</h3>
        <p>${escapeHtml(I18N.pick(f.text))}</p>
      </div>
    `).join('');
  }

  const worldsList = document.getElementById('aboutWorlds');
  if (worldsList) {
    worldsList.innerHTML = about.worlds.map(w => `
      <li><strong>${escapeHtml(I18N.pick(w.name))}</strong> — ${escapeHtml(I18N.pick(w.description))}</li>
    `).join('');
  }

  if (window.reinitScrollReveal) window.reinitScrollReveal();
}

/* ---------------------------------------------------------
 * Changelog
 * ------------------------------------------------------- */
function renderChangelog() {
  const list = document.getElementById('changelogList');
  if (!list) return;

  const badgeLabels = { release: I18N.t('changelog.badgeRelease'), feature: I18N.t('changelog.badgeFeature'), fix: I18N.t('changelog.badgeFix') };

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
 * GitHub-Sync: Changelog
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
 * Spiel-Live-Inhalte (Steam, Trailer, About, Screenshots) aus
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
    if (data.steam) GAME_CONFIG.steam = data.steam;
    if (data.trailer) GAME_CONFIG.trailer = data.trailer;
    if (data.about) GAME_CONFIG.about = data.about;
    if (data.screenshots) GAME_CONFIG.screenshots = data.screenshots;

    renderHero();
    renderSteam();
    renderTrailer();
    renderGallery();
    renderAbout();
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

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return new Intl.DateTimeFormat(I18N.locale(), { day: '2-digit', month: 'long', year: 'numeric' }).format(d);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
