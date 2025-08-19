// Importa el módulo 'bcryptjs', utilizado para encriptar y comparar contraseñas de manera segura
import bcrypt from 'bcryptjs';

// Importa el módulo 'jsonwebtoken', utilizado para crear y verificar tokens JWT (JSON Web Tokens)
import jwt from 'jsonwebtoken';

// Importa las variables de entorno desde un archivo .env, usando 'dotenv/config' para que las variables estén disponibles
import 'dotenv/config';

// "Base de datos" temporal en memoria (simula almacenamiento de usuarios)
// En este caso, 'users' es un arreglo que guarda los usuarios registrados y 'currentId' es el contador de IDs para los usuarios
let users = [];
let currentId = 1;

// Definición del objeto 'authService' que contiene los métodos de autenticación
const authService = {
  
  // Método 'register' para registrar un nuevo usuario
  // Recibe los datos del usuario (userData) como argumento
  register: async (userData) => {
    
    // Encripta la contraseña usando bcrypt con un "salt" de 10 rondas (esto asegura que la contraseña se guarde de forma segura)
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Crea un nuevo objeto 'newUser' con los datos del usuario, incluyendo el ID generado y la contraseña encriptada
    const newUser = {
      id: currentId++,            // Asigna un ID único incrementando el contador 'currentId'
      nombre: userData.nombre,    // Nombre del usuario proporcionado
      email: userData.email,      // Email del usuario proporcionado
      password: hashedPassword    // Contraseña encriptada
    };

    // Agrega el nuevo usuario al arreglo 'users', simulando el almacenamiento en base de datos
    users.push(newUser);

    // Retorna el objeto del nuevo usuario para que se pueda utilizar o mostrar en la respuesta
    return newUser;
  },

  // Método 'login' para autenticar a un usuario
  // Recibe el email y la contraseña proporcionada por el usuario
  login: async (email, password) => {

    // Busca al usuario en la "base de datos" (arreglo 'users') utilizando el email proporcionado
    const user = users.find(u => u.email === email);

    // Si no se encuentra el usuario, retorna 'null', indicando que el login falló
    if (!user) return null;

    // Compara la contraseña proporcionada con la contraseña encriptada almacenada en la "base de datos"
    const isMatch = await bcrypt.compare(password, user.password);

    // Si las contraseñas no coinciden, retorna 'null', indicando que el login falló
    if (!isMatch) return null;

    // Si las credenciales son válidas, genera un token JWT que contiene el ID y email del usuario
    // 'process.env.JWT_SECRET' obtiene la clave secreta para firmar el token desde las variables de entorno
    // 'expiresIn: "1h"' hace que el token expire en 1 hora
    const token = jwt.sign(
      { id: user.id, email: user.email },    // Datos que se incluyen en el token (payload)
      process.env.JWT_SECRET,                // Clave secreta para firmar el token
      { expiresIn: '1h' }                    // Tiempo de expiración del token (1 hora)
    );

    // Retorna el objeto con el usuario autenticado y el token generado
    return { user, token };
  }
};

// Exporta el objeto 'authService' para que pueda ser utilizado en otros archivos de la aplicación
export default authService;
