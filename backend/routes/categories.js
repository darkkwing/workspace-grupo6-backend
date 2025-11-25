const express = require ("express");
const router = express.Router();
const db = require("../config/db");

//obtenemos categorias

router.get("/", async (req, res)=>{
    try {
        const [rows] = await db.query("SELECT * FROM categoria;");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Error obteniendo categorias"});
    }
});

module.exports = router;