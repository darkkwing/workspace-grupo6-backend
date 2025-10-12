// cambiar foto
const foto = document.getElementById('fotoPerfil');
const inputFoto = document.getElementById('inputFoto');
const imagenPorDefecto = 'img/person_circle.svg';

foto.addEventListener('click', () => inputFoto.click());

inputFoto.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => foto.src = reader.result;
        reader.readAsDataURL(file);
    } else {
        foto.src = imagenPorDefecto;
    }
});

// datos
document.addEventListener('DOMContentLoaded', () => {
    const btnEditar = document.getElementById('btnEditar');
    const inputs = document.querySelectorAll('.perfil-info input');
    const campos = ['nombre', 'apellido', 'telefono'];

    // cargar los valores guardados
    campos.forEach(campo => {
        const valorGuardado = localStorage.getItem(campo);
        if (valorGuardado !== null) {
            const el = document.getElementById(campo);
            if (el) el.value = valorGuardado;
        }
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

    // editar y guardar
    btnEditar.addEventListener('click', () => {
        const isEditing = btnEditar.textContent === 'Guardar';
        if (isEditing) {
            campos.forEach(campo => {
                const el = document.getElementById(campo);
                if (el) {
                    const valor = el.value.trim();
                    localStorage.setItem(campo, valor);
                }
            });
        }
        inputs.forEach(input => {
            if (input.id === 'email') {
                input.disabled = true;
            } else {
                input.disabled = isEditing ? true : false;
            }
        });
        btnEditar.textContent = isEditing ? 'Editar' : 'Guardar';
    });
});

// que solo se permitan numeros en el campo del telefono
const inputTelefono = document.getElementById('telefono');
if (inputTelefono) {
    inputTelefono.addEventListener('input', () => {
        inputTelefono.value = inputTelefono.value.replace(/[^0-9]/g, '');
    });
}