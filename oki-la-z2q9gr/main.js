/* oki.la OnePager — Mobile-Nav + Scroll-Reveal (minimal, vanilla JS) */
(function () {
  "use strict";

  /* ---------- Mobile-Navigation ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.getElementById("primary-nav");

  function closeNav() {
    if (!links) return;
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Menü öffnen");
  }

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    });

    // Beim Klick auf einen Link das Menü schließen
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });

    // Escape schließt das Menü
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    // Wechsel auf Desktop-Breite: Zustand zurücksetzen
    var mq = window.matchMedia("(min-width: 860px)");
    mq.addEventListener("change", function (e) {
      if (e.matches) closeNav();
    });
  }

  /* ---------- Foto-Slots: fehlt eine Datei in assets/, Fallback zeigen ---------- */
  function markMissing(img) {
    var holder = img.closest(".photo") || img.closest(".hero__media");
    if (holder) holder.classList.add("is-missing");
  }
  document.querySelectorAll(".photo__img").forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) {
      // Bereits fehlgeschlagen (z. B. aus dem Cache), bevor JS lief
      markMissing(img);
    }
    img.addEventListener("error", function () { markMissing(img); });
  });

  /* ---------- Scroll-Reveal via IntersectionObserver ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { io.observe(el); });
  }
})();
