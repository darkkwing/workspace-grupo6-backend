const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

//get conseguir comentarios
router.get("/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const [rows] = await db.query(
      `
      SELECT 
        c.id_comentario,
        c.puntuacion AS score,
        c.texto AS description,
        c.fecha AS dateTime,
        u.nombre,
        u.apellido,
        u.correo
      FROM comentario c
      JOIN usuario u ON u.id_usuario = c.id_usuario
      WHERE c.id_producto = ?
      ORDER BY c.fecha DESC
      `,
      [productId]
    );

    const comments = rows.map(r => ({
      score: r.score,
      description: r.description,
      dateTime: r.dateTime,
      user: (r.nombre || r.apellido)
        ? `${r.nombre} ${r.apellido}`.trim()
        : r.correo
    }));

    res.json({ status: "ok", comments });

  } catch (error) {
    console.error("Error obteniendo comentarios:", error);
    res.status(500).json({ error: "Error al obtener comentarios" });
  }
});

//post nuevo comentario
router.post("/", authMiddleware, async (req, res) => {
  const { id_producto, puntuacion, texto } = req.body;

  if (!id_producto || !puntuacion || !texto) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const userId = req.user.id;

  try {
    await db.query(
      `
      INSERT INTO comentario (id_producto, id_usuario, puntuacion, texto, fecha)
      VALUES (?, ?, ?, ?, NOW())
      `,
      [id_producto, userId, puntuacion, texto]
    );

    res.json({ status: "ok" });

  } catch (error) {
    console.error("Error guardando comentario:", error);
    res.status(500).json({ error: "Error al guardar comentario" });
  }
});

module.exports = router;
