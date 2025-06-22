// Data Manager for Boutique Hala
class DataManager {
  constructor() {
    this.items = [];
    this.isRTL = true; // Default to Arabic
    this.init();
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
        console.log("Loaded data from localStorage");
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
      console.log("Loaded data from items.json");
    } catch (error) {
      console.error("Failed to load data:", error);
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
    const newId = Math.max(...this.items.map((i) => i.id), 0) + 1;
    const newItem = { ...item, id: newId };
    this.items.push(newItem);
    this.saveToLocalStorage();
    this.notifyDataChange();
    return newItem;
  }

  updateItem(id, updates) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...updates };
      this.saveToLocalStorage();
      this.notifyDataChange();
      return this.items[index];
    }
    return null;
  }

  deleteItem(id) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      const deleted = this.items.splice(index, 1)[0];
      this.saveToLocalStorage();
      this.notifyDataChange();
      return deleted;
    }
    return null;
  }

  getItem(id) {
    return this.items.find((item) => item.id === id);
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

  getUniqueColors() {
    const colors = new Set();
    this.items.forEach((item) => {
      item.colors.forEach((color) => colors.add(color));
    });
    return Array.from(colors).sort();
  }

  getUniqueCategories() {
    const categories = new Set();
    this.items.forEach((item) => {
      categories.add(item.category);
      categories.add(item.categoryEn);
    });
    return Array.from(categories).sort();
  }

  // Export data for GitHub Pages API simulation
  exportData() {
    const dataStr = JSON.stringify(this.items, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    return dataBlob;
  }

  // Simulate GitHub Pages API commit
  async simulateGitHubCommit() {
    try {
      const dataBlob = this.exportData();
      const url = URL.createObjectURL(dataBlob);

      // Create download link to simulate file update
      const a = document.createElement("a");
      a.href = url;
      a.download = "items.json";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      console.log("Data exported successfully");
      return true;
    } catch (error) {
      console.error("Failed to export data:", error);
      return false;
    }
  }
}

// Global instance
window.dataManager = new DataManager();
