//verifica que la ID de la categoria siempre sea valida
function getCurrentCatId() {
    let catId = localStorage.getItem("catID");

    let num = Number(catId);

    if (isNaN(num) || num < 101 || num > 109) {
        return "101";
    }

    return String(catId);
};


//aqui con las constantes en init.js las usamos para construir una URL de la API
function buildCategoryUrl(catId) {
    if (typeof PRODUCTS_URL === "undefined") {
        throw new Error("PRODUCTS_URL no definido.");
    }
    return PRODUCTS_URL + "/" + catId;
    //return PRODUCTS_URL + catId + EXT_TYPE;
};

//aca traemos los datos json de las categorias sin procesar desde la API
// es async porque llamamos los datos de los Json en la API
async function fetchCategoryRaw(catId) {
    try {
        if (typeof getJSONData !== "function") {
            throw new Error("getJSONData no disponible.");
        }
        let getUrl = buildCategoryUrl(catId);
        let result = await getJSONData(getUrl)

        if (result.status === "ok") {
            return result.data;
        } else {
            throw new Error("no se pudo cargar categoría con id " + catId);
        }

    } catch (error) {
        console.error(error)
        throw error;

    }
}

//aqui es donde ahora se normalizan los datos para su uso
function normalizeSelectCat(catId, raw) {

    let catName = raw.catName || "Cat " + catId;

    let products = (raw.products || []).map(p => ({
        id: String(p.id),
        name: String(p.name),
        description: String(p.description),
        costNum: Number(p.costNum),
        currency: p.currency || "",
        soldCount: Number(p.soldCount),
        image: p.image,
        brand: String(p.name || "").split(" ")[0]
    }))

    return {
        catId: String(catId),
        catName: catName,
        products: products,
    }
}

//esta funcion es la pieza central
//se encarga de integrar las demas funciones, como resultado tenemos los datos para usar
// es async porque llamamos los datos de los Json en la API
async function fetchCurrentCategory() {

    let currentId = getCurrentCatId();

    try {

        let raw = await fetchCategoryRaw(currentId);
        let normalized = normalizeSelectCat(currentId, raw);
        return normalized

    } catch (error) {
        console.error("problemas con la carga de la categoria actual", error)
        throw error
    }

}