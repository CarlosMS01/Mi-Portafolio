// --- Modo oscuro/claro ---
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Revisar si ya hay un tema guardado
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});


// --- Animaciones para cards al hacer scroll ---
const cards = document.querySelectorAll(".card");

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      entry.target.classList.remove("hidden-up");
    } else {
      entry.target.classList.remove("visible");
      entry.target.classList.add("hidden-up");
    }
  });
}, { threshold: 0.3 });

cards.forEach(card => cardObserver.observe(card));


// --- Botón "Scroll to Top" ---
const scrollBtn = document.querySelector('.scroll-top-btn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollBtn.classList.remove('hidden');
  } else {
    scrollBtn.classList.add('hidden');
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Función "escargar el CV" ---
function downloadCV() {
  const link = document.createElement('a');
  link.href = 'assets/CV_CAMS.pdf'; // En donde se encuentra el PDF
  link.download = 'CV_CAMS.pdf'; // Nombre que tendrá el archivo al descargarse
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}