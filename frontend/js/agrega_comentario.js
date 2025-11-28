document.addEventListener("DOMContentLoaded", () => {
  let productId = localStorage.getItem("selectedProductID");
  let container = document.getElementById("comentarios-container");
  let submitBtn = document.querySelector(".btn-submit");
  let cancelBtn = document.querySelector(".btn-cancel");
  let textarea = document.querySelector(".comment");
  let starsInput = document.getElementsByName("qualification");


  //funcion que genera las estrellas
function generarEstrellas(score) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
      html += `<span class="star ${i <= score ? "filled" : ""}">★</span>`;
    }
    return html;
  }
  //funcion para mostrar comentarios en pantalla
  function mostrarComentarios(comments) {
    container.innerHTML = "";

    comments.forEach(c => {
      let stars = generarEstrellas(parseInt(c.score));
      let nombre = c.user || "Usuario";
      let fecha = c.dateTime;

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
            <div class="comentario-stars">${stars}</div>
          </div>
          <p class="comentario-texto">${c.description}</p>
        </div>
      `
      );
    });
  }

  //traigo los comentarios del json oficial, este pedacito costo hacerlo andar
async function cargarComentarios() {
    try {
      const response = await fetch(`http://localhost:3000/comments/${productId}`);
      const data = await response.json();

      if (data.status === "ok") {
        mostrarComentarios(data.comments);
      } else {
        console.error("Error cargando comentarios");
      }

    } catch (e) {
      console.error("Error:", e);
    }
  }

  cargarComentarios();


  submitBtn.addEventListener("click", async () => {

    let desc = textarea.value.trim();
    if (!desc) return alert("Debes escribir un comentario.");

    let valor = document.querySelector('input[name="qualification"]:checked');
    if (!valor) return alert("Por favor selecciona una calificación");

    const puntuacion = parseInt(valor.value);

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Debes estar logueado para agregar un comentario.");
      return;
    }

    const body = {
      id_producto: productId,
      puntuacion,
      texto: desc,
    };

    try {
      const response = await fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.status === "ok") {
        textarea.value = "";
        starsInput.forEach(s => s.checked = false);

        alert("Comentario agregado con éxito.");
        cargarComentarios();

      } else {
        alert("Error al agregar el comentario");
      }

    } catch (e) {
      console.error("Error:", e);
      alert("Error al conectarse al servidor");
    }
  });


  cancelBtn.addEventListener("click", () => {
    textarea.value = "";
    starsInput.forEach((s) => (s.checked = false));
  });
});
