/* ============================================================
   CUSTOM TEMPLATE - AURA Audio Scroll-Sequence Showcase

   Scroll engine + theme toggle.
   - The fixed product stage holds 10 stacked <img> frames.
   - As #showcase scrolls past, scroll progress (0..1) maps to a
     frame position 0..9. Adjacent frames crossfade by opacity so
     the headphones appear to rotate in place (Apple / Linear style).
   - An eased target with per-frame lerp adds a touch of inertia so
     the rotation glides instead of snapping.
   - The nearest frame also carries an `is-current` class for state.
   - Generic .reveal fade-ins handle the rest of the page.
   - Reduced motion is respected via CSS; the sequence still maps,
     it just lands without the smoothing tail.
   ============================================================ */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* ----------------------------------------------------------
     THEME TOGGLE (pairs with the inline anti-flash script)
  ---------------------------------------------------------- */
  function setIcon(btn, theme) {
    var icon = btn.querySelector('i, svg');
    if (!icon) return;
    var fresh = document.createElement('i');
    fresh.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
    icon.replaceWith(fresh);
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      setIcon(btn, theme);
    });
    if (window.lucide) window.lucide.createIcons();
  }

  /* ----------------------------------------------------------
     SCROLL SEQUENCE - map scroll progress to a frame index
  ---------------------------------------------------------- */
  function initSequence() {
    var section = document.getElementById('showcase');
    var frames = Array.prototype.slice.call(document.querySelectorAll('.frame'));
    if (!section || frames.length < 2) return;

    var last = frames.length - 1;   // 9 for a 10-frame set
    var target = 0;                 // raw scroll-driven frame position (0..9)
    var eased = 0;                  // smoothed position for inertia
    var ticking = false;

    // Progress 0..1 across the scrollable span of #showcase.
    function readProgress() {
      var rect = section.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      // Distance scrolled into the section over its scrollable length.
      var scrolled = -rect.top;
      var span = rect.height - vh;
      return span <= 0 ? 0 : clamp(scrolled / span, 0, 1);
    }

    // Paint frame opacities from a continuous position 0..last.
    function paint(pos) {
      var base = Math.floor(pos);
      var frac = pos - base;
      var next = Math.min(base + 1, last);
      for (var i = 0; i < frames.length; i++) {
        var o = 0;
        if (i === base) o = 1 - frac;
        else if (i === next) o = frac;
        // When base === next (at the very end) opacity resolves to 1.
        if (i === base && i === next) o = 1;
        frames[i].style.opacity = o.toFixed(3);
      }
      var nearest = Math.round(pos);
      for (var j = 0; j < frames.length; j++) {
        frames[j].classList.toggle('is-current', j === nearest);
      }
    }

    function loop() {
      // Inertia: ease toward the scroll target. Snap when very close.
      eased = lerp(eased, target, prefersReduced ? 1 : 0.16);
      if (Math.abs(eased - target) < 0.001) eased = target;
      paint(eased);
      if (eased !== target) {
        requestAnimationFrame(loop);
      } else {
        ticking = false;
      }
    }

    function onScroll() {
      target = readProgress() * last;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(loop);
      }
    }

    // Initial paint + listeners.
    target = readProgress() * last;
    eased = target;
    paint(eased);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }

  /* ----------------------------------------------------------
     GENERIC REVEAL ON SCROLL
  ---------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { obs.observe(el); });
  }

  /* ----------------------------------------------------------
     MOBILE NAV TOGGLE
  ---------------------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', function () {
      var open = links.style.display === 'flex';
      links.style.display = open ? '' : 'flex';
      links.style.flexDirection = 'column';
      toggle.setAttribute('aria-expanded', String(!open));
    });
  }

  /* ----------------------------------------------------------
     INIT
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    applyTheme(current);

    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('theme', next); } catch (e) {}
        applyTheme(next);
      });
    });

    initSequence();
    initReveal();
    initNav();
  });
})();
