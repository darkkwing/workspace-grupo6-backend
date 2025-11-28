const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../config/db");
const multer = require("multer");

//configurar multer para subir de imágenes
const uploadPath = path.join(__dirname, "..", "..", "frontend", "img", "uploads");

const storage = multer.diskStorage({
    destination: uploadPath,
    filename: (req, file, cb) => {
        const name = Date.now() + path.extname(file.originalname);
        cb(null, name);
    }
});

const upload = multer({ storage });

//subir una imagen
router.post("/upload", upload.single("file"), (req, res) => {
    res.json({
        status: "ok",
        url: `/img/uploads/${req.file.filename}`
    });
});

//obtener info de un producto por id
router.get("/info/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [prodRows] = await db.query(
            "SELECT * FROM producto WHERE id_producto = ?",
            [id]
        );

        if (prodRows.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        const producto = prodRows[0];

        const [imgRows] = await db.query(
            "SELECT url FROM producto_imagen WHERE id_producto = ?",
            [id]
        );

        const [catRows] = await db.query(
            "SELECT nombre FROM categoria WHERE id_categoria = ?",
            [producto.id_categoria]
        );

        const categoria = catRows.length ? catRows[0].nombre : "Sin categoría";

        res.json({
            id: producto.id_producto,
            name: producto.nombre,
            description: producto.descripcion,
            cost: Number(producto.precio),
            currency: producto.moneda,
            soldCount: producto.vendidos,
            category: categoria,
            image: producto.imagen,
            images: [
                producto.imagen,
                ...imgRows.map(i => i.url)
            ]
        });

    } catch (error) {
        console.error("Error obteniendo producto:", error);
        res.status(500).json({ error: "Error obteniendo el producto" });
    }
});

//nuevo producto
router.post("/", async (req, res) => {
    const { nombre, descripcion, precio, moneda, vendidos, imagen, id_categoria } = req.body;

    try {
        const [result] = await db.query(
            "INSERT INTO producto (nombre, descripcion, precio, moneda, vendidos, imagen, id_categoria) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [nombre, descripcion, precio, moneda, vendidos, imagen, id_categoria]
        );

        res.json({
            status: "ok",
            id_producto: result.insertId
        });

    } catch (error) {
        console.error("Error creando producto:", error);
        res.status(500).json({ error: "Error creando producto" });
    }
});

//guardar imágenes secundarias de un producto
router.post("/:id/images", async (req, res) => {
    const { id } = req.params;
    const { imagenes } = req.body;

    try {
        for (let url of imagenes) {
            await db.query(
                "INSERT INTO producto_imagen (id_producto, url) VALUES (?, ?)",
                [id, url]
            );
        }

        res.json({ status: "ok" });

    } catch (error) {
        console.error("Error guardando imágenes secundarias:", error);
        res.status(500).json({ error: "Error guardando imágenes" });
    }
});

//obtener productos por categoria
router.get("/:catID", async (req, res) => {
    const { catID } = req.params;

    try {
        const [catRows] = await db.query(
            "SELECT nombre FROM categoria WHERE id_categoria = ?",
            [catID]
        );

        const catName = catRows.length ? catRows[0].nombre : "Categoría";

        const [prodRows] = await db.query(
            "SELECT * FROM producto WHERE id_categoria = ?",
            [catID]
        );

        const products = prodRows.map((p) => ({
            id: p.id_producto,
            name: p.nombre,
            description: p.descripcion,
            costNum: Number(p.precio),
            currency: p.moneda,
            soldCount: p.vendidos,
            image: p.imagen,
            brand: (p.nombre || "").split(" ")[0]
        }));

        res.json({
            catId: catID,
            catName: catName,
            products: products,
        });

    } catch (error) {
        console.error("Error obteniendo productos:", error);
        res.status(500).json({ error: "Error obteniendo productos" });
    }
});

module.exports = router;
