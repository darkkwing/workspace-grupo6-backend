const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// para que el post /login pueda lea el json
app.use(express.json());

// es pa que el frontend (incluso desde file://) puea pedir los JSON
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') return res.sendStatus(200);
	next();
});

// rutas del login
const authRoutes = require('./routes/auth');
app.use('/login', authRoutes);

const categoriesRoutes = require("./routes/categories");
app.use("/categories", categoriesRoutes);

const productsRoutes = require("./routes/products");
app.use("/products", productsRoutes);



// sirve los JSONs en /emercado-api/*
app.use('/emercado-api', express.static(path.join(__dirname, 'json', 'emercado-api-main')));

// sirve el frontend (carpeta frotend que esta al lado) pa que la app ande en http://localhost:3000
const frontendPath = path.join(__dirname, '..', 'frotend');
app.use(express.static(frontendPath));

app.get('/', (req, res) => {
	res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
