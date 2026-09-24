/* Hell/Dunkel-Umschalter — gleiche Logik und derselbe Speicherschlüssel wie auf
   www.jafasystems.de, damit sich die Messe-Seiten anfühlen wie die Website.
   Die Erstzuweisung passiert inline im <head> jeder Seite (sonst blitzt kurz Weiß auf). */
(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll('[data-theme-toggle]');
  if (!buttons.length) return;

  function label(theme) {
    return theme === 'dark' ? 'Hellmodus einschalten' : 'Dunkelmodus einschalten';
  }

  /* persist = nur, wenn wirklich jemand geklickt hat. Sonst bliebe die Seite
     für immer auf dem Stand des ersten Aufrufs und würde dem Gerät nicht mehr folgen. */
  function apply(theme, persist) {
    root.dataset.theme = theme;
    if (persist) {
      try { localStorage.setItem('jafa-color-mode', theme); } catch (e) { /* Privatmodus: egal */ }
    }
    Array.prototype.forEach.call(buttons, function (b) {
      b.setAttribute('aria-pressed', String(theme === 'dark'));
      b.setAttribute('aria-label', label(theme));
      b.setAttribute('title', label(theme));
    });
  }

  apply(root.dataset.theme === 'dark' ? 'dark' : 'light', false);

  Array.prototype.forEach.call(buttons, function (b) {
    b.addEventListener('click', function () {
      apply(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
    });
  });

  /* Solange niemand selbst umgeschaltet hat, dem Gerät folgen. */
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var onChange = function (e) {
    var stored = null;
    try { stored = localStorage.getItem('jafa-color-mode'); } catch (err) { /* ignorieren */ }
    if (!stored) apply(e.matches ? 'dark' : 'light', false);
  };
  if (mq.addEventListener) mq.addEventListener('change', onChange);
  else if (mq.addListener) mq.addListener(onChange);
})();
