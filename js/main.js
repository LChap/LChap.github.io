// ============================================================
// PARALLAX
// ============================================================
const parallaxBg = document.getElementById("parallax-bg");
if (parallaxBg) {
  window.addEventListener("scroll", () => {
    parallaxBg.style.transform = `translateY(${window.scrollY * 0.4}px)`;
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
// Inline styles are cleared after animation so CSS :hover works.
// ============================================================
const hexObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const hexes = entry.target.querySelectorAll(".hex");
      hexes.forEach((hex, i) => {
        hex.style.opacity = "0";
        hex.style.transform = "rotate(30deg) scale(0.5)";
        setTimeout(() => {
          hex.style.transition = "opacity 0.4s ease, transform 0.4s ease";
          hex.style.opacity = "1";
          hex.style.transform = "rotate(30deg) scale(1)";
          // Clear inline styles after transition so CSS :hover takes over
          setTimeout(() => {
            hex.style.removeProperty("opacity");
            hex.style.removeProperty("transform");
            hex.style.removeProperty("transition");
          }, 450);
        }, i * 60);
      });
      hexObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const hexGrid = document.querySelector(".hex-grid");
if (hexGrid) hexObserver.observe(hexGrid);

// ============================================================
// BACK TO TOP
// ============================================================
const backToTop = document.getElementById("back-to-top");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ============================================================
// PROJECT FILTERS (projects page)
// ============================================================
const filterBtns = document.querySelectorAll(".filter-btn");
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      document.querySelectorAll(".project-card").forEach(card => {
        if (filter === "all") {
          card.style.display = "";
        } else {
          const tags = [...card.querySelectorAll(".project-tags span")];
          card.style.display = tags.some(t => t.textContent === filter) ? "" : "none";
        }
      });
    });
  });
}

// ============================================================
// SEARCH — filter project cards (projects page) or redirect (home)
// ============================================================
const searchInput = document.getElementById("search-input");
if (searchInput) {
  // Pre-fill from URL param on projects page
  const preQuery = new URLSearchParams(window.location.search).get("q");
  if (preQuery) {
    searchInput.value = preQuery;
    document.querySelectorAll(".project-card").forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(preQuery.toLowerCase()) ? "" : "none";
    });
  }

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".project-card");
    if (cards.length) {
      cards.forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(query) ? "" : "none";
      });
    } else if (query.length >= 2) {
      window.location.href = `projects.html?q=${encodeURIComponent(query)}`;
    }
  });
}
