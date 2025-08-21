document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".products-grid");
  const items = Array.from(grid.children);

  // Shuffle using Fisher-Yates
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  // Append shuffled items back into the grid
  grid.innerHTML = "";
  items.forEach((item) => grid.appendChild(item));
});
