const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const authMiddleware = require("../middleware/authMiddleware");

const USERS_PATH = path.join(__dirname, "../data/users.json");
// calve
const SECRET_KEY = "el_groupe_six_es_el_mejor";

router.post("/", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email y contraseña requeridos" });
    }

    const users = JSON.parse(fs.readFileSync(USERS_PATH));

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ error: "Credenciales invalidas" });
    }

    //crear tokenn
    const token = jwt.sign(
        { id: user.id, email: user.email },
        SECRET_KEY,
        { expiresIn: "2h" }
    );
    return res.json({ token });
});

router.get("/", authMiddleware, (req, res) => {
  res.json({
    message: "Ruta protegida",
    user: req.user
  });
});

module.exports = router;
