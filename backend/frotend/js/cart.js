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
    // Obtenemos la moneda actual desde currency.js
   const monedaActual = typeof getCurrentCurrency === "function" ? getCurrentCurrency() : "USD";
    // Calculamos el subtotal en la moneda elegida
    let subtotal = carrito.reduce((acc, p) => {

    const costoConvertido = typeof convertCurrency === "function" ? convertCurrency(p.costo, p.moneda, monedaActual) : p.costo;

    return acc + (costoConvertido * p.cantidad);
  }, 0);

    // Obtener tipo de envío seleccionado
    let tipoEnvio = document.querySelector('input[name="shipping"]:checked');
    let porcentajeEnvio = 0;

    if (tipoEnvio) {
      switch (tipoEnvio.value) {
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

    let simbolo = monedaActual === "USD" ? "USD " : "UYU ";

   subtotalGeneral.textContent = `${simbolo}${subtotal.toFixed(2)}`;
  document.getElementById("shipping").textContent = `${simbolo}${costoEnvio.toFixed(2)}`;
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
        <img src="${producto.imagen || 'img/default.jpg'}" alt="${producto.nombre}">
        <div class="cart-item-info">
          <h4>${producto.nombre}</h4>
          <p>Precio: ${producto.moneda} ${producto.costo}</p>
          <label>Cantidad:
          <input type="number" min="1" value="${producto.cantidad}" class="cantidad-input" data-index="${carrito.indexOf(producto)}"></label>
          <p><span class="subtotal-text">${producto.moneda} ${(producto.costo * producto.cantidad).toFixed(2)}</span></p>
          <button class="btn-eliminar" data-index="${carrito.indexOf(producto)}">
            <i class="bi bi-trash"></i>
          </button>
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

    //botones de eliminar producto 
    let botonesEliminar = document.querySelectorAll(".btn-eliminar"); //trae todos los botones para escucharlos
    botonesEliminar.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.currentTarget.dataset.index;
        carrito.splice(index, 1); //elimina el producto
        localStorage.setItem("carrito", JSON.stringify(carrito)); //actualiza el local
        renderCart(); //vuelve a renderizar todo
        badgeCartRender(); //actualiza el badge
        actualizarCostos(); //recalcula totales
      });
    });
  }

 // Finaliza compra
checkoutBtn.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  // traemos los valores de los formularios
  let shippingType = document.querySelector('input[name="shipping"]:checked');
  let paymentMethod = document.querySelector('input[name="payment"]:checked');
  
  // traemos los inputs de dirección
  let direccionInputs = document.querySelectorAll('#shippingAddress input');
  
  // traemos todos los inputs de pago
  let paymentInputs = document.querySelectorAll('#paymentMethod input[type="text"]');

  // acá validamos que la dirección no esté vacía
  let direccionValida = true;
  direccionInputs.forEach(input => {
    if (input.value.trim() === '') {
      direccionValida = false;
    }
  });

  if (!direccionValida) {
    alert("Eu, completá la dirección de envío.");
    return;
  }

  // validamos que se haya elegido forma de envío
  if (!shippingType) {
    alert("Dale, elegí cómo querés que te llegue el producto.");
    return;
  }

  // validamos que todos los productos tengan cantidad mayor a 0
  let cantidadesValidas = true;
  carrito.forEach(producto => {
    if (!producto.cantidad || producto.cantidad <= 0) {
      cantidadesValidas = false;
    }
  });

  if (!cantidadesValidas) {
    alert("Los productos deben tener cantidad mayor a 0.");
    return;
  }

  // validamos que se haya seleccionado forma de pago
  if (!paymentMethod) {
    alert("Elegí la forma de pago, movete.");
    return;
  }

  // acá validamos que los campos de pago no estén vacíos
  let pagoValido = true;
  const metodoPago = paymentMethod.value;
  
  // si es tarjeta de crédito, validamos esos campos
  if (metodoPago === 'credit') {
    let creditCardInputs = document.querySelectorAll('#paymentMethod input[placeholder*="tarjeta"], #paymentMethod input[placeholder*="Vencimiento"], #paymentMethod input[placeholder*="CVV"]');
    creditCardInputs.forEach(input => {
      if (input.value.trim() === '') {
        pagoValido = false;
      }
    });
  }
  // si es transferencia, validamos esos campos
  else if (metodoPago === 'transfer') {
    let transferInputs = document.querySelectorAll('#paymentMethod input[placeholder="Nombre"], #paymentMethod input[placeholder="Institución"], #paymentMethod input[placeholder="Número de cuenta"]');
    transferInputs.forEach(input => {
      if (input.value.trim() === '') {
        pagoValido = false;
      }
    });
  }

  if (!pagoValido) {
    alert("Completá todos los datos de pago, boludo.");
    return;
  }

  // si llegamos acá, todo está bien y manda el mensaje de éxito
  alert("¡Uyyyy! Tu compra se procesó correctamente! 🎉 \n\nTe vamos a enviar un email con los detalles.");
  
  // limpiamos el carrito
  localStorage.removeItem("carrito");
  carrito = [];
  renderCart();
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

  document.addEventListener("currencyChange", () => {
  actualizarCostos();
});
});
