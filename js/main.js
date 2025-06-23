// Main JavaScript for Boutique Hala Gallery
class GalleryManager {
  constructor() {
    this.currentFilters = {};
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.waitForDataManager();
  }

  waitForDataManager() {
    if (window.dataManager) {
      window.dataManager.ready.then(() => this.onDataReady());
    } else {
      setTimeout(() => this.waitForDataManager(), 50);
    }
  }

  onDataReady() {
    this.populateFilters();
    this.renderGallery();

    window.addEventListener("boutiqueDataChanged", () => {
      this.populateFilters();
      this.renderGallery();
    });
  }

  setupEventListeners() {
    document.getElementById("size-filter").addEventListener("change", (e) => {
      this.currentFilters.size = e.target.value;
      this.renderGallery();
    });
  }

  populateFilters() {
    if (!window.dataManager) return;

    const sizeFilter = document.getElementById("size-filter");
    const colorFilter = document.getElementById("color-filter");
    const categoryFilter = document.getElementById("category-filter");

    if (colorFilter) {
      colorFilter.parentElement.style.display = "none";
    }
    if (categoryFilter) {
      categoryFilter.parentElement.style.display = "none";
    }

    while (sizeFilter.options.length > 1) sizeFilter.remove(1);

    const sizes = window.dataManager.getUniqueSizes();
    sizes.forEach((size) => {
      const option = document.createElement("option");
      option.value = size;
      option.textContent = size;
      sizeFilter.appendChild(option);
    });
  }

  renderGallery() {
    if (!window.dataManager) return;

    const gallery = document.getElementById("abaya-gallery");
    const filteredItems = window.dataManager.getFilteredItems(
      this.currentFilters
    );

    if (filteredItems.length === 0) {
      gallery.innerHTML = `
        <div class="no-items">
          <p>لا توجد عبايات مطابقة</p>
        </div>
      `;
      return;
    }

    gallery.innerHTML = filteredItems
      .map((item) => this.createItemCard(item))
      .join("");
  }

  createItemCard(item) {
    const name = item.name.ar;
    const description = item.description.ar;

    return `
      <div class="card" onclick="location.href='item.html?id=${item.id}'">
        <div class="card-image">
          ${
            item.images && item.images.length > 0
              ? `<img src="${item.images[0]}" alt="${name}" loading="lazy">`
              : '<div class="no-image">لا توجد صورة</div>'
          }
        </div>
        <div class="card-content">
          <h3>${name}</h3>
          <p class="description">${description}</p>
          <div class="details-row">
            <span class="sizes"><strong>المقاسات:</strong> ${item.sizes.join(
              ", "
            )}</span>
            <a href="item.html?id=${item.id}" class="view-details-btn">
              عرض التفاصيل
            </a>
          </div>
        </div>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.galleryManager = new GalleryManager();
});
