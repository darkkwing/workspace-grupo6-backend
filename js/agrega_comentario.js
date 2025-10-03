document.addEventListener("DOMContentLoaded", function () {
  let submitBtn = document.querySelector(".btn-submit");
  let cancelBtn = document.querySelector(".btn-cancel");
  let textarea = document.querySelector(".comment");
  let stars = document.getElementsByName("qualification");
  let container = document.getElementById("comentarios-container");

  // limpia textarea y estrellas
  function resetForm() {
    textarea.value = "";
    for (let s of stars) s.checked = false;
  }

  // Función para mostrar estrellas
  function generarEstrellas(vote_average) {
    const estrellas = Math.round(vote_average);
    let html = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= estrellas) {
        html += '<span class="star filled">★</span>';
      } else {
        html += '<span class="star">★</span>';
      }
    }
    return html;
  }

  submitBtn.addEventListener("click", function () {
    let desc = textarea.value.trim();
    if (!desc) return;
    const valor = document.querySelector('input[name="qualification"]:checked');
    if (!valor) {
      alert("Por favor, seleccioná una calificación");
      return;
    }

    // generar estrellas
    const estrellasHTML = generarEstrellas(valor.value);

    // nombre y fecha
    let email = sessionStorage.getItem("usuario");
    let nombre = email.split("@")[0];
    let fecha = new Date().toISOString().slice(0, 19).replace("T", " ");

    // arma comentario
    container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="comentario">
        <div class="comentario-header">
          <div class="comentario-user">
            <div class="user-icon"><img src="img/person-circle.svg"></div>
            <div>
              <p class="comentario-usuario">${nombre}</p>
              <p class="comentario-fecha">${fecha}</p>
            </div>
          </div>
          <div class="comentario-stars">
            ${estrellasHTML}
          </div>
        </div>
        <p class="comentario-texto">${desc}</p>
      </div>
    `
    );

    resetForm();
  });

  cancelBtn.addEventListener("click", resetForm);
});
