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


//  Cerrar sesión (versión mobile / responsive)
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtnMobile = document.getElementById("logoutBtnMobile");

  if (logoutBtnMobile) {
    logoutBtnMobile.addEventListener("click", (e) => {
      e.preventDefault();

      // Obtener el usuario actual
      const usuarioActual = sessionStorage.getItem("usuario");

      // Eliminar solo los datos de sesión
      sessionStorage.removeItem("logueado");
      sessionStorage.removeItem("usuario");

      /* Restablecer imagen del header (versión móvil)
      const fotoHeader = document.getElementById("user-profile-img");
      if (fotoHeader) {
        fotoHeader.src = "img/img_perfil.png";
      }
      */
      // Mantener datos del localStorage del usuario

      // Redirigir al login
      window.location.href = "login.html";
    });
  }
});