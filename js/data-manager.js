// Data Manager for Boutique Hala
class DataManager {
  constructor() {
    this.items = [];
    this.isRTL = true; // Default to Arabic
    this.ready = this.init(); // This promise will resolve when init() is complete
  }

  async init() {
    await this.loadData();
    this.setupStorageListener();
  }

  async loadData() {
    // First try localStorage
    const stored = localStorage.getItem("boutiqueHalaItems");
    if (stored) {
      try {
        this.items = JSON.parse(stored);
        return;
      } catch (e) {
        console.warn("Failed to parse localStorage data:", e);
      }
    }

    // Fallback to JSON file
    try {
      const response = await fetch("/data/items.json");
      if (!response.ok) throw new Error("Failed to fetch items.json");
      this.items = await response.json();
      this.saveToLocalStorage();
    } catch (error) {
      this.items = [];
    }
  }

  saveToLocalStorage() {
    localStorage.setItem("boutiqueHalaItems", JSON.stringify(this.items));
  }

  setupStorageListener() {
    window.addEventListener("storage", (e) => {
      if (e.key === "boutiqueHalaItems") {
        this.items = JSON.parse(e.newValue || "[]");
        this.notifyDataChange();
      }
    });
  }

  notifyDataChange() {
    // Dispatch custom event for other components to listen to
    window.dispatchEvent(
      new CustomEvent("boutiqueDataChanged", {
        detail: { items: this.items },
      })
    );
  }

  // CRUD Operations
  addItem(item) {
    const newItem = { ...item, id: String(new Date().getTime()) };
    this.items.push(newItem);
    this.saveToLocalStorage();
    this.notifyDataChange();
    return newItem;
  }

  updateItem(id, updates) {
    const index = this.items.findIndex(
      (item) => String(item.id) === String(id)
    );
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...updates, id: id };
      this.saveToLocalStorage();
      this.notifyDataChange();
      return this.items[index];
    }
    return null;
  }

  deleteItem(id) {
    const index = this.items.findIndex(
      (item) => String(item.id) === String(id)
    );
    if (index !== -1) {
      const deleted = this.items.splice(index, 1)[0];
      this.saveToLocalStorage();
      this.notifyDataChange();
      return deleted;
    }
    return null;
  }

  getItem(id) {
    return this.items.find((item) => String(item.id) === String(id));
  }

  getAllItems() {
    return this.items;
  }

  // Filter methods
  getFilteredItems(filters = {}) {
    let filtered = [...this.items];

    if (filters.size) {
      filtered = filtered.filter((item) => item.sizes.includes(filters.size));
    }

    if (filters.color) {
      filtered = filtered.filter((item) => item.colors.includes(filters.color));
    }

    if (filters.category) {
      filtered = filtered.filter(
        (item) =>
          item.category === filters.category ||
          item.categoryEn === filters.category
      );
    }

    return filtered;
  }

  // Get unique values for filters
  getUniqueSizes() {
    const sizes = new Set();
    this.items.forEach((item) => {
      item.sizes.forEach((size) => sizes.add(size));
    });
    return Array.from(sizes).sort();
  }

  getUniqueCategories() {
    const categories = new Set();
    this.items.forEach((item) => {
      categories.add(item.category);
      categories.add(item.categoryEn);
    });
    return Array.from(categories).sort();
  }
}

// Global instance
window.dataManager = new DataManager();
