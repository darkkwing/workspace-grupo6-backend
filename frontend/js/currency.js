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

// esto es para el switch
document.addEventListener("DOMContentLoaded", () => {
  const switchBtn = document.getElementById("currencySwitch");
  if (!switchBtn) return;

  currentCurrency = "USD";

  switchBtn.addEventListener("click", () => {
    switchBtn.classList.toggle("active");

    currentCurrency = switchBtn.classList.contains("active") ? "UYU" : "USD";

    // dispara el avento para llamar el carrito
    document.dispatchEvent(
      new CustomEvent("currencyChange", {
        detail: { currency: currentCurrency }
      })
    );
  });
});
