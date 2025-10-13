document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Obtener el usuario actual
      const usuarioActual = sessionStorage.getItem("usuario");

      // Eliminar solo los datos de sesión
      sessionStorage.removeItem("logueado");
      sessionStorage.removeItem("usuario");

      // Restablecer imagen del header
      const fotoHeader = document.getElementById("fotoPerfil");
      if (fotoHeader) {
        fotoHeader.src = "img/img_perfil.png";
      }

      // No borrar datos del localStorage del usuario
      // Así el perfil se mantiene cuando vuelva a iniciar sesión

      // Redirigir al login
      window.location.href = "login.html";
    });
  }
});
