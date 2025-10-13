
// actualizar imagen del header con la del perfil
document.addEventListener('DOMContentLoaded', () => {
  const usuario = sessionStorage.getItem("usuario");
  const userImg = document.getElementById("user-profile-img"); // imagen en el header
  const userInfo = document.getElementById("user-info");
  const imagenPorDefecto = "img/img_perfil.png";

  if (userImg) { // solo si existe el header
    if (usuario) {
      const datosUsuario = JSON.parse(localStorage.getItem(usuario)) || {};
      const imagenPerfil = datosUsuario.imagenPerfil || imagenPorDefecto;
      userImg.src = imagenPerfil;
      userInfo.textContent = datosUsuario.email || datosUsuario.nombre || usuario;
    } else {
      userImg.src = imagenPorDefecto;
      userInfo.textContent = "Invitado";
    }
  }
});

// escuchar cambios en localStorage (por ejemplo, cuando se cambia la foto)
window.addEventListener("storage", (e) => {
  if (e.key === sessionStorage.getItem("usuario")) {
    const userImg = document.getElementById("user-profile-img");
    if (userImg) {
      const nuevoUsuario = JSON.parse(e.newValue);
      if (nuevoUsuario?.imagenPerfil) {
        userImg.src = nuevoUsuario.imagenPerfil;
      }
    }
  }
  });
