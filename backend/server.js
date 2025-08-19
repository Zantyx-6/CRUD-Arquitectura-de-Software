// Importa el módulo 'express', que es un framework de Node.js para crear aplicaciones web y APIs
import express from 'express';

// Importa el módulo 'cors' para habilitar la política de intercambio de recursos de origen cruzado (CORS)
// CORS permite controlar qué dominios pueden acceder a tu API
import cors from 'cors';

// Importa 'mongoose', que es un ODM (Object Data Modeling) para MongoDB, si estás utilizando una base de datos MongoDB
// Esto permite interactuar con MongoDB de manera más sencilla, modelando los datos como objetos JavaScript
import mongoose from 'mongoose'; // Si usas MongoDB

// Crea una instancia de la aplicación Express
const app = express();

// Middlewares (¡Estos deben ir primero!)
// Middleware para habilitar CORS y permitir que el frontend en 'http://localhost:5173' haga solicitudes a esta API
// También permite el envío de credenciales como cookies o tokens
app.use(cors({
  origin: 'http://localhost:5173', // Define que solo el dominio 'http://localhost:5173' puede acceder a la API
  credentials: true               // Permite el envío de credenciales (como cookies y tokens) con las solicitudes
}));

// Middleware para parsear el cuerpo de las solicitudes HTTP en formato JSON
// Esto convierte los datos del cuerpo de la solicitud (req.body) en un objeto JavaScript accesible
app.use(express.json()); // Para parsear JSON

// 1. Endpoints de Autenticación (los que ya usas)
// Ruta para el registro de usuarios, que maneja solicitudes POST a '/api/auth/register'
app.post('/api/auth/register', async (req, res) => {
  try {
    // Desestructura el cuerpo de la solicitud para obtener los campos nombre, email y password
    const { nombre, email, password } = req.body;

    // Lógica de registro (aquí se realizaría el hash de la contraseña, validación y almacenamiento en la base de datos)
    // Este es solo un ejemplo, normalmente aquí iría la lógica para registrar al usuario

    // Responde con estado 201 (creado) y un mensaje de éxito
    res.status(201).json({ message: 'Registro exitoso' });
  } catch (error) {
    // Si ocurre un error, responde con estado 500 (error del servidor) y un mensaje de error
    res.status(500).json({ error: error.message });
  }
});

// Ruta para el login de usuarios, que maneja solicitudes POST a '/api/auth/login'
app.post('/api/auth/login', async (req, res) => {
  try {
    // Desestructura el cuerpo de la solicitud para obtener el email y la contraseña
    const { email, password } = req.body;

    // Lógica de login (verificar las credenciales del usuario, generar el token JWT, etc.)
    // Este es solo un ejemplo, normalmente aquí se validan las credenciales y se genera un token de autenticación

    // Responde con un token generado (en este caso es un valor ficticio) y los datos del usuario
    res.json({ token: 'token-generado', user: { email } });
  } catch (error) {
    // Si ocurre un error (por ejemplo, credenciales inválidas), responde con estado 401 (no autorizado) y un mensaje de error
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

// 2. Endpoints de Productos (para principalPage.jsx)
// Ruta para obtener los productos desde la base de datos
// Maneja solicitudes GET a '/api/products'
app.get('/api/products', async (req, res) => {
  // Ejemplo: Obtener productos de MongoDB (usando mongoose)
  // 'Product.find()' buscaría todos los productos en la base de datos
  const products = await Product.find();  // Este es un ejemplo, 'Product' debería ser un modelo de mongoose

  // Responde con los productos en formato JSON
  res.json(products);
});

// Ruta para crear un nuevo producto, maneja solicitudes POST a '/api/products'
app.post('/api/products', async (req, res) => {
  // Desestructura el cuerpo de la solicitud para obtener los datos del nuevo producto
  const newProduct = req.body;

  // Guarda el nuevo producto en la base de datos (esto también debería ser un modelo de mongoose)
  const savedProduct = await Product.create(newProduct);  // 'Product.create()' crea un nuevo producto en la DB

  // Responde con el producto recién creado, con estado 201 (creado)
  res.status(201).json(savedProduct);
});

// Inicia el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  // Cuando el servidor esté corriendo, muestra un mensaje en la consola indicando la URL del backend
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
