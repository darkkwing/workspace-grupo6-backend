document.addEventListener("DOMContentLoaded", () => {

  //filtra y muestra productos según la marca
  function filtrarPorMarca(brand) {
    if (!brand) {
      createList(visibleProducts);  //si no hay marca seleccionada muestra todo
    }else{
    const filtrado = visibleProducts.filter(p => p.brand === brand); //si hay marca seleccionada filtra los productos visibles con esa marca y los agrega al array filtrados
    createList(filtrado);   //muestra la lista con los filtrados
    };
  };

  //escucha cambios en el select del body
  if (filterEl) {      //para evitar errores corroboramos que existe la variable
    filterEl.addEventListener("change", (e) => {   //escuchamos el cambio
      filtrarPorMarca(e.target.value);             //ejecutamos la funcion usando de parametro el valor ingresado, osea la marca elegida
    });
  }

  //escucha cambios en el select del nav (menu hamburguesa)
  if (filterNav) {
    filterNav.addEventListener("change", (e) => {    //lo mismo que el if de arriba pero para el menu hamburguesa en mobile
      filtrarPorMarca(e.target.value);
    });
  }

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

  
  //Agregar eventos a los botones de orden
  const sortAscBtn = document.getElementById("sortAsc");
  const sortDescBtn = document.getElementById("sortDesc");
  const sortRelBtn = document.getElementById("sortRel");

  if (sortAscBtn) {
    sortAscBtn.addEventListener("click", () => {
      visibleProducts.sort(sortByPriceAsc);
      createList(visibleProducts);
    });
  }

  if (sortDescBtn) {
    sortDescBtn.addEventListener("click", () => {
      visibleProducts.sort(sortByPriceDesc);
      createList(visibleProducts);
    });
  }

  if (sortRelBtn) {
    sortRelBtn.addEventListener("click", () => {
      visibleProducts.sort(sortByRelevance);
      createList(visibleProducts);
    });
  }

});


//Funciones de ordenamiento 
function sortByPriceAsc(a, b) {
  return a.costNum - b.costNum;
}

function sortByPriceDesc(a, b) {
  return b.costNum - a.costNum;
}

function sortByRelevance(a, b) {
  return b.soldCount - a.soldCount;
}



