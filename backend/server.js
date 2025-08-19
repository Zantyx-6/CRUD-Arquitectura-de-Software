import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'; // Si usas MongoDB

const app = express();

// Middlewares (¡Estos deben ir primero!)
app.use(cors({
  origin: 'http://localhost:5173', // Ajusta según tu frontend
  credentials: true
}));
app.use(express.json()); // Para parsear JSON

// 1. Endpoints de Autenticación (los que ya usas)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    // Lógica de registro (hash de contraseña, guardar en DB, etc.)
    res.status(201).json({ message: 'Registro exitoso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Lógica de login (verificar credenciales, generar token)
    res.json({ token: 'token-generado', user: { email } });
  } catch (error) {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

// 2. Endpoints de Productos (para principalPage.jsx)
app.get('/api/products', async (req, res) => {
  // Ejemplo: Obtener productos de MongoDB
  const products = await Product.find();
  res.json(products);
});

app.post('/api/products', async (req, res) => {
  const newProduct = req.body;
  // Guardar en DB
  const savedProduct = await Product.create(newProduct);
  res.status(201).json(savedProduct);
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});