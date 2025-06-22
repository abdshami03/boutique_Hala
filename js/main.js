// Main JavaScript for Boutique Hala Gallery
class GalleryManager {
  constructor() {
    this.currentFilters = {};
    this.isRTL = true;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.waitForDataManager();
  }

  waitForDataManager() {
    if (window.dataManager) {
      this.onDataReady();
    } else {
      setTimeout(() => this.waitForDataManager(), 100);
    }
  }

  onDataReady() {
    this.populateFilters();
    this.renderGallery();

    // Listen for data changes
    window.addEventListener("boutiqueDataChanged", () => {
      this.populateFilters();
      this.renderGallery();
    });
  }

  setupEventListeners() {
    // Filter change listeners
    document.getElementById("size-filter").addEventListener("change", (e) => {
      this.currentFilters.size = e.target.value;
      this.renderGallery();
    });

    document.getElementById("color-filter").addEventListener("change", (e) => {
      this.currentFilters.color = e.target.value;
      this.renderGallery();
    });

    document
      .getElementById("category-filter")
      .addEventListener("change", (e) => {
        this.currentFilters.category = e.target.value;
        this.renderGallery();
      });

    // Language switch listener
    document.getElementById("lang-switch").addEventListener("click", () => {
      this.toggleLanguage();
    });
  }

  populateFilters() {
    if (!window.dataManager) return;

    const sizeFilter = document.getElementById("size-filter");
    const colorFilter = document.getElementById("color-filter");
    const categoryFilter = document.getElementById("category-filter");

    // Clear existing options (keep "All" option)
    while (sizeFilter.options.length > 1) sizeFilter.remove(1);
    while (colorFilter.options.length > 1) colorFilter.remove(1);
    while (categoryFilter.options.length > 1) categoryFilter.remove(1);

    // Populate sizes
    const sizes = window.dataManager.getUniqueSizes();
    sizes.forEach((size) => {
      const option = document.createElement("option");
      option.value = size;
      option.textContent = size;
      sizeFilter.appendChild(option);
    });

    // Populate colors
    const colors = window.dataManager.getUniqueColors();
    colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      colorFilter.appendChild(option);
    });

    // Populate categories
    const categories = window.dataManager.getUniqueCategories();
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
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
          <p>${this.isRTL ? "لا توجد عبايات مطابقة" : "No items found"}</p>
        </div>
      `;
      return;
    }

    gallery.innerHTML = filteredItems
      .map((item) => this.createItemCard(item))
      .join("");
  }

  createItemCard(item) {
    const name = this.isRTL ? item.name : item.nameEn;
    const description = this.isRTL ? item.description : item.descriptionEn;
    const priceText = this.isRTL ? "السعر:" : "Price:";
    const sizeText = this.isRTL ? "المقاس:" : "Size:";
    const colorText = this.isRTL ? "اللون:" : "Color:";
    const viewText = this.isRTL ? "عرض التفاصيل" : "View Details";

    return `
      <div class="card" data-item-id="${item.id}">
        <div class="card-image">
          ${
            item.imageUrls.length > 0
              ? `<img src="${item.imageUrls[0]}" alt="${name}" loading="lazy">`
              : '<div class="no-image">No Image</div>'
          }
        </div>
        <div class="card-content">
          <h3>${name}</h3>
          <p class="description">${description}</p>
          <p class="price"><strong>${priceText}</strong> ${item.price} ${
      this.isRTL ? "ريال" : "SAR"
    }</p>
          <p class="sizes"><strong>${sizeText}</strong> ${item.sizes.join(
      ", "
    )}</p>
          <p class="colors"><strong>${colorText}</strong> ${item.colors.join(
      ", "
    )}</p>
          <a href="item.html?id=${item.id}" class="view-details-btn">
            ${viewText}
          </a>
        </div>
      </div>
    `;
  }

  toggleLanguage() {
    this.isRTL = !this.isRTL;
    const html = document.documentElement;
    const langSwitch = document.getElementById("lang-switch");

    if (this.isRTL) {
      html.lang = "ar";
      html.dir = "rtl";
      langSwitch.textContent = "EN";
    } else {
      html.lang = "en";
      html.dir = "ltr";
      langSwitch.textContent = "عربي";
    }

    // Update text content
    this.updateTextContent();
    this.renderGallery();
  }

  updateTextContent() {
    const heroTitle = document.getElementById("hero-title");
    const heroTagline = document.getElementById("hero-tagline");
    const sizeLabel = document.getElementById("size-label");
    const colorLabel = document.getElementById("color-label");
    const categoryLabel = document.getElementById("category-label");

    if (this.isRTL) {
      heroTitle.textContent = "بوتيك هالة";
      heroTagline.textContent = "تألقي بعبايات فاخرة | Shine in Luxury Abayas";
      sizeLabel.textContent = "المقاس:";
      colorLabel.textContent = "اللون:";
      categoryLabel.textContent = "الفئة:";
    } else {
      heroTitle.textContent = "Boutique Hala";
      heroTagline.textContent = "Shine in Luxury Abayas | تألقي بعبايات فاخرة";
      sizeLabel.textContent = "Size:";
      colorLabel.textContent = "Color:";
      categoryLabel.textContent = "Category:";
    }

    // Update filter options
    const sizeFilter = document.getElementById("size-filter");
    const colorFilter = document.getElementById("color-filter");
    const categoryFilter = document.getElementById("category-filter");

    if (sizeFilter.options[0]) {
      sizeFilter.options[0].textContent = this.isRTL ? "الكل" : "All";
    }
    if (colorFilter.options[0]) {
      colorFilter.options[0].textContent = this.isRTL ? "الكل" : "All";
    }
    if (categoryFilter.options[0]) {
      categoryFilter.options[0].textContent = this.isRTL ? "الكل" : "All";
    }
  }
}

// Initialize gallery when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.galleryManager = new GalleryManager();
});
