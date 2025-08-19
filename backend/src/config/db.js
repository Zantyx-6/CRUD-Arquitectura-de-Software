import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME, // Asegúrate de especificar el nombre de la DB
      serverSelectionTimeoutMS: 5000, // Timeout de 5 segundos
    });
    
    console.log("✅ Conectado a MongoDB Atlas");
    console.log(`📦 Base de datos: ${mongoose.connection.db.databaseName}`);
    console.log(`🛰️  Host: ${mongoose.connection.host}`);
    
    // Verificación adicional
    await mongoose.connection.db.admin().ping();
    console.log("✳️ Ping a MongoDB exitoso");
    
  } catch (error) {
    console.error("❌ Error de conexión a MongoDB:", error.message);
    process.exit(1);
  }
};

// Manejo de eventos de conexión
mongoose.connection.on("connected", () => {
  console.log("🔗 Mongoose conectado");
});

mongoose.connection.on("error", (err) => {
  console.error(`🚨 Error de Mongoose: ${err.message}`);
});

export default connectDB;