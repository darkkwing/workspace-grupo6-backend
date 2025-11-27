const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");


router.put("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, imagenPerfil } = req.body;

    try {
        await db.query(
            "UPDATE usuario SET nombre = ?, apellido = ?, telefono = ?, imagen_perfil = ? WHERE id_usuario = ?",
            [nombre, apellido, telefono, imagenPerfil, id]
        );

        res.json({ success: true, message: "Usuario actualizado con éxito" });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ success: false, error: "Error en el servidor" });
    }
});

module.exports = router;
