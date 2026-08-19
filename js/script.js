/* ==========================================================
   Nuestra Historia — lógica de la web sorpresa de aniversario
   ========================================================== */

/* ---------- CONFIGURACIÓN: edita esto a tu gusto ---------- */
const CONFIG = {
  // Fecha en la que empezó la relación (año, mes-1, día)
  startDate: new Date(2022, 1, 14),
  nameA: "Josera'ul",
  nameB: "Melanie",
};

/* ---------- Navegación entre pantallas ---------- */
const screens = ["cover", "message", "counter", "closing"];

function goTo(id) {
  screens.forEach((s) => {
    document.getElementById(s).classList.toggle("active", s === id);
  });
  if (id === "counter") updateCounter();
}

document.getElementById("discoverBtn").addEventListener("click", () => {
  burstHearts(6);
  goTo("message");
});

document.getElementById("yesBtn").addEventListener("click", () => {
  burstHearts(10);
  goTo("counter");
});

document.getElementById("continueBtn").addEventListener("click", () => {
  goTo("closing");
});

document.getElementById("restartBtn").addEventListener("click", () => {
  goTo("cover");
});

/* ---------- Nombres dinámicos ---------- */
document.querySelectorAll(".name-a").forEach((el) => (el.textContent = CONFIG.nameA));
document.querySelectorAll(".name-b").forEach((el) => (el.textContent = CONFIG.nameB));

/* ---------- Carrusel de polaroids ---------- */
const polaroids = document.querySelectorAll("#polaroidTrack .polaroid");
const dots = document.querySelectorAll("#dots .dot");
let current = 0;

function showSlide(index) {
  polaroids.forEach((p, i) => p.classList.toggle("active", i === index));
  dots.forEach((d, i) => d.classList.toggle("active", i === index));
}

showSlide(current);

setInterval(() => {
  current = (current + 1) % polaroids.length;
  showSlide(current);
}, 3200);

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
