const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// es pa que el frontend (incluso desde file://) puea pedir los JSON
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	if (req.method === 'OPTIONS') return res.sendStatus(200);
	next();
});

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
