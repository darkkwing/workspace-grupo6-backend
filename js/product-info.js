document.addEventListener("DOMContentLoaded", () => {
  // revisa si en el localStorage esta guardado el id de un producto
  const productId = localStorage.getItem("selectedProductID");
  // si no hay nada se  muestra un mensaje avisando que no hay un producto seleccionado
  if (!productId) {
    document.getElementById("product-container").innerHTML =
      "<p>No se seleccionó ningún producto</p>";
    return;
  }
  // si hay con el fetch se va a buscar en el .json la información del producto

  fetch(`https://japceibal.github.io/emercado-api/products/${productId}.json`)
    .then(response => response.json())
    .then(data => {
      mostrarInfoProducto(data);
      mostrarRelacionados(data.relatedProducts);
    })
    .catch(error => console.error("Error cargando el producto:", error));
});
// cuando recibe los datos arma un pedacito de HTML y se la coloca en la pagina 
function mostrarInfoProducto(product) {
  const container = document.getElementById("product-container");

  container.innerHTML = `
    <div class="producto-info">
      <div class="producto-imagen">
        <img src="${product.images[0]}" alt="${product.name}">
      </div>
      <div class="producto-detalles">
        <h2 class="nombre">${product.name}</h2>
        <p><b>Descripción:</b> ${product.description}</p>
        <p><b>Categoría:</b> ${product.category}</p>
        <h2 class="precio">${product.currency} ${product.cost}</h2>
        <p><b>Vendidos:</b> ${product.soldCount}</p>
        <button class="btn-agregar">Agregar</button>
      </div>
    </div>
  `;
}

//funcion para crear y mostarar los relacionados
function mostrarRelacionados(relatedProducts) {
  const relatedContainer = document.getElementById("related-container");
  //si no hay productos relacionados hace esto
  if (!relatedProducts || relatedProducts.length === 0) {
    relatedContainer.innerHTML = "<p>No hay productos relacionados</p>";
    return;
  }

  relatedContainer.innerHTML = `<h3 class="titulo-relacionados">Productos relacionados</h3><div id="related-products"></div>`;
  const relatedDiv = document.getElementById("related-products");

  relatedProducts.forEach(rel => {
    fetch(`https://japceibal.github.io/emercado-api/products/${rel.id}.json`)
      .then(response => response.json())
      .then(producto => {
        const card = document.createElement("div");
        card.classList.add("related-card");
        card.dataset.id = producto.id;

        card.innerHTML = `
          <img src="${producto.images[0]}" alt="${producto.name}">
          <p>${producto.name}</p>
          <p class="cost-producto">${producto.currency} ${producto.cost}</p>
        `;

        card.addEventListener("click", () => {
          localStorage.setItem("selectedProductID", producto.id);
          window.location = "product-info.html";
        });

        relatedDiv.appendChild(card);
      });
  });
}