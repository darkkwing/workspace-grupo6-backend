document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // limpiar sesión
      localStorage.removeItem("token");
      localStorage.removeItem("logueado");
      localStorage.removeItem("user");

      // redirigir
      window.location.href = "login.html";
    });
  }
});

// versión mobile
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtnMobile = document.getElementById("logoutBtnMobile");

  if (logoutBtnMobile) {
    logoutBtnMobile.addEventListener("click", (e) => {
      e.preventDefault();

      localStorage.removeItem("token");
      localStorage.removeItem("logueado");
      localStorage.removeItem("user");

      window.location.href = "login.html";
    });
  }
});
