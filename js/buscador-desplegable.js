document.addEventListener("DOMContentLoaded", async () => {
  //se traen ambos inputs y contenedores (desktop y responsive)
  const buscadores = [
    { input: document.getElementById("search-input"), resultados: document.getElementById("search-results") },
    { input: document.getElementById("search-responsive"), resultados: document.getElementById("search-results-responsive") }
  ];

  //ID de categorias. lo cargue asi porque no encontre mucha vuelta, tal vez se puede mejorar
  const categoriaIds = [101, 102, 103, 104, 105, 106, 107, 108, 109];
  const urls = categoriaIds.map(id => `https://japceibal.github.io/emercado-api/cats_products/${id}.json`);

  //si no existen los productos cargados, los carga con los ids anteriores
  if (!window.productos || window.productos.length === 0) {
    try {
      const responses = await Promise.all(urls.map(url => fetch(url)));
      const data = await Promise.all(responses.map(r => r.json()));

      //combina todos los productos y les agrega nombre de categoria
      window.productos = data.flatMap(cat =>
        cat.products.map(p => ({
          ...p,
          category: cat.catName
        }))
      );
    } catch (error) {
      console.error("Error cargando productos para búsqueda:", error);
    }
  }

  //funciom para mostrar los resultados que coinciden con la busqueda
  function mostrarResultados(inputEl, contenedor) {
    const valor = inputEl.value.trim().toLowerCase();
    contenedor.innerHTML = "";

    if (valor === "") {
      contenedor.style.display = "none";
      return;
    }

    const coincidencias = (window.productos || []).filter(p =>
      p.name.toLowerCase().includes(valor) ||
      (p.category && p.category.toLowerCase().includes(valor))
    ).slice(0, 5);

    if (coincidencias.length === 0) {
      contenedor.innerHTML = "<p class='no-results'>No se encontraron productos.</p>";
      contenedor.style.display = "block";
      return;
    }

    contenedor.style.display = "block";

    coincidencias.forEach(prod => {
      const div = document.createElement("div");
      div.classList.add("resultado-item");
      div.innerHTML = `
        <img src="${prod.image}" alt="${prod.name}">
        <div class="info">
          <strong>${prod.name}</strong>
          <p>${prod.description}</p>
          <span class="price">${prod.currency} ${prod.cost}</span>
        </div>
      `;
      //se guarda el id del prod buscado para redirigirte si lo clickeas
      div.addEventListener("click", () => {
        localStorage.setItem("selectedProductID", prod.id);
        window.location = "product-info.html";
      });
      contenedor.appendChild(div);
    });
  }

  //registro de eventos para ambos inputs
  buscadores.forEach(({ input, resultados }) => {
    if (!input || !resultados) return;

    //escucha al input
    input.addEventListener("input", () => mostrarResultados(input, resultados));

    //oculta resultados al hacer click afuera
    document.addEventListener("click", e => {
      if (!resultados.contains(e.target) && e.target !== input) {
        resultados.style.display = "none";
      }
    });
  });
});