document.addEventListener("DOMContentLoaded", () => {

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");

  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (!emailValue || !passwordValue) {
      alert("Ingresa tu correo electrónico y contraseña.");
      return;
    }

    // enviar solicitud de login al servidor
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue, password: passwordValue })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Credenciales incorrectas");
        return;
      }

      // guardar datos en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("logueado", "true");
      localStorage.setItem("user", JSON.stringify(data.user));

      // redirigir a la página principal
      window.location.href = "index.html";

    } catch (err) {
      console.error(err);
      alert("Error al conectar con el servidor.");
    }
  });

  registerBtn.addEventListener("click", () => {
    window.location.href = "register.html";
  });

});
