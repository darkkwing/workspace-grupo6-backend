// actualizar imagen del header con la del perfil
document.addEventListener("DOMContentLoaded", () => {
  const userImg = document.getElementById("user-profile-img");
  const userInfo = document.getElementById("user-info");

  const imagenPorDefecto = "img/person-circle.svg";
  const logueado = localStorage.getItem("logueado") === "true";
  const usuario = JSON.parse(localStorage.getItem("user"));

  if (!userImg || !userInfo) return;
  
  //usuario logueado
  if (logueado && usuario) {
    userImg.src = usuario.imagenPerfil || imagenPorDefecto;

    const nombreCompleto = `${usuario.nombre || ""} ${usuario.apellido || ""}`.trim();
    userInfo.textContent = nombreCompleto || usuario.email || "Usuario";
  } else {
    userImg.src = imagenPorDefecto;
    userInfo.textContent = "Invitado";
  }
});

// actualizar avatar dinámicamente
window.addEventListener("storage", (e) => {
  if (e.key === "user") {
    const userImg = document.getElementById("user-profile-img");
    if (!userImg) return;

    const nuevoUsuario = JSON.parse(e.newValue);
    userImg.src = nuevoUsuario?.imagenPerfil || "img/person-circle.svg";
  }
});
