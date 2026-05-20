(function () {
  "use strict";

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
    document.querySelectorAll("[data-stat-number]").forEach(function (el) {
      var card = el.closest(".stat-card");
      if (card) {
        el.textContent =
          (card.getAttribute("data-count") || "0") +
          (card.getAttribute("data-suffix") || "");
      }
    });
  }

  var progressBar = document.querySelector(".scroll-progress-bar");
  var taglineTrack = document.querySelector(".hero-tagline .tagline-track");

  function onScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (progressBar && docHeight > 0) {
      progressBar.style.width =
        Math.min(100, (scrollTop / docHeight) * 100) + "%";
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (taglineTrack) {
    initTaglineSlide(taglineTrack, prefersReduced);
  }

  function initTaglineSlide(track, reducedMotion) {
    var viewport = track.closest(".tagline-viewport");
    var words = (track.getAttribute("data-words") || "")
      .split(",")
      .map(function (w) {
        return w.trim();
      })
      .filter(Boolean);

    if (!words.length) return;

    var index = 0;
    var animating = false;

    function wordEl(text) {
      var el = document.createElement("span");
      el.className = "tagline-word";
      el.textContent = text;
      return el;
    }

    function measureViewport() {
      if (!viewport) return;
      var probe = document.createElement("span");
      probe.className = "tagline-word tagline-word--measure";
      probe.setAttribute("aria-hidden", "true");
      probe.style.visibility = "hidden";
      probe.style.position = "absolute";
      viewport.appendChild(probe);
      var max = 0;
      words.forEach(function (w) {
        probe.textContent = w;
        max = Math.max(max, probe.offsetWidth);
      });
      probe.remove();
      viewport.style.width = Math.ceil(max) + "px";
    }

    track.innerHTML = "";
    track.appendChild(wordEl(words[0]));
    measureViewport();
    window.addEventListener("resize", measureViewport);

    if (reducedMotion || words.length < 2) return;

    window.setInterval(function () {
      if (animating) return;
      animating = true;

      var current = track.querySelector(".tagline-word");
      if (!current) {
        animating = false;
        return;
      }

      index = (index + 1) % words.length;
      var next = wordEl(words[index]);
      next.classList.add("is-enter");
      track.appendChild(next);

      requestAnimationFrame(function () {
        current.classList.add("is-exit");
        next.classList.remove("is-enter");
      });

      window.setTimeout(function () {
        current.remove();
        animating = false;
      }, 520);
    }, 3400);
  }

  function initNavSpy() {
    var links = document.querySelectorAll('#nav a[href^="#"]');
    if (!links.length) return;

    var sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      if (el) sections.push({ id: id, el: el, link: link });
    });

    function update() {
      var scrollY = window.scrollY + window.innerHeight * 0.35;
      var current = sections[0];

      sections.forEach(function (s) {
        if (s.el.offsetTop <= scrollY) current = s;
      });

      sections.forEach(function (s) {
        s.link.classList.toggle(
          "is-scroll-active",
          current && s.id === current.id
        );
        s.link.classList.toggle("active", current && s.id === current.id);
      });
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  initNavSpy();

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(card) {
    var target = parseInt(card.getAttribute("data-count"), 10) || 0;
    var suffix = card.getAttribute("data-suffix") || "";
    var el = card.querySelector("[data-stat-number]");
    if (!el || card.dataset.counted === "1") return;

    card.dataset.counted = "1";
    var duration = 1200;
    var start = performance.now();

    function frame(now) {
      var t = Math.min(1, (now - start) / duration);
      var value = Math.round(easeOutCubic(t) * target);
      el.textContent = value + suffix;
      if (t < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  if ("IntersectionObserver" in window && !prefersReduced) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    document.querySelectorAll(".stat-card[data-count]").forEach(function (card) {
      counterObserver.observe(card);
    });
  } else {
    document.querySelectorAll(".stat-card[data-count]").forEach(animateCounter);
  }

  if (!prefersReduced) {
    document.querySelectorAll(".tilt-card").forEach(function (card) {
      var max = 5;

      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          "perspective(900px) rotateX(" +
          -y * max +
          "deg) rotateY(" +
          x * max +
          "deg) translateY(-3px)";
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  window.addEventListener("load", function () {
    document.body.classList.add("is-loaded");
    document.body.classList.remove("is-preload");
  });
})();
