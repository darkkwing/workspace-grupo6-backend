const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Obtener productos por categoría
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
      currency: p.moneda || "USD",
      soldCount: p.vendidos,
      image: p.imagen,
      brand: String(p.nombre || "").split(" ")[0],
    }));

    res.json({
      catId: catID,
      catName: catName,
      products: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo productos" });
  }
});

module.exports = router;
