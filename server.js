const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const portfolioRoutes = require('./routes/portfolios');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS más específico
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api/portfolios', portfolioRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Portafolios funcionando!' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error del servidor:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});