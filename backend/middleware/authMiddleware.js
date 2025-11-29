const jwt = require("jsonwebtoken");

const SECRET_KEY = "el_groupe_six_es_el_mejor";

function authMiddleware(req, res, next) {
  // aceptar mayusculas y minúsculas
  const authHeader =
    req.headers.authorization ||
    req.headers.Authorization ||
    req.headers["authorization"] ||
    req.headers["Authorization"];


  if (!authHeader) {
    return res.status(401).json({ message: "Token no enviado" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Formato de token inválido" });
  }

  const token = parts[1];

  jwt.verify(token, SECRET_KEY, (err, decodedUser) => {
    if (err) {
      console.log("❌ ERROR JWT:", err);
      return res.status(403).json({ message: "Token inválido o expirado" });
    }

    req.user = decodedUser;
    next();
  });
}

module.exports = authMiddleware;
