window.PT_DEFAULT_CATALOG = {
  whatsappNumber: "918469738077",
  customPrints: [],
  categories: [
    {
      id: "keychains",
      label: "Keychains",
      displayImage: "ready/keychains/Display.jpg",
      description: "Clickable fidget keychains, storage keychains, and personalized Mom keychains.",
      products: [
        { name: "Clickable Fidget Keychain Icecream (pink)", price: "Rs. 180", image: "ready/keychains/Click1.jpg" },
        { name: "Clickable Fidget Keychain Icecream (brown)", price: "Rs. 180", image: "ready/keychains/Click2.jpg" },
        { name: "Clickable Fidget Keychain cupcake (white)", price: "Rs. 180", image: "ready/keychains/Click3.jpg" },
        { name: "Clickable Fidget Keychain cupcake (pink)", price: "Rs. 180", image: "ready/keychains/Click4.jpg" },
        { name: "Tumbler Storage Keychain (red)", price: "Rs. 230", image: "ready/keychains/S2.jpg" },
        { name: "Tumbler Storage Keychain (black)", price: "Rs. 230", image: "ready/keychains/S3.jpg" },
        { name: "Tumbler Storage Keychain (light pink)", price: "Rs. 230", image: "ready/keychains/S5.jpg" },
        { name: "Tumbler Storage Keychain (purple)", price: "Rs. 230", image: "ready/keychains/S6.jpg" },
        { name: "Tumbler Storage Keychain (blue)", price: "Rs. 230", image: "ready/keychains/s7.jpg" },
        { name: "Tumbler Storage Keychain (hot pink)", price: "Rs. 230", image: "ready/keychains/S8.jpg" },
        { name: "Tumbler Storage Keychain (teal)", price: "Rs. 230", image: "ready/keychains/S9.jpg" },
        { name: "Mom Keychain flower", price: "Rs. 180", image: "ready/keychains/mom3.jpeg" },
        { name: "Mom Keychain crown", price: "Rs. 180", image: "ready/keychains/mom4.jpeg" },
      ],
    },
    {
      id: "plaques",
      label: "Plaques",
      displayImage: "ready/Plaque/Didplay.jpeg",
      description: "Home sweet home plaques, Mom keepsakes, and book lover decor.",
      products: [
        { name: "Home Sweet Home (beige) size 24cm", price: "Rs. 450", image: "ready/Plaque/home.jpeg" },
        { name: "Home Sweet Home (pink) size 24cm", price: "Rs. 450", image: "ready/Plaque/home2.jpeg" },
        { name: "Home Sweet Home (white) size 24cm", price: "Rs. 450", image: "ready/Plaque/home3.jpeg" },
        { name: "Home Sweet Home (teal) size 24cm", price: "Rs. 450", image: "ready/Plaque/home4.jpeg" },
        { name: "Mom I love you (hot pink) size 13cm", price: "Rs. 250", image: "ready/Plaque/mom1.jpeg" },
        { name: "Mom Mom I love you (pink) size 13cm", price: "Rs. 250", image: "ready/Plaque/mom2.jpeg" },
        { name: "Book Lover size 13cm / 24cm", price: "Rs. 250 - 400", image: "ready/Plaque/b1.jpeg" },
      ],
    },
    {
      id: "storage",
      label: "Storage",
      displayImage: "ready/Storage/Display.jpeg",
      secondaryDisplayImage: "ready/Storage/Display1.jpg",
      description: "Gift boxes and cupcake-style storage pieces for decor and gifting.",
      products: [
        { name: "Gift Box size 4x4x4", price: "Rs. 600", image: "ready/Storage/box1.jpeg" },
        { name: "Gift Box size 3x3x3", price: "Rs. 400", image: "ready/Storage/box2.jpeg" },
        { name: "Cupcake mini Storage 1", price: "Rs. 250", image: "ready/Storage/cc1.jpg" },
        { name: "Cupcake mini Storage 2", price: "Rs. 250", image: "ready/Storage/cc2.jpg" },
        { name: "Cupcake mini Storage 3", price: "Rs. 250", image: "ready/Storage/cc3.jpg" },
        { name: "Cupcake Storage mini / medium / big", price: "Rs. 250 - 650", image: "ready/Storage/cc4.jpg" },
        { name: "Cupcake Storage mini / medium / big", price: "Rs. 250 - 650", image: "ready/Storage/cc5.jpg" },
        { name: "Cupcake Storage mini / medium / big", price: "Rs. 250 - 650", image: "ready/Storage/cc6.jpg" },
      ],
    },
  ],
};

function loadCatalog() {
  try {
    const savedCatalog = localStorage.getItem("PRETTY_THINGS_STORE_DATA");
    return savedCatalog ? JSON.parse(savedCatalog) : structuredClone(window.PT_DEFAULT_CATALOG);
  } catch {
    return structuredClone(window.PT_DEFAULT_CATALOG);
  }
}

if (document.querySelector("#productGrid")) {
const catalog = loadCatalog();
const whatsappNumber = catalog.whatsappNumber;
const products = catalog.categories.flatMap((category) =>
  category.products.map((product) => ({
    ...product,
    category: category.id,
    badge: category.label,
  }))
);

const categoryGrid = document.querySelector("#categoryGrid");
const productGrid = document.querySelector("#productGrid");
const productFilters = document.querySelector("#productFilters");
const menuToggle = document.querySelector(".menu-toggle");
const header = document.querySelector(".site-header");

function whatsappLink(message) {
  const encoded = encodeURIComponent(message);
  if (whatsappNumber) {
    return `https://wa.me/${whatsappNumber}?text=${encoded}`;
  }

  return `https://wa.me/?text=${encoded}`;
}

function renderProducts(filter = "all") {
  const visibleProducts = products.filter((product) => filter === "all" || product.category === filter);

  productGrid.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card" data-category="${product.category}">
          <figure>
            <img src="${product.image}" alt="${product.name}" loading="lazy">
          </figure>
          <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-meta">
              <span class="badge">${product.badge}</span>
              <span class="price">${product.price}</span>
            </div>
            <a class="button secondary" href="${whatsappLink(`Hi Pretty Things, I want to order: ${product.name}. Price shown: ${product.price}`)}" target="_blank" rel="noreferrer">
              Order on WhatsApp
            </a>
          </div>
        </article>
      `
    )
    .join("");
}

function renderCustomPrints() {
  const gallery = document.querySelector("#customPrintGallery");
  if (!gallery) return;

  const customPrints = catalog.customPrints || [];
  if (!customPrints.length) {
    gallery.hidden = true;
    return;
  }

  gallery.hidden = false;
  gallery.innerHTML = customPrints
    .map(
      (item) => `
        <article class="custom-print-card">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <span>${item.name}</span>
        </article>
      `
    )
    .join("");
}

function renderHeroImages() {
  if (!catalog.categories.length) return;
  const storage = catalog.categories.find((category) => category.id === "storage");
  const keychains = catalog.categories.find((category) => category.id === "keychains");
  const plaques = catalog.categories.find((category) => category.id === "plaques");

  document.querySelector("#heroMainImage").src = storage?.displayImage || catalog.categories[0].displayImage;
  document.querySelector("#heroTopImage").src = keychains?.displayImage || catalog.categories[0].displayImage;
  document.querySelector("#heroBottomImage").src = plaques?.displayImage || catalog.categories[0].displayImage;
}

function renderCategoryTiles() {
  if (!catalog.categories.length) {
    categoryGrid.innerHTML = "";
    return;
  }

  const tiles = catalog.categories
    .map(
      (category) => `
        <a class="category-tile" href="#shop" data-filter-link="${category.id}">
          <img src="${category.displayImage}" alt="${category.label} display">
          <span>${category.label}</span>
        </a>
      `
    )
    .join("");

  categoryGrid.innerHTML = `${tiles}
    <a class="category-tile" href="#custom">
      <img src="${catalog.categories.find((category) => category.secondaryDisplayImage)?.secondaryDisplayImage || catalog.categories[0].displayImage}" alt="Custom 3D printed display">
      <span>Custom Orders</span>
    </a>
  `;
}

function setActiveFilter(activeButton) {
  document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
  activeButton.classList.add("active");
}

function renderFilters() {
  if (!catalog.categories.length) {
    productFilters.innerHTML = `<button class="filter active" type="button" data-filter="all">All</button>`;
    return;
  }

  productFilters.innerHTML = `
    <button class="filter active" type="button" data-filter="all">All</button>
    ${catalog.categories
      .map((category) => `<button class="filter" type="button" data-filter="${category.id}">${category.label}</button>`)
      .join("")}
  `;

  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveFilter(button);
      renderProducts(button.dataset.filter);
    });
  });
}

document.querySelectorAll("[data-filter-link]").forEach((link) => {
  link.addEventListener("click", () => {
    const filter = link.dataset.filterLink;
    const button = document.querySelector(`.filter[data-filter="${filter}"]`);
    if (button) {
      setTimeout(() => button.click(), 100);
    }
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

function readForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}

document.querySelector("#customForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = readForm(event.currentTarget);
  const message = [
    "Hi Pretty Things, I want a custom 3D print.",
    `Text/name: ${data.text || "Not specified"}`,
    `Color: ${data.color || "Not specified"}`,
    `Size: ${data.size || "Not specified"}`,
    `Idea: ${data.idea || "Not specified"}`,
    "I can share the reference image here.",
  ].join("\n");

  window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
});

document.querySelector("#partsForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = readForm(event.currentTarget);
  const message = [
    "Hi Pretty Things, I need a replacement part.",
    `Appliance/item: ${data.appliance || "Not specified"}`,
    `Brand/model: ${data.brand || "Not specified"}`,
    `Dimensions: ${data.dimensions || "Not specified"}`,
    `Notes: ${data.notes || "Not specified"}`,
    "I can share the part photo here.",
  ].join("\n");

  window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
});

document.querySelector("#contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = readForm(event.currentTarget);
  const message = [
    "Hi Pretty Things, I have an inquiry.",
    `Name: ${data.name || "Not specified"}`,
    `Contact: ${data.contact || "Not specified"}`,
    `Message: ${data.message || "Not specified"}`,
  ].join("\n");

  window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
});

document.querySelector("#partSearchButton").addEventListener("click", () => {
  const query = document.querySelector("#partSearch").value.trim();
  const message = query
    ? `Hi Pretty Things, I am looking for a replacement part for: ${query}`
    : "Hi Pretty Things, I am looking for a replacement part.";
  window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
});

document.querySelector("#floatingWhatsapp").href = whatsappLink(
  "Hi Pretty Things, I want to place an order or ask about a custom 3D print."
);

document.querySelector("#contactWhatsapp").href = whatsappLink(
  "Hi Pretty Things, I want to place an order or ask about a custom 3D print."
);

renderHeroImages();
renderCategoryTiles();
renderFilters();
renderCustomPrints();
document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-filter-link]");
  if (!link) return;

  const button = document.querySelector(`.filter[data-filter="${link.dataset.filterLink}"]`);
  if (button) {
    setTimeout(() => button.click(), 100);
  }
});
renderProducts();
}
