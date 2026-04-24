const track = document.querySelector(".js_carouselTrack");
const slides = document.querySelectorAll(".js_carouselSlide");
const btnNext = document.querySelector(".js_carouselBtnRight");
const btnPrev = document.querySelector(".js_carouselBtnLeft");

let index = 0;
let startX = 0;
let isDragging = false;

// 👉 Mover carrusel
function updateSlide() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

// 👉 Botones
btnNext.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  updateSlide();
});

btnPrev.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  updateSlide();
});

// 👉 Autoplay
let autoplay = setInterval(() => {
  index = (index + 1) % slides.length;
  updateSlide();
}, 3000);

// 👉 Pausar autoplay al interactuar
const carousel = document.querySelector(".carousel");

carousel.addEventListener("mouseenter", () => clearInterval(autoplay));
carousel.addEventListener("mouseleave", () => {
  autoplay = setInterval(() => {
    index = (index + 1) % slides.length;
    updateSlide();
  }, 3000);
});

// 👉 Swipe móvil
track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

track.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const currentX = e.touches[0].clientX;
  const diff = startX - currentX;

  // opcional: mover ligeramente mientras haces swipe
});

track.addEventListener("touchend", (e) => {
  if (!isDragging) return;

  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (diff > 50) {
    // swipe izquierda
    index = (index + 1) % slides.length;
  } else if (diff < -50) {
    // swipe derecha
    index = (index - 1 + slides.length) % slides.length;
  }

  updateSlide();
  isDragging = false;
});