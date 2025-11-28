document.addEventListener("DOMContentLoaded", () => {

  const usuario = JSON.parse(localStorage.getItem("user"));
  const logueado = sessionStorage.getItem("logueado") === "true";

  if (!logueado || !usuario) {
    window.location = "login.html";
    return;
  }

  const foto = document.getElementById("fotoPerfil");
  const inputFoto = document.getElementById("inputFoto");
  const nombreInput = document.getElementById("nombre");
  const apellidoInput = document.getElementById("apellido");
  const emailInput = document.getElementById("email");
  const telefonoInput = document.getElementById("telefono");
  const editarBtn = document.getElementById("btnEditar");

  // cargar datos
  foto.src = usuario.imagenPerfil || "img/person-circle.svg";
  nombreInput.value = usuario.nombre || "";
  apellidoInput.value = usuario.apellido || "";
  emailInput.value = usuario.email || "";
  telefonoInput.value = usuario.telefono || "";

  // click en foto 
  foto.addEventListener("click", () => inputFoto.click());

  inputFoto.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      foto.src = reader.result;

      // actualizar localStorage 
      usuario.imagenPerfil = reader.result;
      localStorage.setItem("user", JSON.stringify(usuario));

      window.dispatchEvent(new Event("storage"));
    };
    reader.readAsDataURL(file);
  });

  let editando = false;

  editarBtn.addEventListener("click", async () => {
    editando = !editando;

    if (editando) {
      editarBtn.textContent = "Guardar";
      nombreInput.disabled = false;
      apellidoInput.disabled = false;
      telefonoInput.disabled = false;
      inputFoto.disabled = false;
      return;
    }

    // guardar cambios
    const nuevosDatos = {
      nombre: nombreInput.value,
      apellido: apellidoInput.value,
      telefono: telefonoInput.value
    };

    try {
      const response = await fetch(`http://localhost:3000/users/${usuario.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("token")
        },
        body: JSON.stringify(nuevosDatos)
      });

      const data = await response.json();

      if (!data.success) {
        alert("Error al guardar los cambios");
        return;
      }

      // actualizar localStorage
      Object.assign(usuario, nuevosDatos);
      localStorage.setItem("user", JSON.stringify(usuario));

      window.dispatchEvent(new Event("storage"));

      editarBtn.textContent = "Editar";
      nombreInput.disabled = true;
      apellidoInput.disabled = true;
      telefonoInput.disabled = true;
      inputFoto.disabled = true;

      alert("Datos actualizados correctamente");

    } catch (err) {
      console.error(err);
      alert("Error al conectar con el servidor");
    }
  });

  // solo números
  telefonoInput.addEventListener("input", () => {
    telefonoInput.value = telefonoInput.value.replace(/[^0-9]/g, "");
  });

});

