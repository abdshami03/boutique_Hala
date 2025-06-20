document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".admin-login-page")) {
    handleLoginPage();
  } else if (document.querySelector(".admin-dashboard-page")) {
    handleDashboardPage();
  }
});

function handleLoginPage() {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("login-error");

  // If already logged in, redirect to dashboard
  if (sessionStorage.getItem("hala_admin_auth") === "true") {
    window.location.href = "dashboard.html";
    return;
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Hardcoded credentials
    const adminUsers = {
      admin1: "password123",
      admin2: "secret456",
    };

    if (adminUsers[username] && adminUsers[username] === password) {
      sessionStorage.setItem("hala_admin_auth", "true");
      window.location.href = "dashboard.html";
    } else {
      errorMessage.textContent = "Invalid username or password.";
    }
  });
}

function handleDashboardPage() {
  if (sessionStorage.getItem("hala_admin_auth") !== "true") {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("logout-btn").addEventListener("click", () => {
    sessionStorage.removeItem("hala_admin_auth");
    window.location.href = "index.html";
  });

  const addForm = document.getElementById("add-form");
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newAbaya = {
      title: {
        ar: document.getElementById("title-ar").value,
        en: document.getElementById("title-en").value,
      },
      size: document.getElementById("size").value,
      color: document.getElementById("color").value,
      // In a real app, you'd handle file uploads to a server.
      // Here we just use placeholder paths.
      images: [],
      video: "",
    };
    dataService.addItem(newAbaya);
    renderAdminGrid();
    addForm.reset();
  });

  renderAdminGrid();
}

function renderAdminGrid() {
  const grid = document.getElementById("admin-item-grid");
  const items = dataService.getItems();
  grid.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "admin-item-card";
    card.innerHTML = `
      <img src="../${item.images[0] || ""}" alt="${
      item.title.en
    }" onerror="this.style.display='none'">
      <div class="info">
        <div class="title">${item.title.en}</div>
        <div>Size: ${item.size}</div>
      </div>
      <button class="delete-btn" onclick="deleteItemClicked(${
        item.id
      })">&times;</button>
    `;
    grid.appendChild(card);
  });
}

function deleteItemClicked(id) {
  if (confirm("Are you sure you want to delete this item?")) {
    dataService.deleteItem(id);
    renderAdminGrid();
  }
}
