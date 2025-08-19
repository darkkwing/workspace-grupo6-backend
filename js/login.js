document.addEventListener("DOMContentLoaded", () => { 

    const form = document.querySelector("form"); 
    const email = document.getElementById("email"); 
    const password = document.getElementById("password");

    form.addEventListener("submit", (e)  => {
        e.preventDefault();

        if(email.value.trim() && password.value.trim()){
            sessionStorage.setItem("logueado", "true"); //Objeto que guarda los datos de inicio de sesión
        }
});

});