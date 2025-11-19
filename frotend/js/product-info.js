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
  const codigoProducto = "prod" + product.id;
  const images = [1, 2, 3, 4].map(i => `img/${codigoProducto}_${i}.jpg`);

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

  //funcionalidad boton comprar
  const botonComprar = document.getElementById("btn-comprar");  //trae el boton
  //escucha el click y guarda los datos del producto
  botonComprar.addEventListener("click", () => {
    const nombre = product.name;
    const costo = product.cost;
    const moneda = product.currency;
    const imagen = product.images?.[0] || "";
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
    //verifica si existe en el local y sino crea el array para guaradr los productos a los que le den comprar
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existente = carrito.find(p => p.nombre === productoSeleccionado.nombre);
    //si existe el producto en el local agrega uno e incrementa el subtotal
    if (existente) {
      existente.cantidad += cantidad;
      existente.subtotal = existente.costo * existente.cantidad;
    } else {
      carrito.push(productoSeleccionado); //si no existe agrega el producto al array
    }

    localStorage.setItem("carrito", JSON.stringify(carrito)); //guarda el carrito actualizado en local
    window.location.href = "cart.html"; //redirige a la pagina del carrito
  });

  //galeria
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
          <img id="imagenPrincipal" src="${images[0]}" alt="${product.name}">
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

  //
  if (typeof mq.addEventListener === "function") mq.addEventListener("change", handleModeChange);
  else if (typeof mq.addListener === "function") mq.addListener(handleModeChange);


  // cambiar imagen
  function cambiarImagen(elemento) {
    const gallery = elemento.closest(".galeria");
    const mainImg = gallery ? gallery.querySelector(".imagen-medio img") : null;
    if (mainImg) mainImg.src = elemento.src;
  }

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

// mostrar los comentarios cuando termina de cargar la pagina
document.addEventListener("DOMContentLoaded", function () {
  // busca el id del producto seleccionado en el localstorage
  let productId = localStorage.getItem("selectedProductID");
  // busca los comentarios en el json
  const commentsURL = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;
  // pedir los comentarios
  fetch(commentsURL)
    .then(response => response.json())
    .then(comments => {
      // llama la funcion que muestra los comentarios
      mostrarComentarios(comments);
    })
    .catch(error => console.error("Error cargando comentarios:", error));
});

// funcion que muestra los comentarios
function mostrarComentarios(comments) {
  // busca el contenedor donde van los comentarios
  const container = document.getElementById("comentarios-container");
  if (!container) return;
  let htmlContent = "";

  // recorre los comentarios recibidos
  comments.forEach(comment => {
    // puntuacion del comentario
    const score = parseInt(comment.score) || 0;
    // crear estrellas segun puntuacion
    const stars = createStarsHtml(score);
    // bloque html del comentario
    htmlContent += `
      <div class="comentario">
        <div class="comentario-header">
          <div class="comentario-user">
            <div class="user-icon"><img src="img/person-circle.svg"></div>
            <div>
              <p class="comentario-usuario">${comment.user}</p>
              <p class="comentario-fecha">${comment.dateTime}</p>
            </div>
          </div>
          <div class="comentario-stars">
            ${stars}
          </div>
        </div>
        <p class="comentario-texto">${comment.description}</p>
      </div>
    `;
  });
  // insertar comentarios en el html
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