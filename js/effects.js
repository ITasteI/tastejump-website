/**
 * ============================================================
 *  TasteGames — Gemeinsame visuelle Effekte
 * ============================================================
 * Wird auf allen Seiten eingebunden (index.html, games/*.html).
 * Enthält: individueller Cursor, magnetische Buttons, 3D-Tilt auf
 * Karten, Scroll-Reveal-Animationen, Partikel-Hintergrund im Hero,
 * Scrollspy-Navigation und Zahlen-Hochzähl-Animation.
 *
 * Respektiert:
 *  - prefers-reduced-motion (deaktiviert Bewegungseffekte)
 *  - Touch-/Tablet-Geräte ohne feinen Zeiger (kein Custom-Cursor,
 *    keine Magnet-/Tilt-Effekte, da dort kein Hover existiert)
 * ============================================================
 */

(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initScrollspy();

    if (hasFinePointer && !prefersReducedMotion) {
      initCustomCursor();
      initMagneticButtons();
      initTiltCards();
    }
    if (!prefersReducedMotion) {
      initHeroParticles();
    }
  });

  /* ---------------------------------------------------------
   * Scroll-Reveal: Elemente mit Klasse "reveal" faden beim
   * Reinscrollen sanft ein. Neu ins DOM eingefügte Elemente (z.B.
   * nach einem Live-Content-Sync, der grid.innerHTML neu setzt)
   * werden per window.reinitScrollReveal() erneut erfasst.
   * ------------------------------------------------------- */
  let revealObserver = null;
  const observedReveals = new WeakSet();

  function initScrollReveal() {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
      window.reinitScrollReveal = () => {
        document.querySelectorAll('.reveal:not(.in-view)').forEach(el => el.classList.add('in-view'));
      };
      return;
    }

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    observeNewReveals();
    window.reinitScrollReveal = observeNewReveals;

    // Sicherheitsnetz: Falls der Observer aus irgendeinem Grund nie
    // feuert, bleiben Inhalte sonst dauerhaft unsichtbar (opacity: 0).
    // Nach einigen Sekunden alles anzeigen, was noch nicht sichtbar ist.
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in-view)').forEach(el => el.classList.add('in-view'));
    }, 4000);
  }

  function observeNewReveals() {
    document.querySelectorAll('.reveal').forEach(el => {
      if (observedReveals.has(el)) return;
      observedReveals.add(el);
      revealObserver.observe(el);
    });
  }

  /* ---------------------------------------------------------
   * Scrollspy: markiert den passenden Nav-Link als aktiv, je
   * nachdem welche Sektion gerade im Viewport ist.
   * ------------------------------------------------------- */
  function initScrollspy() {
    const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
    if (links.length === 0) return;

    const sections = links
      .map(link => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);
    if (sections.length === 0) return;

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = '#' + entry.target.id;
        const link = links.find(l => l.getAttribute('href') === id);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('nav-active'));
          link.classList.add('nav-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));
  }

  /* ---------------------------------------------------------
   * Individueller Cursor: Punkt + verzögerter Ring, wächst über
   * interaktiven Elementen.
   * ------------------------------------------------------- */
  function initCustomCursor() {
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.append(dot, ring);
    document.body.classList.add('custom-cursor-active');

    let ringX = window.innerWidth / 2, ringY = window.innerHeight / 2;
    let targetX = ringX, targetY = ringY;

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.transform = `translate(${targetX}px, ${targetY}px)`;
    });

    function animateRing() {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverTargets = 'a, button, .game-card, .feature-card, input, textarea';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverTargets)) {
        ring.classList.add('cursor-ring-hover');
        dot.classList.add('cursor-dot-hover');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverTargets)) {
        ring.classList.remove('cursor-ring-hover');
        dot.classList.remove('cursor-dot-hover');
      }
    });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });
  }

  /* ---------------------------------------------------------
   * Magnetische Buttons: primäre Buttons ziehen sich sanft zum
   * Cursor, solange dieser in der Nähe ist.
   * ------------------------------------------------------- */
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-ghost, .btn-discord');

    buttons.forEach(btn => {
      let raf = null;

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);

        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          btn.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
        });
      });

      btn.addEventListener('mouseleave', () => {
        if (raf) cancelAnimationFrame(raf);
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  /* ---------------------------------------------------------
   * 3D-Tilt: Karten neigen sich leicht passend zur Cursor-Position.
   * ------------------------------------------------------- */
  function initTiltCards() {
    const cards = document.querySelectorAll('.game-card, .feature-card');

    cards.forEach(card => {
      let raf = null;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 10;
        const rotateX = (0.5 - py) * 10;

        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
      });

      card.addEventListener('mouseleave', () => {
        if (raf) cancelAnimationFrame(raf);
        card.style.transform = '';
      });
    });
  }

  /* ---------------------------------------------------------
   * Hero-Partikel: dezente schwebende Punkte im Hintergrund
   * des Hero-Bereichs, per Canvas gezeichnet.
   * ------------------------------------------------------- */
  function initHeroParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'hero-particles';
    hero.prepend(canvas);
    const ctx = canvas.getContext('2d');

    let width, height, particles;

    function resize() {
      width = canvas.width = hero.offsetWidth;
      height = canvas.height = hero.offsetHeight;
    }

    function createParticles() {
      const count = Math.min(60, Math.floor((width * height) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        a: Math.random() * 0.5 + 0.15
      }));
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width; else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height; else if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 199, ${p.a})`;
        ctx.fill();
      }
      requestAnimationFrame(tick);
    }

    resize();
    createParticles();
    tick();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });
  }

  /* ---------------------------------------------------------
   * Zahlen-Hochzähl-Animation für Stat-Werte. Wird von den
   * jeweiligen Render-Funktionen aufgerufen (z.B. renderStats()).
   * Exponiert als window.animateCountUp, da andere Skripte
   * (script.js / tastejump-script.js) das nutzen.
   * ------------------------------------------------------- */
  window.animateCountUp = function animateCountUp(el, targetValue, duration = 900) {
    if (!el) return;

    // Sofort den Endwert setzen — falls requestAnimationFrame aus
    // irgendeinem Grund nie feuert (gedrosselter Hintergrund-Tab,
    // sehr altes Gerät o.ä.), bleibt wenigstens die korrekte Zahl
    // sichtbar statt eines Platzhalters. Die Animation darunter ist
    // reine Progressive Enhancement.
    el.textContent = new Intl.NumberFormat('de-DE').format(targetValue);
    if (prefersReducedMotion) return;

    const startValue = 0;
    const startTime = performance.now();

    function frame(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (targetValue - startValue) * eased);
      el.textContent = new Intl.NumberFormat('de-DE').format(current);
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  };
})();
