/* Auto Detailing George — Interaktion
   Nav-Toggle · Scroll-Zustand · Vorher/Nachher-Slider · Scroll-Reveal */

(function () {
  "use strict";

  /* ---------- Navigation: Scroll-Zustand ---------- */
  var nav = document.getElementById("nav");

  function onScroll() {
    nav.classList.toggle("nav--scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Navigation: Burger / Overlay ---------- */
  var burger = nav.querySelector(".nav__burger");
  var panel = document.getElementById("nav-panel");

  function closeMenu() {
    nav.classList.remove("nav--open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Menü öffnen");
  }

  burger.addEventListener("click", function () {
    var open = nav.classList.toggle("nav--open");
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
  });

  panel.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("nav--open")) {
      closeMenu();
      burger.focus();
    }
  });

  /* ---------- Vorher/Nachher-Slider ---------- */
  document.querySelectorAll("[data-compare]").forEach(function (compare) {
    var range = compare.querySelector(".compare__range");

    function update() {
      compare.style.setProperty("--pos", range.value + "%");
    }
    range.addEventListener("input", update);
    update();
  });

  /* ---------- Scroll-Reveal (respektiert Reduced Motion) ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Jahr im Footer ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
