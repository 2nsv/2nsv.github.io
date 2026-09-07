(function () {

  "use strict";

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  const header =
    document.getElementById(
      "siteHeader"
    );

  const navToggle =
    document.getElementById(
      "navToggle"
    );

  const mobileMenu =
    document.getElementById(
      "mobileMenu"
    );

  const cursorGlow =
    document.getElementById(
      "cursorGlow"
    );

  const heroVisual =
    document.getElementById(
      "heroVisual"
    );

  const heroPhoto =
    document.getElementById(
      "heroPhoto"
    );


  /* ================= HEADER ================= */

  function setHeader() {

    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 20
    );

  }

  setHeader();

  window.addEventListener(
    "scroll",
    setHeader,
    {
      passive: true
    }
  );


  /* ================= MOBILE MENU ================= */

  if (
    navToggle &&
    mobileMenu
  ) {

    navToggle.addEventListener(
      "click",
      function () {

        const open =
          mobileMenu.classList.toggle(
            "open"
          );

        navToggle.classList.toggle(
          "open",
          open
        );

        navToggle.setAttribute(
          "aria-expanded",
          String(open)
        );

      }
    );


    mobileMenu
      .querySelectorAll("a")
      .forEach(
        function (link) {

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

        }
      );

  }


  /* ================= CURSOR GLOW ================= */

  if (
    !reducedMotion &&
    cursorGlow
  ) {

    window.addEventListener(
      "pointermove",
      function (event) {

        cursorGlow.style.left =
          event.clientX + "px";

        cursorGlow.style.top =
          event.clientY + "px";

      },
      {
        passive: true
      }
    );

  }


  /* ================= HERO 3D PHOTO ================= */

  if (
    !reducedMotion &&
    heroVisual &&
    heroPhoto
  ) {

    heroVisual.addEventListener(
      "pointermove",
      function (event) {

        const rect =
          heroVisual.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width -
          0.5;

        const y =
          (event.clientY - rect.top) /
          rect.height -
          0.5;


        heroPhoto.style.transform =
          "translate(-50%, -50%) " +
          "rotateY(" +
          (-7 + x * 12) +
          "deg) " +
          "rotateX(" +
          (3 - y * 10) +
          "deg) " +
          "translateZ(12px)";

      }
    );


    heroVisual.addEventListener(
      "pointerleave",
      function () {

        heroPhoto.style.transform =
          "translate(-50%, -50%) " +
          "rotateY(-7deg) " +
          "rotateX(3deg)";

      }
    );

  }


  /* ================= SCROLL REVEAL ================= */

  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    "IntersectionObserver" in window &&
    !reducedMotion
  ) {

    const revealObserver =
      new IntersectionObserver(
        function (
          entries,
          observer
        ) {

          entries.forEach(
            function (entry) {

              if (
                !entry.isIntersecting
              ) {
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
          threshold: 0.12
        }
      );


    revealElements.forEach(
      function (element, index) {

        element.style.transitionDelay =
          Math.min(
            index * 35,
            280
          ) + "ms";

        revealObserver.observe(
          element
        );

      }
    );

  } else {

    revealElements.forEach(
      function (element) {

        element.classList.add(
          "in-view"
        );

      }
    );

  }


  /* ================= ACTIVE NAV ================= */

  const navLinks =
    document.querySelectorAll(
      "[data-nav]"
    );


  const sections =
    Array.from(navLinks)
      .map(
        function (link) {

          const id =
            link.getAttribute(
              "href"
            );

          return id
            ? document.querySelector(id)
            : null;

        }
      )
      .filter(Boolean);


  if (
    "IntersectionObserver" in window
  ) {

    const navObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(
            function (entry) {

              if (
                !entry.isIntersecting
              ) {
                return;
              }


              navLinks.forEach(
                function (link) {

                  link.classList.toggle(
                    "active",
                    link.getAttribute(
                      "href"
                    ) ===
                    "#" +
                    entry.target.id
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


    sections.forEach(
      function (section) {

        navObserver.observe(
          section
        );

      }
    );

  }


  /* ================= MAGNETIC BUTTONS ================= */

  document
    .querySelectorAll(
      ".btn, .project-link, .contact-link"
    )
    .forEach(
      function (element) {

        if (reducedMotion) {
          return;
        }


        element.addEventListener(
          "pointermove",
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
              x * 0.035 +
              "px," +
              y * 0.035 +
              "px)";

          }
        );


        element.addEventListener(
          "pointerleave",
          function () {

            element.style.transform =
              "";

          }
        );

      }
    );


  /* ================= RESIZE ================= */

  window.addEventListener(
    "resize",
    function () {

      if (
        window.innerWidth > 860 &&
        mobileMenu &&
        mobileMenu.classList.contains(
          "open"
        )
      ) {

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

    }
  );

})();
