let productCost = 0;
let productCount = 0;
let comissionPercentage = 0.13;
let MONEY_SYMBOL = "$";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";
let PERCENTAGE_SYMBOL = "%";

let uploadedImages = []; // urls de las imágenes subidas

// Actualizar costos
function updateTotalCosts() {
    document.getElementById("productCostText").innerHTML = MONEY_SYMBOL + productCost;
    document.getElementById("comissionText").innerHTML = Math.round(comissionPercentage * 100) + PERCENTAGE_SYMBOL;
    document.getElementById("totalCostText").innerHTML =
        MONEY_SYMBOL + ((Math.round(productCost * comissionPercentage * 100) / 100) + parseInt(productCost));
}

document.addEventListener("DOMContentLoaded", function () {

    // cambio stock
    document.getElementById("productCountInput").addEventListener("change", function () {
        productCount = this.value;
        updateTotalCosts();
    });

    // cambio precio
    document.getElementById("productCostInput").addEventListener("change", function () {
        productCost = this.value;
        updateTotalCosts();
    });

    // cambio tipo publicación
    document.getElementById("goldradio").addEventListener("change", function () {
        comissionPercentage = 0.13;
        updateTotalCosts();
    });

    document.getElementById("premiumradio").addEventListener("change", function () {
        comissionPercentage = 0.07;
        updateTotalCosts();
    });

    document.getElementById("standardradio").addEventListener("change", function () {
        comissionPercentage = 0.03;
        updateTotalCosts();
    });

    // cambio moneda
    document.getElementById("productCurrency").addEventListener("change", function () {
        MONEY_SYMBOL = this.value === "USD" ? DOLLAR_SYMBOL : PESO_SYMBOL;
        updateTotalCosts();
    });
// dropzone para subir imágenes
    new Dropzone("div#file-upload", {
        url: "http://localhost:3000/products/upload",
        maxFiles: 4,
        acceptedFiles: "image/*",
        addRemoveLinks: true,
        autoProcessQueue: true
    }).on("success", (file, response) => {
        uploadedImages.push(response.url);
    });

   
    document.getElementById("sell-info").addEventListener("submit", async function (e) {
        e.preventDefault();

        let name = document.getElementById("productName");
        let desc = document.getElementById("productDescription");
        let price = document.getElementById("productCostInput");
        let currency = document.getElementById("productCurrency");
        let category = document.getElementById("productCategory");

        let infoMissing = false;

        // limpio estados de error
        name.classList.remove("is-invalid");
        price.classList.remove("is-invalid");
        category.classList.remove("is-invalid");
        currency.classList.remove("is-invalid");   

        // validaciones
        if (name.value === "") { name.classList.add("is-invalid"); infoMissing = true; }
        if (price.value <= 0) { price.classList.add("is-invalid"); infoMissing = true; }
        if (category.value === "") { category.classList.add("is-invalid"); infoMissing = true; }

      
        if (currency.value === "") { 
            currency.classList.add("is-invalid"); 
            infoMissing = true; 
        }

        if (infoMissing) return;

        //post producto
        let response = await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: name.value,
                descripcion: desc.value,
                precio: Number(price.value),
                moneda: currency.value,         
                vendidos: 0,
                imagen: uploadedImages[0] ?? "img/default.png", 
                id_categoria: Number(category.value)
            })
        });

        let result = await response.json();

        if (result.status === "ok") {

          //post imágenes secundarias si hay
            if (uploadedImages.length > 1) {
                await fetch(`http://localhost:3000/products/${result.id_producto}/images`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        imagenes: uploadedImages.slice(1) // solo secundarias
                    })
                });
            }

            document.getElementById("resultSpan").innerText = "Producto publicado con éxito.";
            document.getElementById("alertResult").classList.add("show");

        } else {
            document.getElementById("resultSpan").innerText = "Error al publicar.";
            document.getElementById("alertResult").classList.add("show");
        }
    });
});
