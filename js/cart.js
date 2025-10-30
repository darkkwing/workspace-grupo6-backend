document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const emptyCartMessage = document.getElementById("empty-cart-message");
  const checkoutBtn = document.getElementById("checkout-btn");

  // Obtener carrito del localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Mostrar el carrito
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
          <p>Cantidad: ${producto.cantidad}</p>
          <p>Subtotal: ${producto.moneda} ${producto.subtotal}</p>
        </div>
      `;

      cartContainer.appendChild(item);
    });
  }

  // Finalizar compra
  checkoutBtn.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    alert("Gracias por tu compra 🛒");
    localStorage.removeItem("carrito");
    carrito = [];
    renderCart();
  });

  renderCart();
});