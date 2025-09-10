//constante de fuente de los datos
const PRODUCTS_LIST_URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json'

let allProducts = []; //contenido del json
let visibleProducts = []; //lo que se vera

let listEl, catEl, filterEl, filterNav;

document.addEventListener("DOMContentLoaded", async () => {
  listEl = document.getElementById("list-products");
  catEl = document.getElementById("categories");

  try {
    //carga del JSON Con fecth
    let response = await fetch(PRODUCTS_LIST_URL);
    let data = await response.json();

    //normalizando datos, esto es dejar los datos en un formato mas sencillo y organizado
    allProducts = data.products.map(p => ({ //con map recorremos el arreglo, y creamos un arreglo nuevo
      ...p, // los puntos suspensivos son un operador de propagacion
      brand: p.name.split(" ")[0],//con esta linea se usara la primera palabra como marca, split divide el string en el array
      costNum: Number(p.cost),// asegura el numero de costo
    }))

    //estado inicial del products.html, todo visible
    visibleProducts = [...allProducts];

    window.productos = [...allProducts]; // Guarda los productos para la búsqueda
    
    let visualCat = [{ cat: data.catName }];
    //llamada de la funcion para crear los elementos
    catName(visualCat)
    createList(visibleProducts);
    
     

  } catch (error) {
    console.error("Error al cargar los productos:", error);
    listEl.innerHTML = `
  <li class="error">
      No se pudieron cargar los productos. 
      <br>Por favor, intenta recargar la página más tarde.
    </li>
  `;
  }
})


function catName(categories) {
  let catHTML = categories.map(c => `
    ${c.cat}
  `).join("");
  catEl.innerHTML = catHTML;
}


//crea el formato del precio para el html
function formatPrice(currency, costNum) {
  let miles = costNum.toLocaleString("en-US"); //donde va la coma para indicar que es miles
  return `${currency === "USD" ? "US$" : currency} ${miles}`; //operador ternario(if/else) que muestra el precio en el html
}

//crea elementos de los productos
function createList(items) {

  let html = items.map(p => {
    let price = formatPrice(p.currency, p.costNum);
    return `
      <li class="product-card" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/600x400?text=Auto'">
        <div class="info">
          <h2 class="name">${p.name}</h2>
          <p>${p.description}</p>
          <div class="stars">★★★★☆ <span>(${p.soldCount} reseñas)</span></div>
          <div class="meta">
            <span class="price">${price}</span>
            <span class="sold">${p.soldCount} vendidos</span>
          </div>
          <button class="btn" data-add="${p.id}">Agregar</button>
        </div>
      </li>
    `;
  }).join("");//con join unimos los datos en un solo string(texto)

  listEl.innerHTML = html; //aqui la variable html, agrega un nuevo elemento en el HTML

    // id del producto para product-info.js
  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      localStorage.setItem("selectedProductID", id);
      window.location = "product-info.html";
    });
  });
}


// Función para filtrar por búsqueda usando productos reales
function filtrarPorBusqueda() {
  const texto = document.getElementById('search-input').value.toLowerCase();
  let filtrados;
  if (texto === "") {
    filtrados = window.productos || [];
  } else {
    filtrados = (window.productos || []).filter(producto =>
      producto.name.toLowerCase().includes(texto) ||
      producto.description.toLowerCase().includes(texto) ||
      producto.brand.toLowerCase().includes(texto)
    );
  }
  createList(filtrados);
}

// Evento input para el buscador
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('search-input');
  if (input) {
    input.addEventListener('input', filtrarPorBusqueda);
  }

});
});
