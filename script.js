(function () {

  "use strict";


  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  /* ================= LOADER ================= */

  const loader =
    document.getElementById(
      "pageLoader"
    );

  window.addEventListener(
    "load",
    function () {

      window.setTimeout(
        function () {

          if (loader) {
            loader.classList.add(
              "loaded"
            );
          }

        },
        700
      );

    }
  );


  /* ================= ELEMENTS ================= */

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

  const heroParticles =
    document.getElementById(
      "heroParticles"
    );


  /* ================= HEADER ================= */

  function updateHeader() {

    if (!header) {
      return;
    }

    header.classList.toggle(
      "scrolled",
      window.scrollY > 20
    );

  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
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


  /* ================= CURSOR ================= */

  if (
    cursorGlow &&
    !reducedMotion &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;


    window.addEventListener(
      "pointermove",
      function (event) {

        mouseX =
          event.clientX;

        mouseY =
          event.clientY;

      },
      {
        passive: true
      }
    );


    function animateGlow() {

      glowX +=
        (mouseX - glowX) *
        0.09;

      glowY +=
        (mouseY - glowY) *
        0.09;


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


  /* ================= HERO PARTICLES ================= */

  if (
    heroParticles &&
    !reducedMotion
  ) {

    const amount =
      window.innerWidth < 700
        ? 18
        : 38;


    for (
      let i = 0;
      i < amount;
      i++
    ) {

      const particle =
        document.createElement(
          "span"
        );

      particle.className =
        "hero-particle";


      particle.style.left =
        Math.random() * 100 +
        "%";

      particle.style.top =
        Math.random() * 100 +
        "%";


      particle.style.setProperty(
        "--x",
        (
          Math.random() * 70 -
          35
        ) + "px"
      );


      particle.style.setProperty(
        "--y",
        (
          Math.random() * 90 -
          45
        ) + "px"
      );


      particle.style.setProperty(
        "--duration",
        (
          2.5 +
          Math.random() * 4
        ) + "s"
      );


      particle.style.animationDelay =
        (
          Math.random() * -5
        ) + "s";


      heroParticles.appendChild(
        particle
      );

    }

  }


  /* ================= HERO 3D ================= */

  if (
    heroVisual &&
    heroPhoto &&
    !reducedMotion &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    const orbits =
      heroVisual.querySelectorAll(
        ".visual-orbit"
      );

    const nodes =
      heroVisual.querySelectorAll(
        ".data-node"
      );

    const chips =
      heroVisual.querySelectorAll(
        ".parallax-item"
      );


    heroVisual.addEventListener(
      "pointermove",
      function (event) {

        const rect =
          heroVisual.getBoundingClientRect();


        const x =
          (
            event.clientX -
            rect.left
          ) /
          rect.width -
          0.5;


        const y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height -
          0.5;


        heroPhoto.style.transform =
          "translate(-50%,-50%) " +
          "rotateY(" +
          (
            -8 +
            x * 17
          ) +
          "deg) " +
          "rotateX(" +
          (
            4 -
            y * 15
          ) +
          "deg) " +
          "translateZ(18px)";


        orbits.forEach(
          function (
            orbit,
            index
          ) {

            const amount =
              (index + 1) *
              7;

            orbit.style.marginLeft =
              x * amount + "px";

            orbit.style.marginTop =
              y * amount + "px";

          }
        );


        nodes.forEach(
          function (
            node,
            index
          ) {

            const amount =
              (index + 1) *
              10;

            node.style.marginLeft =
              x * amount + "px";

            node.style.marginTop =
              y * amount + "px";

          }
        );


        chips.forEach(
          function (
            chip,
            index
          ) {

            const amount =
              (index + 1) *
              10;

            chip.style.marginLeft =
              x * amount + "px";

            chip.style.marginTop =
              y * amount + "px";

          }
        );

      }
    );


    heroVisual.addEventListener(
      "pointerleave",
      function () {

        heroPhoto.style.transform =
          "translate(-50%,-50%) " +
          "rotateY(-8deg) " +
          "rotateX(4deg)";


        orbits.forEach(
          function (orbit) {

            orbit.style.marginLeft =
              "";

            orbit.style.marginTop =
              "";

          }
        );


        nodes.forEach(
          function (node) {

            node.style.marginLeft =
              "";

            node.style.marginTop =
              "";

          }
        );


        chips.forEach(
          function (chip) {

            chip.style.marginLeft =
              "";

            chip.style.marginTop =
              "";

          }
        );

      }
    );

  }


  /* ================= REVEAL ================= */

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
          threshold: .1
        }
      );


    revealElements.forEach(
      function (
        element,
        index
      ) {

        element.style.transitionDelay =
          Math.min(
            index * 45,
            320
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


  /* ================= NAV ACTIVE ================= */

  const navLinks =
    document.querySelectorAll(
      "[data-nav]"
    );


  const sections =
    Array.from(navLinks)
      .map(
        function (link) {

          const href =
            link.getAttribute(
              "href"
            );

          if (
            !href ||
            href.charAt(0) !== "#"
          ) {
            return null;
          }

          return document.getElementById(
            href.substring(1)
          );

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


              const id =
                entry.target.id;


              navLinks.forEach(
                function (link) {

                  link.classList.toggle(
                    "active",
                    link.getAttribute(
                      "href"
                    ) ===
                    "#" + id
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


  /* ================= CARD TILT ================= */

  if (
    !reducedMotion &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    document
      .querySelectorAll(
        ".interactive-card"
      )
      .forEach(
        function (card) {

          card.addEventListener(
            "pointermove",
            function (event) {

              const rect =
                card.getBoundingClientRect();


              const x =
                (
                  event.clientX -
                  rect.left
                ) /
                rect.width -
                .5;


              const y =
                (
                  event.clientY -
                  rect.top
                ) /
                rect.height -
                .5;


              const rotateX =
                -y * 3.5;

              const rotateY =
                x * 3.5;


              card.style.transform =
                "perspective(900px) " +
                "rotateX(" +
                rotateX +
                "deg) " +
                "rotateY(" +
                rotateY +
                "deg) " +
                "translateY(-3px)";


              card.style.setProperty(
                "--mouse-x",
                (
                  event.clientX -
                  rect.left
                ) + "px"
              );


              card.style.setProperty(
                "--mouse-y",
                (
                  event.clientY -
                  rect.top
                ) + "px"
              );

            }
          );


          card.addEventListener(
            "pointerleave",
            function () {

              card.style.transform =
                "";

            }
          );

        }
      );

  }


  /* ================= MAGNETIC ELEMENTS ================= */

  if (
    !reducedMotion &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    document
      .querySelectorAll(
        ".magnetic"
      )
      .forEach(
        function (element) {

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
                x * .055 +
                "px," +
                y * .055 +
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

  }


  /* ================= SMOOTH ANCHORS ================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(
      function (link) {

        link.addEventListener(
          "click",
          function (event) {

            const id =
              link.getAttribute(
                "href"
              );

            if (
              !id ||
              id === "#"
            ) {
              return;
            }


            const target =
              document.querySelector(
                id
              );


            if (!target) {
              return;
            }


            event.preventDefault();


            const headerOffset =
              82;


            const targetPosition =
              target.getBoundingClientRect()
                .top +
              window.scrollY -
              headerOffset;


            window.scrollTo(
              {
                top:
                  targetPosition,

                behavior:
                  reducedMotion
                    ? "auto"
                    : "smooth"
              }
            );

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
