import express from 'express';
import cors from 'cors';

const app = express();

// Configuración de CORS (solo una vez)
app.use(cors({
  origin: 'http://localhost:5173', // Solo permite tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true, // Necesario si usas cookies/tokens
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}));

// Middleware para parsear JSON
app.use(express.json());

// Definición de rutas
app.post('/api/auth/register', (req, res) => {
  res.json({ message: 'Registro exitoso!' });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor backend en http://localhost:3000');
});