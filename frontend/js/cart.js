// variables compartidas con checkout.js
let subtotalGeneral;
let totalGeneral;
let shippingCost;
window.API_URL = "http://localhost:3000";


document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const emptyCartMessage = document.getElementById("empty-cart-message");
  const checkoutBtn = document.getElementById("checkout-btn");

  subtotalGeneral = document.getElementById("subtotal");
  totalGeneral = document.getElementById("total");
  shippingCost = document.getElementById("shipping");

  // obtiene carrito del localStorage, el backend lo sobreescribe si hace falta
  window.carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // obtiene token para posible carga desde backend
  window.TOKEN = localStorage.getItem("token");

  // funcion para mostrar el badge del carrito
  function badgeCartRender() {
    let totalUnit = carrito.reduce((acc, p) => acc + (p.cantidad || 1), 0);
    let badgeDesk = document.getElementById("cartBadgeDesktop");
    let badgeMob = document.getElementById("cartBadgeMobile");

    [badgeDesk, badgeMob].forEach((badge) => {
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
    window.addEventListener("storage", (e) => {
      if (e.key === "carrito") badgeCartRender();
    });
    return;
  }

  // Calcula y actualiza los costos
  function actualizarCostos() {
    const monedaActual =
      typeof getCurrentCurrency === "function" ? getCurrentCurrency() : "USD";

    // subtotal convertido
    let subtotal = carrito.reduce((acc, p) => {
      const costoConvertido =
        typeof convertCurrency === "function"
          ? convertCurrency(p.costo, p.moneda, monedaActual)
          : p.costo;

      return acc + costoConvertido * p.cantidad;
    }, 0);

    // Obtener tipo de envío seleccionado
    let tipoEnvio = document.querySelector('input[name="shipping"]:checked');
    let porcentajeEnvio = 0;

    if (tipoEnvio) {
      switch (tipoEnvio.value) {
        case "premium":
          porcentajeEnvio = 0.15;
          break;
        case "express":
          porcentajeEnvio = 0.07;
          break;
        case "standard":
          porcentajeEnvio = 0.05;
          break;
      }
    }

    let costoEnvio = subtotal * porcentajeEnvio;
    let total = subtotal + costoEnvio;

    let simbolo = monedaActual === "USD" ? "USD " : "UYU ";

    subtotalGeneral.textContent = `${simbolo}${subtotal.toFixed(2)}`;
    document.getElementById(
      "shipping"
    ).textContent = `${simbolo}${costoEnvio.toFixed(2)}`;
    totalGeneral.textContent = `${simbolo}${total.toFixed(2)}`;
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
        <img src="${producto.imagen || "img/default.jpg"}" alt="${
        producto.nombre
      }">
        <div class="cart-item-info">
          <h4>${producto.nombre}</h4>
          <p>Precio: ${producto.moneda} ${producto.costo}</p>
          <label>Cantidad:
            <input type="number" min="1" value="${
              producto.cantidad
            }" class="cantidad-input" data-index="${carrito.indexOf(producto)}">
          </label>
          <p><span class="subtotal-text">${producto.moneda} ${(
        producto.costo * producto.cantidad
      ).toFixed(2)}</span></p>
          <button class="btn-eliminar" data-index="${carrito.indexOf(
            producto
          )}">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      `;

      cartContainer.appendChild(item);
    });

    actualizarCostos();

    // cambio de cantidad
    document.querySelectorAll(".cantidad-input").forEach((input) => {
      input.addEventListener("input", (e) => {
        let index = e.target.dataset.index;
        let nuevaCantidad = parseInt(e.target.value) || 1;

        carrito[index].cantidad = nuevaCantidad;
        carrito[index].subtotal = carrito[index].costo * nuevaCantidad;

        localStorage.setItem("carrito", JSON.stringify(carrito));

        // sincronizar automáticamente al backend, si existe
        if (typeof syncCartBD === "function") syncCartBD();

        badgeCartRender();
        renderCart();
      });
    });

    // eliminar producto
    document.querySelectorAll(".btn-eliminar").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.currentTarget.dataset.index;

        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        if (typeof syncCartBD === "function") syncCartBD();

        renderCart();
        badgeCartRender();
        actualizarCostos();
      });
    });
  }

  // finalizar compra
  checkoutBtn.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    // validaciones de dirección
    let direccionInputs = document.querySelectorAll("#shippingAddress input");
    let direccionValida = true;
    direccionInputs.forEach((input) => {
      if (input.value.trim() === "") direccionValida = false;
    });
    if (!direccionValida) {
      alert("Completá la dirección de envío.");
      return;
    }

    // tipo de envío
    let shippingType = document.querySelector('input[name="shipping"]:checked');
    if (!shippingType) {
      alert("Elegí cómo querés que te llegue el producto.");
      return;
    }

    // cantidades
    let cantidadesValidas = carrito.every((p) => p.cantidad > 0);
    if (!cantidadesValidas) {
      alert("Los productos deben tener cantidad mayor a 0.");
      return;
    }

    // forma de pago
    let paymentMethod = document.querySelector('input[name="payment"]:checked');
    if (!paymentMethod) {
      alert("Elegí tu forma de pago.");
      return;
    }

    // validaciones del metodo de pago
    let pagoValido = true;

    if (paymentMethod.value === "credit") {
      let creditCardInputs = document.querySelectorAll(
        '#paymentMethod input[placeholder*="tarjeta"], #paymentMethod input[placeholder*="Vencimiento"], #paymentMethod input[placeholder*="CVV"]'
      );
      creditCardInputs.forEach((i) => {
        if (i.value.trim() === "") pagoValido = false;
      });
    } else {
      let transferInputs = document.querySelectorAll(
        '#paymentMethod input[placeholder="Nombre"], #paymentMethod input[placeholder="Institución"], #paymentMethod input[placeholder="Número de cuenta"]'
      );
      transferInputs.forEach((i) => {
        if (i.value.trim() === "") pagoValido = false;
      });
    }

    if (!pagoValido) {
      alert("Completá todos los datos de pago.");
      return;
    }

    // checkout en el backend
    if (typeof finishBuyBackend === "function") {
      finishBuyBackend();
    } else {
      alert("checkout.js no está cargado.");
    }
  });

  // render inicial
  renderCart();
  badgeCartRender();

  // actualizar envio
  document.addEventListener("change", (e) => {
    if (e.target.name === "shipping") actualizarCostos();
  });

  // sincronizar cambios desde otras pestañas
  window.addEventListener("storage", (e) => {
    if (e.key === "carrito") {
      carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      renderCart();
      badgeCartRender();
    }
  });

  // actualizar por cambio de moneda
  document.addEventListener("currencyChange", () => {
    actualizarCostos();
  });
});
