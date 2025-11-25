document.addEventListener("DOMContentLoaded", () => {
  // Sirve para que no se ejecute el resto del script a menos que el DOM haya terminado de cargar.
if (!sessionStorage.getItem("refreshedLogin")) {
  sessionStorage.setItem("refreshedLogin", "true");
  setTimeout(() => location.reload(), 10);
  return;
}


  const form = document.querySelector("form"); // Sirve para seleccionar el primer "form" que haya en la pagina.
  const email = document.getElementById("email"); // Sirve para seleccionar el elemento con el id "email" en la pagina.
  const password = document.getElementById("password"); // Sirve para seleccionar el elemento con el id "password" en la pagina.
  let registerBtn = document.getElementById("register-btn");

  form.addEventListener("submit", async (e) => {
    // Sirve para que cuando se aprete el boton se ejecute el codigo.
    e.preventDefault(); // Sirve para que la pagina no se actualice cuando apretamos el boton. Si no la pagina se actualizaria y no te redirigiria a "index.html".

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (!emailValue || !passwordValue) {
      alert("Ingresa tu correo electrónico y contraseña.");
      return;
    }

    try {
      // hacre post al backend
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      });

      const data = await response.json();

      // si la api devuelve error
      if (!response.ok) {
        alert(data.error || "Credenciales incorrectas");
        return;
      }

      // guarda el token en el session
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("logueado", "true");
      sessionStorage.setItem("usuario", emailValue);

      // crea entrada en local si no existe
      if (!localStorage.getItem(emailValue)) {
        const datosUsuario = {
          email: emailValue,
          imagenPerfil: null,
        };
        localStorage.setItem(emailValue, JSON.stringify(datosUsuario));
      }

      window.location.href = "index.html"; // Determina a que archivo se redirige si ambos campos tienen texto
    } catch (err) {
      alert("Error al conectar con el servidor.");
      console.error(err);
    }
  });

  if (registerBtn) {
    registerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "register.html";
    });
  }
});
