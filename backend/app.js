const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// leer json
app.use(express.json());

// routes
const authRoutes = require("./routes/auth");
console.log(">>> RUTA /login REGISTRADA <<<");
app.use("/login", authRoutes);

const categoriesRoutes = require("./routes/categories");
app.use("/categories", categoriesRoutes);

const productsRoutes = require("./routes/products");
app.use("/products", productsRoutes);

const usersRoutes = require("./routes/users");
app.use("/users", usersRoutes);

const commentsRoutes = require("./routes/comments");
app.use("/comments", commentsRoutes);


// JSONs
app.use(
  "/emercado-api",
  express.static(path.join(__dirname, "json", "emercado-api-main"))
);

// frontend
const frontendPath = path.join(__dirname, "..", "frotend");
app.use(express.static(frontendPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
