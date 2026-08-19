/* ==========================================================
   Nuestra Historia — lógica de la web sorpresa de aniversario
   ========================================================== */

/* ---------- CONFIGURACIÓN: edita esto a tu gusto ---------- */
const CONFIG = {
  // Fecha en la que empezó la relación (año, mes-1, día)
  startDate: new Date(2022, 1, 14),
  nameA: "Joseraúl",
  nameB: "Melanie",
};

/* ---------- Nombres dinámicos ---------- */
document.querySelectorAll(".name-a").forEach((el) => (el.textContent = CONFIG.nameA));
document.querySelectorAll(".name-b").forEach((el) => (el.textContent = CONFIG.nameB));

/* ---------- Carrusel de polaroids (scroll horizontal) ---------- */
const polaroidTrack = document.getElementById("polaroidTrack");
const dots = document.querySelectorAll("#dots .dot");

function setActiveDot(index) {
  dots.forEach((d, i) => d.classList.toggle("active", i === index));
}

function currentSlide() {
  return Math.round(polaroidTrack.scrollLeft / polaroidTrack.clientWidth);
}

polaroidTrack.addEventListener("scroll", () => {
  window.requestAnimationFrame(() => setActiveDot(currentSlide()));
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    polaroidTrack.scrollTo({ left: i * polaroidTrack.clientWidth, behavior: "smooth" });
  });
});

setActiveDot(0);

/* ---------- Botón "Descúbrelo": revela el resto al hacer scroll ---------- */
document.getElementById("discoverBtn").addEventListener("click", () => {
  burstHearts(10);
  document.getElementById("messageBlock").scrollIntoView({ behavior: "smooth" });
});

/* ---------- Aparición de secciones al hacer scroll ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ---------- Contador de tiempo juntos ---------- */
function updateCounter() {
  const now = new Date();
  const start = CONFIG.startDate;

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  document.getElementById("years").textContent = Math.max(years, 0);
  document.getElementById("months").textContent = Math.max(months, 0);
  document.getElementById("days").textContent = Math.max(days, 0);
}

updateCounter();

/* ---------- Corazones flotantes de fondo ---------- */
const heartsContainer = document.getElementById("floatingHearts");

function spawnHeart() {
  const heart = document.createElement("span");
  heart.className = "heart-particle";
  heart.textContent = "♥";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = 12 + Math.random() * 16 + "px";
  heart.style.setProperty("--drift", (Math.random() * 60 - 30) + "px");
  const duration = 6 + Math.random() * 5;
  heart.style.animationDuration = duration + "s";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

function burstHearts(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(spawnHeart, i * 90);
  }
}

// corazones ambientales, suaves y esporádicos
setInterval(spawnHeart, 2200);
spawnHeart();
