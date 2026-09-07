(function () {
  "use strict";

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =====================================================
     HEADER
     ===================================================== */

  const header = document.getElementById("siteHeader");

  function updateHeader() {
    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );
  }

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* =====================================================
     MOBILE NAV
     ===================================================== */

  const navToggle =
    document.getElementById("navToggle");

  const mobileMenu =
    document.getElementById("mobileMenu");

  if (navToggle && mobileMenu) {

    navToggle.addEventListener(
      "click",
      function () {

        const isOpen =
          mobileMenu.classList.toggle("open");

        navToggle.classList.toggle(
          "open",
          isOpen
        );

        navToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

      }
    );


    mobileMenu
      .querySelectorAll("a")
      .forEach(function (link) {

        link.addEventListener(
          "click",
          function () {

            mobileMenu.classList.remove(
              "open"
            );

            navToggle.classList.remove(
              "open"
            );

            navToggle.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      });

  }


  /* =====================================================
     ACTIVE NAV
     ===================================================== */

  const navLinks =
    document.querySelectorAll(
      "[data-nav]"
    );

  const sections = Array
    .from(navLinks)
    .map(function (link) {

      const href =
        link.getAttribute("href");

      if (!href || !href.startsWith("#")) {
        return null;
      }

      return document.getElementById(
        href.substring(1)
      );

    })
    .filter(Boolean);


  if (
    "IntersectionObserver" in window &&
    sections.length
  ) {

    const observer =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(
            function (entry) {

              if (!entry.isIntersecting) {
                return;
              }

              const currentId =
                entry.target.id;

              navLinks.forEach(
                function (link) {

                  link.classList.toggle(
                    "active",
                    link.getAttribute("href") ===
                    "#" + currentId
                  );

                }
              );

            }
          );

        },
        {
          rootMargin:
            "-35% 0px -55% 0px",
          threshold: 0
        }
      );


    sections.forEach(function (section) {
      observer.observe(section);
    });

  }


  /* =====================================================
     CURSOR GLOW
     ===================================================== */

  const cursorGlow =
    document.querySelector(".cursor-glow");

  if (
    cursorGlow &&
    !reducedMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;

    window.addEventListener(
      "mousemove",
      function (event) {

        mouseX = event.clientX;
        mouseY = event.clientY;

      },
      { passive: true }
    );


    function animateGlow() {

      glowX +=
        (mouseX - glowX) * 0.12;

      glowY +=
        (mouseY - glowY) * 0.12;

      cursorGlow.style.left =
        glowX + "px";

      cursorGlow.style.top =
        glowY + "px";

      requestAnimationFrame(
        animateGlow
      );

    }

    animateGlow();

  }


  /* =====================================================
     INTERACTIVE PROFILE PHOTO
     ===================================================== */

  const photoCard =
    document.getElementById("photoCard");


  if (
    photoCard &&
    !reducedMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    photoCard.addEventListener(
      "mousemove",
      function (event) {

        const rect =
          photoCard.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;

        const rotateY =
          ((x - centerX) / centerX) * 7;

        const rotateX =
          ((centerY - y) / centerY) * 7;

        photoCard.style.transform =
          "rotateX(" +
          rotateX +
          "deg) rotateY(" +
          rotateY +
          "deg) translateZ(10px)";

      }
    );


    photoCard.addEventListener(
      "mouseleave",
      function () {

        photoCard.style.transform =
          "rotateX(0deg) rotateY(0deg) translateZ(0)";

      }
    );

  }


  /* =====================================================
     MAGNETIC BUTTONS
     ===================================================== */

  const magneticElements =
    document.querySelectorAll(".magnetic");


  if (
    !reducedMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    magneticElements.forEach(
      function (element) {

        element.addEventListener(
          "mousemove",
          function (event) {

            const rect =
              element.getBoundingClientRect();

            const x =
              event.clientX -
              rect.left -
              rect.width / 2;

            const y =
              event.clientY -
              rect.top -
              rect.height / 2;

            element.style.transform =
              "translate(" +
              x * 0.08 +
              "px, " +
              y * 0.08 +
              "px)";

          }
        );


        element.addEventListener(
          "mouseleave",
          function () {

            element.style.transform =
              "";

          }
        );

      }
    );

  }


  /* =====================================================
     REVEAL ON SCROLL
     ===================================================== */

  const revealTargets =
    document.querySelectorAll(
      ".skill-card, " +
      ".education-card, " +
      ".experience-item, " +
      ".service-card, " +
      ".project-card, " +
      ".milestone, " +
      ".testimonial-placeholder, " +
      ".usp-card, " +
      ".about-main, " +
      ".stat"
    );


  revealTargets.forEach(
    function (element) {

      element.setAttribute(
        "data-reveal",
        ""
      );

    }
  );


  if (
    "IntersectionObserver" in window &&
    !reducedMotion
  ) {

    const revealObserver =
      new IntersectionObserver(
        function (entries, observer) {

          entries.forEach(
            function (entry) {

              if (!entry.isIntersecting) {
                return;
              }

              entry.target.classList.add(
                "in-view"
              );

              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold: 0.08
        }
      );


    document
      .querySelectorAll("[data-reveal]")
      .forEach(function (element) {

        revealObserver.observe(
          element
        );

      });

  } else {

    document
      .querySelectorAll("[data-reveal]")
      .forEach(function (element) {

        element.classList.add(
          "in-view"
        );

      });

  }


  /* =====================================================
     SKILL CARD POINTER EFFECT
     ===================================================== */

  const cards =
    document.querySelectorAll(
      ".skill-card, .service-card, .project-card"
    );


  if (
    !reducedMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    cards.forEach(
      function (card) {

        card.addEventListener(
          "mousemove",
          function (event) {

            const rect =
              card.getBoundingClientRect();

            const x =
              event.clientX - rect.left;

            const y =
              event.clientY - rect.top;

            card.style.setProperty(
              "--mouse-x",
              x + "px"
            );

            card.style.setProperty(
              "--mouse-y",
              y + "px"
            );

          }
        );

      }
    );

  }


  /* =====================================================
     RESIZE
     ===================================================== */

  window.addEventListener(
    "resize",
    function () {

      if (
        window.innerWidth > 1050 &&
        mobileMenu &&
        mobileMenu.classList.contains("open")
      ) {

        mobileMenu.classList.remove(
          "open"
        );

        if (navToggle) {

          navToggle.classList.remove(
            "open"
          );

          navToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }

    }
  );

})();
