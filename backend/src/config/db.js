// Importa el módulo 'mongoose', que es un ODM (Object Data Modeling) para MongoDB
// Mongoose simplifica la interacción con MongoDB, permitiendo el uso de esquemas y modelos para los datos.
import mongoose from "mongoose";

// Define una función asíncrona llamada 'connectDB' para conectar la aplicación a la base de datos MongoDB
const connectDB = async () => {
  try {
    // Intenta conectarse a MongoDB usando la URI definida en las variables de entorno
    // 'process.env.MONGO_URI' debe contener la URI de conexión a la base de datos
    // 'process.env.DB_NAME' especifica el nombre de la base de datos a la que te quieres conectar
    // 'serverSelectionTimeoutMS' define el tiempo de espera máximo para seleccionar un servidor de la base de datos (5 segundos)
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME, // Nombre de la base de datos
      serverSelectionTimeoutMS: 5000, // Timeout de 5 segundos
    });
    
    // Si la conexión es exitosa, muestra un mensaje de éxito en la consola
    console.log("✅ Conectado a MongoDB Atlas");
    
    // Muestra información adicional sobre la base de datos y el host de conexión
    console.log(`📦 Base de datos: ${mongoose.connection.db.databaseName}`);  // Nombre de la base de datos conectada
    console.log(`🛰️  Host: ${mongoose.connection.host}`);                    // Host al que está conectada la base de datos
    
    // Verificación adicional de conexión
    // Usa la API administrativa de MongoDB para hacer un ping a la base de datos y asegurarse de que la conexión está activa
    await mongoose.connection.db.admin().ping();
    console.log("✳️ Ping a MongoDB exitoso");  // Mensaje indicando que el ping fue exitoso
    
  } catch (error) {
    // Si hay un error en la conexión, muestra el mensaje de error en la consola
    console.error("❌ Error de conexión a MongoDB:", error.message);
    
    // Si ocurre un error, termina el proceso con un código de salida 1, lo que indica un fallo
    process.exit(1);
  }
};

// Manejo de eventos de conexión de mongoose

// Evento que se emite cuando Mongoose se conecta exitosamente a la base de datos
mongoose.connection.on("connected", () => {
  console.log("🔗 Mongoose conectado");  // Mensaje de éxito cuando Mongoose está conectado
});

// Evento que se emite cuando ocurre un error en la conexión de Mongoose
mongoose.connection.on("error", (err) => {
  // Muestra un mensaje de error con los detalles del problema de conexión
  console.error(`🚨 Error de Mongoose: ${err.message}`);
});

// Exporta la función 'connectDB' para que pueda ser utilizada en otras partes de la aplicación (por ejemplo, en el archivo principal)
export default connectDB;
