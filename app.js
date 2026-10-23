// This file adds small interactions: saved dark/light mode, mobile navigation, and project filters.

// Keep the visitor's selected color theme when they move between pages.
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light" || savedTheme === "dark") {
  document.documentElement.dataset.theme = savedTheme;
}

document.querySelectorAll(".theme-toggle").forEach((button) => {
  const updateThemeButton = () => {
    const isDark = document.documentElement.dataset.theme !== "light";
    button.querySelector(".theme-label").textContent = isDark ? "Light" : "Dark";
    button.querySelector(".theme-icon").textContent = isDark ? "◐" : "☼";
    button.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  };

  updateThemeButton();
  button.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("portfolio-theme", nextTheme);
    updateThemeButton();
  });
});

// Expand and collapse the navigation menu on narrow screens.
const menuButton = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector(".site-nav");
if (menuButton && siteNavigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = siteNavigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuButton.textContent = isOpen ? "×" : "☰";
  });
}

// Filter projects by the space-separated words in each card's data-category.
const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll("[data-category]");
const visibleCount = document.querySelector("[data-visible-count]");

const showProjects = (selectedFilter) => {
  let visible = 0;
  projectCards.forEach((card) => {
    const categories = card.dataset.category.split(/\s+/);
    const shouldShow = selectedFilter === "all" || categories.includes(selectedFilter);
    card.hidden = !shouldShow;
    if (shouldShow) visible += 1;
  });
  if (visibleCount) visibleCount.textContent = String(visible);
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });
    showProjects(button.dataset.filter);
  });
});

// Update the copyright year automatically.
document.querySelectorAll("[data-current-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});
