document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       HEADER
    ========================= */

    const header = document.getElementById("header");

    function handleHeader() {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeader);
    handleHeader();


    /* =========================
       MOBILE MENU
    ========================= */

    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {
            nav.classList.toggle("open");
        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                nav.classList.remove("open");
            });

        });
    }


    /* =========================
       REVEAL ON SCROLL
    ========================= */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav a");

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const id = entry.target.getAttribute("id");

                    navLinks.forEach(link => {
                        link.classList.remove("active");

                        if (link.getAttribute("href") === `#${id}`) {
                            link.classList.add("active");
                        }
                    });
                }

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* =========================
       SMOOTH ANCHOR SCROLL
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================
       HERO IMAGE EFFECT
    ========================= */

    const heroVisual = document.querySelector(".hero-visual");
    const profileWrapper = document.querySelector(".profile-wrapper");

    if (heroVisual && profileWrapper) {

        heroVisual.addEventListener("mousemove", event => {

            const rect = heroVisual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;

            const rotateY = x * 8;
            const rotateX = y * -8;

            profileWrapper.style.transform =
                `translate(-50%, -50%) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        heroVisual.addEventListener("mouseleave", () => {

            profileWrapper.style.transform =
                "translate(-50%, -50%) perspective(800px) rotateX(0deg) rotateY(0deg)";
        });
    }


    /* =========================
       FLOATING HERO ELEMENTS
    ========================= */

    const floatingElements = document.querySelectorAll(
        ".floating-card, .data-node"
    );

    if (heroVisual && floatingElements.length) {

        heroVisual.addEventListener("mousemove", event => {

            const rect = heroVisual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;

            floatingElements.forEach((element, index) => {

                const strength = 8 + (index % 3) * 4;

                element.style.transform =
                    `translate(${x * strength}px, ${y * strength}px)`;
            });

        });

        heroVisual.addEventListener("mouseleave", () => {

            floatingElements.forEach(element => {
                element.style.transform = "translate(0, 0)";
            });

        });
    }


    /* =========================
       RESIZE
    ========================= */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 800) {
            nav.classList.remove("open");
        }

    });

});
