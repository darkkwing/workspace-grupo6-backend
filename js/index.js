document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

});

window.addEventListener("load", function () {     //Espera a que cargue el contenido de la ventana
    const loguearse = sessionStorage.getItem("logueado");  //Carga la info de inicio de sesión a la variable "loguearse"

    if (loguearse !== "true") {               //Condición: si no hay info de inicio de sesión
        window.location.href = "login.html";   //Redirige al login para ingresar
    }

    const user = sessionStorage.getItem("usuario");  //Variable a la que se le asigna el valor guardado
    if (user) {                                     //Consulta si el valor existe
        document.getElementById("user-info").innerText = user;  //Imprime el valor en el li designado para ello
    }

});