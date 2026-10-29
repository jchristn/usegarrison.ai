// Garrison website: theme toggle, mobile menu, sticky nav, install tabs, copy buttons, and scroll reveals.

(function () {
  'use strict';

  var html = document.documentElement;
  var STORAGE_KEY = 'garrison-theme';

  // --- Theme: a saved choice wins, otherwise follow the system preference ---
  var themeToggle = document.getElementById('theme-toggle');
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;

  function savedTheme() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      if (value === 'light' || value === 'dark') return value;
    } catch (e) { /* storage unavailable */ }
    return null;
  }

  function systemTheme() {
    return media && media.matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (themeToggle) {
      var next = theme === 'dark' ? 'light' : 'dark';
      themeToggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
      themeToggle.setAttribute('title', 'Switch to ' + next + ' theme');
    }
  }

  applyTheme(savedTheme() || systemTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* storage unavailable */ }
    });
  }

  if (media) {
    var onSystemChange = function () {
      if (!savedTheme()) applyTheme(systemTheme());
    };
    if (media.addEventListener) media.addEventListener('change', onSystemChange);
    else if (media.addListener) media.addListener(onSystemChange);
  }

  // --- Mobile navigation ---
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');

  function setMenu(open) {
    if (!navToggle || !navLinks) return;
    navLinks.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      setMenu(!navLinks.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        setMenu(false);
        navToggle.focus();
      }
    });
  }

  // --- Install tabs (WAI-ARIA tabs pattern with arrow-key navigation) ---
  document.querySelectorAll('[role="tablist"]').forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));

    function select(tab, focus) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.setAttribute('tabindex', selected ? '0' : '-1');
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !selected;
      });
      if (focus) tab.focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var target = null;
        if (e.key === 'ArrowRight') target = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') target = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') target = tabs[0];
        else if (e.key === 'End') target = tabs[tabs.length - 1];
        if (target) {
          e.preventDefault();
          select(target, true);
        }
      });
    });
  });

  // --- Copy buttons for code blocks ---
  document.querySelectorAll('[data-copy]').forEach(function (block) {
    var code = block.querySelector('code');
    if (!code || !navigator.clipboard) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy commands');
    btn.addEventListener('click', function () {
      // Drop the "$ " prompts so the copied text runs as-is.
      var text = code.innerText.split('\n').map(function (line) {
        return line.replace(/^\$ /, '');
      }).join('\n');
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1600);
      }, function () { /* clipboard denied */ });
    });
    block.appendChild(btn);
  });
  // --- Make horizontally scrollable regions reachable by keyboard ---
  function markScrollable() {
    document.querySelectorAll('pre, .table-scroll, .table-wrap, .arch-scroll').forEach(function (el) {
      var scrolls = el.scrollWidth > el.clientWidth + 1;
      if (scrolls && !el.hasAttribute('tabindex')) { el.setAttribute('tabindex', '0'); el.setAttribute('data-scroll-focus', ''); }
      else if (!scrolls && el.hasAttribute('data-scroll-focus')) { el.removeAttribute('tabindex'); el.removeAttribute('data-scroll-focus'); }
    });
  }
  markScrollable();
  window.addEventListener('resize', markScrollable, { passive: true });
  window.addEventListener('load', markScrollable);

  // --- Sticky nav border once the page scrolls ---
  var nav = document.getElementById('nav');
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', (window.scrollY || window.pageYOffset) > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Reveal on scroll. Without IntersectionObserver, or with reduced motion, show everything. ---
  var reveals = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.classList.add('visible');
          observer.unobserve(el);
          setTimeout(function () { el.style.transitionDelay = ''; }, 1200);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 4, 3) * 0.06) + 's';
      observer.observe(el);
    });
  }
})();
