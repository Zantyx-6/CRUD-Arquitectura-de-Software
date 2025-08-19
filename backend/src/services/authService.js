import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// "Base de datos" temporal en memoria
let users = [];
let currentId = 1;

const authService = {
  register: async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = {
      id: currentId++,
      nombre: userData.nombre,
      email: userData.email,
      password: hashedPassword
    };
    users.push(newUser);
    return newUser;
  },

  login: async (email, password) => {
    const user = users.find(u => u.email === email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { user, token };
  }
};

export default authService;