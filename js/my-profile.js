// cambiar foto
const foto = document.getElementById('fotoPerfil');
const inputFoto = document.getElementById('inputFoto');
const imagenPorDefecto = 'img/img_perfil.png';

// cargar imagen del usuario
let datosUsuario = {};
if (usuario) {
    datosUsuario = JSON.parse(localStorage.getItem(usuario)) || {};
    foto.src = datosUsuario.imagenPerfil || imagenPorDefecto;

    // Cargar los valores del perfil si existen
  const campos = ["nombre", "apellido", "telefono", "email"];
  campos.forEach((campo) => {
    const input = document.getElementById(campo);
    if (input) {
      input.value = datosUsuario[campo] || "";
      // El email no se edita manualmente
      if (campo === "email") input.disabled = true;
    }
  });
} else {
    foto.src = imagenPorDefecto;
    console.warn(" No hay usuario logueado.");
}

// cambiar imagen
foto.addEventListener('click', () => inputFoto.click());

inputFoto.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        foto.src = reader.result;

        // guardar imagen en datos del usuario
        if (usuario) {
            datosUsuario.imagenPerfil = reader.result;
            localStorage.setItem(usuario, JSON.stringify(datosUsuario));
        }
    };
    reader.readAsDataURL(file);
});

// datos
document.addEventListener('DOMContentLoaded', () => {
    const btnEditar = document.getElementById('btnEditar');
    const inputs = document.querySelectorAll('.perfil-info input');

    
    btnEditar.addEventListener("click", () => {
    const isEditing = btnEditar.textContent === "Guardar";

    if (isEditing) {
      //  Guardar cambios dentro del objeto del usuario
      ["nombre", "apellido", "telefono"].forEach((campo) => {
        const el = document.getElementById(campo);
        if (el) datosUsuario[campo] = el.value.trim();
    });

         // Guardar el objeto completo del usuario
        if (usuario) {
            localStorage.setItem(usuario, JSON.stringify(datosUsuario));
        }
    }

    // Alternar entre edición y solo lectura
    inputs.forEach((input) => {
      if (input.id === "email") {
        input.disabled = true;
      } else {
        input.disabled = isEditing ? true : false;
      }
    });

    btnEditar.textContent = isEditing ? "Editar" : "Guardar";
  });
});


    // correo
    const spanCorreo = document.getElementById('user-info');
    const inputCorreo = document.getElementById('email');
    const verificarCorreo = setInterval(() => {
        const correo = spanCorreo?.textContent?.trim();
        if (correo && correo.includes('@')) {
            if (inputCorreo) inputCorreo.value = correo;
            clearInterval(verificarCorreo);
        }
    }, 300);

// que solo se permitan numeros en el campo del telefono
const inputTelefono = document.getElementById('telefono');
if (inputTelefono) {
    inputTelefono.addEventListener('input', () => {
        inputTelefono.value = inputTelefono.value.replace(/[^0-9]/g, '');
    });
}