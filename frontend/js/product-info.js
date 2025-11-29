document.addEventListener("DOMContentLoaded", () => {

  // revisa si en el localStorage esta guardado el id de un producto
  const productId = localStorage.getItem("selectedProductID");

  // si no hay nada se  muestra un mensaje avisando que no hay un producto seleccionado
  if (!productId) {
    document.getElementById("product-container").innerHTML =
      "<p>No se seleccionó ningún producto</p>";
    return;
  }

//

  // si hay con el fetch se va a buscar al backend la información del producto
  fetch(`http://localhost:3000/products/info/${productId}`)
    .then(response => response.json())
    .then(data => {
      mostrarInfoProducto(data);
      mostrarRelacionados([]); // TEMPORAL hasta crear relacionados en BD, o implementar lógica que genere relacionados a través de la misma categoría si hay productos
    })
    .catch(error => console.error("Error cargando el producto:", error));
});


//mostrarInfo del producto

// cuando recibe los datos arma un pedacito de HTML y se la coloca en la pagina 
function mostrarInfoProducto(product) {

  const container = document.getElementById("product-container");

  // ahora las imágenes vienen de product.images desde BD
  const images = product.images;


  // render principal
  container.innerHTML = `
    <div class="producto-info">
      <div id="gallery-root"></div>

      <div class="producto-detalles">
        <h2 class="nombre">${product.name}</h2>
        <p><b>Descripción:</b> ${product.description}</p>
        <p><b>Categoría:</b> ${product.category}</p>
        <h2 class="precio">${product.currency} ${product.cost}</h2>
        <p><b>Vendidos:</b> ${product.soldCount}</p>
        <button id= "btn-comprar" class="btn-agregar">Comprar</button>
      </div>
    </div>
  `;

  // funcionalidad boton comprar
  const botonComprar = document.getElementById("btn-comprar");  //trae el boton

  // escucha el click y guarda los datos del producto
  botonComprar.addEventListener("click", () => {
    const nombre = product.name;
    const costo = product.cost;
    const moneda = product.currency;

    // ahora tomamos la primera imagen del backend
    const imagen = images[0] || "";

    const cantidad = 1;
    const subtotal = costo * cantidad;

    const productoSeleccionado = {
      nombre,
      costo,
      moneda,
      cantidad,
      imagen,
      subtotal
    };

    // verifica si existe en el local y sino crea el array para guardar los productos a los que le den comprar
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existente = carrito.find(p => p.nombre === productoSeleccionado.nombre);

    // si existe el producto en el local agrega uno e incrementa el subtotal
    if (existente) {
      existente.cantidad += cantidad;
      existente.subtotal = existente.costo * existente.cantidad;
    } else {
      carrito.push(productoSeleccionado); // si no existe agrega el producto al array
    }

    localStorage.setItem("carrito", JSON.stringify(carrito)); // guarda el carrito actualizado en local
    window.location.href = "cart.html"; // redirige a la pagina del carrito
  });

  // galeria
  const root = document.getElementById("gallery-root");
  const mq = window.matchMedia("(max-width: 768px)");

  // galeria desktop
  function galeriaDesktop() {
    root.innerHTML = `
      <div class="galeria">
        <div class="imagenes-izq">
          ${images.map((src, i) => `
            <img class="thumb" src="${src}" alt="${product.name} foto ${i + 1}" data-index="${i}">
          `).join("")}
        </div>
        <div class="imagen-medio">
          <img id="imagenPrincipal" src="${images[0] || ''}" alt="${product.name}">
        </div>
      </div>
    `;

    // listeners para imagenes
    root.querySelectorAll(".thumb").forEach(thumb => {
      thumb.addEventListener("click", function () {
        const principal = document.getElementById("imagenPrincipal");
        if (principal) principal.src = this.src;
      });
    });
  }

  // galeria responsive
  function galeriaResponsive() {
    root.innerHTML = `
      <div class="galeria-container">
        <button class="arrow left" id="prevBtn" aria-label="Anterior">&#10094;</button>
        <div class="galeria-slide">
          ${images.map(src => `<img src="${src}" alt="${product.name}">`).join("")}
        </div>
        <button class="arrow right" id="nextBtn" aria-label="Siguiente">&#10095;</button>
      </div>
    `;

    const slide = root.querySelector(".galeria-slide");
    const imgs = root.querySelectorAll(".galeria-slide img");
    const prevBtn = root.querySelector("#prevBtn");
    const nextBtn = root.querySelector("#nextBtn");

    let index = 0;
    function showSlide(i) {
      index = ((i % imgs.length) + imgs.length) % imgs.length; // wrap
      slide.style.transform = `translateX(${-index * 100}%)`;
    }

    showSlide(0);
    prevBtn.addEventListener("click", () => showSlide(index - 1));
    nextBtn.addEventListener("click", () => showSlide(index + 1));

    // tactil
    let startX = 0;
    slide.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });
    slide.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (diff > 40) showSlide(index + 1);
      else if (diff < -40) showSlide(index - 1);
    });
  }

  function handleModeChange(e) {
    if (e.matches) galeriaResponsive();
    else galeriaDesktop();
  }

  // llamada inicial
  handleModeChange(mq);

  if (typeof mq.addEventListener === "function") mq.addEventListener("change", handleModeChange);
  else if (typeof mq.addListener === "function") mq.addListener(handleModeChange);
}


//comentarios backend

document.addEventListener("DOMContentLoaded", function () {

  let productId = localStorage.getItem("selectedProductID");

  // pedir los comentarios a TU servidor
  fetch(`http://localhost:3000/comments/${productId}`)
    .then(response => response.json())
    .then(comments => {
      mostrarComentarios(comments);
    })
    .catch(error => console.error("Error cargando comentarios:", error));
});


// funcion que muestra los comentarios
function mostrarComentarios(comments) {
  const container = document.getElementById("comentarios-container");
  if (!container) return;

  let htmlContent = "";

  comments.forEach(comment => {
    const score = parseInt(comment.puntuacion) || 0;
    const stars = createStarsHtml(score);

    htmlContent += `
      <div class="comentario">
        <div class="comentario-header">
          <div class="comentario-user">
            <div class="user-icon"><img src="img/person-circle.svg"></div>
            <div>
              <p class="comentario-usuario">${comment.usuario}</p>
              <p class="comentario-fecha">${comment.fecha}</p>
            </div>
          </div>
          <div class="comentario-stars">
            ${stars}
          </div>
        </div>
        <p class="comentario-texto">${comment.texto}</p>
      </div>
    `;
  });

  container.innerHTML = htmlContent;
}


// esta funcion dibuja las estrellas y marca cuantas estan llenas
function createStarsHtml(score) {
  let s = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= score) {
      s += '<span class="star filled">★</span>';
    } else {
      s += '<span class="star">★</span>';
    }
  }
  return `<div class="comentario-stars">${s}</div>`;
}
