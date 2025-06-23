// Item Detail Page JavaScript
class ItemDetailManager {
  constructor() {
    this.currentItem = null;
    this.init();
  }

  init() {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    this.setupEventListeners();
    this.waitForDataManager();
  }

  waitForDataManager() {
    if (window.dataManager) {
      window.dataManager.ready.then(() => this.loadItem());
    } else {
      setTimeout(() => this.waitForDataManager(), 50);
    }
  }

  loadItem() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get("id");

    if (!itemId) {
      this.showError("لم يتم العثور على المنتج");
      return;
    }

    this.currentItem = window.dataManager.getItem(itemId);
    if (!this.currentItem) {
      this.showError("لم يتم العثور على المنتج");
      return;
    }

    this.renderItem();
  }

  setupEventListeners() {
    document.getElementById("back-link").addEventListener("click", (e) => {
      e.preventDefault();
      window.history.back();
    });
  }

  renderItem() {
    if (!this.currentItem) return;

    const container = document.getElementById("item-container");
    const name = this.currentItem.name.ar;
    const description = this.currentItem.description.ar;

    document.title = `${name} | بوتيك هالة`;

    container.innerHTML = `
      <div class="item-detail">
        <div class="item-media">
          ${this.renderMedia()}
        </div>
        <div class="item-info">
          <h1 class="item-title">${name}</h1>
          <p class="item-description">${description}</p>
          <div class="item-meta">
            <p class="item-sizes"><strong>المقاسات المتوفرة:</strong> ${this.currentItem.sizes.join(
              ", "
            )}</p>
          </div>
          <div class="item-actions">
            <a href="https_wa_me_966500000000" class="contact-btn" target="_blank">
              اطلب الآن عبر واتساب
            </a>
          </div>
        </div>
      </div>
    `;
  }

  renderMedia() {
    let mediaHTML = "";
    const name = this.currentItem.name.ar;

    if (this.currentItem.images && this.currentItem.images.length > 0) {
      mediaHTML += '<div class="item-images">';
      this.currentItem.images.forEach((url, index) => {
        mediaHTML += `
          <div class="image-container">
            <img src="${url}" alt="${name} - صورة ${index + 1}" 
                 loading="${index === 0 ? "eager" : "lazy"}">
          </div>
        `;
      });
      mediaHTML += "</div>";
    }

    if (!mediaHTML) {
      mediaHTML = '<div class="no-media">لا توجد صور متاحة</div>';
    }

    return mediaHTML;
  }

  showError(message) {
    const container = document.getElementById("item-container");
    container.innerHTML = `
      <div class="error-message">
        <h2>خطأ</h2>
        <p>${message}</p>
        <a href="index.html" class="back-btn">العودة للمعرض</a>
      </div>
    `;
  }
}

// Initialize item detail when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.itemDetailManager = new ItemDetailManager();
});
