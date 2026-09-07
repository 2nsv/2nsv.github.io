document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       HEADER
    ========================= */

    const header = document.getElementById("header");

    function updateHeader() {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            nav.classList.toggle("open");

        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

            });

        });

    }


    /* =========================
       CUSTOM CURSOR
    ========================= */

    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");

    if (
        cursor &&
        follower &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let followerX = 0;
        let followerY = 0;

        document.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;

        });


        function animateCursor() {

            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;

            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;

            requestAnimationFrame(animateCursor);

        }

        animateCursor();


        document.querySelectorAll("a, button").forEach(element => {

            element.addEventListener("mouseenter", () => {

                follower.style.width = "50px";
                follower.style.height = "50px";
                follower.style.borderColor = "rgba(96,165,250,.7)";

            });


            element.addEventListener("mouseleave", () => {

                follower.style.width = "34px";
                follower.style.height = "34px";
                follower.style.borderColor = "rgba(255,255,255,.3)";

            });

        });

    }


    /* =========================
       REVEAL
    ========================= */

    const revealElements = document.querySelectorAll(
        ".section-top, .about-layout, .education-card, .skills-intro, .skill-row, .experience-row, .service, .project, .contact-heading, .contact-links"
    );


    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.08
        }
    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================
       ACTIVE NAV
    ========================= */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navLinks = document.querySelectorAll(
        ".nav a"
    );


    const activeObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const id = entry.target.id;

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") === `#${id}`
                    ) {
                        link.classList.add("active");
                    }

                });

            });

        },
        {
            rootMargin: "-40% 0px -50% 0px"
        }
    );


    sections.forEach(section => {
        activeObserver.observe(section);
    });


    /* =========================
       IMAGE PARALLAX
    ========================= */

    const imageFrame = document.querySelector(".image-frame");

    if (
        imageFrame &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        imageFrame.addEventListener("mousemove", event => {

            const rect =
                imageFrame.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;

            imageFrame.style.transform =
                `perspective(900px) rotateY(${x * 3}deg) rotateX(${y * -3}deg)`;
        });


        imageFrame.addEventListener("mouseleave", () => {

            imageFrame.style.transform =
                "perspective(900px) rotateY(0deg) rotateX(0deg)";

        });

    }


    /* =========================
       SMOOTH LINKS
    ========================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header.offsetHeight;

            const targetTop =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetTop,
                behavior: "smooth"
            });

        });

    });


    /* =========================
       RESIZE
    ========================= */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 750 &&
            nav
        ) {
            nav.classList.remove("open");
        }

    });

});
