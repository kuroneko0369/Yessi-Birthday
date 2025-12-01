const slider = document.getElementById("autoSlider");
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("dots");

let index = 0;

/* Create dots dynamically */
slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.className = "dot";
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateDots() {
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

function goToSlide(i) {
  index = i;
  slider.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
  resetInterval();
}

function autoSlide() {
  index++;
  if (index >= slides.length) index = 0;
  slider.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

let slideInterval = setInterval(autoSlide, 3000);

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(autoSlide, 3000);
}

/* pause auto-slide (harusnya awoakwok) */
slider.addEventListener("touchstart", () => clearInterval(slideInterval));
slider.addEventListener("touchend", resetInterval);

/* Confetti burst */
function startConfetti() {
  const duration = 2 * 1000; // 2 detik
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });

    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

startConfetti();