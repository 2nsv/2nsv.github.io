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

  var navToggle =
    document.getElementById("navToggle");

  var mobileMenu =
    document.getElementById("mobileMenu");


  if (navToggle && mobileMenu) {

    navToggle.addEventListener(
      "click",
      function () {

        var isOpen =
          mobileMenu.classList.toggle("open");

        navToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

        navToggle.classList.toggle(
          "open",
          isOpen
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
     ACTIVE NAVIGATION
  ===================================================== */

  var navLinks =
    document.querySelectorAll(
      "[data-nav]"
    );


  var sections =
    Array.prototype.slice
      .call(navLinks)
      .map(function (link) {

        var href =
          link.getAttribute("href");


        if (
          !href ||
          href.charAt(0) !== "#"
        ) {
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

    var navObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(
            function (entry) {

              if (
                entry.isIntersecting
              ) {

                var id =
                  entry.target.id;


                navLinks.forEach(
                  function (link) {

                    var match =
                      link.getAttribute(
                        "href"
                      ) === "#" + id;


                    link.classList.toggle(
                      "active",
                      match
                    );

                  }
                );

              }

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


  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  var revealTargets =
    document.querySelectorAll(
      ".service-card, " +
      ".tech-card, " +
      ".project-card, " +
      ".timeline-item, " +
      ".education-card, " +
      ".achievement-card, " +
      ".testimonial-placeholder, " +
      ".usp-card, " +
      ".contact-box"
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
    "IntersectionObserver" in window
  ) {

    var revealObserver =
      new IntersectionObserver(
        function (
          entries,
          observer
        ) {

          entries.forEach(
            function (entry) {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "in-view"
                );

                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.08
        }
      );


    document
      .querySelectorAll(
        "[data-reveal]"
      )
      .forEach(
        function (element) {

          revealObserver.observe(
            element
          );

        }
      );

  } else {

    document
      .querySelectorAll(
        "[data-reveal]"
      )
      .forEach(
        function (element) {

          element.classList.add(
            "in-view"
          );

        }
      );

  }


  /* =====================================================
     INTERACTIVE HERO IMAGE
  ===================================================== */

  var heroPhoto =
    document.getElementById(
      "heroPhoto"
    );


  if (
    heroPhoto &&
    !prefersReducedMotion
  ) {

    var photoFrame =
      heroPhoto.querySelector(
        ".photo-frame"
      );


    var floatingTechs =
      heroPhoto.querySelectorAll(
        ".floating-tech"
      );


    var targetX = 0;
    var targetY = 0;

    var currentX = 0;
    var currentY = 0;


    heroPhoto.addEventListener(
      "mousemove",
      function (event) {

        var rect =
          heroPhoto.getBoundingClientRect();


        var x =
          (event.clientX - rect.left)
          / rect.width;


        var y =
          (event.clientY - rect.top)
          / rect.height;


        targetY =
          (x - 0.5) * 12;


        targetX =
          (y - 0.5) * -12;

      }
    );


    heroPhoto.addEventListener(
      "mouseleave",
      function () {

        targetX = 0;
        targetY = 0;

      }
    );


    function animatePhoto() {

      currentX +=
        (targetX - currentX)
        * 0.08;


      currentY +=
        (targetY - currentY)
        * 0.08;


      if (photoFrame) {

        photoFrame.style.transform =
          "rotateX(" +
          currentX +
          "deg) rotateY(" +
          currentY +
          "deg)";

      }


      floatingTechs.forEach(
        function (element, index) {

          var depth =
            (index + 1) * 1.4;


          element.style.transform =
            "translate3d(" +
            currentY * depth +
            "px," +
            currentX * depth +
            "px,0)";

        }
      );


      window.requestAnimationFrame(
        animatePhoto
      );

    }


    animatePhoto();

  }


  /* =====================================================
     GLOBAL CURSOR GLOW
  ===================================================== */

  var cursorGlow =
    document.querySelector(
      ".cursor-glow"
    );


  if (
    cursorGlow &&
    !prefersReducedMotion
  ) {

    document.addEventListener(
      "mousemove",
      function (event) {

        cursorGlow.style.left =
          event.clientX + "px";

        cursorGlow.style.top =
          event.clientY + "px";

      }
    );

  }


  /* =====================================================
     MOBILE MENU CLOSE ON RESIZE
  ===================================================== */

  window.addEventListener(
    "resize",
    function () {

      if (
        window.innerWidth > 900 &&
        mobileMenu &&
        mobileMenu.classList.contains(
          "open"
        )
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


  /* =====================================================
     BUTTON MICRO INTERACTION
  ===================================================== */

  document
    .querySelectorAll(".btn")
    .forEach(function (button) {

      button.addEventListener(
        "mouseenter",
        function () {

          button.style.setProperty(
            "--btn-x",
            "4px"
          );

        }
      );


      button.addEventListener(
        "mouseleave",
        function () {

          button.style.setProperty(
            "--btn-x",
            "0px"
          );

        }
      );

    });


})();
