// Importa el módulo 'express' para utilizar la funcionalidad del framework Express
import express from "express";

// Importa las funciones 'createProduct' y 'getProducts' desde el archivo 'productController.js'
// Estas funciones son las encargadas de manejar las rutas relacionadas con los productos
import {
  createProduct,
  getProducts
} from "../controllers/productController.js";

// Crea una instancia del enrutador de Express, que se utilizará para definir rutas específicas de productos
const router = express.Router();

// Define una ruta GET para obtener la lista de productos. 
// Cuando un cliente haga una solicitud GET a '/', se ejecutará la función 'getProducts' del controlador
router.get("/", getProducts);

// Define una ruta POST para crear un nuevo producto. 
// Cuando un cliente haga una solicitud POST a '/', se ejecutará la función 'createProduct' del controlador
router.post("/", createProduct);

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación, como en el archivo principal del servidor
export default router;
