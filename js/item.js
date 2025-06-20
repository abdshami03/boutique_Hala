let currentItem = null;
let currentLang = localStorage.getItem("hala_lang") || "ar";

const langStrings = {
  ar: {
    size: "المقاس:",
    color: "اللون:",
    snapchat: "للطلب، تواصل على سناب شات",
    back: "العودة للمعرض",
    notFound: "العباية غير موجودة",
  },
  en: {
    size: "Size:",
    color: "Color:",
    snapchat: "To order, contact on Snapchat",
    back: "Back to Gallery",
    notFound: "Abaya not found",
  },
};

function renderItem() {
  const container = document.getElementById("item-container");
  if (!currentItem) {
    container.innerHTML = `<div class="loading">${langStrings[currentLang].notFound}</div>`;
    return;
  }

  const l = langStrings[currentLang];
  const itemTitle = currentItem.title[currentLang];
  document.title = `${itemTitle} | Boutique Hala`;

  let thumbnailsHTML = "";
  currentItem.images.forEach((img, index) => {
    thumbnailsHTML += `<img src="${img}" alt="thumbnail ${
      index + 1
    }" class="thumb ${
      index === 0 ? "active" : ""
    }" onclick="changeImage('${img}', this)">`;
  });

  let videoHTML = "";
  if (currentItem.video) {
    videoHTML = `
      <div class="item-video">
        <video controls>
          <source src="${currentItem.video}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>`;
  }

  container.innerHTML = `
    <div class="item-gallery">
      <div class="main-image">
        <img src="${currentItem.images[0]}" alt="${itemTitle}" id="main-img">
      </div>
      <div class="thumbnails">${thumbnailsHTML}</div>
    </div>
    <div class="item-details">
      <h1 class="item-title">${itemTitle}</h1>
      <p class="detail-line"><strong>${l.size}</strong> ${currentItem.size}</p>
      <p class="detail-line"><strong>${l.color}</strong> ${currentItem.color}</p>
      ${videoHTML}
      <div class="snap-cta">
        <p>${l.snapchat}</p>
        <img src="assets/snapcode.png" alt="Snapchat" style="width:120px; margin-top:0.5rem;">
      </div>
    </div>`;

  document.getElementById("back-link").title = l.back;
}

function changeImage(src, thumbElement) {
  document.getElementById("main-img").src = src;
  document
    .querySelectorAll(".thumb")
    .forEach((t) => t.classList.remove("active"));
  thumbElement.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const itemId = new URLSearchParams(window.location.search).get("id");
  if (!itemId) {
    document.getElementById("item-container").innerHTML =
      "Error: Item ID missing.";
    return;
  }

  fetch("data/items.json")
    .then((res) => res.json())
    .then((items) => {
      currentItem = items.find((i) => i.id == itemId);
      renderItem();
    });

  document.addEventListener("hala:lang", (e) => {
    currentLang = e.detail.lang;
    renderItem();
  });
});
