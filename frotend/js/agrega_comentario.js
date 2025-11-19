document.addEventListener("DOMContentLoaded", () => {
  let container = document.getElementById("comentarios-container");
  let submitBtn = document.querySelector(".btn-submit");
  let cancelBtn = document.querySelector(".btn-cancel");
  let textarea = document.querySelector(".comment");
  let starsInput = document.getElementsByName("qualification");

  //agarro el id del producto y comentarios del bootstrap
  let productId = localStorage.getItem("selectedProductID");
  let commentsURL = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;

  //aca voy a guardar los comentarios que vienen del json y locales
  let jsonComments = [];
  let localComments = JSON.parse(localStorage.getItem(`comments_${productId}`)) || [];

  //funcion que genera las estrellas
  function generarEstrellas(score) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= score) {
        html += '<span class="star filled">★</span>';
      } else {
        html += '<span class="star">★</span>';
      }
    }
    return html;
  }

  //funcion para mostrar comentarios en pantalla
  function mostrarComentarios(comments) {
    container.innerHTML = "";
    comments.forEach(c => {
      let stars = generarEstrellas(parseInt(c.score || 0)); //calculo las estrellas
      let nombre = c.user || "Tú"; //nombre del usuario
      let fecha = c.dateTime || new Date().toISOString().slice(0,19).replace("T"," "); //fecha actual
      let desc = c.description || ""; //descripcion del comentario

      //formato del comentario
      container.insertAdjacentHTML("beforeend", `
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
          <p class="comentario-texto">${desc}</p>
        </div>
      `);
    });
  }

  //traigo los comentarios del json oficial, este pedacito costo hacerlo andar
  fetch(commentsURL)
    .then(r => r.json())
    .then(c => {
      jsonComments = c;
      mostrarComentarios([...jsonComments, ...localComments]); //muestro todos juntos
    })
    .catch(e => console.log("Error comentarios", e));


  submitBtn.addEventListener("click", () => {
    let desc = textarea.value.trim();
    if (!desc) return;
    let valor = document.querySelector('input[name="qualification"]:checked');
    if (!valor) { 
      alert("Por favor selecciona una calificación"); 
      return; 
    }

    let email = sessionStorage.getItem("usuario"); //agarro el usuario logueado
    let nombre = email.split("@")[0]; //saco el nombre del email
    let fecha = new Date().toISOString().slice(0,19).replace("T"," "); //fecha actual
    let score = parseInt(valor.value); //valor de la estrella


    //creo el comentario nuevo y lo agrego a mis comentarios locales
    let newComment = { user: nombre, dateTime: fecha, description: desc, score: score };
    localComments.push(newComment);
    localStorage.setItem(`comments_${productId}`, JSON.stringify(localComments));

    //muestro todos otra vez
    mostrarComentarios([...jsonComments, ...localComments]);

    //limpio el form
    textarea.value = "";
    starsInput.forEach(s => s.checked = false);
  });

  cancelBtn.addEventListener("click", () => {
    textarea.value = "";
    starsInput.forEach(s => s.checked = false);
  });
});
