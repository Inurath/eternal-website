// Dark mode toggle. Pairs with the inline anti-flash script in <head>,
// which already set [data-theme="dark"] on <html> before paint if needed.
(function () {
  function setIcon(btn, theme) {
    // Lucide replaces the original <i data-lucide> with an <svg> on first
    // render, so querying for 'i' only works once. Swap in a fresh <i> and
    // let lucide.createIcons() (called right after this) redraw it - this
    // works whether the current icon is still an <i> or already an <svg>.
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
  });
})();
