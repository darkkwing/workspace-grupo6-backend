document.addEventListener("DOMContentLoaded", () => {

 //CODIGO PARA FILTRAR POR PRECIO
  const inputMin = document.getElementById("rangeFilterCountMin");
  const inputMax = document.getElementById("rangeFilterCountMax");
  const btnFiltrar = document.getElementById("rangeFilterCount");
  const btnLimpiar = document.getElementById("clearRangeFilter");

  //funcion que filtra productos según min y max
  function filtrarPorPrecio() {
    const min = parseFloat(inputMin.value.replace(/[.,]/g, "")) || null;  //parseFloat convierte de forma estricta el string ingresado a numero, ayuda a evitar errores de comparacion
    const max = parseFloat(inputMax.value.replace(/[.,]/g, "")) || null;  //con replace le saco la coma o punto a lo que ingresa el usuario para que no haya conlflicto en diferenciar cuando es mil

    //filtramos sobre visibleProducts, que ya puede estar filtrado por marca
    let filtrados = visibleProducts;
    
    //condiciones de filtrado
    if (min !== null) {                                     
      filtrados = filtrados.filter(p => p.costNum >= min);  
    }
    if (max !== null) {
      filtrados = filtrados.filter(p => p.costNum <= max);
    }

    createList(filtrados); //crea la lista con los filtrados
  }

  //escucha el boton de filtrar, previene su funcion por defecto y le asigna la funcion que filtra
  if (btnFiltrar) {
    btnFiltrar.addEventListener("click", (e) => {
      e.preventDefault();
      filtrarPorPrecio();
    });
  }

  //escucha el boton de limpiar, previene su funcion por defecto y le asigna la creacion de lista con productos visibles
  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", (e) => {
      e.preventDefault();
      if (inputMin) inputMin.value = ""; //borra los datos ingresados en los inputs
      if (inputMax) inputMax.value = "";
      
      createList(visibleProducts); //mostramos todos los productos visibles actualmente
    });
  };
});



