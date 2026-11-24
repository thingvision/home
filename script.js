/* MOBILE MENU */

const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNavigation");

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
}

/* ART JOURNAL: deal images into columns, newest across the top row */

const journalGrid = document.querySelector(".journal-grid");

if (journalGrid) {
  const images = Array.from(journalGrid.querySelectorAll("img"));
  let currentCols = 0;

  const layoutJournal = () => {
    const cols = window.matchMedia("(max-width: 700px)").matches ? 2 : 3;
    if (cols === currentCols) return;
    currentCols = cols;

    journalGrid.innerHTML = "";
    journalGrid.classList.add("is-masonry");

    const columns = Array.from({ length: cols }, () => {
      const col = document.createElement("div");
      col.className = "journal-column";
      journalGrid.appendChild(col);
      return col;
    });

    images.forEach((img, i) => columns[i % cols].appendChild(img));
  };

  layoutJournal();
  window.addEventListener("resize", layoutJournal);
}
