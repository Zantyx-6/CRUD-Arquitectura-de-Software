// Importa el servicio de autenticación desde el archivo authService.js ubicado en la carpeta "services"
import authService from '../services/authService.js';

// Define un objeto llamado authController que contiene las funciones relacionadas con autenticación
const authController = {
  
  // Método para registrar un nuevo usuario
  register: async (req, res) => {
    try {
      // Llama al método "register" del servicio de autenticación, pasándole los datos del cuerpo de la solicitud (req.body)
      const user = await authService.register(req.body);

      // Si el registro es exitoso, responde con un estado 201 (creado) y un objeto JSON con los datos del usuario
      res.status(201).json({
        success: true, // Indica que la operación fue exitosa
        message: 'Usuario registrado exitosamente', // Mensaje descriptivo
        user: { 
          id: user.id,              // ID del usuario registrado
          nombre: user.nombre,      // Nombre del usuario registrado
          email: user.email         // Email del usuario registrado
        }
      });

    } catch (error) {
      // Si ocurre un error (por ejemplo, datos inválidos o usuario ya registrado), responde con estado 400 (bad request)
      res.status(400).json({ 
        success: false,             // Indica que la operación falló
        error: error.message        // Muestra el mensaje de error generado
      });
    }
  },

  // Método para iniciar sesión
  login: async (req, res) => {
    try {
      // Extrae las credenciales (email y contraseña) del cuerpo de la solicitud
      const { email, password } = req.body;

      // Llama al método "login" del servicio de autenticación, pasándole el email y la contraseña
      const result = await authService.login(email, password);

      // Si no se obtiene un resultado (es decir, credenciales incorrectas), responde con estado 401 (no autorizado)
      if (!result) {
        return res.status(401).json({ 
          success: false,              // Indica que la operación falló
          error: 'Credenciales inválidas' // Mensaje de error específico
        });
      }

      // Si el login es exitoso, responde con los datos del usuario y un token (probablemente JWT)
      res.json({
        success: true, // Indica que la operación fue exitosa
        message: 'Login exitoso', // Mensaje descriptivo
        token: result.token, // Token generado para el usuario autenticado
        user: {
          id: result.user.id,           // ID del usuario autenticado
          nombre: result.user.nombre,   // Nombre del usuario
          email: result.user.email      // Email del usuario
        }
      });

    } catch (error) {
      // Si ocurre un error interno del servidor, responde con estado 500 (internal server error)
      res.status(500).json({ 
        success: false,             // Indica que la operación falló
        error: error.message        // Muestra el mensaje de error generado
      });
    }
  }
};

// Exporta el objeto authController para que pueda ser usado en otras partes de la aplicación
export default authController;
