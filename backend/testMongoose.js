// Importa mongoose usando ES Modules
import mongoose from 'mongoose';

// URL de conexión a tu base de datos MongoDB
const mongoURI = 'mongodb://localhost:27017/testDB';

// Conecta a MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB correctamente'))
.catch((err) => console.error('❌ Error al conectar a MongoDB:', err));

// Opcional: cerrar la conexión después de 5 segundos (solo para pruebas)
setTimeout(() => {
  mongoose.connection.close();
  console.log('🔒 Conexión cerrada');
}, 5000);
