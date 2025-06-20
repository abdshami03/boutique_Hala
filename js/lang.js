const LANGS = {
  ar: {
    dir: "rtl",
    switch: "EN",
    heroTitle: "بوتيك هالة",
    heroTagline: "تألقي بعبايات فاخرة",
    sizeLabel: "المقاس:",
    colorLabel: "اللون:",
    sizeAll: "الكل",
    sizes: { S: "صغير", M: "متوسط", L: "كبير", XL: "كبير جدًا" },
    snapchat: "للطلب، تواصل على سناب شات",
    pageTitle: "بوتيك هالة | Boutique Hala",
    metaDesc: "بوتيك هالة - عبايات فاخرة، معرض صور، تصفح حسب المقاس واللون.",
  },
  en: {
    dir: "ltr",
    switch: "عربي",
    heroTitle: "Boutique Hala",
    heroTagline: "Shine in Luxury Abayas",
    sizeLabel: "Size:",
    colorLabel: "Color:",
    sizeAll: "All",
    sizes: { S: "S", M: "M", L: "L", XL: "XL" },
    snapchat: "To order, contact on Snapchat",
    pageTitle: "Boutique Hala | بوتيك هالة",
    metaDesc:
      "Boutique Hala - Luxury Abayas Gallery, Browse by Size and Color.",
  },
};

function setLang(lang) {
  const l = LANGS[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = l.dir;
  document.getElementById("lang-switch").textContent = l.switch;
  if (document.getElementById("hero-title"))
    document.getElementById("hero-title").textContent = l.heroTitle;
  if (document.getElementById("hero-tagline"))
    document.getElementById("hero-tagline").textContent = l.heroTagline;
  if (document.getElementById("size-label"))
    document.getElementById("size-label").textContent = l.sizeLabel;
  if (document.getElementById("color-label"))
    document.getElementById("color-label").textContent = l.colorLabel;
  // Update select options for size
  const sizeFilter = document.getElementById("size-filter");
  if (sizeFilter) {
    sizeFilter.options[0].text = l.sizeAll;
    for (let i = 1; i <= 4; i++) {
      sizeFilter.options[i].text = l.sizes[sizeFilter.options[i].value];
    }
  }
  // Update meta
  document.title = l.pageTitle;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", l.metaDesc);
  localStorage.setItem("hala_lang", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  let lang = localStorage.getItem("hala_lang") || "ar";
  setLang(lang);
  document.getElementById("lang-switch").onclick = () => {
    lang = lang === "ar" ? "en" : "ar";
    setLang(lang);
    // Optionally trigger a custom event for other scripts
    document.dispatchEvent(new CustomEvent("hala:lang", { detail: { lang } }));
  };
});
