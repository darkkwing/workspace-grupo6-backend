document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const emptyCartMessage = document.getElementById("empty-cart-message");
  const checkoutBtn = document.getElementById("checkout-btn");
  let subtotalGeneral = document.getElementById("subtotal");
  let totalGeneral = document.getElementById("total");
  
  // Obtiene carrito del localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Muestra el carrito
  function renderCart() {
    cartContainer.innerHTML = "";

    if (carrito.length === 0) {
      emptyCartMessage.style.display = "block";
      document.getElementById("cart-summary").style.display = "none";
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
          <p>Subtotal: <span class="subtotal-text">${producto.moneda} ${producto.costo * producto.cantidad}</span></p>
        </div>
      `;

      cartContainer.appendChild(item);
    });
  
    // Actualizar resumen general
    let total = carrito.reduce((acc, p) => acc + (p.costo * p.cantidad), 0);
    subtotalGeneral.textContent = `$${total}`;
    totalGeneral.textContent = `$${total}`;

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
        badgeCart();

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
    badgeCart();
  });

  function badgeCart() {
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

  renderCart();
  badgeCart();
});
