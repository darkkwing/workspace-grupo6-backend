const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");


//inicializa carrito si usuario existe
router.post("/init", authMiddleware, async (req, res) => {
    const userId = req.user.id; // viene del token

    try {
        // verificar si el usuario ya tiene un carrito
        const [rows] = await db.query(
            "SELECT id_carrito FROM carrito WHERE id_usuario = ?",
            [userId]
        );

        if (rows.length > 0) {
            return res.json({
                status: "ok",
                id_carrito: rows[0].id_carrito
            });
        }

        // crear nuevo carrito
        const [result] = await db.query(
            "INSERT INTO carrito (id_usuario) VALUES (?)",
            [userId]
        );

        res.json({
            status: "ok",
            id_carrito: result.insertId
        });

    } catch (error) {
        console.error("Error INIT carrito:", error);
        res.status(500).json({ error: "Error al inicializar carrito" });
    }
});


//obtener carrito del usuario
router.get("/", authMiddleware, async (req, res) => {
    const userId = req.user.id;

    try {
        // buscar carrito del usuario
        const [rows] = await db.query(
            "SELECT id_carrito FROM carrito WHERE id_usuario = ?",
            [userId]
        );

        if (rows.length === 0) {
            return res.json({ productos: [] });
        }

        const idCarrito = rows[0].id_carrito;

        // obtener productos del carrito
        const [items] = await db.query(
            `SELECT cp.id_producto, cp.cantidad, cp.subtotal,
                    p.nombre, p.precio, p.moneda, p.imagen
             FROM carritoproducto cp
             JOIN producto p ON p.id_producto = cp.id_producto
             WHERE cp.id_carrito = ?`,
            [idCarrito]
        );

        res.json({
            id_carrito: idCarrito,
            productos: items
        });

    } catch (error) {
        console.error("Error GET carrito:", error);
        res.status(500).json({ error: "Error obteniendo carrito" });
    }
});


//agregar producto al carrito
router.post("/add", authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { id_producto, cantidad } = req.body;

    if (!id_producto || !cantidad) {
        return res.status(400).json({ error: "Datos insuficientes" });
    }

    try {
        // verificar carrito
        const [rows] = await db.query(
            "SELECT id_carrito FROM carrito WHERE id_usuario = ?",
            [userId]
        );

        if (rows.length === 0) return res.status(400).json({ error: "Carrito no existe" });

        const idCarrito = rows[0].id_carrito;

        // verificar si el producto ya existe en carrito
        const [exist] = await db.query(
            "SELECT cantidad FROM carritoproducto WHERE id_carrito = ? AND id_producto = ?",
            [idCarrito, id_producto]
        );

        if (exist.length === 0) {
            // insertar producto nuevo
            await db.query(
                "INSERT INTO carritoproducto (id_carrito, id_producto, cantidad, subtotal) VALUES (?, ?, ?, (SELECT precio FROM producto WHERE id_producto = ?))",
                [idCarrito, id_producto, cantidad, id_producto]
            );
        } else {
            // sumar cantidad si ya existe
            await db.query(
                `UPDATE carritoproducto 
                 SET cantidad = cantidad + ?, 
                     subtotal = (cantidad + ?) * (SELECT precio FROM producto WHERE id_producto = ?)
                 WHERE id_carrito = ? AND id_producto = ?`,
                [cantidad, cantidad, id_producto, idCarrito, id_producto]
            );
        }

        res.json({ status: "ok", message: "Producto agregado" });

    } catch (error) {
        console.error("Error ADD carrito:", error);
        res.status(500).json({ error: "Error agregando producto" });
    }
});


//modificar cantidad
router.put("/update", authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { id_producto, cantidad } = req.body;

    if (!id_producto || !cantidad) {
        return res.status(400).json({ error: "Datos insuficientes" });
    }

    try {
        const [rows] = await db.query(
            "SELECT id_carrito FROM carrito WHERE id_usuario = ?",
            [userId]
        );

        if (rows.length === 0) return res.status(400).json({ error: "Carrito no existe" });

        const idCarrito = rows[0].id_carrito;

        await db.query(
            `UPDATE carritoproducto 
             SET cantidad = ?, 
                 subtotal = ? * (SELECT precio FROM producto WHERE id_producto = ?)
             WHERE id_carrito = ? AND id_producto = ?`,
            [cantidad, cantidad, id_producto, idCarrito, id_producto]
        );

        res.json({ status: "ok", message: "Cantidad actualizada" });

    } catch (error) {
        console.error("Error UPDATE carrito:", error);
        res.status(500).json({ error: "Error actualizando cantidad" });
    }
});


//eliminar producto del carrito
router.delete("/remove/:idProd", authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { idProd } = req.params;

    try {
        const [rows] = await db.query(
            "SELECT id_carrito FROM carrito WHERE id_usuario = ?",
            [userId]
        );

        if (rows.length === 0) return res.status(400).json({ error: "Carrito no existe" });

        const idCarrito = rows[0].id_carrito;

        await db.query(
            "DELETE FROM carritoproducto WHERE id_carrito = ? AND id_producto = ?",
            [idCarrito, idProd]
        );

        res.json({ status: "ok", message: "Producto eliminado" });

    } catch (error) {
        console.error("Error REMOVE carrito:", error);
        res.status(500).json({ error: "Error eliminando producto" });
    }
});


//vaciar carrito
router.delete("/clear", authMiddleware, async (req, res) => {
    const userId = req.user.id;

    try {
        const [rows] = await db.query(
            "SELECT id_carrito FROM carrito WHERE id_usuario = ?",
            [userId]
        );

        if (rows.length === 0) return res.status(400).json({ error: "Carrito no existe" });

        const idCarrito = rows[0].id_carrito;

        await db.query(
            "DELETE FROM carritoproducto WHERE id_carrito = ?",
            [idCarrito]
        );

        res.json({ status: "ok", message: "Carrito vaciado" });

    } catch (error) {
        console.error("Error CLEAR carrito:", error);
        res.status(500).json({ error: "Error vaciando carrito" });
    }
});


module.exports = router;
