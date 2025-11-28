// actualizar imagen del header con la del perfil
document.addEventListener("DOMContentLoaded", () => {
  //const usuario = sessionStorage.getItem("usuario");
  const userImg = document.getElementById("user-profile-img"); // imagen en el header
  const userInfo = document.getElementById("user-info");
  const imagenPorDefecto = "img/person-circle.svg";

  const logueado = sessionStorage.getItem("logueado") === "true";
  const usuario = JSON.parse(localStorage.getItem("user"));

  if (userImg && userInfo) {
    // solo si existe el header
    if (logueado && usuario) {
      //foto de perfil
      userImg.src = usuario.imagenPerfil || imagenPorDefecto;
      // mostrar nombre y apellido si hay, sino email
      const nombreCompleto = `${usuario.nombre || ""} ${
        usuario.apellido || ""
      }`.trim();
      userInfo.textContent = nombreCompleto || usuario.email || "Usuario";
    } else {
      userImg.src = imagenPorDefecto;
      userInfo.textContent = "Invitado";
    }

    // if (usuario) {
    //   const datosUsuario = JSON.parse(localStorage.getItem(usuario)) || {};
    //   const imagenPerfil = datosUsuario.imagenPerfil || imagenPorDefecto;
    //   userImg.src = imagenPerfil;
    //   userInfo.textContent = datosUsuario.email || datosUsuario.nombre || usuario;
    // }
  }
});

// escuchar cambios en localStorage (por ejemplo, cuando se cambia la foto)
window.addEventListener("storage", (e) => {
  if (e.key === "user") {
    const userImg = document.getElementById("user-profile-img");
    if (userImg) {
      const nuevoUsuario = JSON.parse(e.newValue);
      if (nuevoUsuario?.imagenPerfil) {
        userImg.src = nuevoUsuario.imagenPerfil;
      }
    }
  }
});
