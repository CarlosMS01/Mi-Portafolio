// ==============================
// 🌗 Tema Oscuro/Claro
// ==============================
(function handleThemeToggle() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  const applyTheme = (isDark) => {
    body.classList.toggle("dark", isDark);
    themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  // Inicializar tema guardado
  applyTheme(localStorage.getItem("theme") === "dark");

  themeToggleBtn.addEventListener("click", () => {
    const isDark = !body.classList.contains("dark");
    applyTheme(isDark);
  });
})();

// ==============================
// 🃏 Animaciones de Cards al Scroll
// ==============================
(function observeCardsOnScroll() {
  const cards = document.querySelectorAll(".card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      target.classList.toggle("visible", isIntersecting);
      target.classList.toggle("hidden-up", !isIntersecting);
    });
  }, { threshold: 0.3 });

  cards.forEach(card => observer.observe(card));
})();

// ==============================
// ⬆️ Botón "Scroll to Top"
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
// 📄 Descargar CV
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
// 🖱️ Cursor personalizado
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
