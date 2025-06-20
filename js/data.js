// This script will be loaded first to ensure data functions are available
const dataService = {
  // Initialize with data from JSON if localStorage is empty
  _init: function () {
    if (!localStorage.getItem("hala_items")) {
      fetch("../data/items.json")
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("hala_items", JSON.stringify(data));
        });
    }
  },

  getItems: function () {
    return JSON.parse(localStorage.getItem("hala_items") || "[]");
  },

  saveItems: function (items) {
    localStorage.setItem("hala_items", JSON.stringify(items));
    // Also update the JSON file on the "server" (for demo purposes)
    // In a real app, this would be an API call.
    // For GitHub pages, we can't write files, so this is just a simulation.
    // To make data persistent across browsers, you'd manually copy localStorage contents to items.json
    console.log(
      "Data saved to localStorage. To persist, copy this to data/items.json:",
      items
    );
  },

  addItem: function (item) {
    const items = this.getItems();
    // Simple ID generation
    const newId =
      items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    item.id = newId;
    items.push(item);
    this.saveItems(items);
    return item;
  },

  deleteItem: function (id) {
    let items = this.getItems();
    items = items.filter((i) => i.id !== id);
    this.saveItems(items);
  },
};

dataService._init();
