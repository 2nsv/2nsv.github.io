(function () {
  "use strict";


  /* =====================================================
     REDUCED MOTION
  ===================================================== */

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =====================================================
     MOBILE NAVIGATION
  ===================================================== */

  var navToggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");


  if (navToggle && mobileMenu) {

    navToggle.addEventListener("click", function () {

      var isOpen = mobileMenu.classList.toggle("open");

      navToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      navToggle.classList.toggle(
        "open",
        isOpen
      );

    });


    mobileMenu.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {

        mobileMenu.classList.remove("open");

        navToggle.classList.remove("open");

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* =====================================================
     ACTIVE NAVIGATION SECTION
  ===================================================== */

  var navLinks = document.querySelectorAll("[data-nav]");


  var sections = Array.prototype.slice
    .call(navLinks)
    .map(function (link) {

      var href = link.getAttribute("href");

      if (!href || href.charAt(0) !== "#") {
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

    var navObserver = new IntersectionObserver(
      function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            var id = entry.target.id;


            navLinks.forEach(function (link) {

              var match =
                link.getAttribute("href") ===
                "#" + id;

              link.classList.toggle(
                "active",
                match
              );

            });

          }

        });

      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );


    sections.forEach(function (section) {

      navObserver.observe(section);

    });

  }


  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  var revealTargets = document.querySelectorAll(
    ".skill-group, " +
    ".project-card, " +
    ".timeline-item, " +
    ".roadmap-stage, " +
    ".education-card, " +
    ".values, " +
    ".focus-panel, " +
    ".about-card"
  );


  revealTargets.forEach(function (element) {

    element.setAttribute(
      "data-reveal",
      ""
    );

  });


  if ("IntersectionObserver" in window) {

    var revealObserver = new IntersectionObserver(
      function (entries, observer) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "in-view"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


    document
      .querySelectorAll("[data-reveal]")
      .forEach(function (element) {

        revealObserver.observe(element);

      });


    /* =================================================
       FOCUS PROGRESS BARS
    ================================================= */

    var focusBars =
      document.querySelectorAll(".focus-bar");


    var barObserver = new IntersectionObserver(
      function (entries, observer) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "in-view"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.35
      }
    );


    focusBars.forEach(function (bar) {

      barObserver.observe(bar);

    });

  } else {

    document
      .querySelectorAll("[data-reveal]")
      .forEach(function (element) {

        element.classList.add(
          "in-view"
        );

      });


    document
      .querySelectorAll(".focus-bar")
      .forEach(function (element) {

        element.classList.add(
          "in-view"
        );

      });

  }


  /* =====================================================
     HERO TERMINAL
  ===================================================== */

  var terminalBody =
    document.getElementById("terminalBody");


  var terminalLines = [

    {
      text: "$ python pipeline.py",
      delay: 0
    },

    {
      text: "",
      delay: 300
    },

    {
      text: "[INFO] Extracting data...",
      delay: 500
    },

    {
      text: "[INFO] Transforming records...",
      delay: 700
    },

    {
      text: "[INFO] Validating data...",
      delay: 700
    },

    {
      text: "[SUCCESS] Pipeline completed.",
      delay: 700
    }

  ];


  function renderTerminalInstantly() {

    if (!terminalBody) {
      return;
    }


    terminalBody.textContent =
      terminalLines
        .map(function (line) {
          return line.text;
        })
        .join("\n");

  }


  function typeTerminal() {

    if (!terminalBody) {
      return;
    }


    var lineIndex = 0;

    var charIndex = 0;

    var output = "";


    function typeNextChar() {

      if (
        lineIndex >=
        terminalLines.length
      ) {
        return;
      }


      var line =
        terminalLines[lineIndex];


      if (
        charIndex === 0 &&
        lineIndex > 0
      ) {

        output += "\n";

      }


      if (
        charIndex <
        line.text.length
      ) {

        output +=
          line.text.charAt(charIndex);


        terminalBody.textContent =
          output;


        charIndex++;


        window.setTimeout(
          typeNextChar,
          18
        );

      } else {

        lineIndex++;

        charIndex = 0;


        var nextDelay =
          lineIndex <
          terminalLines.length
            ? terminalLines[lineIndex].delay
            : 0;


        window.setTimeout(
          typeNextChar,
          nextDelay
        );

      }

    }


    typeNextChar();

  }


  if (terminalBody) {

    if (prefersReducedMotion) {

      renderTerminalInstantly();

    } else {

      typeTerminal();

    }

  }


  /* =====================================================
     CLOSE MOBILE MENU ON RESIZE
  ===================================================== */

  window.addEventListener(
    "resize",
    function () {

      if (
        window.innerWidth > 860 &&
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
