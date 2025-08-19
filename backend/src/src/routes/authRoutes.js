// Importa el módulo 'express', que es un framework para Node.js que facilita la creación de servidores y rutas
import express from 'express';

// Importa el controlador 'authController' desde el archivo 'authController.js', ubicado en la carpeta 'controllers'
// Este controlador contiene las funciones para manejar el registro y login de usuarios
import authController from '../controllers/authController.js';

// Crea un enrutador de Express que se utilizará para definir las rutas de la API
const router = express.Router();

// Define una ruta POST para '/register' que utiliza el método 'register' del 'authController'
// Esto significa que cuando un cliente haga una solicitud POST a '/register', se llamará al método 'register' del controlador
router.post('/register', authController.register);

// Define una ruta POST para '/login' que utiliza el método 'login' del 'authController'
// Cuando un cliente haga una solicitud POST a '/login', se llamará al método 'login' del controlador
router.post('/login', authController.login);

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación, como en el archivo principal del servidor
export default router;
