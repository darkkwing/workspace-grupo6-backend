document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const emptyCartMessage = document.getElementById("empty-cart-message");
  const checkoutBtn = document.getElementById("checkout-btn");
  let subtotalGeneral = document.getElementById("subtotal");
  let totalGeneral = document.getElementById("total");
  
  // obtiene carrito del localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  //funcion para mostrar el badge
  function badgeCartRender() {
    let totalUnit = carrito.reduce((acc, p) => acc + (p.cantidad || 1), 0);
    let badgeDesk = document.getElementById("cartBadgeDesktop");
    let badgeMob = document.getElementById("cartBadgeMobile"); 
    [badgeDesk, badgeMob].forEach(badge => {
      if (!badge) return;
      const n = totalUnit > 99 ? "99+" : String(totalUnit);
      if (totalUnit > 0) {
        badge.setAttribute("data-count", n); 
      } else {
        badge.removeAttribute("data-count");
      }
    });
  }

  if (!cartContainer) {
    badgeCartRender();
    window.addEventListener("storage", (e) => { if (e.key === "carrito") badgeCartRender(); });
    return;
  }

  // Calcula y actualiza los costos
  function actualizarCostos() {
    // Calcular subtotal
    let subtotal = carrito.reduce((acc, p) => acc + (p.costo * p.cantidad), 0);
    
    // Obtener tipo de envío seleccionado
    let tipoEnvio = document.querySelector('input[name="shipping"]:checked');
    let porcentajeEnvio = 0;
    
    if (tipoEnvio) {
      switch(tipoEnvio.value) {
        case 'premium':
          porcentajeEnvio = 0.15;
          break;
        case 'express':
          porcentajeEnvio = 0.07;
          break;
        case 'standard':
          porcentajeEnvio = 0.05;
          break;
      }
    }
    
    // Calcular costo de envío
    let costoEnvio = subtotal * porcentajeEnvio;
    
    // Calcular total
    let total = subtotal + costoEnvio;
    
    // Actualizar la interfaz
    subtotalGeneral.textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("shipping").textContent = `$${costoEnvio.toFixed(2)}`;
    totalGeneral.textContent = `$${total.toFixed(2)}`;
  }

  // Muestra el carrito
  function renderCart() {
    cartContainer.innerHTML = "";

    if (carrito.length === 0) {
      emptyCartMessage.style.display = "block";
      document.getElementById("cart-summary").style.display = "none";
      badgeCartRender();
      return;
    } else {
      emptyCartMessage.style.display = "none";
      document.getElementById("cart-summary").style.display = "block";
    }

    carrito.forEach((producto) => {
      const item = document.createElement("div");
      item.classList.add("cart-item");

      item.innerHTML = `
        <img src="${producto.imagen || 'img/default.jpg'}" alt="${producto.nombre}">
        <div class="cart-item-info">
          <h4>${producto.nombre}</h4>
          <p>Precio: ${producto.moneda} ${producto.costo}</p>
          <label>Cantidad:
          <input type="number" min="1" value="${producto.cantidad}" class="cantidad-input" data-index="${carrito.indexOf(producto)}"></label>
          <p>Subtotal: <span class="subtotal-text">${producto.moneda} ${(producto.costo * producto.cantidad).toFixed(2)}</span></p>
        </div>
      `;

      cartContainer.appendChild(item);
    });
  
    // Actualizar costos
    actualizarCostos();

    // Detecta cambios en las cantidades
    let inputs = document.querySelectorAll(".cantidad-input");
    inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        let index = e.target.dataset.index;
        let nuevaCantidad = parseInt(e.target.value) || 1;
        carrito[index].cantidad = nuevaCantidad;
        carrito[index].subtotal = carrito[index].costo * nuevaCantidad;

        // Guarda cambios en localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));

        // actualiza el badge
        badgeCartRender();

        // Vuelve a renderizar para actualizar todo
        renderCart();
      });
    });
  }

  // Finaliza compra
  checkoutBtn.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    alert("Gracias por tu compra 🛒");
    localStorage.removeItem("carrito");
    carrito = [];
    renderCart();
    badgeCartRender();
  });

  renderCart();
  badgeCartRender();
  
  // Añadir listeners a los radio buttons de envío
  document.addEventListener("change", (e) => {
    if (e.target.name === "shipping") {
      actualizarCostos();
    }
  });

  //para que funcione en las otros html
  window.addEventListener("storage", (e) => {
    if (e.key === "carrito") {
      carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      renderCart();
      badgeCartRender();
    }
  });
});