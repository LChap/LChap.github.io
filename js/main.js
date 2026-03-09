// ============================================================
// PARALLAX
// ============================================================
const parallaxBg = document.getElementById("parallax-bg");
if (parallaxBg) {
  window.addEventListener("scroll", () => {
    const offset = window.scrollY;
    parallaxBg.style.transform = `translateY(${offset * 0.4}px)`;
  });
}

// ============================================================
// STICKY HEADER SHADOW
// ============================================================
const header = document.getElementById("site-header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
});

// ============================================================
// HEX GRID — stagger animation on scroll into view
// ============================================================
const hexItems = document.querySelectorAll(".hex");

const hexObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const hexes = entry.target.querySelectorAll(".hex");
      hexes.forEach((hex, i) => {
        hex.style.opacity = "0";
        hex.style.transform = "scale(0.5)";
        setTimeout(() => {
          hex.style.transition = "opacity 0.4s ease, transform 0.4s ease";
          hex.style.opacity = "1";
          hex.style.transform = "scale(1)";
        }, i * 60);
      });
      hexObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const hexGrid = document.querySelector(".hex-grid");
if (hexGrid) hexObserver.observe(hexGrid);

// ============================================================
// SEARCH — filter project cards (projects page)
// ============================================================
const searchInput = document.getElementById("search-input");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".project-card");
    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(query) ? "" : "none";
    });
  });
}
