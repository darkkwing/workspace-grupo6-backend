const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

// calve
const SECRET_KEY = "el_groupe_six_es_el_mejor";

router.post("/", async(req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email y contraseña requeridos" });
    }

    try {
        // buscar usuario por correo
        const [rows] = await db.query(
            "SELECT * FROM usuario WHERE correo = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const user = rows[0];

        // comparar contraseña SIN encriptación
        if (user.contraseña_hash !== password) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        // crear token
        const token = jwt.sign(
            { id: user.id_usuario, email: user.correo },
            SECRET_KEY,
            { expiresIn: "2h" }
        );

        return res.json({
            token,
            user: {
                id: user.id_usuario,
                email: user.correo,
                nombre: user.nombre,
                apellido: user.apellido,
                telefono: user.telefono,
                es_vendedor: user.es_vendedor
            }
        });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});


router.get("/", authMiddleware, (req, res) => {
  res.json({
    message: "Ruta protegida",
    user: req.user
  });
});

module.exports = router;
