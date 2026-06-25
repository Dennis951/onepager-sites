/* La Lune – OnePager Interaktionen
   Vanilla JS · keine Abhängigkeiten */
(function () {
  "use strict";

  /* -------- Mobile-Navigation -------- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");

  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Menü öffnen");
  }

  function openMenu() {
    if (!menu) return;
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Menü schließen");
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      if (menu.classList.contains("is-open")) closeMenu();
      else openMenu();
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* -------- Karten-Karussell -------- */
  var track = document.getElementById("menuTrack");
  var prev = document.getElementById("menuPrev");
  var next = document.getElementById("menuNext");

  function cardStep() {
    if (!track) return 300;
    var card = track.querySelector(".menu-card");
    if (!card) return 300;
    var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "16") || 16;
    return card.getBoundingClientRect().width + gap;
  }

  function updateNav() {
    if (!track || !prev || !next) return;
    var maxScroll = track.scrollWidth - track.clientWidth - 2;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= maxScroll;
  }

  if (track && prev && next) {
    prev.addEventListener("click", function () {
      track.scrollBy({ left: -cardStep(), behavior: "smooth" });
    });
    next.addEventListener("click", function () {
      track.scrollBy({ left: cardStep(), behavior: "smooth" });
    });
    track.addEventListener("scroll", function () {
      window.requestAnimationFrame(updateNav);
    }, { passive: true });
    window.addEventListener("resize", updateNav);
    updateNav();
  }

  /* -------- Lightbox -------- */
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbClose = document.getElementById("lbClose");
  var lbPrev = document.getElementById("lbPrev");
  var lbNext = document.getElementById("lbNext");

  var items = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]")).map(function (el) {
    var img = el.querySelector("img");
    return { src: el.getAttribute("href"), alt: img ? img.getAttribute("alt") : "" };
  });
  var current = 0;
  var lastFocus = null;

  function showAt(i) {
    if (!items.length) return;
    current = (i + items.length) % items.length;
    lbImg.setAttribute("src", items[current].src);
    lbImg.setAttribute("alt", items[current].alt || "");
  }

  function openLightbox(i, trigger) {
    if (!lightbox) return;
    lastFocus = trigger || document.activeElement;
    showAt(i);
    lightbox.hidden = false;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    lbClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.querySelectorAll("[data-lightbox]").forEach(function (el, idx) {
    el.addEventListener("click", function (e) {
      // Nur wenn JS aktiv: Lightbox statt Navigation
      e.preventDefault();
      openLightbox(idx, el);
    });
  });

  if (lightbox) {
    lbClose.addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", function () { showAt(current - 1); });
    lbNext.addEventListener("click", function () { showAt(current + 1); });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showAt(current - 1);
      else if (e.key === "ArrowRight") showAt(current + 1);
    });
  }

  /* -------- Scroll-Fortschrittsbalken -------- */
  var progress = document.getElementById("scrollProgress");
  if (progress) {
    var ticking = false;
    var setProgress = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var ratio = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
      progress.style.transform = "scaleX(" + ratio + ")";
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(setProgress); ticking = true; }
    }, { passive: true });
    window.addEventListener("resize", setProgress);
    setProgress();
  }

  /* -------- Scroll-Reveal -------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
