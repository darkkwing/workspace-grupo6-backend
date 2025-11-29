const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// leer JSON
app.use(express.json());

//rutas backend
const authRoutes = require("./routes/auth");
app.use("/login", authRoutes);

const categoriesRoutes = require("./routes/categories");
app.use("/categories", categoriesRoutes);

const productsRoutes = require("./routes/products");
app.use("/products", productsRoutes);

const usersRoutes = require("./routes/users");
app.use("/users", usersRoutes);

const commentsRoutes = require("./routes/comments");
app.use("/comments", commentsRoutes);

const cartRoutes = require("./routes/cart");
app.use("/cart", cartRoutes);

const checkoutRoutes = require("./routes/checkout");
app.use("/checkout", checkoutRoutes);


// JSONs viejos de eMercado API, ya que algunos se usan en el proyecto
app.use(
  "/emercado-api",
  express.static(path.join(__dirname, "json", "emercado-api-main"))
);

//frontend
const frontendPath = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

//iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
