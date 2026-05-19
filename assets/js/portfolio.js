(function () {
  "use strict";

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    document.querySelectorAll(".reveal, .stagger-item").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  var progressBar = document.querySelector(".scroll-progress-bar");
  var heroImg = document.querySelector(".image.main.hero img");
  var taglineTrack = document.querySelector(".tagline-track");

  function onScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (progressBar && docHeight > 0) {
      progressBar.style.width =
        Math.min(100, (scrollTop / docHeight) * 100) + "%";
    }

    if (heroImg && !prefersReduced) {
      heroImg.style.transform =
        "translateY(" + scrollTop * 0.12 + "px) scale(1.03)";
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
    track.setAttribute("data-current", words[0]);
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
        track.setAttribute("data-current", words[index]);
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
      });
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  initNavSpy();

  document.querySelectorAll(".exp-card").forEach(function (card) {
    var cells = card.querySelectorAll(".psi-cell");

    card.addEventListener("mouseenter", function () {
      card.classList.add("is-hovered");
      cells.forEach(function (cell, i) {
        window.setTimeout(function () {
          cell.classList.add("is-lit");
        }, i * 70);
      });
    });

    card.addEventListener("mouseleave", function () {
      card.classList.remove("is-hovered");
      cells.forEach(function (cell) {
        cell.classList.remove("is-lit");
      });
    });
  });

  if (prefersReduced) {
    window.addEventListener("load", function () {
      document.body.classList.add("is-loaded");
    });
    return;
  }

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

  document.querySelectorAll(".button.primary").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      ripple.style.left = e.clientX - rect.left + "px";
      ripple.style.top = e.clientY - rect.top + "px";
      btn.appendChild(ripple);
      window.setTimeout(function () {
        ripple.remove();
      }, 600);
    });
  });

  if ("IntersectionObserver" in window) {
    var staggerObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var items = entry.target.querySelectorAll(".stagger-item");
          items.forEach(function (item, i) {
            window.setTimeout(function () {
              item.classList.add("is-visible");
            }, i * 90);
          });
          entry.target
            .querySelectorAll(".metrics-strip li")
            .forEach(function (li, i) {
              window.setTimeout(function () {
                li.classList.add("is-visible");
              }, i * 80);
            });
          if (!entry.target.querySelectorAll(".stagger-item").length) {
            entry.target.classList.add("is-visible");
          }
          staggerObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );

    document
      .querySelectorAll(
        "#one .container, #how .container, #three .container, #two .container, #contact .container, #four .container"
      )
      .forEach(function (block) {
        staggerObserver.observe(block);
      });

    document.querySelectorAll(".stagger-item").forEach(function (el) {
      if (
        !el.closest(
          "#one .container, #how .container, #three .container, #two .container, #contact .container, #four .container"
        )
      ) {
        el.classList.add("is-visible");
      }
    });

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".stagger-item, .reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  window.addEventListener("load", function () {
    document.body.classList.add("is-loaded");
  });
})();
