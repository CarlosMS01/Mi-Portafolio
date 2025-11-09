// ==============================
//  Tema Oscuro/Claro
// ==============================
// ==============================
//  Tema Oscuro/Claro con animaciones completas
// ==============================
(function handleThemeToggleSVG() {
    const themeToggleBtn = document.getElementById("theme-toggle-svg");
    const body = document.body;

    // Boton claro
    const fondoClaro = themeToggleBtn.querySelector(".botonclaro");
    const sol = themeToggleBtn.querySelector(".sol");
    const primeranuve = themeToggleBtn.querySelector(".primeranuve");
    const segundanuve = themeToggleBtn.querySelector(".segundanuve");

    // Boton oscuro
    const fondoOscuro = themeToggleBtn.querySelector(".botonoscuro");
    const luna = themeToggleBtn.querySelector(".luna");
    const estrella = themeToggleBtn.querySelector(".estrella");

    
    gsap.set(fondoClaro, { clipPath: "inset(0% 0% 0% 0%)", zIndex: 3 });
    gsap.set([sol, primeranuve, segundanuve], { scale: 1, opacity: 1, transformOrigin: "center center" });

    gsap.set(fondoOscuro, { visibility: "hidden", opacity: 0, zIndex: 2 });
    gsap.set([estrella, luna], { scale: 0, opacity: 0, transformOrigin: "center center" });

    const tlToggle = gsap.timeline({ paused: true });

    tlToggle
        // Desvanece fondo claro
        .to(fondoClaro, {
            clipPath: "inset(0% 0% 0% 100%)",
            duration: 0.6,
            ease: "power2.inOut"
        }, 0)
        // Oculta sol y nubes
        .to([sol, primeranuve, segundanuve], {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "back.in(1.7)"
        }, 0)
        // Muestra fondo oscuro
        .set(fondoOscuro, { visibility: "visible" }, 0)
        .to(fondoOscuro, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        }, 0.2)
        // Aparecen luna y estrellas
        .to([estrella, luna], {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(1.7)"
        }, 0.4)
        // Cambia el orden de capas
        .set(fondoClaro, { zIndex: 2 })
        .set(fondoOscuro, { zIndex: 3 });

    tlToggle.eventCallback("onReverseComplete", () => {
        gsap.set(fondoOscuro, { visibility: "hidden", opacity: 0 });
        gsap.to([sol, primeranuve, segundanuve], {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(1.7)"
        });
    });

    // --- Función que aplica el tema ---
    const applyTheme = (isDark) => {
        body.classList.toggle("dark", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");

        if (isDark) {
            tlToggle.play();
        } else {
            tlToggle.reverse();
        }
    };

    // Inicializar tema guardado
    applyTheme(localStorage.getItem("theme") === "dark");

    // --- Click ---
    themeToggleBtn.addEventListener("click", () => {
        const isDark = !body.classList.contains("dark");
        applyTheme(isDark);
    });
})();


// ==============================
//  Parpadeo doble de luz
// ==============================
(function parpadeoDoble() {
    const tl = gsap.timeline({
        repeat: -1,                    // se repite infinitamente
        repeatDelay: 6                 // espera entre ciclos
    });

    tl.to(".Luz", {
        opacity: 0.15,                 // se atenúa la luz
        duration: 0.08,                // cierre rápido
        ease: "power1.in"
    })
        .to(".Luz", {
            opacity: 0.7,              // vuelve a encender
            duration: 0.12,            // apertura más suave
            ease: "power2.out"
        })
        .to(".Luz", {
            opacity: 0.15,             // segundo apagón
            duration: 0.08,
            ease: "power1.in"
        })
        .to(".Luz", {
            opacity: 0.7,              // encendida de nuevo
            duration: 0.12,
            ease: "power2.out"
        });
})();

// ==============================
//  Animación secuencial para los BarCodes
// ==============================
(function animarBarCodes() {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 10 });

    tl.set(".Tarjeta", { opacity: 0 });
    tl.set(".Imagen", { opacity: 0 });
    tl.set(".Texto", { opacity: 0 });
    tl.set(".Boton1", { opacity: 0 });
    tl.set(".Boton2", { opacity: 0 });
    tl.set(".Boton3", { opacity: 0 });

    const barcodes = [
        { code: ".BarCode1", target: ".Tarjeta" },
        { code: ".BarCode2", target: ".Imagen" },
        { code: ".BarCode3", target: ".Texto" },
        { code: ".BarCode4", target: ".Boton1" },
        { code: ".BarCode5", target: ".Boton2" },
        { code: ".BarCode6", target: ".Boton3" }
    ];

    barcodes.forEach(({ code, target }) => {
        tl.from(code, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.4,
            ease: "power2.out"
        });
        tl.to(target, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
})();


// ==============================
//  Animación de texto tipo máquina de escribir
// ==============================
function typewriterEffect({ selector, texts, delay = 100, eraseDelay = 50, pause = 2000 }) {
    const textElement = document.querySelector(selector);
    if (!textElement) return;

    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";

    const cursor = textElement.nextElementSibling;
    if (cursor) cursor.style.animation = "none";

    function type() {
        if (count === texts.length) count = 0;
        currentText = texts[count];
        letter = currentText.slice(0, ++index);
        textElement.textContent = letter;

        if (letter.length === currentText.length) {
            if (cursor) cursor.style.animation = "blink 0.7s infinite";
            setTimeout(erase, pause);
        } else {
            setTimeout(type, delay);
        }
    }

    function erase() {
        if (cursor) cursor.style.animation = "none";

        if (index > 0) {
            index--;
            letter = currentText.slice(0, index);
            textElement.textContent = letter;
            setTimeout(erase, eraseDelay);
        } else {
            count++;
            index = 0;
            setTimeout(type, 500);
        }
    }

    type();
}

typewriterEffect({
    selector: "#text1",
    texts: ["</ Bienvenidos >", "</ Soy Carlos >", "</ Backend Developer >"]
});

typewriterEffect({
    selector: "#text2",
    texts: ["Hey, por aquí."],
    delay: 80,
    eraseDelay: 40,
    pause: 1500
});


// ==============================
//  Descargar CV
// ==============================
function downloadCV() {
    const link = document.createElement("a");
    link.href = "assets/CV_CAMS.pdf";
    link.download = "CV_CAMS.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


// ==============================
//  Animaciones de Cards al Scroll
// ==============================
(function observeCardsOnScroll() {
    const cards = document.querySelectorAll(".skill-card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
            target.classList.toggle("visible", isIntersecting);
            target.classList.toggle("hidden-up", !isIntersecting);
        });
    }, { threshold: 0.3 });

    cards.forEach(card => observer.observe(card));
})();


// ==============================
//  Animacion para los iconos de contacto
// ==============================
function socialAnimation({ link, logo, spans }) {

    if (!window.matchMedia("(hover: hover)").matches) return;

    const spanElements = typeof spans === "string"
        ? document.querySelector(spans).querySelectorAll("span")
        : spans;

    const linkElement = typeof link === "string" ? document.querySelector(link) : link;
    const logoElement = typeof logo === "string" ? document.querySelector(logo) : logo;

    linkElement.addEventListener("mouseenter", () => {
        spanElements.forEach((span, i) => {
            gsap.to(span, {
                y: 5,
                opacity: 1,
                duration: 0.3,
                delay: i * 0.05,
                ease: "power2.out"
            });
        });

        gsap.to(logoElement, {
            scale: 1.2,
            duration: 0.4,
            ease: "power2.out"
        });
    });

    linkElement.addEventListener("mouseleave", () => {
        spanElements.forEach((span, i) => {
            gsap.to(span, {
                y: 15,
                opacity: 0,
                duration: 0.3,
                delay: i * 0.05,
                ease: "power2.in"
            });
        });

        gsap.to(logoElement, {
            scale: 1,
            duration: 0.4,
            ease: "power2.in"
        });
    });
}

socialAnimation({
    link: "#link-git",
    logo: "#logo-git",
    spans: "#title-git"
});

socialAnimation({
    link: "#link-linkedin",
    logo: "#logo-linkedin",
    spans: "#title-linkedin"
});


// ==============================
//  Parpadeo de ojos (Blink)
// ==============================
(function animarParpadeoOjos() {
    const blinkTimeline = gsap.timeline({ repeat: -1, repeatDelay: 5 });

    blinkTimeline
        .to("#OjoIzquierdo, #OjoDerecho", {
            scaleY: 0.1,
            duration: 0.09,
            ease: "power1.in"
        })
        .to("#OjoIzquierdo, #OjoDerecho", {
            scaleY: 1,
            duration: 0.09,
            ease: "power1.out"
        });
})();


// ==============================
//  Movimiento facial con cursor
// ==============================
(function animarPartesFaciales() {
    const partes = [
        { id: "#Cabeza", factor: 1 },
        { id: "#Cabello", factor: 1.5 },
        { id: "#Gafas", factor: 2 },
        { id: "#OjoIzquierdo", factor: 3 },
        { id: "#OjoDerecho", factor: 3 },
        { id: "#CejaIzquierda", factor: 2.5 },
        { id: "#CejaDerecha", factor: 2.5 },
        { id: "#Nariz", factor: 1.8 },
        { id: "#Boca", factor: 2 },
        { id: "#OyueloIzquierdo", factor: 1.5 },
        { id: "#OyueloDerecho", factor: 1.5 },
        { id: "#OidoIzquierdo", factor: 0.8 },
        { id: "#OidoDerecho", factor: 0.8 },
        { id: "#CabezaMovible", factor: 1.5 }
    ];

    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5);
        const y = (e.clientY / window.innerHeight - 0.5);

        partes.forEach(({ id, factor }) => {
            const el = document.querySelector(id);
            if (el) {
                gsap.to(el, {
                    x: x * factor * 10,
                    y: y * factor * 10,
                    duration: 0.5,
                    ease: "power3.out"
                });
            }
        });
    });
})();


// ==============================
//  Botón "Scroll to Top"
// ==============================
(function setupScrollToTopButton() {
    const scrollBtn = document.querySelector(".scroll-top-btn");

    const toggleVisibility = () => {
        scrollBtn.classList.toggle("hidden", window.scrollY <= 200);
    };

    window.addEventListener("scroll", toggleVisibility);

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
})();


// ==============================
//  Cursor personalizado
// ==============================
(function animateCustomCursor() {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        const easingRing = 0.05;
        const easingDot = 0.3;

        ringX += (mouseX - ringX) * easingRing;
        ringY += (mouseY - ringY) * easingRing;

        dotX += (mouseX - dotX) * easingDot;
        dotY += (mouseY - dotY) * easingDot;

        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;

        dot.style.left = `${dotX}px`;
        dot.style.top = `${dotY}px`;

        requestAnimationFrame(animate);
    }

    animate();
})();