async function finishBuyBackend() {
  try {
    if (!TOKEN) {
      alert("Tenés que iniciar sesión para comprar.");
      return;
    }

    // capturar valores numéricos
    const subtotalNum = cleanCurrency(subtotalGeneral.textContent);
    const envioNum = cleanCurrency(shippingCost.textContent);
    const totalNum = cleanCurrency(totalGeneral.textContent);
    const moneda = getCurrentCurrency();

    // armar orden
    const ordenData = {
      productos: carrito,
      shippingType: document.querySelector('input[name="shipping"]:checked')?.value,
      paymentMethod: document.querySelector('input[name="payment"]:checked')?.value,

      direccion: {
        departamento: document.querySelector('#shippingAddress input[placeholder="Departamento"]').value,
        localidad: document.querySelector('#shippingAddress input[placeholder="Localidad"]').value,
        calle: document.querySelector('#shippingAddress input[placeholder="Calle"]').value,
        numero: document.querySelector('#shippingAddress input[placeholder="Número"]').value,
        esquina: document.querySelector('#shippingAddress input[placeholder="Esquina"]').value
      },

      subtotal: subtotalNum,
      envio: envioNum,
      total: totalNum,
      moneda: moneda
    };

    // enviar al backend
    const res = await fetch(`${API_URL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN
      },
      body: JSON.stringify(ordenData)
    });

    const data = await res.json();

    if (!data.success) {
      alert("Error procesando la compra en el backend.");
      return;
    }

    alert("¡Su compra fue procesada con éxito!");

    // limpiar carrito local
    localStorage.removeItem("carrito");
    carrito = [];


    // redirigir a home
    setTimeout(() => {
      window.location.reload();
    }, 1500);

  } catch (error) {
    console.error("Error finalizando compra:", error);
    alert("Error inesperado al finalizar la compra.");
  }
}
