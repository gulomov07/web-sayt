
// PAGE LOADER

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
    }, 700);
});


// HEADER SCROLL

const header = document.getElementById("header");
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
    backTop.classList.toggle("visible", window.scrollY > 400);
});


// MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

function closeMenu() {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuBtn.setAttribute("aria-expanded", "false");
}

menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuBtn.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
});

navItems.forEach(link => {
    link.addEventListener("click", closeMenu);
});


// ACTIVE NAVIGATION

const sections = document.querySelectorAll("main section[id]");

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navItems.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + entry.target.id
                );
            });
        }
    });
}, {
    rootMargin: "-30% 0px -60% 0px"
});

sections.forEach(section => navObserver.observe(section));


// SCROLL REVEAL

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
});


// STATISTICS COUNTER

let countersStarted = false;

const statsSection = document.querySelector(".stats-grid");

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;

            document.querySelectorAll("[data-count]").forEach(counter => {
                const target = Number(counter.dataset.count);
                const duration = 1800;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const progress = Math.min(
                        (currentTime - startTime) / duration,
                        1
                    );

                    const eased = 1 - Math.pow(1 - progress, 3);

                    counter.textContent = Math.floor(target * eased);

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }

                requestAnimationFrame(updateCounter);
            });
        }
    });
}, {
    threshold: 0.3
});

statsObserver.observe(statsSection);


// FAQ ACCORDION

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.setAttribute("aria-expanded", "false");

    question.addEventListener("click", () => {
        const wasOpen = item.classList.contains("open");

        faqItems.forEach(other => {
            other.classList.remove("open");
            other.querySelector(".faq-question").setAttribute(
                "aria-expanded",
                "false"
            );
        });

        if (!wasOpen) {
            item.classList.add("open");
            question.setAttribute("aria-expanded", "true");
        }
    });
});


// TESTIMONIAL SLIDER

const testimonials = [
    {
        text: "NEXORA jamoasi bilan ishlash ajoyib tajriba bo‘ldi. Dizayn va natija biz kutganimizdan ham yaxshi chiqdi.",
        name: "Alex Morgan",
        role: "Founder, Vortex Studio"
    },
    {
        text: "Bizning kompaniyamiz uchun juda zamonaviy va professional raqamli yechim yaratishdi. Natijadan mamnunmiz.",
        name: "Daniel Smith",
        role: "CEO, Finora Finance"
    },
    {
        text: "Jamoa har bir detalga e'tibor berdi. Bizning brendimiz butunlay yangi ko‘rinishga ega bo‘ldi.",
        name: "Sophia Wilson",
        role: "Director, Monarch"
    }
];

let currentQuote = 0;

const quoteText = document.getElementById("quoteText");
const clientName = document.getElementById("clientName");
const clientRole = document.getElementById("clientRole");

function showQuote(index) {
    currentQuote = (index + testimonials.length) % testimonials.length;

    const item = testimonials[currentQuote];

    quoteText.textContent = item.text;
    clientName.textContent = item.name;
    clientRole.textContent = item.role;
}

document.getElementById("prevQuote").addEventListener("click", () => {
    showQuote(currentQuote - 1);
});

document.getElementById("nextQuote").addEventListener("click", () => {
    showQuote(currentQuote + 1);
});


// CONTACT FORM

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);

    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const service = formData.get("service");
    const message = formData.get("message").trim();

    const subject = encodeURIComponent("NEXORA — yangi loyiha so‘rovi");

    const body = encodeURIComponent(
        `Ism: ${name}\n` +
        `Email: ${email}\n` +
        `Xizmat: ${service}\n\n` +
        `Xabar:\n${message}`
    );

    // Demo manzil. Haqiqiy biznes emailingizga almashtiring.
    const businessEmail = "hello@example.com";

    formStatus.textContent = "Email dasturi ochilmoqda...";

    window.location.href =
        `mailto:${businessEmail}?subject=${subject}&body=${body}`;
});


// BACK TO TOP

backTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// FOOTER YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();


// ESCAPE KEY

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMenu();
    }
});


// CLOSE MENU WHEN CLICKING OUTSIDE

document.addEventListener("click", event => {
    if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(event.target) &&
        !menuBtn.contains(event.target)
    ) {
        closeMenu();
    }
});

console.log("NEXORA website successfully loaded!");
