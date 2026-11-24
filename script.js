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

/* ART JOURNAL: load images from the GitHub folder, newest first */

const journalGrid = document.querySelector(".journal-grid");

if (journalGrid) {
  const repo = journalGrid.dataset.repo;
  const folder = journalGrid.dataset.folder;
  const imageTypes = /\.(jpe?g|png|webp|gif)$/i;
  let images = [];
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

  fetch(`https://api.github.com/repos/${repo}/contents/${folder}`)
    .then((response) => response.json())
    .then((files) => {
      images = files
        .filter((file) => file.type === "file" && imageTypes.test(file.name))
        .sort((a, b) => b.name.localeCompare(a.name))
        .map((file) => {
          const img = document.createElement("img");
          img.src = `${folder}/${file.name}`;
          img.alt = file.name.replace(imageTypes, "").replace(/[-_]/g, " ");
          img.loading = "lazy";
          return img;
        });

      layoutJournal();
      window.addEventListener("resize", layoutJournal);
    })
    .catch(() => {
      journalGrid.textContent = "Images could not load. Please refresh the page.";
    });
}
