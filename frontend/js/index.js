let carInner, carIndicators;
const CATEGORY_IDS = [101, 102, 103, 104, 105, 106, 107, 108, 109];

document.addEventListener("DOMContentLoaded", async function () {

  if (typeof getJSONData !== "function" || typeof normalizeSelectCat !== "function") {
    console.error("Dependencias faltantes: asegúrate de cargar init.js y catalogService.js antes que index.js");
    return;
  }

  carInner = document.getElementById("top-carousel-inner");
  carIndicators = document.getElementById("top-carousel-indicators");

  try {
    const arrayPromises = CATEGORY_IDS.map(id =>
      getJSONData(PRODUCTS_URL + "/" + id)
    );

    const responses = await Promise.all(arrayPromises);

    const normalizedCategories = responses
      .map((res, i) => {
        if (res && res.status === "ok") {
          return normalizeSelectCat(CATEGORY_IDS[i], res.data);
        } else {
          console.warn("No se pudo cargar la categoría", CATEGORY_IDS[i], res);
          return null;
        }
      })
      .filter(Boolean);

    const allProducts = normalizedCategories.flatMap(cat =>
      cat.products.map(p => ({ ...p, sourceCatId: cat.catId }))
    );

    const TOP_N = 5;
    const topProducts = allProducts
      .filter(p => Number.isFinite(p.soldCount))
      .sort((a, b) => b.soldCount - a.soldCount)
      .slice(0, TOP_N);

    renderCarousel(topProducts);

  } catch (error) {
    console.error("Error cargando top vendidos:", error);
  }

  // navegación a categorías
  document.getElementById("autos")?.addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes")?.addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles")?.addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });
});

// evitar duplicar el listener de click del carrusel
let _carClickBound = false;

function renderCarousel(topProducts) {
  if (!carInner || !carIndicators || !Array.isArray(topProducts)) return;

  carIndicators.replaceChildren();
  carInner.replaceChildren();

  let indFrag = document.createDocumentFragment();

  topProducts.forEach((p, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("data-bs-target", "#top-carousel");
    dot.setAttribute("data-bs-slide-to", String(i));
    dot.setAttribute("aria-label", `Producto ${i + 1}`);
    if (i === 0) {
      dot.classList.add("active");
      dot.setAttribute("aria-current", "true");
    }
    indFrag.appendChild(dot);

    const active = i === 0 ? "active" : "";

    const isUSD = (p.currency || "").toUpperCase() === "USD";
    const precio = new Intl.NumberFormat("es-UY", { maximumFractionDigits: 0 }).format(p.costNum || 0);
    const precioTxt = `${isUSD ? "U$S" : "$"} ${precio}`;

    carInner.innerHTML += `
      <div class="carousel-item ${active}" data-product-id="${String(p.id)}">
        <div class="hero-frame">
          <img class="hero-img" src="${p.image}" alt="${p.name}">
          <div class="hero-badge hero-name">${p.name}</div>
          <div class="hero-badge hero-price">${precioTxt}</div>
        </div>
      </div>
    `;
  });

  carIndicators.appendChild(indFrag);

  const topCarouselEl = document.getElementById("top-carousel");
  if (topCarouselEl && window.bootstrap && bootstrap.Carousel) {
    const instance = bootstrap.Carousel.getOrCreateInstance(topCarouselEl);
    instance.cycle();
  }

  if (!_carClickBound) {
    carInner.addEventListener("click", (ev) => {
      if (ev.target.closest(".carousel-control-prev, .carousel-control-next, .carousel-indicators")) return;

      const slide = ev.target.closest(".carousel-item");
      if (!slide) return;

      ev.preventDefault();

      const productId = slide.dataset.productId;
      if (productId) localStorage.setItem("selectedProductID", String(productId));

      window.location.assign("product-info.html");
    });
    _carClickBound = true;
  }
}

// Verificar si el usuario está logueado y mostrar su información, esta es parte es nueva por el backend
window.addEventListener("load", function () {

  const logueado = localStorage.getItem("logueado") === "true";

  if (!logueado) {
    window.location.href = "login.html";
    return;
  }

  const usuario = JSON.parse(localStorage.getItem("user"));

  if (usuario) {
    const els = document.querySelectorAll('[id^="user-info"]');

    const nombreCompleto = `${usuario.nombre || ""} ${usuario.apellido || ""}`.trim();
    const texto = nombreCompleto || usuario.email;

    els.forEach(el => el.innerText = texto);
  }

});
