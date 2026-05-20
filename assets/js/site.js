(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* —— Texto rotante (typewriter) —— */
  (function initRotatingText() {
    var el = document.getElementById("rotating-text");
    if (!el) return;

    var words = [
      "software operacional.",
      "apps móviles de terreno.",
      "plataformas SaaS.",
      "automatización de procesos.",
      "APIs y microservicios.",
      "dashboards y reportes.",
    ];

    if (reducedMotion) {
      el.textContent = words[0];
      return;
    }

    var i = 0;
    var ci = 0;
    var deleting = false;

    function tick() {
      var word = words[i];
      if (!deleting) {
        el.textContent = word.slice(0, ++ci);
        if (ci === word.length) {
          deleting = true;
          return setTimeout(tick, 2000);
        }
        return setTimeout(tick, 80);
      }
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        i = (i + 1) % words.length;
      }
      setTimeout(tick, 40);
    }

    tick();
  })();

  /* —— Contadores stats —— */
  function animateCounter(node, target, suffix) {
    var duration = 1400;
    var start = performance.now();
    function frame(now) {
      var t = Math.min((now - start) / duration, 1);
      var ease = 1 - Math.pow(1 - t, 3);
      node.textContent = Math.round(ease * target) + (suffix || "");
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var statsSection = document.querySelector(".stats-section");
  if (statsSection && "IntersectionObserver" in window) {
    var statsObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.querySelectorAll("[data-counter]").forEach(function (node) {
            var card = node.closest("[data-target]");
            if (!card || card.dataset.counted) return;
            card.dataset.counted = "1";
            var target = parseInt(card.getAttribute("data-target"), 10) || 0;
            var suffix = card.getAttribute("data-suffix") || "";
            if (reducedMotion) {
              node.textContent = target + suffix;
            } else {
              animateCounter(node, target, suffix);
            }
          });
          statsObs.unobserve(entry.target);
        });
      },
      { threshold: 0.3 }
    );
    statsObs.observe(statsSection);
  }

  /* —— Scroll reveal —— */
  if ("IntersectionObserver" in window && !reducedMotion) {
    var revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          revealObs.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".project-card").forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = i * 0.07 + "s";
      revealObs.observe(el);
    });

    document.querySelectorAll(".skill-item").forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 7) * 0.05 + "s";
      revealObs.observe(el);
    });

    document.querySelectorAll(".reveal:not(.project-card):not(.skill-item)").forEach(function (el) {
      revealObs.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal, .project-card, .skill-item").forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* —— Nav scroll spy + blur —— */
  var header = document.getElementById("header");
  var navLinks = document.querySelectorAll("#nav a[href^='#']");

  function setNavActive(id) {
    navLinks.forEach(function (a) {
      var match = a.getAttribute("href") === "#" + id;
      a.classList.toggle("nav-active", match);
      a.classList.toggle("active", match);
    });
  }

  if ("IntersectionObserver" in window) {
    var sections = [];
    navLinks.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var sec = document.getElementById(id);
      if (sec) sections.push({ id: id, el: sec });
    });

    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setNavActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (s) {
      spy.observe(s.el);
    });
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!header) return;
      if (window.scrollY > 40) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    },
    { passive: true }
  );

  /* —— Progress bar —— */
  var progressBar = document.querySelector(".scroll-progress-bar");
  window.addEventListener(
    "scroll",
    function () {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBar && docHeight > 0) {
        progressBar.style.width =
          Math.min(100, (window.scrollY / docHeight) * 100) + "%";
      }
    },
    { passive: true }
  );

  /* —— Cursor personalizado (solo desktop, sin reduced motion) —— */
  if (finePointer && !reducedMotion) {
    document.documentElement.classList.add("has-custom-cursor");
    var dot = document.createElement("div");
    dot.className = "cursor-dot";
    var ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.append(dot, ring);

    var mx = 0;
    var my = 0;
    var rx = 0;
    var ry = 0;

    document.addEventListener("mousemove", function (e) {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    });

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    (function animateRing() {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(animateRing);
    })();

    document.querySelectorAll("a, button, .project-card, .skill-item, .cta-primary, .cta-secondary").forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        dot.style.width = "12px";
        dot.style.height = "12px";
        ring.style.width = "48px";
        ring.style.height = "48px";
        ring.style.opacity = "0.35";
      });
      el.addEventListener("mouseleave", function () {
        dot.style.width = "8px";
        dot.style.height = "8px";
        ring.style.width = "32px";
        ring.style.height = "32px";
        ring.style.opacity = "0.5";
      });
    });
  }

  window.addEventListener("load", function () {
    document.body.classList.add("is-loaded");
    document.body.classList.remove("is-preload");
  });
})();
