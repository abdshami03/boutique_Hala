let items = [];
let currentLang = localStorage.getItem("hala_lang") || "ar";

function renderGallery(filtered) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  if (!filtered.length) {
    gallery.innerHTML = `<p style="grid-column:1/-1;text-align:center;">${
      currentLang === "ar"
        ? "لا توجد عبايات مطابقة"
        : "No matching abayas found."
    }</p>`;
    return;
  }
  filtered.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => {
      window.location.href = `item.html?id=${item.id}`;
    };
    card.innerHTML = `
      <img src="${item.images[0] || ""}" alt="${
      item.title[currentLang]
    }" class="card-img" onerror="this.style.display='none'">
      <div class="card-body">
        <div class="card-title">${item.title[currentLang]}</div>
        <div class="card-info">${
          (currentLang === "ar" ? "المقاس: " : "Size: ") + item.size
        }</div>
        <div class="card-info">${
          (currentLang === "ar" ? "اللون: " : "Color: ") + item.color
        }</div>
      </div>
    `;
    gallery.appendChild(card);
  });
}

function populateColorFilter(items) {
  const colorSet = new Set(items.map((i) => i.color));
  const colorFilter = document.getElementById("color-filter");
  colorFilter.innerHTML = `<option value="">${
    currentLang === "ar" ? "الكل" : "All"
  }</option>`;
  colorSet.forEach((color) => {
    colorFilter.innerHTML += `<option value="${color}">${color}</option>`;
  });
}

function filterItems() {
  const size = document.getElementById("size-filter").value;
  const color = document.getElementById("color-filter").value;
  let filtered = items;
  if (size) filtered = filtered.filter((i) => i.size === size);
  if (color) filtered = filtered.filter((i) => i.color === color);
  renderGallery(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/items.json")
    .then((res) => res.json())
    .then((data) => {
      items = data;
      populateColorFilter(items);
      renderGallery(items);
    });
  document.getElementById("size-filter").onchange = filterItems;
  document.getElementById("color-filter").onchange = filterItems;
  document.addEventListener("hala:lang", (e) => {
    currentLang = e.detail.lang;
    populateColorFilter(items);
    renderGallery(items);
  });
});
