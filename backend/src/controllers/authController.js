import authService from '../services/authService.js';

const authController = {
  register: async (req, res) => {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        user: { id: user.id, nombre: user.nombre, email: user.email }
      });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      
      if (!result) {
        return res.status(401).json({ 
          success: false, 
          error: 'Credenciales inválidas' 
        });
      }

      res.json({
        success: true,
        message: 'Login exitoso',
        token: result.token,
        user: { id: result.user.id, nombre: result.user.nombre, email: result.user.email }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

export default authController;
