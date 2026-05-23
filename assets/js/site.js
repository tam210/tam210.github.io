(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var isCompactNav = window.matchMedia("(max-width: 1024px)").matches;
  var EMAIL = "ossandon.t20@gmail.com";

  var PROJECT_MODALS = {
    construckit: {
      company: "ConstruckIT",
      title: "Suite multiempresa para operación en obra",
      body:
        "<p>SaaS multi-tenant de ConstruckIT en producción para operación en obra.</p>" +
        "<p><strong>Mi aporte:</strong> arquitectura multi-tenant, API Laravel, panel Inertia, app con cola offline, RBAC y módulos de reportes, combustible y mantención; despliegues en Cloud Run.</p>",
      chips: ["Laravel", "Vue / Inertia", "React Native", "Multi-tenant", "GCP", "RBAC"],
    },
    duffco: {
      company: "Duffco",
      title: "Plataforma operativa para constructoras",
      body:
        "<p>SaaS web y móvil offline first para operación en terreno: registro operativo, alertas de combustible, cobros automatizados, costos por obra, cruce de datos e informes para gerencia.</p>" +
        "<p>Enfoque en visibilidad operativa y adopción real por equipos en obra y oficina.</p>",
      chips: ["Laravel", "Vue / Inertia", "React Native", "GCP", "Cloud Run", "Cloud SQL", "MySQL"],
    },
  };

  var TYPED_WORDS = [
    "software operacional.",
    "procesos reales digitalizados.",
    "productos web y móviles en producción.",
    "experiencias útiles para terreno y gerencia.",
    "automatización con impacto.",
    "dashboards y reportes claros.",
  ];

  /* —— Utilidades —— */
  function showToast(msg) {
    var toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () {
        toast.hidden = true;
      }, 300);
    }, 2600);
  }

  function trapFocus(modal) {
    var focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    modal.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* —— Typewriter hero —— */
  var typewriterStarted = false;

  function initTypewriter() {
    if (typewriterStarted) return;
    var el = document.getElementById("typed");
    if (!el || !TYPED_WORDS.length) return;
    typewriterStarted = true;

    var wordIndex = 0;
    var currentText = "";
    var isDeleting = false;

    function runStep() {
      var fullText = TYPED_WORDS[wordIndex];
      if (!isDeleting) {
        currentText = fullText.slice(0, currentText.length + 1);
        el.textContent = currentText;
        if (currentText.length < fullText.length) {
          window.setTimeout(runStep, 70);
        } else {
          isDeleting = true;
          window.setTimeout(runStep, 2000);
        }
        return;
      }
      currentText = fullText.slice(0, currentText.length - 1);
      el.textContent = currentText;
      if (currentText.length > 0) {
        window.setTimeout(runStep, 38);
        return;
      }
      isDeleting = false;
      wordIndex = (wordIndex + 1) % TYPED_WORDS.length;
      window.setTimeout(runStep, 320);
    }

    if (reducedMotion) {
      el.textContent = TYPED_WORDS[0];
      window.setInterval(function () {
        wordIndex = (wordIndex + 1) % TYPED_WORDS.length;
        el.textContent = TYPED_WORDS[wordIndex];
      }, 4000);
      return;
    }

    el.textContent = "";
    runStep();
  }

  function bootTypewriter() {
    initTypewriter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootTypewriter);
  } else {
    bootTypewriter();
  }

  /* —— Contadores stats —— */
  function animateCounter(node, target, suffix) {
    var duration = 1200;
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
            if (reducedMotion) node.textContent = target + suffix;
            else animateCounter(node, target, suffix);
          });
          statsObs.unobserve(entry.target);
        });
      },
      { threshold: 0.3 }
    );
    statsObs.observe(statsSection);
  }

  /* —— Scroll reveal —— */
  if ("IntersectionObserver" in window && !reducedMotion && !isCompactNav) {
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

    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObs.observe(el);
    });
    document.querySelectorAll(".project-card").forEach(function (el, i) {
      el.style.transitionDelay = i * 0.06 + "s";
      revealObs.observe(el);
    });
    document.querySelectorAll(".stat-card").forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = i * 0.06 + "s";
      revealObs.observe(el);
    });
  } else {
    document
      .querySelectorAll(".reveal, .project-card, .stat-card")
      .forEach(function (el) {
        el.classList.add("visible");
      });
  }

  var skillsStage = document.getElementById("skills-stage");
  if (skillsStage && (reducedMotion || isCompactNav)) {
    skillsStage.classList.add("visible");
  }

  /* —— Nav spy + indicador —— */
  var header = document.getElementById("header");
  var navIndicator = document.querySelector(".nav-indicator");
  var navLinks = document.querySelectorAll("#nav a[href^='#']");

  function moveNavIndicator(activeLink) {
    if (!navIndicator || !activeLink || !header) return;
    var nav = document.getElementById("nav");
    if (!nav) return;
    var linkRect = activeLink.getBoundingClientRect();
    var navRect = nav.getBoundingClientRect();
    navIndicator.style.width = linkRect.width + "px";
    navIndicator.style.height = linkRect.height + "px";
    navIndicator.style.transform =
      "translate(" + (linkRect.left - navRect.left) + "px," + (linkRect.top - navRect.top) + "px)";
    navIndicator.style.opacity = "1";
  }

  function setNavActive(id) {
    var active = null;
    navLinks.forEach(function (a) {
      var match = a.getAttribute("href") === "#" + id;
      a.classList.toggle("nav-active", match);
      a.classList.toggle("active", match);
      if (match) active = a;
    });
    if (active) moveNavIndicator(active);
  }

  if ("IntersectionObserver" in window) {
    var sections = [];
    navLinks.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var sec = document.getElementById(id);
      if (sec) sections.push(sec);
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
      spy.observe(s);
    });
    var initial = document.querySelector("#nav a.active");
    if (initial) moveNavIndicator(initial);
    window.addEventListener("resize", function () {
      var cur = document.querySelector("#nav a.active");
      if (cur) moveNavIndicator(cur);
    });
  }

  /* —— Scroll progress + timeline lateral —— */
  var progressBar = document.querySelector(".scroll-progress-bar");
  var progressGlow = document.querySelector(".scroll-progress-glow");
  var timelineFill = document.querySelector(".scroll-timeline-fill");
  var timelineRailFill = document.querySelector(".timeline-rail-fill");
  var experienceTimeline = document.querySelector(".experience-timeline");
  var experienceSection = document.querySelector(".experience-section");

  var sectionIds = ["one", "about-work", "three", "two", "contact"];

  function updateExperienceTimelineProgress() {
    if (!experienceTimeline || !experienceSection) return;
    var rect = experienceSection.getBoundingClientRect();
    var vh = window.innerHeight;
    var total = rect.height + vh * 0.25;
    var scrolled = vh * 0.35 - rect.top;
    var p = Math.min(100, Math.max(0, (scrolled / total) * 100));
    experienceTimeline.style.setProperty("--timeline-progress", p + "%");
    if (timelineRailFill) timelineRailFill.style.height = p + "%";
  }

  function buildTimelineDots() {
    var ul = document.querySelector(".scroll-timeline-dots");
    if (!ul) return;
    var labels = { one: "Inicio", "about-work": "Sobre mí", three: "Experiencia", two: "Skills", contact: "Contacto" };
    sectionIds.forEach(function (id) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + id;
      a.className = "scrolly";
      a.setAttribute("aria-label", labels[id] || id);
      a.dataset.section = id;
      li.appendChild(a);
      ul.appendChild(li);
    });
  }
  buildTimelineDots();
  updateExperienceTimelineProgress();

  window.addEventListener(
    "scroll",
    function () {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 40);
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var p = docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0;
      if (progressBar) progressBar.style.width = p + "%";
      if (progressGlow) progressGlow.style.width = p + "%";
      if (timelineFill) timelineFill.style.height = p + "%";
      updateExperienceTimelineProgress();

      var scrollY = window.scrollY + window.innerHeight * 0.35;
      sectionIds.forEach(function (id) {
        var el = document.getElementById(id);
        var dot = document.querySelector('.scroll-timeline-dots a[data-section="' + id + '"]');
        if (!el || !dot) return;
        var top = el.offsetTop;
        var bottom = top + el.offsetHeight;
        dot.classList.toggle("active", scrollY >= top && scrollY < bottom);
      });
    },
    { passive: true }
  );

  /* —— Timeline proyectos activos —— */
  var projectCards = document.querySelectorAll(".experience-section .project-card");
  if (projectCards.length && "IntersectionObserver" in window) {
    var projectObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            projectCards.forEach(function (c) {
              c.classList.remove("is-timeline-active");
            });
            entry.target.classList.add("is-timeline-active");
          }
        });
      },
      { threshold: 0.35, rootMargin: "-20% 0px -35% 0px" }
    );
    projectCards.forEach(function (c) {
      projectObs.observe(c);
    });
  }

  /* —— Tilt 3D —— */
  if (finePointer && !reducedMotion) {
    document.querySelectorAll("[data-tilt]").forEach(function (wrap) {
      var inner =
        wrap.querySelector(".hero-portrait-tilt") ||
        wrap.querySelector(".hero-photo") ||
        wrap.querySelector("img") ||
        wrap;
      var max = wrap.classList.contains("hero-portrait") ? 5 : 6;
      wrap.addEventListener("mousemove", function (e) {
        var r = wrap.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        inner.style.transform =
          "rotateY(" + x * max + "deg) rotateX(" + -y * max + "deg) translateZ(8px)";
      });
      wrap.addEventListener("mouseleave", function () {
        inner.style.transform = "";
      });
    });
  }

  /* —— Luz radial en tarjetas (--mouse-x / --mouse-y) —— */
  if (finePointer && !reducedMotion) {
    document.querySelectorAll(".project-card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", ((e.clientX - r.left) / r.width) * 100 + "%");
        card.style.setProperty("--mouse-y", ((e.clientY - r.top) / r.height) * 100 + "%");
      });
    });
  }

  /* —— Cursor personalizado + partículas —— */
  (function initCustomCursor() {
    if (!finePointer || reducedMotion) return;

    var cursorEl = document.querySelector(".custom-cursor");
    var particlesRoot = document.querySelector(".cursor-particles");
    if (!cursorEl || !particlesRoot) return;

    var layer = document.getElementById("cursor-layer");
    if (!layer) {
      layer = document.createElement("div");
      layer.id = "cursor-layer";
      layer.setAttribute("aria-hidden", "true");
    }
    document.documentElement.appendChild(layer);
    layer.appendChild(cursorEl);
    layer.appendChild(particlesRoot);

    var root = document.documentElement;
    root.classList.add("has-custom-cursor", "is-cursor-ready");
    root.classList.remove("is-cursor-out");

    var dotEl = cursorEl.querySelector(".cursor-dot");
    var haloEl = cursorEl.querySelector(".cursor-halo");
    var ringEl = cursorEl.querySelector(".cursor-ring");
    var mx = -100;
    var my = -100;
    var rx = -100;
    var ry = -100;
    var rafId = 0;
    var activeCount = 0;
    var MAX_PARTICLES = 24;
    var SPAWN_MS = 52;
    var lastSpawn = 0;
    var hasPointer = false;

    var interactiveSel =
      "a, button, .project-card, .skill-chip, .stat-card, .cta-primary, .cta-secondary, .skills-filter, [data-magnetic], label, summary";
    var focusSel =
      ".cta-primary, .contact-btn-main, .project-card.featured.is-current, .contact-btn-copy";

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function placePart(node, x, y) {
      if (!node) return;
      node.style.left = x + "px";
      node.style.top = y + "px";
    }

    function placeCursor() {
      placePart(dotEl, mx, my);
      placePart(haloEl, mx, my);
      placePart(ringEl, rx, ry);
    }

    function tick() {
      if (hasPointer) {
        rx = lerp(rx, mx, 0.32);
        ry = lerp(ry, my, 0.32);
        if (Math.hypot(rx - mx, ry - my) < 0.35) {
          rx = mx;
          ry = my;
        }
      }
      placeCursor();
      rafId = requestAnimationFrame(tick);
    }

    function spawnParticle(x, y) {
      if (activeCount >= MAX_PARTICLES) return;
      var el = document.createElement("span");
      el.className = "cursor-particle";
      var size = 3 + Math.random() * 4;
      var dx = (Math.random() - 0.5) * 18;
      var dy = -8 - Math.random() * 16;
      el.style.width = size + "px";
      el.style.height = size + "px";
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.setProperty("--rot", Math.random() * 90 + "deg");
      el.style.setProperty("--dx", dx + "px");
      el.style.setProperty("--dy", dy + "px");
      particlesRoot.appendChild(el);
      activeCount++;
      setTimeout(function () {
        el.remove();
        activeCount--;
      }, 850);
    }

    function updateCursorState(target) {
      if (!target || target.closest("input, textarea, select, [contenteditable='true']")) {
        cursorEl.classList.remove("is-hover", "is-focus");
        return;
      }
      var focusMatch = target.closest(focusSel);
      var hoverMatch = target.closest(interactiveSel);
      cursorEl.classList.toggle("is-focus", !!focusMatch);
      cursorEl.classList.toggle("is-hover", !!hoverMatch && !focusMatch);
    }

    function onMove(e) {
      if (e.pointerType && e.pointerType !== "mouse") return;
      mx = e.clientX;
      my = e.clientY;
      hasPointer = true;
      root.classList.remove("is-cursor-out");
      placeCursor();
      var now = performance.now();
      if (now - lastSpawn >= SPAWN_MS) {
        lastSpawn = now;
        spawnParticle(mx, my);
      }
      updateCursorState(e.target);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });

    document.addEventListener(
      "pointerover",
      function (e) {
        if (e.pointerType && e.pointerType !== "mouse") return;
        var onField = e.target.closest("input, textarea, select, [contenteditable='true']");
        root.classList.toggle("cursor-over-input", !!onField);
        updateCursorState(e.target);
      },
      { passive: true }
    );

    document.addEventListener(
      "mouseout",
      function (e) {
        if (e.relatedTarget) return;
        hasPointer = false;
        root.classList.add("is-cursor-out");
      },
      { passive: true }
    );

    window.addEventListener(
      "scroll",
      function () {
        if (hasPointer) placeCursor();
      },
      { passive: true }
    );

    placeCursor();
    rafId = requestAnimationFrame(tick);
  })();

  /* —— Botones magnéticos —— */
  if (finePointer && !reducedMotion) {
    document.querySelectorAll("[data-magnetic], .btn-magnetic").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + x * 0.12 + "px," + y * 0.12 + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "";
      });
    });
  }

  /* —— Expandir PSI —— */
  document.querySelectorAll(".btn-project-expand").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".project-card");
      if (!card) return;
      var open = card.classList.toggle("is-expanded");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Ocultar detalle" : "Ver detalle";
    });
  });

  /* —— Modal proyectos —— */
  var modal = document.getElementById("project-modal");
  var modalTitle = document.getElementById("modal-title");
  var modalCompany = document.getElementById("modal-company");
  var modalBody = document.getElementById("modal-body");
  var modalChips = document.getElementById("modal-chips");
  var lastFocus = null;

  function openModal(key) {
    var data = PROJECT_MODALS[key];
    if (!modal || !data) return;
    lastFocus = document.activeElement;
    modalCompany.textContent = data.company;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.body;
    modalChips.innerHTML = data.chips
      .map(function (c) {
        return '<span class="chip mono">' + c + "</span>";
      })
      .join("");
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modal.querySelector(".modal-close").focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocus) lastFocus.focus();
  }

  if (modal) {
    trapFocus(modal);
    document.querySelectorAll("[data-open-modal]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openModal(btn.getAttribute("data-open-modal"));
      });
    });
    modal.querySelectorAll("[data-close-modal]").forEach(function (el) {
      el.addEventListener("click", closeModal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
  }

  /* —— Skills filter —— */
  var skillChips = document.querySelectorAll(".skill-chip");
  var skillFilters = document.querySelectorAll(".skills-filter");
  var skillsEmpty = document.getElementById("skills-empty");
  var skillsCount = document.getElementById("skills-count");
  var skillsGrid = document.getElementById("skills-grid");

  function applySkillFilter(filter) {
    var visible = 0;
    skillChips.forEach(function (chip) {
      var cats = (chip.getAttribute("data-category") || "").split(/\s+/);
      var show = filter === "all" || cats.indexOf(filter) !== -1;
      chip.classList.toggle("is-hidden", !show);
      if (show) visible++;
    });
    if (skillsEmpty) skillsEmpty.hidden = visible > 0;
    if (skillsGrid) skillsGrid.hidden = visible === 0;
    if (skillsCount) {
      skillsCount.textContent =
        visible === skillChips.length
          ? visible + " tecnologías"
          : visible + " de " + skillChips.length + " tecnologías";
    }
  }

  skillFilters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      skillFilters.forEach(function (b) {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });
      applySkillFilter(f);
    });
  });

  applySkillFilter("all");

  /* —— Skill tooltips —— */
  var tipEl = document.createElement("div");
  tipEl.className = "skill-tooltip mono";
  tipEl.setAttribute("role", "tooltip");
  tipEl.hidden = true;
  document.body.appendChild(tipEl);

  skillChips.forEach(function (chip) {
    chip.addEventListener("mouseenter", function () {
      var tip = chip.getAttribute("data-tip");
      if (!tip || isCompactNav) return;
      tipEl.textContent = tip;
      tipEl.hidden = false;
      var r = chip.getBoundingClientRect();
      tipEl.style.left = r.left + r.width / 2 + "px";
      tipEl.style.top = r.top - 8 + "px";
    });
    chip.addEventListener("mouseleave", function () {
      tipEl.hidden = true;
    });
  });

  /* —— Copiar email —— */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy") || EMAIL;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          showToast("Correo copiado al portapapeles");
        });
      } else {
        showToast(text);
      }
    });
  });

  /* —— Parallax hero —— */
  if (!reducedMotion && !isCompactNav) {
    var heroMesh = document.querySelector(".hero-mesh");
    window.addEventListener(
      "scroll",
      function () {
        if (!heroMesh) return;
        var y = window.scrollY * 0.15;
        heroMesh.style.transform = "translate3d(0," + y + "px,0)";
      },
      { passive: true }
    );
  }

  if (isCompactNav) document.body.classList.remove("is-preload");

  window.addEventListener("load", function () {
    document.body.classList.add("is-loaded");
    document.body.classList.remove("is-preload");
    window.dispatchEvent(new Event("scroll"));
  });
})();
