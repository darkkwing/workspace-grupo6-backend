// cotizacion que se usara
const USD_TO_UYU = 40;

let currentCurrency = "USD";

//asi lo usaremos en el resto de la app
function getCurrentCurrency() {
  return currentCurrency;
}

// aqui convertimos de una moneda a la otra
function convertCurrency(amount, from, to) {
  // si la monedas son iguales no se hace conversion
  if (!from || !to || from === to) return amount;
  // de dolar a peso uruguayo
  if (from === "USD" && to === "UYU") {
    return amount * USD_TO_UYU;
  }
 // de peso uruguayo a dolar
  if (from === "UYU" && to === "USD") {
    return amount / USD_TO_UYU;
  }

  return amount;
}

// limpia valores para el backend 
function cleanCurrency(value) {
  if (!value) return 0;

  // quita símbolos, letras y comas
  const cleaned = String(value).replace(/[^0-9.-]/g, "");

  return Number(cleaned) || 0;
}

// esto es para el switch 
document.addEventListener("DOMContentLoaded", () => {
  const switchBtn = document.getElementById("currencySwitch");
  if (!switchBtn) return;

  currentCurrency = "USD";

  switchBtn.addEventListener("click", () => {
    switchBtn.classList.toggle("active");

    currentCurrency = switchBtn.classList.contains("active")
      ? "UYU"
      : "USD";

    // aviso al carrito que cambió la moneda
    document.dispatchEvent(
      new CustomEvent("currencyChange", {
        detail: { currency: currentCurrency }
      })
    );
  });
});

// exportar funciones globalmente si hace falta
window.getCurrentCurrency = getCurrentCurrency;
window.convertCurrency = convertCurrency;
window.cleanCurrency = cleanCurrency;
