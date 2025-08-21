document.addEventListener("DOMContentLoaded", () => { // Sirve para que no se ejecute el resto del script a menos que el DOM haya terminado de cargar.
    const form = document.querySelector("form"); // Sirve para seleccionar el primer "form" que haya en la pagina.
    const email = document.getElementById("email"); // Sirve para seleccionar el elemento con el id "email" en la pagina.
    const password = document.getElementById("password") // Sirve para seleccionar el elemento con el id "password" en la pagina.

    form.addEventListener("submit", (e) => { // Sirve para que cuando se aprete el boton se ejecute el codigo.
        e.preventDefault(); // Sirve para que la pagina no se actualice cuando apretamos el boton. Si no la pagina se actualizaria y no te redirigiria a "index.html".

        if (email.value.trim() && password.value.trim()) { // Si los dos campos tienen texto, se redirige al archivo "index.html".
          sessionStorage.setItem("logueado", "true"); //Objeto que guarda los datos de inicio de sesión  
          window.location.href = "index.html"; // Determina a que archivo se redirige si ambos campos tienen texto
        } else { // Si alguno de los dos campos esta vacio se muestra una alerta al usuario.
            alert("Ingresa tu correo electrónico y contraseña."); // Alerta.
        }
    });
});