// Importa el módulo 'express', que es un framework para Node.js que facilita la creación de servidores web
import express from 'express';

// Importa el módulo 'cors', que es un middleware que permite configurar políticas de acceso entre dominios (CORS)
import cors from 'cors';

// Crea una nueva instancia de la aplicación Express
const app = express();

// Configuración de CORS (Cross-Origin Resource Sharing), que define qué orígenes pueden acceder a la API
// Esta configuración es ejecutada solo una vez, se aplica globalmente
app.use(cors({
  origin: 'http://localhost:5173', // Define el origen permitido para las solicitudes CORS, en este caso solo permite solicitudes desde http://localhost:5173
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Establece los métodos HTTP permitidos para las solicitudes CORS
  credentials: true, // Permite enviar cookies o encabezados de autenticación con las solicitudes (necesario si se usan tokens o sesiones)
  allowedHeaders: ['Content-Type', 'Authorization'] // Define los encabezados HTTP permitidos en las solicitudes CORS
}));

// Middleware para parsear el cuerpo de las solicitudes que contienen datos en formato JSON
// Esto convierte automáticamente los datos de la solicitud a un objeto JavaScript accesible mediante req.body
app.use(express.json());

// Definición de una ruta POST para el endpoint '/api/auth/register'
// Cuando un cliente haga una solicitud POST a esta ruta, se ejecutará el código proporcionado
app.post('/api/auth/register', (req, res) => {
  // Responde con un objeto JSON que contiene un mensaje indicando que el registro fue exitoso
  res.json({ message: 'Registro exitoso!' });
});

// Inicia el servidor en el puerto 3000 y muestra un mensaje en consola cuando el servidor esté listo
app.listen(3000, () => {
  console.log('Servidor backend en http://localhost:3000'); // Muestra un mensaje en la consola con la URL del servidor
});
