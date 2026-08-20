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

/* ---------- Candado de entrada ---------- */
document.getElementById("enterBtn").addEventListener("click", () => {
  document.getElementById("gate").classList.add("hidden");
  document.getElementById("content").classList.add("visible");
  burstHearts(10);
});

/* ---------- Música de fondo ---------- */
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

// Los navegadores bloquean el autoplay con sonido sin gesto del usuario.
// Intentamos reproducir de inmediato; si el navegador lo rechaza, arrancamos
// en el primer toque/clic/tecla que ocurra en la página (lo más "automático" posible).
bgMusic.play().catch(() => {
  const startOnFirstInteraction = () => {
    bgMusic.play().catch(() => {});
  };
  ["click", "touchstart", "keydown"].forEach((ev) =>
    document.addEventListener(ev, startOnFirstInteraction, { once: true })
  );
});

musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
  } else {
    bgMusic.pause();
  }
});

bgMusic.addEventListener("play", () => {
  musicToggle.classList.remove("muted");
  musicToggle.textContent = "♪";
  musicToggle.setAttribute("aria-pressed", "false");
});

bgMusic.addEventListener("pause", () => {
  musicToggle.classList.add("muted");
  musicToggle.textContent = "♪̸";
  musicToggle.setAttribute("aria-pressed", "true");
});

/* ---------- Carrusel de polaroids (scroll horizontal + flechas) ---------- */
const polaroidTrack = document.getElementById("polaroidTrack");
const polaroidSlides = document.querySelectorAll("#polaroidTrack .polaroid");
const dots = document.querySelectorAll("#dots .dot");
const prevPhotoBtn = document.getElementById("prevPhoto");
const nextPhotoBtn = document.getElementById("nextPhoto");

function setActiveDot(index) {
  dots.forEach((d, i) => d.classList.toggle("active", i === index));
  prevPhotoBtn.disabled = index === 0;
  nextPhotoBtn.disabled = index === polaroidSlides.length - 1;
}

function currentSlide() {
  return Math.round(polaroidTrack.scrollLeft / polaroidTrack.clientWidth);
}

function goToSlide(index) {
  const clamped = Math.max(0, Math.min(index, polaroidSlides.length - 1));
  polaroidTrack.scrollTo({ left: clamped * polaroidTrack.clientWidth, behavior: "smooth" });
}

polaroidTrack.addEventListener("scroll", () => {
  window.requestAnimationFrame(() => setActiveDot(currentSlide()));
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => goToSlide(i));
});

prevPhotoBtn.addEventListener("click", () => goToSlide(currentSlide() - 1));
nextPhotoBtn.addEventListener("click", () => goToSlide(currentSlide() + 1));

setActiveDot(0);

/* ---------- Revelado paso a paso (sobre → mensaje → fechas) ---------- */
function openBlock(id) {
  const el = document.getElementById(id);
  el.classList.remove("gated");
  el.classList.add("opening");
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.getElementById("discoverBtn").addEventListener("click", () => {
  burstHearts(10);
  openBlock("messageBlock");
});

document.getElementById("yesBtn").addEventListener("click", () => {
  burstHearts(10);
  openBlock("reasonBlock");
  document.getElementById("counterBlock").classList.remove("gated");
  document.getElementById("closingBlock").classList.remove("gated");
});

document.getElementById("restartBtn").addEventListener("click", () => {
  document
    .querySelector(".cover-block")
    .scrollIntoView({ behavior: "smooth", block: "start" });
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
