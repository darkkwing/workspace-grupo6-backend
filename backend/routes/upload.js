const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

// ruta a frontend/img/uploads
const uploadPath = path.join(__dirname, "..", "..", "frontend", "img", "uploads");

const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + ext;
    cb(null, name);
  }
});

const upload = multer({ storage });

// endpoint de subida
router.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    filename: req.file.filename,
    url: `/img/uploads/${req.file.filename}`
  });
});

module.exports = router;
