const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); //  importar el middleware

router.get("/", authMiddleware, (req, res) => {   // lo usa aca 
    res.json({ message: "Productos protegidos", user: req.user });
});

module.exports = router;