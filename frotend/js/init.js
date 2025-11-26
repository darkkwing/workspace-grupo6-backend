const CATEGORIES_URL = "http://localhost:3000/categories";
//const CATEGORIES_URL = "http://localhost:3000/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/emercado-api/sell/publish.json";
const PRODUCTS_URL = "http://localhost:3000/products";
//const PRODUCTS_URL = "http://localhost:3000/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "http://localhost:3000/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/emercado-api/products_comments/";
const CART_INFO_URL = "http://localhost:3000/emercado-api/user_cart/";
const CART_BUY_URL = "http://localhost:3000/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  const el = document.getElementById("spinner-wrapper");
  if (el) el.style.display = "block";
}

let hideSpinner = function(){
  const el = document.getElementById("spinner-wrapper");
  if (el) el.style.display = "none";
}


let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}