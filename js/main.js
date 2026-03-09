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
// SKILL BARS — animate on scroll into view
// ============================================================
const skillItems = document.querySelectorAll(".skill-item");

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector(".skill-fill");
      const level = entry.target.getAttribute("data-level");
      fill.style.width = level + "%";
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillItems.forEach(item => skillObserver.observe(item));

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
